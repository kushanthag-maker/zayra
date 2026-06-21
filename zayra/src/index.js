import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';

export class Zayra {
    constructor() {
        this.client = new Client({
            authStrategy: new LocalAuth(),
            puppeteer: {
                handleSIGINT: false,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            }
        });

        this.initEvents();
    }

    initEvents() {
        // QR Code එක terminal එකේ පෙන්වීමට
        this.client.on('qr', (qr) => {
            console.log('--- ZAYRA WHATSAPP LIBRARY ---');
            console.log('Please scan the QR code below to connect:');
            qrcode.generate(qr, { small: true });
        });

        // සාර්ථකව connect වූ පසු
        this.client.on('ready', () => {
            console.log('✅ Zayra is successfully connected to WhatsApp!');
        });
    }

    // මැසේජ් එකක් ආවම ක්‍රියාත්මක වන function එකක්
    onMessage(callback) {
        this.client.on('message', async (msg) => {
            // අපිට අවශ්‍ය විදිහට message object එක සරල කරලා දෙනවා
            const reply = async (text) => {
                return await msg.reply(text);
            };
            callback(msg, reply);
        });
    }

    // වෙනම මැසේජ් එකක් යැවීමට අවශ්‍ය නම්
    async sendMessage(to, message) {
        try {
            const formattedTo = to.includes('@c.us') ? to : `${to}@c.us`;
            return await this.client.sendMessage(formattedTo, message);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    // library එක start කිරීමට
    start() {
        console.log('🔄 Starting Zayra engine...');
        this.client.initialize();
    }
}
