async function getShort() {

    // łączy gałąź z HTML
    const target = document.getElementById("SHORT");
    const shortSchedule = document.getElementById("shortSchedule");

    // ukrywa box na innych stronach
    if (target !== null) {
        shortSchedule.style.display = "flex";
    }

    // zamienia destination na plugin
    target.replaceWith(shortSchedule);

    // pobiera dane przez API i czeka az cały się załaduje
    const response = await fetch( --> API URL <-- );

    // parsuje dane do JSON i czeka az się wykona
    const epg = await response.json();

    // dodaje pierwszy szary box
    shortSchedule.innerHTML = `<div class="program"><p>Program TV</p></div>`

    // index aktualnego programu 
    let nowPlayingIndex = "";
    let shortList = [];
    

    epg.schedule.forEach(element => {

        const startTime = new Date(element.startTime);
        const endTime = new Date(element.endTime);
        const now = new Date();

        if (startTime <= now && endTime >= now) {
            nowPlayingIndex = epg.schedule.indexOf(element);
            shortList.push(element);
            shortList.push(epg.schedule[nowPlayingIndex + 1])
            shortList.push(epg.schedule[nowPlayingIndex + 2])
        }
    });

    for (let i = 0; i < 3; i++) {

        function addZero(x) {
            if (x < 10) { x = "0" + x }
            return x;
        }

        const title = shortList[i].title;
        const startTime = new Date(shortList[i].startTime);
        const endTime = new Date(shortList[i].endTime);

        shortSchedule.innerHTML += `<div class="item"><div class="time">${addZero(startTime.getHours())}:${addZero(startTime.getMinutes())} - ${addZero(endTime.getHours())}:${addZero(endTime.getMinutes())}</div><span class="title">${title}</span></div>`;
    }

    shortSchedule.innerHTML += `<div><a href="https://telewizjabiznesowa.pl/program-tv/" class="more">Zobacz więcej</a></div>`
}

getShort();
