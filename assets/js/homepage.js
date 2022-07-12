var teamFormEl = document.querySelector(".button-submit");
// changed classname to .input-text to reference our HTML's input tag 
var nameInputEl = document.querySelector(".input-text");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
//declared matchObj globally
var matchObj;
// When user submits team
var formSubmitHandler = function(event) {
    event.preventDefault();
    console.log(event);

    // get value from input element
    var teamName = nameInputEl.value;
    console.log(teamName);
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

var fetchFixtures = function(chosenTeam, season) {
    console.log("Chosen team ID: ", chosenTeam.response[0].team.name);
    var teamID = chosenTeam.response[0].team.id;

    // if(season == future){
    //     season == "2022";
    // }else{
    //     season ==
    // // }
    
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
        //declared matchObj globally so it can be accessed from displayMatches() and other functions 
        matchObj = {
            homeTeam : fixtureDataArray[i].teams.home.name,
            homeLogo : fixtureDataArray[i].teams.home.logo,
            awayTeam : fixtureDataArray[i].teams.away.name,
            awayLogo : fixtureDataArray[i].teams.away.logo,
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

        var awayLogo = matchObj.awayLogo;
        document.getElementById("logo-left-img-pg1").src = awayLogo;
        
        var homeLogo = matchObj.homeLogo;
        document.getElementById("logo-right-img-pg1").src = homeLogo;

        var matchDate = matchObj.matchDate;
        document.getElementById("date-data-pg1").innerHTML = matchDate;

        var stadiumName = matchObj.matchVenue;
        document.getElementById("stadium-location-pg1").innerHTML = "Stadium: " + stadiumName;

        // var containerEl = $("<ul>");

        // var matchCard = $("<li>").addClass("match-card");

        // var date = $("<p>");

        // var taskSpan = $("<span>")
        //   .addClass("badge badge-primary badge-pill")
        //   .text(taskDate);

    }
}

//changed teamFormEl query selector to our button on HTML 
teamFormEl.addEventListener("click", formSubmitHandler);