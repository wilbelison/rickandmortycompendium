const minhaPromise = fetch('https://viacep.com.br/ws/08340146/json').then((response) => {
    return response.json();
}).then((cep) => {
    console.log(cep.logradouro);
});