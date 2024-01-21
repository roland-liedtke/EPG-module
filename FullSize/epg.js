async function getData() {
    
    // łączy gałąź z HTML
    const target = document.getElementById("target");
    const plugin = document.getElementById("plugin");
    
    // ukrywa box na innych stronach
    if (target !== null) {
        plugin.style.display = "block";
    }
    
    // zamienia destination na plugin
    target.replaceWith(plugin);
    
    // pobiera dane przez API i czeka az cały się załaduje
    const response = await fetch( --> API URL <-- );

    // parsuje dane do JSON i czeka az się wykona
    const epg = await response.json();

    // łączy gałąź z HTML
    const thead = document.getElementById("thead");
    const tbody = document.getElementById("tbody");

    // tworzy daty 
    const today = new Date();
    const tommorow = new Date(today);
    tommorow.setDate(today.getDate() + 1);

    // funkcja dopisuje "0", 6:00 => 06:00
    function addZero(x) {
        if (x < 10) { x = "0" + x }
        return x;
    }

    // dodaje divy w nałówku tabeli
    thead.innerHTML += `<a class="box" id="todayBox">Dziś ${addZero(today.getDate())}/${addZero(today.getMonth() + 1)}</a>`;
    thead.innerHTML += `<a class="box" id="tommorowBox">Jutro ${addZero(tommorow.getDate())}/${addZero(tommorow.getMonth() + 1)}</a>`;

    // wyświetla domyślnie dane z Dzisiaj 
    showToday();
    
    // nasłuchuje na kliknięcie i wykonuje odpowiednią funkcję
    document.getElementById("todayBox").addEventListener("click", showToday);
    document.getElementById("tommorowBox").addEventListener("click", showTommorow);


    function showToday() {

        // czyści listę
        tbody.innerHTML = "";

        // zmienia style aktywnego filtra w nagłówku
        tommorowBox.style.backgroundColor = "transparent";
        const todayBox = document.getElementById("todayBox");
        todayBox.style.backgroundColor = "rgb(239, 34, 44)";

        // iteruje po wszystkich elementach schedule
        epg.schedule.forEach(element => {

            let startTime = new Date(element.startTime);
            let endTime = new Date(element.endTime);
            let now = new Date();

            if (startTime.getDate() == today.getDate()) {
                tbody.innerHTML += `<tr>
                    <td>
                        ${addZero(startTime.getHours())}:${addZero(startTime.getMinutes())} <br>
                        ${(startTime <= now && now <= endTime) ? `<span class="live">Teraz</span>` : ""}
                    </td>
                    <td>
                        ${element.title}<br><span>${element.episodeTitle['AB'] == undefined ? "" : element.episodeTitle['AB']}</span>
                    </td>
                </tr>`
            }
        });
    }

    function showTommorow() {

        // czyści listę
        tbody.innerHTML = "";

        // zmienia style aktywnego filtra w nagłówku
        const tomorrowBox = document.getElementById("tommorowBox");
        todayBox.style.backgroundColor = "transparent";
        tomorrowBox.style.backgroundColor = "rgb(239, 34, 44)";
        
        // iteruje po wszystkich elementach schedule
        epg.schedule.forEach(element => {

            let time = new Date(element.startTime);

            // funkcja dopisuje "0", 6:00 => 06:00
            function addZero(i) {
                if (i < 10) { i = "0" + i }
                return i;
            }

            if (time.getDate() == tommorow.getDate()) {
                tbody.innerHTML += `<tr>
                <td>
                    ${addZero(time.getHours())}:${addZero(time.getMinutes())}
                </td>
                <td>
                    ${element.title}<br><span>${element.episodeTitle['AB'] == undefined ? "" : element.episodeTitle['AB']}</span>
                </td>
            </tr>`
            }
        });
    }
}

getData();
