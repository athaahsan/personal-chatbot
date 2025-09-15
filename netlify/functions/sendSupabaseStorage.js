import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export const handler = async (event) => {
    try {
        if (event.httpMethod !== 'POST') {
            return {
                statusCode: 405,
                body: 'Method not allowed',
            };
        }

        const isBase64 = event.isBase64Encoded;
        const buffer = isBase64
            ? Buffer.from(event.body, 'base64')
            : Buffer.from(event.body, 'utf-8');

        const fileNameHeader = `${Date.now()}-${event.headers['x-file-name']}`;

        const { error } = await supabase.storage
            .from('personalChatbotImages')
            .upload(fileNameHeader, buffer, {
                cacheControl: '3153600000',
                upsert: false,
                contentType: event.headers['content-type'] || 'image/png',
            });

        if (error) {
            console.error(error);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: error.message }),
            };
        }

        const { data: publicData } = supabase.storage
            .from('personalChatbotImages')
            .getPublicUrl(fileNameHeader);

        return {
            statusCode: 200,
            body: JSON.stringify({ url: publicData.publicUrl }),
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
};
