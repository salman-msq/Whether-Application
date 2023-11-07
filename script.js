document.getElementById("location").addEventListener('change', async() => {
    const loc = document.getElementById("location").value;
    
    const whetherData = await getWhetherData(loc);

    display(whetherData);
});

const getWhetherData = async (loc) => {
    if (!loc){
        return {};
    }

    const apiKey = 'd713c1fc1d049b001c3812c5e835d800';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}`);
    const data = await response.json();

    return data;
}

function getBGC(temp){
    if (temp < 0){
        return 'lightblue';
    } else if (temp < 10){
        return 'lightgreen';
    }
    else if (temp < 20){
        return 'lightgreen';
    } else if (temp < 30){
        return 'lightyellow';
    } else{
        return 'lightcoral';
    }
}

const display = (data) => {
    const wde = document.getElementById("w-data");

    if (Object.keys(data).length === 0){
        wde.style.backgroundColor = 'white';
        wde.style.borderRadius = '5px';
        wde.innerHTML = "Please enter a location then press enter or click anywhere to check the whether, for example: \"Delhi\"."
    } else{
        const bgc = getBGC(Math.floor(data.main.temp - 273.15));
        wde.style.backgroundColor = bgc;
        wde.innerHTML = `
            <h3>${data.name}</h3>
            <p>Temperature: ${Math.floor(data.main.temp - 273.15)} &deg;C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    }
}

window.onload = async () => {
    const wd = await getWhetherData();
    display(wd);
}
