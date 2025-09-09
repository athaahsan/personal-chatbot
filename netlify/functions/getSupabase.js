import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function handler(event, context) {
    try {
        const { userId } = JSON.parse(event.body)
        const { data, error } = await supabase
            .from('userInfo_personalChatbot')
            .select('userName, userMessage, aiResponse, created_at')
            .eq('userId', userId)
            .order('created_at', { ascending: true })
        if (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: error.message })
            }
        }
        const chatArray = []
        data.forEach(row => {
            const time = new Date(row.created_at).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Jakarta'
            });

            if (row.userMessage) chatArray.push(`${row.userMessage}

(${row.userName}, ${time})`)
            if (row.aiResponse) chatArray.push(`${row.aiResponse}

(${time})`)
        })

        return {
            statusCode: 200,
            body: JSON.stringify({ chat: chatArray })
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        }
    }
}
