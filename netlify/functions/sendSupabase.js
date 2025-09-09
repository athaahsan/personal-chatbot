import { createClient } from '@supabase/supabase-js'

export async function handler(event) {
    try {
        if (event.httpMethod !== "POST") {
            return { statusCode: 405, body: "Method Not Allowed" };
        }

        const body = JSON.parse(event.body);

        const supabaseUrl = process.env.SUPABASE_URL
        const supabaseKey = process.env.SUPABASE_KEY
        const supabase = createClient(supabaseUrl, supabaseKey)

        const { data, error } = await supabase
            .from("userInfo_personalChatbot")
            .insert([body]);

        if (error) {
            console.error("❌ Supabase error:", error);
            return { statusCode: 500, body: JSON.stringify(error) };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, data }),
        };
    } catch (err) {
        console.error("❌ Function error:", err);
        return { statusCode: 500, body: "Internal Server Error" };
    }
}
