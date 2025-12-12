const http = require('http'); // Use 'https' se a URL for HTTPS

// URL do JSON
const jsonUrl = 'https://cepcerto.com/ws/json-frete-opcional/cep-origem/cep-destino/peso/altura/largura/comprimento/declaracao-valor/mao-propria/aviso-recebimento/sua-chave';

// Fazer a requisição HTTP
http.get(jsonUrl, (response) => {
    let data = '';

    // Ao receber dados, adiciona ao buffer
    response.on('data', (chunk) => {
        data += chunk;
    });

    // Quando todos os dados forem recebidos
    response.on('end', () => {
        try {
            // Parse do JSON
            const jsonData = JSON.parse(data);

           if (jsonData.data) {
    if (Array.isArray(jsonData.data)) {
        jsonData.data.forEach((item, index) => {
            console.log(`Item ${index + 1}:`, item);
        });
    } else {
        console.log('"data" encontrado, mas não é um array.');
    }
} else {
    console.log('Chave "data" não encontrada no JSON.');
}
        } catch (error) {
            console.error('Erro ao decodificar os dados JSON:', error);
        }
    });

}).on('error', (err) => {
    console.error('Erro ao carregar o arquivo JSON:', err.message);
});