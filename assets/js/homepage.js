var teamFormEl = document.querySelector("#team-form");
var nameInputEl = document.querySelector("#team-name");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


// When user submits team
var formSubmitHandler = function(event) {
    event.preventDefault();
    console.log(event);

    // get value from input element
    var teamName = nameInputEl.value.trim();

    if (teamName) {
        fetchTeam(teamName);
        // nameInputEl.value = "";
    } else {
        alert("Please enter a team name");
    }
};

// fetches team searched to get general data for the team that was searched
var fetchTeam = function(team) {

    fetch("https://v3.football.api-sports.io/teams?name=" + team, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "ef30dd863bb3a4a2e54972837f65102c"
        }
    })
    .then(response => {
        console.log(response);
        response.json().then(function(data) {
            fetchFixtures(data);
        });
    })
    .catch(err => {
        console.log(err);
    });
}

var fetchFixtures = function(chosenTeam) {
    console.log("Chosen team ID: ", chosenTeam.response[0].team.name);
    var teamID = chosenTeam.response[0].team.id;
    
    fetch("https://v3.football.api-sports.io/fixtures?team=" + teamID + "&season=2022", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "ef30dd863bb3a4a2e54972837f65102c"
        }
    })
    .then(response => {
        console.log(response);
        response.json().then(function(data) {
            console.log("Away Team: " + data.response[0].teams.away.name);
            console.log("VS.");
            console.log("Home Team: " + data.response[0].teams.home.name);
        });
    })
    .catch(err => {
        console.log(err);
    });
}

teamFormEl.addEventListener("submit", formSubmitHandler);