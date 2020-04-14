const loadConfig = async() => {
    const response = await fetch('config.json');
    response.ok ? console.info("Configuration loaded") : console.error("Error loading config.json:", response.status, response.statusText);
    config = await response.json();
}

const loadCSV = async() => {
    const response = await fetch(config.inputFile);
    response.ok ? console.info("CSV file loaded") : console.error(`Error loading ${config.inputFile}:`, response.status, response.statusText);
    csv = await response.text();
}

const loadCustomCSS = async() => {
    const response = await fetch(config.customCSS);
    response.ok ? console.info("Custom CSS loaded") : console.error(`Error loading ${config.customCSS}:`, response.status, response.statusText);
    customCSS = await response.text();
}

loadConfig().then(loadCSV).then(loadCustomCSS).then(computeData);

let rowsNumber = 0;

function computeData() {
    data = document.querySelector('#data');
    document.querySelector('header h1').innerHTML = config.projectName;
    
    const lines = csv.split('\n');
    lines.forEach(line => {
        const cells = line.split(config.delimitator);
        const item = cells[0];
        const events = [];
        for (i=1; i<cells.length; i++) {
            if (cells[i] == '') continue;
            const attributes = cells[i].split('|');
            const date = attributes[0];
            const type = attributes[1];
            events.push({date, type})
        }
        if (config.skipEmptyRows && events.length == 0) return;
        createRow(item, events);
    })

    document.querySelector('body').innerHTML += `<!-- Custom CSS --> <style>${customCSS}</style>`;
}

function createRow(item, events) {
    let currentRowNumber = ++rowsNumber;
    data.innerHTML += `<div class="row" id="row-${currentRowNumber}"><div class="name">${item}</div><div class="events"></div></div>`;
    let eventsDiv = document.querySelector(`.row#row-${currentRowNumber} .events`)
    events.forEach(event => {
        const mappedType = config.eventTypeMapping[event.type];
        eventsDiv.innerHTML += 
            `<div class="event type-${event.type}">
                <div class="type">${mappedType == undefined ? event.type : mappedType}</div>
                <div class="date">${event.date}</div>
            </div>`
    });
}