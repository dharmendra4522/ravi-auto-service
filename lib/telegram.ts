export const sendTelegramNotification = async (message: string) => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
        console.warn('Telegram credentials missing in .env.local - skipping notification.');
        return false;
    }

    try {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML',
            }),
        });

        if (!res.ok) {
            console.error('Failed to send Telegram notification', await res.text());
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error sending Telegram notification:', error);
        return false;
    }
};
