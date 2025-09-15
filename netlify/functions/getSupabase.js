import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function handler(event, context) {
    try {
        const { userId } = JSON.parse(event.body)
        const { data, error } = await supabase
            .from('userInfo_personalChatbot')
            .select('userName, userMessage, aiResponse, created_at, imageLink')
            .eq('userId', userId)
            .order('created_at', { ascending: true })
        if (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: error.message })
            }
        }
        const chatArray = []
        const imagePreviews = [];
        data.forEach(row => {
            const time = new Date(row.created_at).toLocaleTimeString('id-ID', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Jakarta'
            });
            if (row.imageLink) {
                imagePreviews.push(row.imageLink);
                imagePreviews.push(null);
            } else {
                imagePreviews.push(null);
                imagePreviews.push(null);
            }

            if (row.userMessage) {
                chatArray.push(`${row.userMessage}

(${row.userName} - ${time})`);

            } else {
                chatArray.push(null);
            }

            if (row.aiResponse) {
                chatArray.push(`${row.aiResponse}

(${time})`);
            } else {
                chatArray.push(null);
            }
        })

        return {
            statusCode: 200,
            body: JSON.stringify({ chat: chatArray, imagePreviews: imagePreviews }),
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        }
    }
}
