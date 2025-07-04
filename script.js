async function verifica() {
    const cidade = document.getElementById('cidnome').value.trim();
    const apiKey = 'fa5ef5191639209f1c9b4abb240ea38f';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;
    
    document.getElementById('resultado').style.display = 'block'

    const resultado = document.getElementById('resultado');
    
    if (!cidade) {
        resultado.innerHTML = `<p class="text-red-600 font-extrabold">Por favor, digite uma cidade válida!</p>`;
        return;
    }

    resultado.innerHTML = `<p class="text-sky-950">Buscando informações...</p>`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao buscar os dados.');
        }

        const data = await response.json();

        resultado.innerHTML = `
        <div class="card text-sky-950">
            <h3 class="text-lg font-bold">${data.name}, ${data.sys.country}</h3>
            <p>Temperatura: ${data.main.temp}°C</p>
            <p>Clima: ${data.weather[0].description}</p>
            <p>Umidade: ${data.main.humidity}%</p>
        </div>
        `;
    } catch (error) {
        resultado.innerHTML = `<p class="text-red-600 font-extrabold">Erro: ${error.message}</p>`;
    }
}