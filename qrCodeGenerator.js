const QRCode = require('qrcode');
const fs = require('fs');

function gerarQRCode(produto) {
    const nomeArquivo = `${produto.nome}.svg`;
    const opcoes = {
        type: 'svg',
        width: 200,
        errorCorrectionLevel: 'H'
    };
    
    QRCode.toString(produto.codigo, opcoes, (err, svg) => {
        if (err) throw err;
        fs.writeFileSync(nomeArquivo, svg);
        console.log(`Arquivo QR Code ${nomeArquivo} gerado com sucesso!`);
    });
}

function processarProdutos(jsonInput) {
    const produtos = JSON.parse(jsonInput);
    produtos.forEach(produto => {
        gerarQRCode(produto);
    });
}

const jsonInput = fs.readFileSync('produtos.json', 'utf8');
processarProdutos(jsonInput);
