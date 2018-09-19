/*
let sourceCode = '';
let countryCode = '';
let categoryCode = '';
let languageCode = '';
let tagCode = document.getElementById('inputTag').value;
*/
var callback = function () {
  

  var countryKey = '';
  var ltd = '';
  var lng = '';
  var urlWeather = '';
  var weatherResponse = '';
  var suggestedNews = document.getElementById('suggestedNews');


  var browseWeather = function (object, weatherLocation) {
    let dayIcon = object.DailyForecasts[0].Day.Icon;
    let min = object.DailyForecasts[0].Temperature.Minimum.Value;
    let max = object.DailyForecasts[0].Temperature.Maximum.Value;
    let weather = document.getElementById('weather');

    min = Math.ceil((min - 32) * 5 / 9);
    max = Math.ceil((max - 32) * 5 / 9);

    switch (dayIcon) {
      case 1:
        weather.classList.add('wi-day-sunny');

        break;
      case 2:
        weather.classList.add('wi-day-sunny-overcast');

      case 3:
        weather.classList.add('wi-day-cloudy-high');

        break;
      case 4:
        weather.classList.add('wi-day-cloudy');

        break;
      case 5:
        weather.classList.add('wi-day-haze');

        break;
      case 6:
        weather.classList.add('wi-day-cloud');

        break;
      case 7:
        weather.classList.add('wi-cloudy');

        break;
      case 8:
        weather.classList.add('wi-cloudy');

        break;
      case 11:
        weather.classList.add('wi-fog');

        break;
      case 12:
        weather.classList.add('wi-day-showers');

        break;
      case 13:
        weather.classList.add('wi-day-showers');

        break;
      case 14:
        weather.classList.add('wi-day-showers');

        break;
      case 15:
        weather.classList.add('wi-day-storm-showers');

        break;
      case 16:
        weather.classList.add('wi-day-storm-showers');

        break;
      case 17:
        weather.classList.add('wi-day-storm-showers');

        break;
      case 18:
        weather.classList.add('wi-day-rain-mix');

        break;
      case 19:
        weather.classList.add('wi-day-cloudy-windy');

        break;
      case 20:
        weather.classList.add('wi-day-cloudy-windy');

        break;
      case 21:
        weather.classList.add('wi-day-cloudy-windy');

        break;
      case 22:
        weather.classList.add('wi-day-snow');

        break;
      case 23:
        weather.classList.add('wi-day-snow');

        break;
      case 24:
        weather.classList.add('wi-snowflake-cold');

        break;
      case 25:
        weather.classList.add('wi-day-sleet');

        break;
      case 26:
        weather.classList.add('wi-day-hail');

        break;
      case 29:
        weather.classList.add('wi-day-snow-thunderstorm');

        break;
    }

    document.getElementById('weatherLocation').innerHTML = weatherLocation;
    document.getElementById('min').innerHTML = min + 'ºC' + ' ';
    document.getElementById('max').innerHTML = ' ' + max + 'ºC';

  };

  var getWeather = function (ltd, lng, urlWeather) {
    let reqWeather = new Request(urlWeather);
    let locationKey = '';
    let weatherLocation = '';
    fetch(reqWeather)
      .then(function (response) {
        return response.json();
      }).then(function (object) {
        locationKey = object.Key;
        countryKey = object.Country.EnglishName;
        weatherLocation = object.LocalizedName + ' , ' + countryKey;
        let urlWeather2 = 'https://dataservice.accuweather.com/forecasts/v1/daily/1day/' + locationKey + '?apikey=IxakMj3SWJfAzvA9dAg428hfd18gwwVq';
        let reqWeather2 = new Request(urlWeather2);
        fetch(reqWeather2)
          .then(function (response) {
            return response.json();
          }).then(function (object) {
            weatherResponse = object;
            browseWeather(weatherResponse, weatherLocation);
          }).catch(function (fail) {
            console.log('we can`t process this request right now: ' + fail);
          });
      }).catch(function (fail) {
        console.log('errorLocation' ) + fail;
      });
  }

  var getLocation = function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(savePosition);
    } else {
    }
  }
  var savePosition = function (position) {
    ltd = position.coords.latitude;
    lng = position.coords.longitude;
    urlWeather = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=IxakMj3SWJfAzvA9dAg428hfd18gwwVq'
      + '&q=' + ltd + ',' + lng;
    getWeather(ltd, lng, urlWeather);
  }

  getLocation();
  //raden är kommenterat pga begränsat antal anrop till API:t



  getAllNews();
  let tagCode = ""
  // Function that retrieves news corresponding to the user's criteria:

  var getSomeNews = function (queryString, category, country, language, source) {

    let url = urlBase + question;

    searchArray.push(tagCode);

    searchArray.push(categoryCode);

    searchArray.push(countryCode);

    searchArray.push(languageCode);

    searchArray.push(sourceCode);

    completeSearchArray.push(queryString);
    completeSearchArray.push(category);
    completeSearchArray.push(country);
    completeSearchArray.push(language);
    completeSearchArray.push(source);

    for (i = 0; i < completeSearchArray.length; i++) {
      let count = 0;
      if (searchArray[i] != '' && searchArray[i] != null) {
        if (count != 0) {
          completeSearchArray[i] += searchArray[i];
          completeSearchArray[i] = '&' + completeSearchArray[i] + '&';
          url += completeSearchArray[i];
        } else {
          completeSearchArray[i] += searchArray[i];
          completeSearchArray[i] += '&';
          url += completeSearchArray[i];
          count++;
        }
      }
      count = 0;
    }
    completeSearchArray = [];
    searchArray = [];
    url += key;
    if (url !== 'https://newsapi.org/v2/top-headlines?apiKey=ca2d5b8c76a84ec68544ecdeadf04043') {

      let req = new Request(url);
      fetch(req)
        .then(function (response) {


          return response.json();

        }).then(function (object) {


          let articles = object.articles;

          showAWhile.style.height = "30px"
          showAWhile.style.paddingTop = "20px"
          showAWhile.style.backgroundColor = "#C65F63"

          let arr = [];
            console.log("getSomeNews")
          arr.push(currentTag.inputTag.innerHTML)
          arr.push(currentTag.sourceTag.innerHTML);
          arr.push(currentTag.countryTag.innerHTML);
          arr.push(currentTag.categoryTag.innerHTML);
          arr.push(currentTag.languageTag.innerHTML)


          let string = ""
          for(let i= 0; i< arr.length; i++){

            if(i===0){

              if(arr[i] !== " " || arr[i] === "#" ){
                string +=  arr[i]
              }

            }
            if(i === 1){
              if(arr[i] !== null && arr[i] !== " " ){
                string += " "  + arr[i]
              }
            }
            if(i === 2){
              if(arr[i] !== null && arr[i] !== " " ){
                string += " "  +arr[i]
              }
            }

            if(i === 3){
              if(arr[i] !== null && arr[i] !== " " ){
                string += " " +arr[i]
              }
            }

            if(i === 4){
              if(arr[i] !== null && arr[i] !== " " ){
                string += " " +arr[i]
              }
            }


          }

          console.log(string)
          if(string !== ""){

                      showAWhile.style.height = "30px"
                      showAWhile.style.paddingTop = "20px"
                      showAWhile.style.backgroundColor = "#65C253"

                      showAWhile.innerHTML = "<h3>You searched for "+ string +"</h3>"
                      function displayNone() {

                        showAWhile.style.height = "0px"
                        showAWhile.style.paddingTop = "0px"
                        showAWhile.innerHTML = ""
                      }
                      setTimeout(displayNone, 2000);
          }


          string = ""

          let myArticles = [];
          let amount = 12;

          for (article in articles) {

            if (amount > 0) {

              myArticles.push(articles[article]);

            } else {
              break;
            }
            amount--;
          }
          while (main.hasChildNodes()) {
            main.removeChild(main.lastChild);
          }
          amount = myArticles.length;
          browseNews(myArticles, amount);
        })
        .catch(function () {

          showAWhile.style.height = "30px"
          showAWhile.style.paddingTop = "20px"
          showAWhile.style.backgroundColor = "#C65F63"
          showAWhile.innerHTML = "<h3>Nothing matched your search!</h3>"
          function displayNone() {
            showAWhile.style.height = "0px"
            showAWhile.style.paddingTop = "0px"
            showAWhile.innerHTML = ""


          }
          setTimeout(displayNone, 2000);
          clear()
        });
    } else {
      getAllNews();
    }
    url = '';
  }

  var getSomeNewsFromOwnTags = function (queryString, category, country, language, source) {

    let tagCode = document.getElementById('ownInputTag');
    if (tagCode.innerHTML != null){
      tagCode = tagCode.innerHTML.slice(1);
    }
    let url = urlBase + question;

    searchArray.push(tagCode);

    searchArray.push(categoryCode);

    searchArray.push(countryCode);

    searchArray.push(languageCode);

    searchArray.push(sourceCode);

    completeSearchArray.push(queryString);
    completeSearchArray.push(category);
    completeSearchArray.push(country);
    completeSearchArray.push(language);
    completeSearchArray.push(source);

    for (i = 0; i < completeSearchArray.length; i++) {
      let count = 0;
      if (searchArray[i] != '' && searchArray[i] != null) {
        if (count != 0) {
          completeSearchArray[i] += searchArray[i];
          completeSearchArray[i] = '&' + completeSearchArray[i] + '&';
          url += completeSearchArray[i];
        } else {
          completeSearchArray[i] += searchArray[i];
          completeSearchArray[i] += '&';
          url += completeSearchArray[i];
          count++;
        }
      }
      count = 0;
    }
    completeSearchArray = [];
    searchArray = [];
    url += key;
    if (url !== 'https://newsapi.org/v2/top-headlines?apiKey=ca2d5b8c76a84ec68544ecdeadf04043') {

      let req = new Request(url);

      fetch(req)
        .then(function (response) {

          return response.json();

        }).then(function (object) {

          let articles = object.articles;

                    showAWhile.style.height = "30px"
                    showAWhile.style.paddingTop = "20px"
                    showAWhile.style.backgroundColor = "#C65F63"

                    let arr = [];
                    console.log("getSomeNewsFromown")




                    for(let i=0; i< ownCurrentTag.ownCurrentTag.children.length; i++){

                      console.log(ownCurrentTag.ownCurrentTag.children[i].innerHTML)
                      arr.push(ownCurrentTag.ownCurrentTag.children[i].innerHTML)

                    }



                    let string = ""
                    for(let i= 0; i< arr.length; i++){

                      if(i===0){

                        if(arr[i] !== "" ){
                          string +=  arr[i]
                        }

                      }
                      if(i === 1){
                        if(arr[i] !== null && arr[i] !== " " ){
                          string += " "  + arr[i]
                        }
                      }
                      if(i === 2){
                        if(arr[i] !== null && arr[i] !== " " ){
                          string += " "  +arr[i]
                        }
                      }

                      if(i === 3){
                        if(arr[i] !== null && arr[i] !== " " ){
                          string += " " +arr[i]
                        }
                      }

                      if(i === 4){
                        if(arr[i] !== null && arr[i] !== " " ){
                          string += " " +arr[i]
                        }
                      }


                    }

                    console.log(string)

                    showAWhile.style.height = "30px"
                    showAWhile.style.paddingTop = "20px"
                    showAWhile.style.backgroundColor = "#65C253"
                    showAWhile.innerHTML = "<h3>You searched for "+ string +"</h3>"
                    function displayNone() {

                      showAWhile.style.height = "0px"
                      showAWhile.style.paddingTop = "0px"
                      showAWhile.innerHTML = ""
                    }
                    setTimeout(displayNone, 2000);





          let myArticles = [];
          let amount = 12;

          for (article in articles) {

            if (amount > 0) {

              myArticles.push(articles[article]);

            } else {
              break;
            }
            amount--;
          }
          while (main.hasChildNodes()) {
            main.removeChild(main.lastChild);
          }
          amount = myArticles.length;
          browseNews(myArticles, amount);
        })
        .catch(function () {

          showAWhile.style.height = "30px"
          showAWhile.style.paddingTop = "20px"
          showAWhile.style.backgroundColor = "#C65F63"
          showAWhile.innerHTML = "<h3>Nothing matched your search!</h3>"
          function displayNone() {

            showAWhile.style.height = "0px"
            showAWhile.style.paddingTop = "0px"
            showAWhile.innerHTML = ""
          }
          setTimeout(displayNone, 2000);
          clear()
        });
    } else {
      getAllNews();
    }
    url = '';
  }

  var getSuggestedNews = function () {

    let savedTags = document.getElementsByTagName('span');
    var regexp = /^[0-9]+([,.][0-9]+)?$/;

    let suggestedArticles = [];
    let searchWords = [];
    let url = urlBase + question;
    let myRegExp = /(inputTag">)#.+\</;
    let myReg = [];

    for (i=0; i<savedTags.length; i++){
      if (regexp.test(savedTags[i].id) && savedTags[i].innerHTML != '' && savedTags[i].innerHTML != ' '){
        searchWords.push(savedTags[i].innerHTML.slice(1));
      }
    }

      for (let x in searchWords) {
        url += 'q=' + searchWords[x];
        url += '&' + key;
        let req = new Request(url);
        fetch(req)
          .then(function (response) {
            return response.json();

          }).then(function (object) {
            let articles = object.articles;

            for (article in articles) {

              if (articles[article] != null && articles[article] != 'undefined') {
                suggestedArticles.push(articles[article]);
              } else {
                continue;
              }
            }
          })
          .then(function () {
            while (main.hasChildNodes()) {
              main.removeChild(main.lastChild);
            }
            amount = suggestedArticles.length;
            browseNews(suggestedArticles, amount);
          })
          .catch(function (error) {
            console.log('Something went wrong' ) + error;
          });
        url = urlBase + question;
      }
  }


  // När man är klar med att välja taggar, rubriker, land och språk, sker följande funktionen:
  // when click on search Button:

  searchBtn.addEventListener('click', function () {
  
    slider.inputKeyword.value = ""
    var childDivs = document.getElementById('ownCurrentTag').getElementsByTagName('span');
    let boo = false;
    let noNews = true;
    for (i = 0; i < childDivs.length; i++) {
      let childDiv = childDivs[i];

      if (childDiv.innerHTML != '') {
        boo = true;
        noNews = false;
        break
      }
    }


    var childDivsRegular = document.getElementById('currentTag').getElementsByTagName('span');


    for (i = 0; i < childDivsRegular.length; i++) {

      let childDivRegular = childDivsRegular[i];
      if(childDivRegular.id === "inputTag"){
        tagCode = childDivRegular.innerHTML.slice(1)
      }
      if (childDivRegular.innerHTML != '') {
        boo = false;
        noNews = false;
        break
      }
    }

    if (boo == true) {
      getSomeNewsFromOwnTags(queryString, category, country, language, source);
    } else if (boo == false){
      getSomeNews(queryString, category, country, language, source);
    } else if (noNews == true){
      getAllNews();
    }
  });




  // Regular expression for suggested articles from database ^#.+\<
  // (inputTag) ^(inputTag">#).+\<
  suggestedNews.addEventListener('click', getSuggestedNews);

}

window.addEventListener('load', callback);
