import pkg from 'whatsapp-web.js';
const { Client, LocalAuth, MessageMedia, Buttons } = pkg;
import qrcode from 'qrcode-terminal';

export class Zayra {
    constructor() {
        this.client = new Client({
            authStrategy: new LocalAuth(),
            // 3GB RAM සහ අඩු Specs වල සුපිරි වේගයකින් run වෙන්න Puppeteer උපරිමයෙන්ම Optimize කර ඇත
            puppeteer: {
                handleSIGINT: false,
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--disable-gpu',
                    '--single-process', // RAM භාවිතය ගොඩක් අඩු කරයි
                    '--js-flags="--max-old-space-size=1536"' // memory limit එකක් තබාගෙන crash වීම වළක්වයි
                ]
            }
        });

        this.initEvents();
    }

    initEvents() {
        this.client.on('qr', (qr) => {
            console.log('--- ZAYRA WHATSAPP LIBRARY ---');
            console.log('Scan this QR code to connect:');
            qrcode.generate(qr, { small: true });
        });

        this.client.on('ready', () => {
            console.log('✅ Zayra Engine is Live & Running at Ultra-Speed!');
        });
    }

    // Ultra-Fast Message Listener (මැසේජ් ආපු ගමන්ම ක්‍රියාත්මක වේ)
    onMessage(callback) {
        this.client.on('message', async (msg) => {
            // ක්ෂණිකව Reply යවන Quick Shortcut එක
            const reply = async (text) => {
                return await msg.reply(text);
            };
            callback(msg, reply);
        });

        // Status/Story View Support (Auto-Read & Download)
        this.client.on('message', async (msg) => {
            if (msg.from === 'status@broadcast') {
                // Status එකක් ආපු ගමන්ම ඒක auto-read (viewed) කරනවා
                await msg.downloadMedia(); // Status Download කිරීමටද සූදානම්
                console.log(`👁️ Auto-viewed status from: ${msg.author}`);
            }
        });
    }

    // 1. MEDIA SENDER FEATURE (Images, Videos, Audio, Documents)
    async sendMedia(to, filePathOrUrl, caption = '', options = {}) {
        try {
            const formattedTo = to.includes('@c.us') ? to : to.includes('@g.us') ? to : `${to}@c.us`;
            let media;
            
            if (filePathOrUrl.startsWith('http://') || filePathOrUrl.startsWith('https://')) {
                media = await MessageMedia.fromUrl(filePathOrUrl, { unsafeMime: true });
            } else {
                media = MessageMedia.fromFilePath(filePathOrUrl);
            }

            return await this.client.sendMessage(formattedTo, media, { caption, ...options });
        } catch (error) {
            console.error('Zayra Media Sender Error:', error);
        }
    }

    // 2. BUTTON SUPPORT FEATURE (Interactive Buttons)
    async sendButtons(to, text, buttonArray, title = '', footer = '') {
        try {
            const formattedTo = to.includes('@c.us') ? to : to.includes('@g.us') ? to : `${to}@c.us`;
            
            // buttonArray = [{id: 'id1', body: 'Button 1'}, {id: 'id2', body: 'Button 2'}]
            const formattedButtons = buttonArray.map(btn => ({
                buttonId: btn.id,
                buttonText: { displayText: btn.body },
                type: 1
            }));

            const buttonMessage = new Buttons(text, formattedButtons, title, footer);
            return await this.client.sendMessage(formattedTo, buttonMessage);
        } catch (error) {
            console.error('Zayra Button Sender Error:', error);
        }
    }

    // 3. GROUP MANAGEMENT FEATURES
    // Group එකකට කෙනෙක්ව Add කිරීම
    async groupAdd(groupId, participantIds) {
        try {
            const group = await this.client.getChatById(groupId);
            const ids = Array.isArray(participantIds) ? participantIds : [participantIds];
            const formattedIds = ids.map(id => id.includes('@c.us') ? id : `${id}@c.us`);
            return await group.addParticipants(formattedIds);
        } catch (error) {
            console.error('Group Add Error:', error);
        }
    }

    // Group එකෙන් කෙනෙක්ව Kick කිරීම
    async groupKick(groupId, participantIds) {
        try {
            const group = await this.client.getChatById(groupId);
            const ids = Array.isArray(participantIds) ? participantIds : [participantIds];
            const formattedIds = ids.map(id => id.includes('@c.us') ? id : `${id}@c.us`);
            return await group.removeParticipants(formattedIds);
        } catch (error) {
            console.error('Group Kick Error:', error);
        }
    }

    // Group Invite Link එක ලබා ගැනීම
    async groupInviteLink(groupId) {
        try {
            const group = await this.client.getChatById(groupId);
            return await group.getInviteCode();
        } catch (error) {
            console.error('Group Invite Link Error:', error);
        }
    }

    // සාමාන්‍ය Text Message එකක් යැවීමට
    async sendMessage(to, message) {
        try {
            const formattedTo = to.includes('@c.us') ? to : to.includes('@g.us') ? to : `${to}@c.us`;
            return await this.client.sendMessage(formattedTo, message);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    start() {
        console.log('🔄 Starting Zayra High-Speed Engine...');
        this.client.initialize();
    }
}
