window.addEventListener("load", getApi)

    function getApi() {

       let datum = new Date();
       let date = datum.getDate();
       let month = datum.getMonth() + 1;
       let link = "https://cors-anywhere.herokuapp.com/http://history.muffinlabs.com/date";
       let footer = document.getElementById("footer");
       let divHistory = document.getElementById("divHistory");
       let eventYear = document.getElementById("eventYear");
       let eventText = document.getElementById("eventText");


           fetch(link)
           .then(function(response) {
                return response.json();
            })
           .then(function(obj) {
              let date = JSON.stringify(obj.date);
               divHistory.innerHTML = "Today in History: " + date;

              let randomEvent = obj.data.Events;

              let random = Math.floor(Math.random()*randomEvent.length);

              let event1Year = JSON.stringify(obj.data.Events[random].year);

              let event1Text = JSON.stringify(obj.data.Events[random].text);

               eventYear.innerHTML = "Year: " + event1Year;
               eventText.innerHTML = event1Text;

           });

    };

    window.addEventListener("scroll",function() {
        let footer = document.getElementById('footer');

        if(window.scrollY > 500) {
            footer.style.transition = 'opacity 1s';
            footer.style.opacity = '1';
    }   else {
            footer.style.transition = 'opacity 1s';
            footer.style.opacity = '0';
    }
 },false);
