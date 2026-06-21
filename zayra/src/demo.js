import { Zayra } from '../src/index.js';

const bot = new Zayra();

// මැසේජ් එකක් ආවම ක්‍රියාත්මක වන කොටස
bot.onMessage((msg, reply) => {
    console.trc = `Message received from ${msg.from}: ${msg.body}`;

    // කෙනෙක් "ping" කිව්වොත් "pong" කියා reply කරයි
    if (msg.body.toLowerCase() === 'ping') {
        reply('pong 🏓');
    }
    
    // "hi" හෝ "hello" කිව්වොත් පිළිතුරක් දෙයි
    if (msg.body.toLowerCase() === 'hi' || msg.body.toLowerCase() === 'hello') {
        reply('Hello from Zayra Library! 👋');
    }
});

// බොට්ව ස්ටාර්ට් කිරීම
bot.start();
