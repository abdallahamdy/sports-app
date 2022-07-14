var teamFormEl = document.querySelector(".button-submit");
// changed classname to .input-text to reference our HTML's input tag 
var nameInputEl = document.querySelector(".input-text");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var pageContentEl = document.querySelector(".page-content");

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

    Promise.all([
        fetch('https://v3.football.api-sports.io/fixtures?team=' + teamID + '&season=2021', {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "ef30dd863bb3a4a2e54972837f65102c"
            }
        }),
        fetch('https://v3.football.api-sports.io/fixtures?team=' + teamID + '&season=2022',{
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "ef30dd863bb3a4a2e54972837f65102c"
            }
        })
    ]).then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    }).then(function (data) {
        // Log the data to the console
        // You would do something with both sets of data here
        console.log(data);
        populateFixturesPage(data);
        
    }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
    });
    
}

var populateFixturesPage = function(fixturesData){
    console.log("++++++++++++++");
    console.log(fixturesData[0].response);

    var prevFixturesArr = fixturesData[0].response;
    var nextFixturesArr = fixturesData[1].response;

    var prevFixturesList = [];
    var nextFixturesList = [];

    for(var i = 0; i < 5; i++){
        var prevMatchObj = {
            homeTeam : prevFixturesArr[i].teams.home.name,
            homeLogo : prevFixturesArr[i].teams.home.logo,
            awayTeam : prevFixturesArr[i].teams.away.name,
            awayLogo : prevFixturesArr[i].teams.away.logo,
            matchDate : prevFixturesArr[i].fixture.date,
            matchVenue : prevFixturesArr[i].fixture.venue.name,
            matchCity : prevFixturesArr[i].fixture.venue.city,
            awayScore : prevFixturesArr[i].score.fulltime.away,
            homeScore : prevFixturesArr[i].score.fulltime.home,
        }
        var nextMatchObj = {
            homeTeam : nextFixturesArr[i].teams.home.name,
            homeLogo : nextFixturesArr[i].teams.home.logo,
            awayTeam : nextFixturesArr[i].teams.away.name,
            awayLogo : nextFixturesArr[i].teams.away.logo,
            matchDate : nextFixturesArr[i].fixture.date,
            matchVenue : nextFixturesArr[i].fixture.venue.name,
            matchCity : nextFixturesArr[i].fixture.venue.city
        }
        prevFixturesList.push(prevMatchObj);
        nextFixturesList.push(nextMatchObj);
    }
    displayMatches(prevFixturesList, nextFixturesList);
}

var displayMatches = function (prevMatchObjects, nextMatchObjects) {
    console.log("++++++++++++++++++++++-----++++++");
    console.log(prevMatchObjects);
    console.log("++++++++++++++++++++++-----++++++");
    console.log(nextMatchObjects);


    var existingPrevDiv = document.querySelector(".prev-fixtures-div");
    var existingNextDiv = document.querySelector(".next-fixtures-div");

    if(existingNextDiv || existingPrevDiv){
        existingPrevDiv.remove();
        existingNextDiv.remove();   
    }

    var prevFixturesDiv = document.createElement("div");
    prevFixturesDiv.className = "row prev-fixtures-div";

    var nextFixturesDiv = document.createElement("div");
    nextFixturesDiv.className = "row next-fixtures-div";

    var prevFixturesUl = document.createElement("ul");
    prevFixturesUl.className = "prev-ul";

    var nextFixturesUl = document.createElement("ul");
    nextFixturesUl.className = "next-ul";

    var prevH1El = document.createElement("h1");
    prevH1El.textContent = "Previous 5 games";
    var nextH1El = document.createElement("h1");
    nextH1El.textContent = "Next 5 games";

    prevFixturesUl.appendChild(prevH1El);
    nextFixturesUl.appendChild(nextH1El);
    
    for(var i = 0; i < 5; i++){

        var prevListEl = document.createElement("li");
        prevListEl.className = "prev-li";

        var nextListEl = document.createElement("li");
        nextListEl.className = "next-li";



        // Previous fixtures display in HTML

        var prevHomeLogo = document.createElement("img");
        prevHomeLogo.className = "prev-home-logo";
        prevHomeLogo.src = prevMatchObjects[i].homeLogo;
        var prevAwayLogo = document.createElement("img");
        prevAwayLogo.className = "prev-away-logo";
        prevAwayLogo.src = prevMatchObjects[i].awayLogo;

        var spanElPrev = document.createElement("span");
        spanElPrev.className = "text-p-el";

        var scoreElPrev = document.createElement("p");
        var scoreTextPrev = prevMatchObjects[i].homeScore + " - " + prevMatchObjects[i].awayScore;
        scoreElPrev.textContent = scoreTextPrev;


        var dateElPrev = document.createElement("p");
        var dateTextPrev = prevMatchObjects[i].matchDate;
        dateElPrev.textContent = dateTextPrev.slice(0 , 10);

        var cityElPrev = document.createElement("p");
        var cityTextPrev = prevMatchObjects[i].matchCity;
        cityElPrev.textContent = cityTextPrev;

        var stadiumElPrev = document.createElement("p");
        var stadiumTextPrev = prevMatchObjects[i].matchVenue;
        stadiumElPrev.textContent = stadiumTextPrev;

        spanElPrev.appendChild(scoreElPrev);
        spanElPrev.appendChild(dateElPrev);
        spanElPrev.appendChild(cityElPrev);
        spanElPrev.appendChild(stadiumElPrev);

        prevListEl.appendChild(prevHomeLogo);
        prevListEl.appendChild(spanElPrev);
        prevListEl.appendChild(prevAwayLogo);

        // Next fixtures display in HTML

        var nextHomeLogo = document.createElement("img");
        nextHomeLogo.className = "next-home-logo";
        nextHomeLogo.src = nextMatchObjects[i].homeLogo;
        var nextAwayLogo = document.createElement("img");
        nextAwayLogo.className = "next-home-logo";
        nextAwayLogo.src = nextMatchObjects[i].awayLogo;

        var spanElNext = document.createElement("span");
        spanElNext.className = "text-p-el";

        var scoreElNext = document.createElement("p");
        var scoreTextNext = "TBD";
        scoreElNext.textContent = scoreTextNext;


        var dateElNext = document.createElement("p");
        var dateTextNext = nextMatchObjects[i].matchDate;
        dateElNext.textContent = dateTextNext.slice(0 , 10);

        var cityElNext = document.createElement("p");
        var cityTextNext = nextMatchObjects[i].matchCity;
        cityElNext.textContent = cityTextNext;

        var stadiumElNext = document.createElement("p");
        var stadiumTextNext = nextMatchObjects[i].matchVenue;
        stadiumElNext.textContent = stadiumTextNext;


        spanElNext.appendChild(scoreElNext);
        spanElNext.appendChild(dateElNext);
        spanElNext.appendChild(cityElNext);
        spanElNext.appendChild(stadiumElNext);


        nextListEl.appendChild(nextHomeLogo);
        nextListEl.appendChild(spanElNext);
        nextListEl.appendChild(nextAwayLogo);
        
        prevFixturesUl.appendChild(prevListEl);
        nextFixturesUl.appendChild(nextListEl);



    }

    prevFixturesDiv.appendChild(prevFixturesUl);
    nextFixturesDiv.appendChild(nextFixturesUl);

    pageContentEl.appendChild(prevFixturesDiv);
    pageContentEl.appendChild(nextFixturesDiv);
}

//changed teamFormEl query selector to our button on HTML 
teamFormEl.addEventListener("click", formSubmitHandler);