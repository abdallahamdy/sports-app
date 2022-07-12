var userFormEl = document.querySelector("#team-form");
var nameInputEl = document.querySelector("#team-name");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var fetchTeam = function() {
    fetch("https://v3.football.api-sports.io/teams?name=real madrid", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "ef30dd863bb3a4a2e54972837f65102c"
        }
    })
    .then(response => {
        console.log(response);
        response.json().then(function(data) {
            console.log(data);
        });
    })
    .catch(err => {
        console.log(err);
    });

    // fetchFixtures();
}

var fetchFixtures = function() {
    console.log("fetchFIXTURES___________________");
    fetch("https://v3.football.api-sports.io/fixtures?team=541&season=2022", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "ef30dd863bb3a4a2e54972837f65102c"
        }
    })
    .then(response => {
        console.log(response);
        response.json().then(function(data) {
            console.log(data);
        });
    })
    .catch(err => {
        console.log(err);
    });
}

// userFormEl.addEventListener("submit", formSubmitHandler);