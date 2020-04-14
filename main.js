const loadConfig = async() => {
    const response = await fetch('config.json');
    config = await response.json();
}

const loadCSV = async() => {
    const response = await fetch(config.inputFile);
    csv = await response.text();
}

const loadCustomCSS = async() => {
    const response = await fetch(config.customCSS);
    customCSS = await response.text();
}

loadConfig().then(loadCSV).then(loadCustomCSS).then(computeData);

let rowsNumber = 0;

function computeData() {
    data = document.querySelector('#data');
    document.querySelector('header h1').innerHTML = config.projectName;
    
    const lines = csv.split('\n');
    lines.forEach(line => {
        const cells = line.split(',');
        const item = cells[0];
        const events = [];
        for (i=1; i<cells.length; i++) {
            const attributes = cells[i].split('|');
            const date = attributes[0];
            const type = attributes[1];
            events.push({date, type})
        }
        createRow(item, events);
    })

    document.querySelector('body').innerHTML += `<!-- Custom CSS --> <style>${customCSS}</style>`;
}

function createRow(item, events) {
    let currentRowNumber = ++rowsNumber;
    data.innerHTML += `<div class="row" id="row-${currentRowNumber}"><div class="name">${item}</div><div class="events"></div></div>`;
    let eventsDiv = document.querySelector(`.row#row-${currentRowNumber} .events`)
    events.forEach(event => {
        eventsDiv.innerHTML += 
            `<div class="event type-${event.type}">
                <div class="type">${config.eventTypeMapping[event.type]}</div>
                <div class="date">${event.date}</div>
            </div>`
    });
}