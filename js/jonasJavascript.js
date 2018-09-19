// object constructor for Newsarticles
var outputSaved = [];
  class News {
    constructor(saveTitle, saveDescription, saveUrl, saveUrlImage){
        this.saveTitle = saveTitle;
        this.saveDescription = saveDescription;
        this.saveUrl = saveUrl;
        this.saveUrlImage = saveUrlImage;
    }
  }
  // to get a userid from firebase when logged in
  var storedUser = localStorage.getItem("userid");
  if (localStorage.getItem("userid") !== null){
      firebase.database().ref("users/" + storedUser + "/favourites").on('value', snapshot => {
        let updateCounter = snapshot.val();
        var updateCounterOutput = [];
        for( let article in updateCounter ) {
        let r = updateCounter[article];
          updateCounterOutput.push(r);
    }
        document.getElementById('addNumberCount').textContent = updateCounterOutput.length;
       });
    } else{
    }

  // click event for newsarticle
  let saveArticle = document.querySelector('#newsContainer');
  saveArticle.addEventListener('click', function(event){
        // save article to database
        // checks if userID is not null
    if (localStorage.getItem("userid") !== null){
    // this is so the click event only occurs if its on that specific class
        if(event.target.parentElement.classList.contains('saveToFavourite')){
           // get data from the articles shown on screen
          var saveTitle = event.target.parentElement.parentElement.parentElement.children[1].textContent;
          let saveDescription = event.target.parentElement.parentElement.parentElement.children[2].textContent;
          let saveUrl = event.target.parentElement.parentElement.parentElement.children[3].firstChild.getAttribute('href');
          let saveUrlImage = event.target.parentElement.parentElement.parentElement.previousSibling.firstChild.getAttribute('src');
          let changeIconOnAdd = event.target.previousSibling;
          let changeTextOnAdd = event.target;
          // create object from the data
          const newsObject = new News(saveTitle, saveDescription, saveUrl, saveUrlImage);
            // check if variable saveTitle is equal to child "saveTitle" in firebase
          firebase.database().ref("Articles").orderByChild("saveUrl").equalTo(saveUrl).once("value", snapshot => {
           const userData = snapshot.val();
                // if article already exists it should not reupload
             if (userData){
               firebase.database().ref("users/" + storedUser + "/favourites").orderByValue().equalTo(saveUrl).once("value", snapshot => {
                const userFavourites = snapshot.val();
                      // if article already exists it should not reupload
                      if (userFavourites){
                      } else {
                        firebase.database().ref("users/" + storedUser + "/favourites").push(saveUrl);

                        changeIconOnAdd.style.color = '#C65F63';
                        changeTextOnAdd.textContent = 'Saved';

                      }

              });
                } else {
                  // add article to database and to userprofile
                  firebase.database().ref('Articles').push(newsObject);

                  firebase.database().ref("users/" + storedUser + "/favourites").push(saveUrl);
                  changeIconOnAdd.style.color = '#C65F63';
                        changeTextOnAdd.textContent = 'Saved';

                }
            });
          }

    } else {
    }



  event.preventDefault();
});

let showFavourites = document.getElementById('showFavouriteOutput');
var allArticles = [];
var favArray = [];
firebase.database().ref("Articles").on("value", snapshot => {
  allArticles = [];
  const fetchUserData = snapshot.val();
  for( let newArticle in fetchUserData){
    let newList = fetchUserData[newArticle];
    allArticles.push(newList);
  }

})

showFavourites.addEventListener('click', event => {
  // get articles from firebase
  if(localStorage.getItem("userid") !== null){
  firebase.database().ref("users/" + storedUser + "/favourites").once('value', snapshot => {
    let data = snapshot.val();
    favArray = [];
    // this data should check if exists as articles title in db and get the whole object.
    var main = document.getElementsByTagName('main')[0];
    main.innerHTML = "";
    for ( let article in data ) {
        let r = data[article];
        favArray.push(r);
    }
  })
  var myArrayFiltered = allArticles.filter(function (el) {
      return favArray.some(function (f) {
        return f === el.saveUrl;
        });
      });

    if(favArray.length === 0){
      main.innerHTML = 'No Favourites Saved';
    } else {

      outputSaved = [];
      for( let news in myArrayFiltered ) {
        let k = myArrayFiltered[news];

      var obj = {};

      obj["title"] = k.saveTitle;
      obj["description"] = k.saveDescription;
      obj["urlToImage"] = k.saveUrlImage;
      obj["url"] = k.saveUrl;

      outputSaved.push(obj);
    }
    var myArrayFilteredOutput = outputSaved.filter(function (el) {
         return favArray.some(function (f) {
             return f === el.url;
         });
     });

    let amount = myArrayFilteredOutput.length;
    browseNews(myArrayFilteredOutput, amount);
    let saveText = document.getElementsByClassName('showFavouriteText');
    let changeIcon = document.getElementsByClassName('fas fa-star');

    let changeClassToRemove = document.getElementsByClassName('saveToFavourite');
    //changeClassToRemove.classList = "newsFooter remove";
    for (var i = changeIcon.length -1 ; i >= 0; --i) {

      changeIcon[i].className = changeIcon[i].className.replace('fas fa-star', 'fas fa-times-circle');

      changeClassToRemove[i].className = changeClassToRemove[i].className.replace('newsFooter saveToFavourite', 'newsFooter remove');
      saveText[i].textContent = 'Remove';

    }

    }
  }
});
  let changeSavedArticlesText = document.getElementsByClassName('showFavouriteText');

  let removeArticle = document.querySelector('#newsContainer');

  removeArticle.addEventListener('click', function(event){
    if (localStorage.getItem("userid") !== null){
      // this is so the click event only occurs if its on that specific class
      if(event.target.parentElement.classList.contains('remove')){
        // get data from the articles shown on screen
        let removeUrl = event.target.parentElement.parentElement.parentElement.children[3].firstChild.getAttribute('href');
        //find it in users profile on firebase
        firebase.database().ref("users/" + storedUser + "/favourites").orderByValue().equalTo(removeUrl).once("value", snapshot => {
          const key = Object.keys(snapshot.val())[0];
          firebase.database().ref("users/" + storedUser + "/favourites").ref.child(key).remove();

        })
        event.target.parentElement.parentElement.parentElement.parentElement.remove();
      }
    }

  })
