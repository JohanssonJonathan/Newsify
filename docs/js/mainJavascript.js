let signedInNowOrBefore = "before"

let whenLoggedIn = document.getElementById("whenLoggedIn");

let addTagBtn = document.getElementById("addTag");

let deleteOwnTag = document.getElementById("deleteOwnTag");
let allUsers = [];

let loginDiv = document.getElementById("login");
let loginPopup = document.getElementById("loginPopup");


let commentBox;

let tagsContentChangeWidth = ""

let login = document.getElementById("googleLogo");
let loginFb = document.getElementById("facebookLogo");

const db = firebase.database()




let gmailprovider = new firebase.auth.GoogleAuthProvider();

loginPopup.children[0].addEventListener("click", function (event) {
  loginPopup.style.display = "none";
  loginDiv.style.display = "";
})
loginDiv.addEventListener("click", function(event){
  loginPopup.style.display = "";
  loginDiv.style.display = "none";
})

login.addEventListener("click", function (event) {
  //simple click event on the "login" div
  firebase.auth().signInWithPopup(gmailprovider).then(function (result) {
    signedInNowOrBefore = "now";
    location.reload();
  }).catch(function (error) {
    console.log("Error: " + error);
  })
});

var fbProvider = new firebase.auth.FacebookAuthProvider();

loginFb.addEventListener("click", function () {
  //simple click event on the "facebook login" div

  let uid = '';
  let uname = '';
  let upicture = '';
  let uemail = '';
  let accessToken = '';

  FB.getLoginStatus(function (response) {
    if (response.status == 'unknown' || response.status == 'not_authorized') {
      FB.login(function (response) {
        if (response.authResponse) {

          accessToken = response.accessToken;

          signedInNowOrBefore = "now";
          firebase.auth().signInWithPopup(fbProvider).then(function (response) {
            uid = response.user.uid;
            uemail = response.additionalUserInfo.profile.email;
            uname = response.additionalUserInfo.profile.name;
            upicture = response.additionalUserInfo.profile.picture.data.url;
            firebaseInsertUserFacebook(uid, uname, upicture, uemail);
          })
            .catch(function (error) {
              console.log('error authenticating fb in database ' + error);
            });

        } else {
        }
      },
        { scope: 'public_profile,email' })

    } else {
      firebase.auth().signInWithRedirect(fbProvider);
      firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
          uid = response.publicProfile.id;
          uemail = response.additionalUserInfo.profile.email;
          uname = response.additionalUserInfo.profile.name;
          upicture = response.additionalUserInfo.profile.picture.data.url;
          firebaseInsertUserFacebook(uid, uname, upicture, uemail);
        }
      })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          console.log(errorCode);
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  });
});


let loginHeader = function (user) {
  /*// This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.*/
  // creates element in header for the user with username, profile picture
  // and a sign-out button replaces the one already there
  var header = document.getElementsByTagName("header")[0];
  let loggedIn = document.createElement("div");
  let userName = document.createElement("div");
  let userPicture = document.createElement("img");
  let signOut = document.createElement("div");
  userPicture.src = user.photoURL;
  userPicture.alt = "user image";
  userPicture.className = "userPicture"
  userName.innerText = user.displayName;
  userName.className = "userName";
  signOut.innerText = "Log Out";


  signOut.addEventListener("click", function () {
    firebase.auth().signOut().then(function () {
      var header = document.getElementById("header");
      header.removeChild(header.lastChild);
      document.getElementById("moreOp").style.display = "none"
      document.getElementById("buttons").style.display = "none"
      getAllNews();
    })
      .catch(function (error) {
        console.log("error: " + error);
      })
  });
  signOut.className = "signOut";
  loggedIn.className = "loggedIn";
  loggedIn.appendChild(userName);
  loggedIn.appendChild(userPicture);
  loggedIn.appendChild(signOut);
  loginDiv.style.display = "none";
  header.appendChild(loggedIn);
  loginPopup.style.display = "none";
}

let id = "";


let firebaseInsertUserFacebook = function (userID, userName, userPicture, userMail) {
  //adds user to database with username, email, photourl


  db.ref("users").once("value", function (snapshot) {

    let obj = snapshot.val()
    for (let prop in obj) {
      allUsers.push(prop);

    }


    for (let i = 0; i < allUsers.length; i++) {

      if (userID === allUsers[i]) {
        id = allUsers[i];
      }

    }


    if (id === "") {
      var database = firebase.database;
      database().ref("/users/" + userID).set({
        username: userName,
        photoURL: userPicture,
        email: userMail,
        tags: {

        },
      })


    } else {
      let indexet = 0;

      db.ref("users/" + id + "/tags").once("value", function (snapshot) {

        let obj = snapshot.val()

        let tagsSliderContentChange = document.getElementById("tagsSliderContentChange")

        for (let prop in obj) {
          let div = document.createElement("div");
          div.className = "tags";
          div.innerHTML = obj[prop];
          div.style.zIndex = indexet.toString();
          div.style.backgroundColor = "#333644"
          tagsSliderContentChange.appendChild(div)
          indexet++

        }
      })
    }
  })
}



let firebaseInsertUser = function (userID, userName, userPicture, userMail) {
  //adds user to database with username, email, photourl


  db.ref("users").once("value", function (snapshot) {

    let obj = snapshot.val()
    for (let prop in obj) {
      allUsers.push(prop)

    }


    for (let i = 0; i < allUsers.length; i++) {

      if (userID === allUsers[i]) {
        id = allUsers[i]
      }

    }


    if (id === "") {
      var database = firebase.database;
      database().ref("/users/" + userID).set({
        username: userName,
        photoURL: userPicture,
        email: userMail,
        tags: {

        },
      })


    } else {

      let indexet = 0;

      db.ref("/users/" + userID + "/photoURL").set(userPicture);

      db.ref("users/" + id + "/tags").once("value", function (snapshot) {

        let obj = snapshot.val()

        let tagsSliderContentChange = document.getElementById("tagsSliderContentChange")

        for (let prop in obj) {
          let div = document.createElement("div");
          div.className = "tags";
          div.innerHTML = obj[prop];
          div.style.zIndex = indexet.toString();
          div.style.backgroundColor = "#333644"

          tagsSliderContentChange.appendChild(div)

          indexet++



        }
        for (let i = 0; i < tagsSlider.children.length; i++) {

          if (tagsSlider.children[i] !== undefined) {

            tagsSlider.children[i].addEventListener("click", function () {

              let tag = tagsSlider.children[i];


              tagsContentChangeClick(tag, tagsSlider.children.length, i, tagsSlider.tagsContentChange, tagsMinusSlide, tagsContentChangeWidth)

            })

          }

        }

        if (tagsSlider.children.length === 1 || tagsSlider.children.length > 2) {

          tagsSlider.children[0].innerHTML = "<div class='tags'>" + (tagsSlider.children.length - 1) + " saved tags</div>";

        } else {

          tagsSlider.children[0].innerHTML = "<div class='tags'>" + (tagsSlider.children.length - 1) + " saved tag</div>";

        }
      })
    }
  })
}

let firebaseInsertUserWithEmail = function (userID, userName, userMail) {
  //adds user to database with username, email, photourl


  db.ref("users").once("value", function (snapshot) {

    let obj = snapshot.val()
    for (let prop in obj) {
      allUsers.push(prop)
    }


    for (let i = 0; i < allUsers.length; i++) {

      if (userID === allUsers[i]) {
        id = allUsers[i]
      }

    }


    if (id === "") {
      var database = firebase.database;
      database().ref("/users/" + userID).set({
        username: userName,
        email: userMail,
        tags: {

        },
      })


    } else {

      db.ref("users/" + id + "/tags").once("value", function (snapshot) {



        let obj = snapshot.val()

        let tagsSliderContentChange = document.getElementById("tagsSliderContentChange")

        for (let prop in obj) {
          let div = document.createElement("div");
          div.className = "tags";
          div.innerHTML = obj[prop];
          tagsSliderContentChange.appendChild(div)


        }


        for (let i = 0; i < tagsSlider.children.length; i++) {

          if (tagsSlider.children[i] !== undefined) {

            tagsSlider.children[i].addEventListener("click", function () {

              let tag = tagsSlider.children[i];

              tagsContentChangeClick(tag, tagsSlider.children.length, i, tagsSlider.tagsContentChange, tagsMinusSlide, tagsContentChangeWidth)


            })

          }
        }


        if (tagsSlider.children.length === 1 || tagsSlider.children.length > 2) {
          tagsSlider.children[0].innerHTML = "<div class='tags'>" + (tagsSlider.children.length - 1) + " saved tags</div>";

        } else {
          tagsSlider.children[0].innerHTML = "<div class='tags'>" + (tagsSlider.children.length - 1) + " saved tag</div>";

        }

      })
    }
  })
}



firebase.auth().onAuthStateChanged(function (user) {
  if (user) {



    if(window.innerWidth > 600){

        document.getElementById("buttons").style.display = "block"
    }else{
      document.getElementById("buttons").style.display = "none"
      document.getElementById("moreOp").style.display = "block"
    }

    window.addEventListener("resize", function(){

        if(window.innerWidth > 600){

            document.getElementById("buttons").style.display = "block";
            document.getElementById("moreOp").style.display = "none";
        }else{
          document.getElementById("buttons").style.display = "none";
          document.getElementById("moreOp").style.display = "block";


        }
    })




    localStorage.setItem("username", user.displayName);
    localStorage.setItem("photoURL", user.photoURL);
    localStorage.setItem("userid", user.uid);
    //puts in related data in localstorage, feel free to use for functions

    whenLoggedIn.style.display = "block";
    document.getElementById('weatherCast').style.opacity = '1';

    document.getElementById("tagsSliderContentChange").innerHTML = "";
    document.getElementById("tagsSliderContentChange").innerHTML = "<div class='tags'>" + tagsSlider.children.length + " saved tags</div>";


    tagsContentChangeWidth = tagsSlider.tagsContentChange.offsetWidth;


    addTagBtn.style.display = "inline-block";

    //when the user is logged in, runs loginHeader


    loginHeader(user);
    var search = firebase.database().ref("users/").orderByChild(user.uid);
    sammaid = user.uid;
    firebaseInsertUser(user.uid, user.displayName, user.photoURL, user.email)
    // User is signed in.
    // Put in the displayname change and whatnot?
  } else {
    localStorage.clear(); //clears the localstorage for the next user
    addTagBtn.style.display = "none";
    whenLoggedIn.style.display = "none";

    loginDiv.style.display = "none";
    loginPopup.style.display = "";
    document.getElementById('weatherCast').style.opacity = '0';
    // document.getElementsByClassName("more")[0].style.display = "none"
    document.getElementById("moreOp").style.display = "none"
    document.getElementById("buttons").style.display = "none"
    // No user is signed in.
  }
});



let sourceCode = '';
let countryCode = '';
let categoryCode = '';
let languageCode = '';

const key = 'apiKey=ca2d5b8c76a84ec68544ecdeadf04043';
let urlBase = 'https://newsapi.org/v2/top-headlines';
let question = '?';

let searchArray = [];
let completeSearchArray = [];

let queryString = 'q=';
let category = 'category=';
let language = 'language=';
let country = 'country=';
let source = 'sources=';
let searchBtn = document.getElementById('searchBtn');

let main = document.getElementsByTagName('main')[0];

let myArticles = [];

var createNews = function () {

  let article = document.createElement('article');
  let blackLine = document.createElement('div');
  blackLine.classList.add('blackLine');
  let mainContent = document.createElement('div');
  mainContent.classList.add('mainContent');

  let pinkAndTitle = document.createElement('div');
  pinkAndTitle.classList.add('pinkAndTitle');

  let pinkLine = document.createElement('div');
  pinkLine.classList.add('pinkLine');

  let title = document.createElement('div');
  title.classList.add('title');

  let sumUp = document.createElement('p');
  sumUp.classList.add('sumUp');

  let readMore = document.createElement('div');
  readMore.classList.add('readMore');
  let readMore2 = document.createElement('div');
  readMore.classList.add('readMore');
  let a = document.createElement('a');
  a.classList.add('readMoreLink');
  a.target = '_blank';
  a.innerHTML = 'Read full article...';

  // added save , share and comments links to articles - Jonas
  let extraButtonContainer = document.createElement("div");
  let saveToFavourites = document.createElement('a');
  let shareArticle = document.createElement('a');
  let commentArticle = document.createElement('a');

  extraButtonContainer.className = "extraButtonContainer";

  saveToFavourites.className = 'newsFooter saveToFavourite';

  let saveIcon = document.createElement('i');
  saveIcon.className = 'fas fa-star';
  saveToFavourites.appendChild(saveIcon);
  let saveToFavouritesText = document.createElement('span');
  saveToFavouritesText.className = 'newsFooterSpan showFavouriteText';
  saveToFavouritesText.innerText = 'Save';
  saveToFavourites.appendChild(saveToFavouritesText);

  shareArticle.className = 'newsFooter shareArticle';

  let shareIcon = document.createElement('i');
  shareIcon.className = 'fas fa-share-alt';
  shareArticle.appendChild(shareIcon);
  let shareArticleText = document.createElement('span');
  shareArticleText.className = 'newsFooterSpan';
  shareArticleText.innerText = 'Share';
  shareArticle.appendChild(shareArticleText);

  commentArticle.className = 'newsFooter commentArticle';

  let commentIcon = document.createElement('i');
  commentIcon.className = 'far fa-comment';
  commentArticle.appendChild(commentIcon);
  let commentArticleText = document.createElement('span');
  firebase.database().ref("/Articles/").once("value", function(snapshot){
    var commentCount = 0;
    var snap = snapshot.val();
    for (var item in snap){
      if (snap[item].saveUrl == a.href){
        for(var comment in snap[item].comments){
            commentCount += 1;
        }
      }
    }
    commentArticleText.innerText = "Comment" + " (" + commentCount + ")";
  })
  commentArticleText.className = 'newsFooterSpan';
  //commentArticleText.innerText = 'Comment';
  commentArticle.appendChild(commentArticleText);
  // end of save,share,comment

  readMore.appendChild(a);

  pinkAndTitle.appendChild(pinkLine);
  pinkAndTitle.appendChild(title);
  pinkAndTitle.appendChild(sumUp);
  pinkAndTitle.appendChild(readMore);
  //below 4 rows puts the save,share,comment buttons in a div and appends the div to main
  extraButtonContainer.appendChild(saveToFavourites);
  extraButtonContainer.appendChild(shareArticle);
  extraButtonContainer.appendChild(commentArticle);
  pinkAndTitle.appendChild(extraButtonContainer);
  //pinkAndTitle.appendChild(fb_share);


  let articleImage = document.createElement('div');
  articleImage.classList.add('articleImage');
  let img = document.createElement('img');
  img.classList.add('articleImageLink');

  articleImage.appendChild(img);

  mainContent.appendChild(pinkAndTitle);
  mainContent.insertBefore(articleImage, mainContent.firstChild);

  article.appendChild(blackLine);
  article.appendChild(mainContent);

  main.appendChild(article);
  mainContent.addEventListener("click", function (e) {

    if (e.target.className === "readMoreLink") {

      let href = e.target.getAttribute("href");

      window.open(href, '_blank');

    }

  })

}

var browseNews = function (array, number) {
main.innerHTML = "";
  for (i = number; i > 0; i--) {
    createNews();
  }

  let titles = document.getElementsByClassName('title');
  let descriptions = document.getElementsByClassName('sumUp');
  let images = document.getElementsByClassName('articleImageLink');
  let readMore = document.getElementsByClassName('readMoreLink');
  let fbShare = document.getElementsByClassName('shareArticle');
  let commentArticleArray = document.getElementsByClassName("commentArticle");


  let count = 0;

  do {

    titles[count].innerHTML = array[count].title;
    descriptions[count].innerHTML = array[count].description;
    if (array[count].urlToImage == null) {
      images[count].src = 'img/default.png';
    } else {
      images[count].src = array[count].urlToImage;
    }
    readMore[count].href = array[count].url;
    fbShare[count].name = array[count].url;
    commentArticleArray[count].children[1].addEventListener("click", function (event) {
      if (event.target.parentElement.parentElement.children.length == 3) {
        let commentField = document.createElement("div");
        commentField.className = "commentField";
        event.target.parentElement.parentElement.appendChild(commentField);
        let targetUrl = event.target.parentElement.parentElement.parentElement.children[3].children[0].href;
        db.ref("/Articles/").once("value", function (snapshot) {
          var found = "unfound";
          for (var item in snapshot.val()){
            if (snapshot.val()[item].saveUrl == targetUrl){
              found = "found";
            }
          }
          if (found == "unfound") {
            db.ref("/Articles/").push({
              saveDescription: event.target.parentNode.parentNode.parentNode.children[2].innerText,
              saveTitle: event.target.parentNode.parentNode.parentNode.children[1].innerText,
              saveUrl: targetUrl,
              saveUrlImage: event.target.parentNode.parentNode.parentNode.parentNode.children[0].firstChild.src,
              comments: {
              }
            })
          }
        })
        db.ref("/Articles/").once("value", function (snapshot){
          let writeBox = document.createElement("textarea");
          let commentButton = document.createElement("button");
          writeBox.type = "input";
          writeBox.placeholder = "Input your comment here";
          writeBox.className = "writeBox";
          commentButton.innerText = "Comment";
          commentButton.className = "commentButton";
          event.target.parentElement.parentElement.insertBefore(commentButton, event.target.parentElement.parentElement.children[3]);
          event.target.parentElement.parentElement.insertBefore(writeBox, event.target.parentElement.parentElement.children[3]);
          writeBox.addEventListener("keyup", function (event) {
            //Comments if user clicks enter
            if (event.shiftKey == true) {
              return;
            }

            else if (event.key == "Enter" && localStorage.getItem("username") !== null) {

              let text = event.target.parentElement.children[3].value;
              event.target.parentElement.children[3].value = "";
              if (text !== "") {
                firebase.database().ref("/Articles/").once("value", function (snapshot) {
                  let snap = snapshot.val();
                  for (var item in snap) {
                    if (snap[item].saveUrl == event.target.parentElement.parentElement.children[3].children[0].href) {
                      firebase.database().ref("/Articles/" + item + "/comments/").push({
                        content: text,
                        username: localStorage.getItem("username"),
                        photoURL: localStorage.getItem("photoURL"),
                        userID: localStorage.getItem("userid"),
                      })
                    }
                  }
                })
              }
            }
          });
          commentButton.addEventListener("click", function (event) {
            let text = event.target.parentElement.children[3].value;
            event.target.parentElement.children[3].value = "";
            if (text !== "" && localStorage.getItem("username") !== null) {
              firebase.database().ref("/Articles/").once("value", function (snapshot) {
                let snap = snapshot.val();
                for (var item in snap) {
                  if (snap[item].saveUrl == event.target.parentElement.parentElement.children[3].children[0].href) {
                    firebase.database().ref("/Articles/" + item + "/comments/").push({
                      content: text,
                      username: localStorage.getItem("username"),
                      photoURL: localStorage.getItem("photoURL"),
                      userID: localStorage.getItem("userid"),
                    })
                  }
                }
              })
            }
          });
          for (var item in snapshot.val()) {
            if (snapshot.val()[item].saveUrl == targetUrl) {
              let realtimeCommentCount = 0;
              db.ref("/Articles/" + item + "/" + "comments").on("child_added", function(snapshot){
                realtimeCommentCount += 1;
                event.target.innerText = "Comment (" +  realtimeCommentCount + ")";
                let commentWhole = document.createElement("div");
                let commentText = document.createElement("div");
                let commentUsername = document.createElement("div");
                let commentUserPicture = document.createElement("img");
                commentWhole.className = "commentWhole";
                commentText.innerText = snapshot.val().content;
                commentText.className = "commentText";
                commentUsername.innerText = snapshot.val().username;
                commentUsername.className = "commentUsername";
                commentUserPicture.src = snapshot.val().photoURL;
                commentUserPicture.className = "commentUserPicture";
                commentUserPicture.alt = "Userpic";
                commentWhole.appendChild(commentUserPicture);
                commentWhole.appendChild(commentUsername);
                commentWhole.appendChild(commentText);
                event.target.parentElement.parentElement.children[5].insertBefore(commentWhole, event.target.parentElement.parentElement.children[5].firstChild);
              })
            }
          }
        })
        //comments if user clicks the comment button
      }
      else if (event.target.parentElement.parentElement.children.length > 5) {
        while (event.target.parentElement.parentElement.children.length > 3) {
          event.target.parentElement.parentElement.removeChild(event.target.parentElement.parentElement.lastChild);
        }
      }
    })
    count++;

  } while (count < number);

  let fbBtn = document.getElementsByClassName('shareArticle');

  for (let x of fbBtn) {
    x.addEventListener('click', function () {
      let fbUrl = x.name;
      FB.ui({
        method: 'share',
        href: fbUrl,
      }, function (response) { });
    });

  }
  // changed icons if already stored
  var thisUser = localStorage.getItem("userid");
  var checkForURL;

  const changeTextIfStored = document.getElementsByClassName('showFavouriteText');
  if(thisUser && changeTextIfStored.textContent === "Remove"){
  for (let x of changeTextIfStored){


    checkForURL = x.parentElement.nextSibling.getAttribute('name');

  firebase.database().ref("users/" + thisUser + "/favourites").orderByValue().equalTo(checkForURL).once('value', snapshot => {

      const updateOutput = snapshot.val();
      if(updateOutput !== null && x.parentElement.className !== 'fas fa-times-circle' ){

        x.previousSibling.className = 'fas fa-star';
        x.previousSibling.style.color = '#C65F63';
      x.textContent = 'Saved';
    }
  })
}
}
//end of my change
}

var getAllNews = function () {

  let url = urlBase + question + 'country=us&' + key;
  let req = new Request(url);

  fetch(req)
    .then(function (response) {
      return response.json();

    }).then(function (object) {

      let articles = object.articles;

      let amount = 12;

      for (article in articles) {

        if (amount > 0 && articles[article] != 'undefined' && articles[article] != null && articles[article] != '') {

          myArticles.push(articles[article]);

                              showAWhile.style.height = "30px"
                              showAWhile.style.paddingTop = "20px"
                              showAWhile.style.backgroundColor = "#65C253"
                              showAWhile.innerHTML = "<h3>You searched general news</h3>"
                              function displayNone() {

                                showAWhile.style.height = "0px"
                                showAWhile.style.paddingTop = "0px"
                                showAWhile.innerHTML = ""
                              }
                              setTimeout(displayNone, 2000);


        } else {
          break;
        }

        amount--;
      }
      amount = myArticles.length;

      browseNews(myArticles, amount);
    })
    .then(function(){
      myArticles = [];
    })
    .catch(function (error) {
      console.log('failed', error);
    });
}
