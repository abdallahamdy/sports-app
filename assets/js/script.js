var input = document.querySelector('.input-text');
var main = document.querySelector('#name');
var temp = document.querySelector('.weather-data');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button= document.querySelector('.button-submit');


button.addEventListener('click', function(name){
fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=881b71ce57e0bfdb7dfc729ffa72bc98&units=metric')
.then(response => response.json())
.then(data => {
  var tempValue = data['main']['temp'];
  var nameValue = data['name'];
  var descValue = data['weather'][0]['description'];

//   main.innerHTML = nameValue;
//   desc.innerHTML = "Desc - "+descValue;
   temp.innerHTML = "Temp - "+tempValue;
//   input.value ="";



  console.log(data);
})

.catch(err => console.dir(err));
})
