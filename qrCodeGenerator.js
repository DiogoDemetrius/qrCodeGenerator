const QRCode = require('qrcode');
const fs = require('fs');

// Função para gerar o QR Code e salvar como SVG
function gerarQRCode(produto) {
    const nomeArquivo = `${produto.nome}.svg`; // Nome do arquivo SVG

    // Opções para o QR Code no formato SVG
    const opcoes = {
        type: 'svg', // Definindo o formato como SVG
        width: 200,  // Definindo a largura do QR Code
        errorCorrectionLevel: 'H' // Nível de correção de erro (alta)
    };

    // Gerar o QR Code com base no código do produto
    QRCode.toString(produto.codigo, opcoes, (err, svg) => {
        if (err) throw err;

        // Salvar o SVG gerado
        fs.writeFileSync(nomeArquivo, svg);

        console.log(`Arquivo QR Code ${nomeArquivo} gerado com sucesso!`);
    });
}

// Função que processa o JSON e gera os QR Codes
function processarProdutos(jsonInput) {
    const produtos = JSON.parse(jsonInput); // Faz o parse do JSON
    produtos.forEach(produto => {
        gerarQRCode(produto); // Gera o QR Code para cada produto
    });
}

// Exemplo de JSON de entrada
const jsonInput = `
[
    {
        "nome": "Camarão Premium",
        "valor": 39.00,
        "codigo": "123456789012"
    },
    {
        "nome": "Camarão",
        "valor": 11.00,
        "codigo": "987654321098"
    }
]`;

// Chama a função para processar os produtos e gerar os arquivos SVG de QR Codes
processarProdutos(jsonInput);
