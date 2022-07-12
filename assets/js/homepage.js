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
            populateFixturesPage(data);
        });
    })
    .catch(err => {
        console.log(err);
    });
}

var populateFixturesPage = function(fixturesData){
    var fixtureDataArray = fixturesData.response;
    var fixturesList = [];
    console.log(fixtureDataArray);
    for(var i = 0; i < 5; i++){
        var matchObj = {
            homeTeam : fixtureDataArray[i].teams.home.name,
            homeLogo : fixtureDataArray[i].teams.home.logo,
            awayTeam : fixtureDataArray[i].teams.away.name,
            awayLogo : fixtureDataArray[i].teams.home.logo,
            matchDate : fixtureDataArray[i].fixture.date,
            matchVenue : fixtureDataArray[i].fixture.venue.name,
            matchCity : fixtureDataArray[i].fixture.venue.city
        }
        fixturesList.push(matchObj);
    }
    displayMatches(fixturesList);
}

var displayMatches = function (matchObjArray) {
    for(var i = 0; i < matchObjArray.length; i++){
        console.log("MATCH IS:");
        console.log(matchObjArray[i].homeTeam + " VS " + matchObjArray[i].awayTeam)
        console.log("HAPPENING AT: " + matchObjArray[i].matchDate);

        var containerEl = $("<ul>");

        var matchCard = $("<li>").addClass("match-card");

        var date = $("<p>");

        var taskSpan = $("<span>")
          .addClass("badge badge-primary badge-pill")
          .text(taskDate);

    }
}

teamFormEl.addEventListener("submit", formSubmitHandler);