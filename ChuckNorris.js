getJoke = () => {
    let baseURL = "https://sv443.net/jokeapi/v2";
    let categories = ["Programming", "Miscellaneous", "Pun"];
    let params = [
        "blacklistFlags=nsfw,religious,racist",
        "idRange=0-100"
    ];
    let container = document.getElementById('container');

    let xhr = new XMLHttpRequest();
    xhr.open("GET", baseURL + "/joke/" + categories.join(",") + "?" + params.join("&"));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status < 300) // readyState 4 means request has finished + we only want to parse the joke if the request was successful (status code lower than 300)
        {
            let randomJoke = JSON.parse(xhr.responseText);

            if (randomJoke.type === "single") {
                // If type == "single", the joke only has the "joke" property
                console.log(randomJoke.joke);
                container.innerHTML = randomJoke.joke
            }
            else {
                // If type == "single", the joke only has the "joke" property
                console.log(randomJoke.setup);
                console.log(randomJoke.delivery);
                container.innerHTML = randomJoke.setup;
                container.innerHTML += ("<br>" + randomJoke.delivery)
            }
        }
        else if (xhr.readyState === 4) {
            console.log("Error while requesting joke.\n\nStatus code: " + xhr.status + "\nServer response: " + xhr.responseText);
        }
    };
    xhr.send();
};


