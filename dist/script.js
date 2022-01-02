var lat = 0;
var lon = 0;
function getImg(id){
  switch(true){
    case id <= 232:
      img = "https://snappygoat.com/o/254068aaca95693c6fbd25fb4ac2dcbefcd7b8b0/lightning-thunder-lightning-storm-1056419.jpg";
      break;
    case id <= 321:
      img = 'http://www.publicdomainpictures.net/pictures/160000/velka/gouttes-de-pluie-1456095881M4S.jpg';
      break;
    case id <= 504:
      img = "http://longwallpapers.com/Desktop-Wallpaper/rain-city-wallpapers-phone-For-Desktop-Wallpaper.jpg";
      break;
    case id == 511:
      img = "http://www.publicdomainpictures.net/pictures/190000/velka/sheet-of-hail.jpg";
      break;
    case id <= 531:
      img = "http://www.publicdomainpictures.net/pictures/10000/velka/1275-1245719193VBNd.jpg";
      break;
    case id == 611 || id == 612:
      img = "http://www.publicdomainpictures.net/pictures/190000/velka/sheet-of-hail.jpg";
      break;
    case id <= 622:
      img = "http://www.publicdomainpictures.net/pictures/20000/velka/trees-in-the-snow-1321633816Vfq.jpg";
      break;
    case id == 701 || id == 721 || id == 741:
      img = "https://upload.wikimedia.org/wikipedia/commons/8/8b/A_mist_rises_from_a_black_spruce_forest.jpg";
      break; 
    case id == 711:
      img = "https://upload.wikimedia.org/wikipedia/commons/b/bc/Smoke_column_-_High_Park_Wildfire.jpg";
      break;
    case id == 731 || id == 751 || id == 761:
      img = "https://static.pexels.com/photos/60703/fog-tree-desert-sky-60703.jpeg";
      break;
    case id == 762:
      img = "https://www.goodfreephotos.com/albums/united-states/alaska/lake-clark-national-park/redoubt-volcano-in-eruption-lake-clark-national-park-alaska.jpg";
      break;
    case id == 781 || id == 900:
      img = "http://cdn.playbuzz.com/cdn/b3526dae-91db-4ea8-9105-1b2774a4eb97/9f7b1bd7-3403-4eba-a8ad-79b92ba49d86.jpg";
      break;
    case id == 800:
      img = 'https://static.pexels.com/photos/281260/pexels-photo-281260.jpeg';
      break;
      case id == 801:
      img = "http://www.publicdomainpictures.net/pictures/180000/velka/sun-clouds-blue-sky-14641020076aM.jpg";
      break;
    case id == 802:
      img = "http://www.publicdomainpictures.net/pictures/130000/velka/luminous-clouds.jpg";
      break;
    case id == 803:
      img = "https://i.pinimg.com/originals/22/91/5f/22915f007d5d80325c9d36c366f5e1a3.jpg";
      break;
    case id == 804:
      img = "http://www.photos-public-domain.com/wp-content/uploads/2012/04/cloudy-overcast-sky.jpg";
      break;
    case id == 901:
      img = "http://www.acclaimimages.com/_gallery/_free_images/0124-1009-1515-0037_hurricane_celia_over_the_pacific_ocean_o.jpg";
      break;
    case id == 902:
      img = "https://upload.wikimedia.org/wikipedia/commons/6/68/Hurricane_Frances_from_the_ISS_-_10AM._EDT_AUG_27_2004.jpg";
      break;
    case id == 903:
      img = "https://www.nsf.gov/news/mmg/media/images/emperors6_h.jpg";
      break;
    case id == 904:
      img = "http://farm9.staticflickr.com/8098/8549712439_480cc5cbfb_b.jpg";
      break;
    case id == 905 || (id > 956 && id < 960):
      img = "http://www.publicdomainpictures.net/pictures/10000/velka/87-12681332789SQ8.jpg";
      break;
    case id == 906:
      img = "http://www.publicdomainpictures.net/pictures/190000/velka/sheet-of-hail.jpg";
      break;
      case id == 951:
      img = "http://summer.bghcdn.ogqcorp.com/media/images/image/Nonex1280/90/10690.jpg";
      break;
    case id > 951 && id < 957:
      img = "https://naturespoisons.files.wordpress.com/2014/07/willow-tree-by-geaugagrrl-released-to-public-domain-cc0.jpg";
      break;
    case id >= 960:
      img = "https://upload.wikimedia.org/wikipedia/commons/6/68/Hurricane_Frances_from_the_ISS_-_10AM._EDT_AUG_27_2004.jpg";
      break;
    default: 
      img = "unkown";
      break;
  };
return img;
};

function titleCase(str){
  var array = str.split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  });
  return array.join(' ');
}
function getLocation(){
  if(navigator.geolocation){                  navigator.geolocation.getCurrentPosition(getWeather);
 navigator.geolocation.getCurrentPosition(getTime);
  }
  else{
    $("#location").text("permission denied");
  }
}
function getWeather(position){
  $("#location").text("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
  lat = position.coords.latitude;
  lon = position.coords.longitude;
    $.getJSON("https://fcc-weather-api.glitch.me/api/current?lon=" + lon + "&lat=" + lat, function(data){
    console.log(data);
    $("#location").text(data.name);
      temp = Math.round(10 * data.main.temp)/10; 
    $("#current-temp").text(temp);
    $("#weather-description").text(titleCase(data.weather[0].description))
    //$("#weather-description").append('<img id="icon" src=' + data.weather[0].icon + '/>');
    $("#wind-speed").text(data.wind.speed);
    $("body").css('background-image', 'url(' + getImg(data.weather[0].id) +')');
  })
  
};

function getTime(position){
  var location = position.coords.latitude + "," + position.coords.longitude;
  console.log(location)
}

$(document).ready(function(){
  var unit = "°C";
  getLocation();
  $("#temp").on("click", function(){
    if (unit == "°C"){
      unit = "°F";
      temp = Math.round(10 * (temp * 9/5 + 32))/10;
      $("#temp-unit").text(unit);
      $("#current-temp").text(temp);
  }
    else{
      unit = "°C";
      temp = Math.round(10*(temp - 32)*5/9)/10;
      $("#temp-unit").text(unit);
      $("#current-temp").text(temp);
    };
  });
})