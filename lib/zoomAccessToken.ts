export async function getZoomAccessToken() {
    const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID;
    const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
    const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID;

    const authString = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64');


    const response = await fetch(`https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${authString}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },    
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Zoom token error: ${error.reason || 'Unknown error'}`);
    }
    return (await response.json()).access_token;
}