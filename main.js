const loadConfig = async() => {
    const response = await fetch('config.json');
    config = await response.json();
}

const loadCSV = async() => {
    const response = await fetch(config.inputFile);
    csv = await response.text();
}

loadConfig().then(loadCSV).then(computeData);

function computeData() {
    data = document.querySelector('#data');
    
    document.querySelector('header h1').innerHTML = config.projectName;
}