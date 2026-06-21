import { Zayra } from '../src/index.js';

const bot = new Zayra();

bot.onMessage(async (msg, reply) => {
    const text = msg.body.toLowerCase();

    // ⚡ Fast Ping Test
    if (text === 'ping') {
        reply('pong ⚡');
    }

    // 🎥 Video Note Test (කෙටි mp4 ලින්ක් එකක් හෝ file path එකක් දෙන්න)
    if (text === 'vnote') {
        reply('Sending Video Note... 🔄');
        await bot.sendVideoNote(msg.from, 'https://www.w3schools.com/html/mov_bbb.mp4');
    }
});

bot.start();
