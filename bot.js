// bot.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Substitua o bloco antigo do Client por este:
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
    }
});

client.on('qr', (qr) => {
    console.log('Escaneie este QR Code no seu WhatsApp:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Robô de Delivery ativo! Faça um teste mandando "oi".');
});

client.on('message', async (msg) => {
    const textoCliente = msg.body.toLowerCase();

    // 1. Mensagem de boas-vindas com o link do cardápio
    if (textoCliente === 'oi' || textoCliente === 'olá' || textoCliente === 'ola') {
        
        // Se você estiver rodando o cardápio.html no Live Server do VS Code,
        // o link provavelmente será esse. Caso contrário, substitua pelo link correto.
        const linkCardapio = "https://soareshanderson19-art.github.io/teste-robo/"; 

        await msg.reply(
            `Olá! Que bom ter você aqui. 🍟\n\n` +
            `Para montar o seu pedido, acesse nosso cardápio virtual no link abaixo:\n` +
            `👉 ${linkCardapio}\n\n` +
            `Escolha os itens e clique em 'Finalizar' que eu recebo aqui!`
        );
    }
    
    // 2. Intercepta o pedido finalizado que veio do cardápio
    else if (msg.body.startsWith('*[NOVO PEDIDO]*')) {
        await msg.reply(
            `✅ *Pedido Recebido com Sucesso!*\n\n` +
            `Já enviamos os detalhes para a nossa cozinha.\n` +
            `Em breve trarei atualizações sobre a entrega do seu pedido! 🛵`
        );
    }
});

client.initialize();
