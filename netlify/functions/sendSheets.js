export async function handler(event) {
    try {
        if (event.httpMethod !== "POST") {
            return { statusCode: 405, body: "Method Not Allowed" };
        }

        const body = JSON.parse(event.body);

        const GAS_URL = process.env.GAS_URL
        const GAS_SECRET = process.env.GAS_SECRET

        const res = await fetch(GAS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                secret: GAS_SECRET,
                ...body
            })
        });

        if (error) {
            console.error("❌ GSheet error:", error);
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
