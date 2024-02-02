const minhaPromise = fetch('https://restcountries.com/v3.1/name/brazil').then((response) => {
    return response.json();
}).then((country) => {
    const srcBandeira = country[0].flags.png;
    let bandeira = document.querySelector('img');
    bandeira.setAttribute('src', srcBandeira);

});