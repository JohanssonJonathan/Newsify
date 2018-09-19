

canNotShow.innerHTML= ""
canNotShow.style.display = "block"
// Kollar vart man är i den första slidern. den man är på ska få klassen tags zIndex och de andra bara tags eftersom att man vill att den ska vara längst fram och synas beroende på vart minusSlide är.
function checkZIndex(contentChangeLength, contentChangeCorrect, andraLength, andraContentChange, tredjeLength, tredjeContentChange, fjardeLength, fjardeContentChange){



    for(let i=0; i< contentChangeLength; i++){

        contentChangeCorrect[i].className = "tags zIndex"

    }

    for(let i=0; i< andraLength; i++){

        andraContentChange[i].className = "tags"


    }

    for(let i=0; i< tredjeLength; i++){

        tredjeContentChange[i].className = "tags"


    }

    for(let i=0; i< fjardeLength; i++){

        fjardeContentChange[i].className = "tags"


    }



}



function whatMinusSlideNumber(minusSlide,sourceMinus, countryMinus, categoryMinus, languageMinus, tagsMinus){

    if(minusSlide === 1){
      if(slider.inputKeyword.value === ""){
          currentTag.inputTag.innerHTML = ""
      }
    }

    if(sliderContentChangeLength > minusSlide){

      slider.sliderContentChange.style.marginLeft = totalLeft;
      minusSlide++
      if(minusSlide === 2){


        // När minusSlide är 2 så visas sourceSlider längst fram och de andra längre bak.
        checkZIndex(sourceSlider.children.length, sourceSlider.children, countrySlider.children.length, countrySlider.children, categorySlider.children.length, categorySlider.children, languageSlider.children.length, languageSlider.children )

        if(countryMinus> 1 || categoryMinus > 1 ){
          sourceSlider.slider.style.opacity ="0";

        }else{
          sourceSlider.slider.style.opacity ="1";

        }

        // sourceContentChangeWidth = sourceSlider.sourceContentChange.offsetWidth;
      }else {
        sourceSlider.slider.style.opacity ="0"
      }

      if(minusSlide === 3){

        // När minusSlide är 3 så visas countrySlider längst fram och de andra längre bak.
            checkZIndex( countrySlider.children.length, countrySlider.children, categorySlider.children.length, categorySlider.children, languageSlider.children.length, languageSlider.children,sourceSlider.children.length, sourceSlider.children );

        if(sourceMinus>1 || slider.inputKeyword.value !== "" || languageMinus>1){
          countrySlider.slider.style.opacity = "0";



        }else{
          countrySlider.slider.style.opacity = "1";
        }
        // countryContentChangeWidth = countrySlider.countryContentChange.offsetWidth;


      }else{
        countrySlider.slider.style.opacity = "0"
      }

      if(minusSlide === 4){

        // När minusSlide är 4 så visas categorySlider längst fram och de andra längre bak.
        checkZIndex(  categorySlider.children.length, categorySlider.children, languageSlider.children.length, languageSlider.children,sourceSlider.children.length, sourceSlider.children, countrySlider.children.length, countrySlider.children );

        if(sourceMinus>1 || slider.inputKeyword.value !== "" || languageMinus>1){
          categorySlider.slider.style.opacity = "0"

        }else{
          categorySlider.slider.style.opacity = "1"

        }


      }else{
        categorySlider.slider.style.opacity = "0"
      }

      if(minusSlide === 5){

        // När minusSlide är 5 så visas languageSlider längst fram och de andra längre bak.
        checkZIndex( languageSlider.children.length, languageSlider.children,sourceSlider.children.length, sourceSlider.children, countrySlider.children.length, countrySlider.children );


        if(countryMinus> 1 || categoryMinus > 1){
          languageSlider.slider.style.opacity = "0"

        }else{
          languageSlider.slider.style.opacity = "1"

        }
      }else{
        languageSlider.slider.style.opacity = "0"
      }

    }
}





function showArrowsOrNot(minusSlide,prevBtn,nextBtn, contentChangeLength ){




  if(minusSlide> 1){
    prevBtn.style.opacity = "1";

  }

  if(minusSlide === contentChangeLength-1){
    nextBtn.style.opacity = "0";
  }

}



function clear(){

  slider.inputKeyword.disabled = false;

  canNotShow.style.display = "block"
  document.getElementById("ownCurrentTag").innerHTML = ""

  currenTag.style.top = "-30px"
  canNotShow.style.top = "40px"

  sliderContent.style.display = "block"
   sliderContentSource.style.display = "block"
   sliderContentCountry.style.display = "block"
   sliderContentCategory.style.display = "block"
   sliderContentLanguage.style.display = "block"

  tagsSlider.tagsContentChange.style.marginLeft = "0";
  tagsMinusSlide = 0;

  beforeLoggedIn.style.display = "block"


  currentTag.inputTag.innerHTML = "";
  currentTag.sourceTag.innerHTML = "";
  currentTag.countryTag.innerHTML = "";
  currentTag.categoryTag.innerHTML = "";
  currentTag.languageTag.innerHTML = "";

  slider.inputKeyword.value = ""
  slider.inputKeyword.placeholder ="Keyword"
  slider.inputKeyword.disabled = false;

  countrySlider.slider.style.opacity = "0";
  countrySlider.countryContentChange.style.display = "none"
  categorySlider.slider.style.opacity = "0";
  categorySlider.categoryContentChange.style.display = "none"
  sourceSlider.slider.style.opacity = "0";
  sourceSlider.sourceContentChange.style.display = "none"
  languageSlider.slider.style.opacity = "0";
  languageSlider.languageContentChange.style.display = "none"
  slider.sliderContentChange.style.marginLeft = "0";
  sourceSlider.sourceContentChange.style.marginLeft = "0";
  countrySlider.countryContentChange.style.marginLeft = "0";
  categorySlider.categoryContentChange.style.marginLeft = "0";
  languageSlider.languageContentChange.style.marginLeft = "0"



  sourceMinusSlide = 1;
  countryMinusSlide = 1;
  categoryMinusSlide = 1;
  languageMinusSlide = 1



  if(tagsSlider.children.length === 1 || tagsSlider.children.length >2){
    tagsSlider.children[0].innerHTML= "<div class='tags'>" +(tagsSlider.children.length -1) + " saved tags</div>";

  }else{
    if(tagsSlider.children[0] !== undefined){
    tagsSlider.children[0].innerHTML= "<div class='tags'>" +(tagsSlider.children.length -1) + " saved tag</div>";
  }

  }



}


let indexet = 0;

addTagBtn.addEventListener("click", function () {

  console.log(slider.inputKeyword.value.length)

  sourceCode = "";
  countryCode = "";
  categoryCode = "";
  languageCode = ""


  if(slider.inputKeyword.value.length < 25){

      let innerHTML = document.getElementById("currentTag").innerHTML;

      if(tagsSlider.children.length === 1 || tagsSlider.children.length >2){
        tagsSlider.children[0].innerHTML= "<div class='tags'>" +(tagsSlider.children.length -1) + " saved tags</div>";

      }else{
        tagsSlider.children[0].innerHTML= "<div class='tags'>" +(tagsSlider.children.length -1) + " saved tag</div>";

      }


        if (currentTag.inputTag.innerText !== "" || currentTag.sourceTag.innerText !== "" || currentTag.countryTag.innerText !== "" || currentTag.categoryTag.innerText !== "" || currentTag.languageTag.innerText !== "") {


        let div = document.createElement("div");

        div.className = "tags";
        div.innerHTML = innerHTML;
        div.style.textAlign = "center"
        div.style.backgroundColor = "#333644"
        div.style.height = "40px"
        div.style.zIndex = indexet.toString();
        let arret = []
        let child = ""
        for(let i =0; i< div.children.length; i++){
            div.children[i].setAttribute("id", Math.random().toFixed(2))


            if(div.children[i].innerHTML !== " "){
              div.children[i].style.height = "20px";

            }




        }
        console.log(arret.length)
        // if(arret.length === 1){
        //
        //     child.style.height = "40px"
        //     console.log("hej")
        //
        // }
        db.ref("users/" + sammaid + "/tags").push(div.innerHTML)



        tagsSliderContentChange.appendChild(div)

        for(let i=0; i< tagsSlider.children.length; i++){

          if(tagsSlider.children[i] !== undefined){

              tagsSlider.children[i].addEventListener("click",function(){

                  let tag = tagsSlider.children[i];

                  tagsContentChangeClick(tag, tagsSlider.children.length, i, tagsSlider.tagsContentChange, tagsMinusSlide, tagsContentChangeWidth)


              })

          }
        }

        indexet++

        showAWhile.style.height = "30px"
        showAWhile.style.paddingTop = "20px"
        showAWhile.style.backgroundColor = "#65C253"
        showAWhile.innerHTML = "<h3>Added "+ innerHTML + " successfully!</h3>"
        function displayNone(){
          showAWhile.style.height = "0px"
          showAWhile.innerHTML = ""
          showAWhile.style.paddingTop = "0px"

        }
        setTimeout(displayNone, 2000);








      }else{
        showAWhile.style.height = "30px"
        showAWhile.style.paddingTop = "20px"
        showAWhile.style.paddingBottom = "10px"

        showAWhile.style.backgroundColor = "#C65F63"
        showAWhile.innerHTML = "<h3>You can not add an empty tag!</h3>"
        function displayNone(){
          showAWhile.style.height = "0px"
          showAWhile.innerHTML = ""
          showAWhile.style.paddingTop = "0px"
          showAWhile.style.paddingBottom = "0px"

        }
        setTimeout(displayNone, 2000);


      }




  }else{
    showAWhile.style.height = "30px"
    showAWhile.style.paddingTop = "20px"
    showAWhile.style.paddingBottom = "10px"

    showAWhile.style.backgroundColor = "#C65F63"
    showAWhile.innerHTML = "<h3>Your tag is to long!</h3>"
    function displayNone(){
      showAWhile.style.height = "0px"
      showAWhile.innerHTML = ""
      showAWhile.style.paddingTop = "0px"
      showAWhile.style.paddingBottom = "0px"

    }
    setTimeout(displayNone, 2000);
  }





    clear()

})


deleteCurrentTag.addEventListener("click",function(){
  clear()

})




let y=2;

if(deleteOwnTag !== null){
deleteOwnTag.addEventListener("click",function(){


    let tagChildren = ""
    db.ref("/users/"+ id + "/tags/").once("value",function(snapshot){


          let obj = snapshot.val()
        let found = false;
        let proppet = ""
        let tag = tagsSlider.children[tagsMinusSlide];

        tagChildren = tag.children;
        console.log(tag.children)

        for(let prop in obj){



          if(tag.innerHTML !== undefined){
            if(tag.innerHTML === obj[prop]){

                found = true;

                proppet = prop
              // tagsSlider.tagsContentChange.removeChild(tagsSlider.tagsContentChange.children[tagsMinusSlide-1])


            }
          }



        }

        if(found){

          tag.parentNode.removeChild(tag);


          sourceCode = "";
          countryCode = "";
          categoryCode = "";
          languageCode = ""



          let string = ""

          for(let i= 0; i< tagChildren.length; i++){

            if(i===0){

                if(tagChildren[i].innerHTML !== "#" ){
                  console.log(tagChildren[i].innerHTML)
                string += " "+ tagChildren[i].innerHTML
              }

            }
            if(i === 1){
                if(tagChildren[i].innerHTML !== "#" ){
                string += " " + tagChildren[i].innerHTML
              }
            }
            if(i === 2){
              if(tagChildren[i].innerHTML !== "#" ){
                string += " " +tagChildren[i].innerHTML
              }
            }

            if(i === 3){
              if(tagChildren[i].innerHTML !== "#"  ){
                string += " " + tagChildren[i].innerHTML
              }
            }

            if(i === 4){
              if(tagChildren[i].innerHTML !== "#"  ){
                string += " " +tagChildren[i].innerHTML
              }
            }


          }


          showAWhile.style.height = "30px"
          showAWhile.style.paddingTop = "20px"
          showAWhile.style.backgroundColor = "#65C253"
          showAWhile.innerHTML = "<h3>You deleted" + string+ "</h3>"
          function displayNone() {

            showAWhile.style.height = "0px"
            showAWhile.style.paddingTop = "0px"
            showAWhile.innerHTML = ""
          }
          setTimeout(displayNone, 1000);


          for(let i=0; i< tagsSlider.children.length; i++){

            if(tagsSlider.children[i] !== undefined){

                tagsSlider.children[i].addEventListener("click",function(){

                    let tag = tagsSlider.children[i];

                    tagsContentChangeClick(tag, tagsSlider.children.length, i, tagsSlider.tagsContentChange, tagsMinusSlide, tagsContentChangeWidth)


                })

            }
          }




          db.ref("/users/"+ id + "/tags/"+ proppet).remove()

          if(tagsMinusSlide === tagsSlider.children.length){





            let totalLeft;

            totalLeft = (tagsMinusSlide-1) * tagsSliderContentChangeWidth;
            totalLeft = totalLeft.toString()

             tagsSlider.tagsContentChange.style.marginLeft = "-"+totalLeft + "px";


            tagsMinusSlide--

            if(tagsMinusSlide ===0){
            document.getElementById("ownCurrentTag").innerHTML = "";
          }

            if(tagsMinusSlide !== 0){
                for(let i = 0; i < ownCurrentTag.ownCurrentTag.children.length; i++ ){

                    if(i ===0){

                      ownCurrentTag.ownCurrentTag.children[i].innerHTML = tagsSlider.children[tagsMinusSlide].children[i].innerHTML
                    }
                    if(i === 1){
                      ownCurrentTag.ownCurrentTag.children[i].innerHTML = tagsSlider.children[tagsMinusSlide].children[i].innerHTML

                    }
                    if( i=== 3){
                      ownCurrentTag.ownCurrentTag.children[i].innerHTML = tagsSlider.children[tagsMinusSlide].children[i].innerHTML

                    }
                    if(i === 4){
                      ownCurrentTag.ownCurrentTag.children[i].innerHTML = tagsSlider.children[tagsMinusSlide].children[i].innerHTML

                    }


                }
            }

             if(tagsMinusSlide === 1){

               beforeLoggedIn.style.display = "block"

             }


          }else if(tagsMinusSlide !== 0){
                        for(let i = 0; i < ownCurrentTag.ownCurrentTag.children.length; i++ ){
                          if(i ===0){

                            ownCurrentTag.ownCurrentTag.children[i].innerHTML = tagsSlider.children[tagsMinusSlide].children[i].innerHTML
                          }
                          if(i === 1){
                            ownCurrentTag.ownCurrentTag.children[i].innerHTML = tagsSlider.children[tagsMinusSlide].children[i].innerHTML

                          }
                          if( i=== 3){
                            ownCurrentTag.ownCurrentTag.children[i].innerHTML = tagsSlider.children[tagsMinusSlide].children[i].innerHTML

                          }
                          if(i === 4){
                            ownCurrentTag.ownCurrentTag.children[i].innerHTML = tagsSlider.children[tagsMinusSlide].children[i].innerHTML

                          }

                        }



          }
          if(tagsSlider.children.length === 1 || tagsSlider.children.length >2){
            tagsSlider.children[0].innerHTML= "<div class='tags'>" +(tagsSlider.children.length -1) + " saved tags</div>";

          }else{
            tagsSlider.children[0].innerHTML= "<div class='tags'>" +(tagsSlider.children.length -1) + " saved tag</div>";

          }

          if(tagsSlider.children.length === 1){

            canNotShow.style.top = "40px"
            currenTag.style.top = "-30px"

            sliderContent.style.display = "block"

            sliderContentSource.style.display = "block"
            sliderContentCountry.style.display = "block"
            sliderContentCategory.style.display = "block"
            sliderContentLanguage.style.display = "block"

          }
          // document.getElementById("ownCurrentTag").innerHTML =  tagsSlider.children[tagsMinusSlide].innerHTML

          found = false;
        }else{
          showAWhile.style.height = "30px"
          showAWhile.style.paddingTop = "20px"
          showAWhile.style.paddingBottom = "10px"

          showAWhile.style.backgroundColor = "#C65F63"
          showAWhile.innerHTML = "<h3>Choose the tag you want delete and press delete</h3>"
          function displayNone(){
            showAWhile.style.height = "0px"
            showAWhile.innerHTML = ""
            showAWhile.style.paddingBottom = "0px"

            showAWhile.style.paddingTop = "0px"


          }
          setTimeout(displayNone, 3000);
        }

    })

    if(document.querySelectorAll("#tagsSliderContentChange .tags").length === 2){
      document.getElementById("ownCurrentTag").innerHTML = "";
    }





})

}






function contentChangeClick(tag, length, i, contentChange, minus, offsetWidth){

  slider.inputKeyword.disabled = false;


    let totalLeft = offsetWidth;

    switch (i) {
      case 0:
          contentChange.style.marginLeft = "0"
          minus = 1;

          switch (contentChange.id) {
            case "sliderContentChange":
                  minusSlide = minus;
                          sourceSlider.slider.style.opacity ="0";
                           countrySlider.slider.style.opacity = "0";
                           categorySlider.slider.style.opacity = "0"
                           languageSlider.slider.style.opacity = "0"
              break;
            case "sourceContentChange":
                  sourceMinusSlide = minus;

              break;
              case "countryContentChange":
                    countryMinusSlide = minus;
                break;
            case "categoryContentChange":

                categoryMinusSlide = minus;
                break;
            case "languageContentChange":

                languageMinusSlide = minus;
                break;

            default:

          }




      break;

      case 1:
            totalLeft = "-" + totalLeft.toString() + "px"
            contentChange.style.marginLeft = totalLeft;
            minus = 2;

            switch (contentChange.id) {
              case "sliderContentChange":
                    minusSlide = minus;
                    checkZIndex(sourceSlider.children.length, sourceSlider.children, countrySlider.children.length, countrySlider.children, categorySlider.children.length, categorySlider.children, languageSlider.children.length, languageSlider.children )

                    sourceSlider.slider.style.opacity ="1";
                    countrySlider.slider.style.opacity = "0";
                    categorySlider.slider.style.opacity = "0"
                    languageSlider.slider.style.opacity = "0"
                break;
              case "sourceContentChange":
                    sourceMinusSlide = minus;
                break;
                case "countryContentChange":
                      countryMinusSlide = minus;
                  break;
                  case "categoryContentChange":

                      categoryMinusSlide = minus;
                      break;
                  case "languageContentChange":

                      languageMinusSlide = minus;
                      break;
              default:

            }
        break;
      case 2:
          let twoTotalLeft = totalLeft * 2;

          twoTotalLeft = "-" + twoTotalLeft.toString() + "px"
          contentChange.style.marginLeft = twoTotalLeft;
          minus = 3;

          switch (contentChange.id) {
            case "sliderContentChange":
                  minusSlide = minus;
                  checkZIndex( countrySlider.children.length, countrySlider.children, categorySlider.children.length, categorySlider.children, languageSlider.children.length, languageSlider.children,sourceSlider.children.length, sourceSlider.children );

                  sourceSlider.slider.style.opacity ="0";
                          categorySlider.slider.style.opacity = "0"
                          languageSlider.slider.style.opacity = "0"

                          countrySlider.slider.style.opacity = "1";
              break;
            case "sourceContentChange":
                  sourceMinusSlide = minus;
              break;
              case "countryContentChange":
                    countryMinusSlide = minus;
                break;
                case "categoryContentChange":

                    categoryMinusSlide = minus;
                    break;
                case "languageContentChange":

                    languageMinusSlide = minus;
                    break;
            default:

          }

        break;
      case 3:

        let threeTotalLeft = totalLeft *3;
        threeTotalLeft = "-" + threeTotalLeft.toString() + "px"
        contentChange.style.marginLeft = threeTotalLeft;
        minus = 4;

        switch (contentChange.id) {
          case "sliderContentChange":
                minusSlide = minus;

                checkZIndex(  categorySlider.children.length, categorySlider.children, languageSlider.children.length, languageSlider.children,sourceSlider.children.length, sourceSlider.children, countrySlider.children.length, countrySlider.children );

                          categorySlider.slider.style.opacity = "1"

                                    countrySlider.slider.style.opacity = "0";
                                    sourceSlider.slider.style.opacity ="0";
                                    languageSlider.slider.style.opacity = "0"
            break;
          case "sourceContentChange":
                sourceMinusSlide = minus;
            break;
            case "countryContentChange":
                  countryMinusSlide = minus;
              break;
              case "categoryContentChange":

                  categoryMinusSlide = minus;
                  break;
              case "languageContentChange":

                  languageMinusSlide = minus;
                  break;
          default:

        }

        break;
      case 4:

      let fourTotalLeft = totalLeft *4;
      fourTotalLeft = "-" + fourTotalLeft.toString() + "px"
      contentChange.style.marginLeft = fourTotalLeft;
      minus = 5;

      switch (contentChange.id) {

        case "sliderContentChange":
              minusSlide = minus;
              checkZIndex( languageSlider.children.length, languageSlider.children,sourceSlider.children.length, sourceSlider.children, countrySlider.children.length, countrySlider.children );
                        languageSlider.slider.style.opacity = "1"
                        categorySlider.slider.style.opacity = "0"

                                  countrySlider.slider.style.opacity = "0";
                                  sourceSlider.slider.style.opacity ="0";
          break;
        case "sourceContentChange":
              sourceMinusSlide = minus;
          break;

          case "countryContentChange":
                countryMinusSlide = minus;
            break;
            case "categoryContentChange":

                categoryMinusSlide = minus;
                break;
            case "languageContentChange":

                languageMinusSlide = minus;
                break;
        default:

      }

        break;
      case 5:

      let fiveTotalLeft = totalLeft *5;
      fiveTotalLeft = "-" + fiveTotalLeft.toString() + "px"
      contentChange.style.marginLeft = fiveTotalLeft;
      minus = 6;

      switch (contentChange.id) {
        case "sliderContentChange":
              minusSlide = minus;
          break;
        case "sourceContentChange":
              sourceMinusSlide = minus;
          break;
          case "countryContentChange":
                countryMinusSlide = minus;
            break;
            case "categoryContentChange":

                categoryMinusSlide = minus;
                break;
            case "languageContentChange":

                languageMinusSlide = minus;
                break;
        default:

      }

        break;
      case 6:

      let sixTotalLeft = totalLeft *6;
      sixTotalLeft = "-" + sixTotalLeft.toString() + "px"
      contentChange.style.marginLeft = sixTotalLeft;
      minus = 7;

      switch (contentChange.id) {
        case "sliderContentChange":
              minusSlide = minus;
          break;
        case "sourceContentChange":
              sourceMinusSlide = minus;
          break;

          case "countryContentChange":
                countryMinusSlide = minus;
            break;

            case "categoryContentChange":

                categoryMinusSlide = minus;
                break;
            case "languageContentChange":

                languageMinusSlide = minus;
                break;
        default:

      }

        break;
      case 7:

      let sevenTotalLeft = totalLeft *7;
      sevenTotalLeft = "-" + sevenTotalLeft.toString() + "px"
      contentChange.style.marginLeft = sevenTotalLeft;
      minus = 8;

      switch (contentChange.id) {
        case "sliderContentChange":
              minusSlide = minus;
          break;
        case "sourceContentChange":
              sourceMinusSlide = minus;
          break;

          case "countryContentChange":
                countryMinusSlide = minus;
            break;

            case "categoryContentChange":

                categoryMinusSlide = minus;
                break;
            case "languageContentChange":

                languageMinusSlide = minus;
                break;
        default:

      }

        break;
      case 8:

      let eightTotalLeft = totalLeft *8;
      eightTotalLeft = "-" + eightTotalLeft.toString() + "px"
      contentChange.style.marginLeft = eightTotalLeft;
      minus = 9;

      switch (contentChange.id) {
        case "sliderContentChange":
              minusSlide = minus;
          break;
        case "sourceContentChange":
              sourceMinusSlide = minus;
          break;
          case "countryContentChange":
                countryMinusSlide = minus;
            break;
            case "categoryContentChange":

                categoryMinusSlide = minus;
                break;
            case "languageContentChange":

                languageMinusSlide = minus;
                break;
        default:

      }

        break;
      case 9:

      let nineTotalLeft = totalLeft *9;
      nineTotalLeft = "-" + nineTotalLeft.toString() + "px"
      contentChange.style.marginLeft = nineTotalLeft;
      minus = 10;

      switch (contentChange.id) {
        case "sliderContentChange":
              minusSlide = minus;
          break;
        case "sourceContentChange":
              sourceMinusSlide = minus;
          break;

          case "countryContentChange":
                countryMinusSlide = minus;
            break;

            case "categoryContentChange":

                categoryMinusSlide = minus;
                break;
            case "languageContentChange":

                languageMinusSlide = minus;
                break;
        default:

      }

        break;
      case 10:

      let tenTotalLeft = totalLeft *10;
      tenTotalLeft = "-" + tenTotalLeft.toString() + "px"
      contentChange.style.marginLeft = tenTotalLeft;
      minus = 11;


      switch (contentChange.id) {
        case "sliderContentChange":
              minusSlide = minus;
          break;
        case "sourceContentChange":
              sourceMinusSlide = minus;
          break;

          case "countryContentChange":
                countryMinusSlide = minus;
            break;

            case "categoryContentChange":

                categoryMinusSlide = minus;
                break;
            case "languageContentChange":

                languageMinusSlide = minus;
                break;
        default:

      }

        break;
      case 11:

        let elevenTotalLeft = totalLeft *11;
        elevenTotalLeft = "-" + elevenTotalLeft.toString() + "px"
        contentChange.style.marginLeft = elevenTotalLeft;
        minus = 12;

        switch (contentChange.id) {
          case "sliderContentChange":
                minusSlide = minus;
            break;
          case "sourceContentChange":
                sourceMinusSlide = minus;
            break;
          case "countryContentChange":
                countryMinusSlide = minus;
            break;

            case "categoryContentChange":

                categoryMinusSlide = minus;
                break;
            case "languageContentChange":

                languageMinusSlide = minus;
                break;
          default:

        }

        break;
      case 12:

      let twelveTotalLeft = totalLeft *12;
      twelveTotalLeft = "-" + twelveTotalLeft.toString() + "px"
      contentChange.style.marginLeft = twelveTotalLeft;
      minus = 13;


      switch (contentChange.id) {
        case "sliderContentChange":
              minusSlide = minus;
          break;
        case "sourceContentChange":
              sourceMinusSlide = minus;
          break;
        case "countryContentChange":
                countryMinusSlide = minus;
            break;

            case "categoryContentChange":

                categoryMinusSlide = minus;
                break;
            case "languageContentChange":

                languageMinusSlide = minus;
                break;
        default:

      }

        break;
      case 13:

      let thirteenTotalLeft = totalLeft *13;
      thirteenTotalLeft = "-" + thirteenTotalLeft.toString() + "px"
      contentChange.style.marginLeft = thirteenTotalLeft;
      minus = 14;

      switch (contentChange.id) {
        case "sliderContentChange":
              minusSlide = minus;
          break;
        case "sourceContentChange":
              sourceMinusSlide = minus;
          break;
        case "countryContentChange":
                countryMinusSlide = minus;
            break;

            case "categoryContentChange":

                categoryMinusSlide = minus;
                break;
            case "languageContentChange":

                languageMinusSlide = minus;
                break;
        default:

      }

        break;
      case 14:

      let fifteenTotalLeft = totalLeft *14;
      fifteenTotalLeft = "-" + fifteenTotalLeft.toString() + "px"
      contentChange.style.marginLeft = fifteenTotalLeft;
      minus = 15;

      switch (contentChange.id) {
        case "sliderContentChange":
              minusSlide = minus;
          break;
        case "sourceContentChange":
              sourceMinusSlide = minus;
          break;
          case "countryContentChange":
                countryMinusSlide = minus;
            break;

            case "categoryContentChange":

                categoryMinusSlide = minus;
                break;
            case "languageContentChange":

                languageMinusSlide = minus;
                break;
        default:

      }

        break;
      case 15:

      let sixteenTotalLeft = totalLeft *15;
      sixteenTotalLeft = "-" + sixteenTotalLeft.toString() + "px"
      contentChange.style.marginLeft = sixteenTotalLeft;
      minus = 16;

      switch (contentChange.id) {
        case "sliderContentChange":
              minusSlide = minus;
          break;
        case "sourceContentChange":
              sourceMinusSlide = minus;
          break;
          case "countryContentChange":
                countryMinusSlide = minus;
            break;

            case "categoryContentChange":

                categoryMinusSlide = minus;
                break;
            case "languageContentChange":

                languageMinusSlide = minus;
                break;
        default:

      }

        break;



      }

      minusFunction(minusSlide,sourceMinusSlide, countryMinusSlide, categoryMinusSlide, languageMinusSlide)





}

function showOrNot(slider, contentChange){



}

function minusFunction(minusSlide,sourceMinusSlide, countryMinusSlide,categoryMinusSlide,languageMinusSlide){

  canNotShow.style.display = "none"
sourceSwitch(sourceMinusSlide)
countrySwitch(countryMinusSlide)
categorySwitch(categoryMinusSlide)
languageSwitch(languageMinusSlide)



  if(minusSlide >1){

    currenTag.style.top = "5px"
  }else{
    currenTag.style.top = "-30px"

  }

  if(minusSlide !==5){
    languageSlider.slider.style.opacity = "0";
    languageSlider.languageContentChange.style.display = "none"
  }else{
    languageSlider.slider.style.opacity = "1";
    languageSlider.languageContentChange.style.display = "block"

  }

  if(minusSlide !==4){
    categorySlider.slider.style.opacity = "0";
    categorySlider.categoryContentChange.style.display = "none"
  }else{
    categorySlider.slider.style.opacity = "1";
    categorySlider.categoryContentChange.style.display = "block"

  }

  if(minusSlide !==3){
    countrySlider.slider.style.opacity = "0";
    countrySlider.countryContentChange.style.display = "none"

  }else{
    countrySlider.slider.style.opacity = "1";
    countrySlider.countryContentChange.style.display = "block"

  }
  if(minusSlide !==2){
    sourceSlider.slider.style.opacity = "0";
    sourceSlider.sourceContentChange.style.display = "none"

  }else{
    sourceSlider.slider.style.opacity = "1";
    sourceSlider.sourceContentChange.style.display = "block"

  }

  if(sourceMinusSlide>1 || languageMinusSlide > 1 || slider.children[0].value !== ""){

    countrySlider.slider.style.opacity = "0";
    countrySlider.countryContentChange.style.display = "none"

      if(minusSlide === 3 || minusSlide === 4){
        canNotShow.style.display = "block"
        if(sourceMinusSlide>1 && languageMinusSlide >1 && slider.children[0].value !== ""){

            if(minusSlide === 3){
              canNotShow.innerHTML = "<span>Sorry you can not combine Country with Sourcename, Language or Key press clear to reset your tag</span>"

            }else{
              canNotShow.innerHTML = "<span>Sorry you can not combine Category with Sourcename, Language or Key press clear to reset your tag</span>"

            }

        }
        else if(sourceMinusSlide>1 && languageMinusSlide >1){
          if(minusSlide === 3){
            canNotShow.innerHTML = "<span>Sorry you can not combine Country with Sourcename or Language press clear to reset your tag</span>"

          }else{
            canNotShow.innerHTML = "<span>Sorry you can not combine Category with Sourcename or Language press clear to reset your tag</span>"

          }

        }else if(languageMinusSlide>1 && slider.children[0].value !== ""){
          if(minusSlide === 3){
            canNotShow.innerHTML = "<span>Sorry you can not combine Country with Language or Key press clear to reset your tag</span>"

          }else{
            canNotShow.innerHTML = "<span>Sorry you can not combine Category with Language or Key press clear to reset your tag</span>"

          }

        }else if(sourceMinusSlide>1 && slider.children[0].value !== ""){
          if(minusSlide === 3){
            canNotShow.innerHTML = "<span>Sorry you can not combine Country with Sourcename or Key press clear to reset your tag</span>"

          }else{
            canNotShow.innerHTML = "<span>Sorry you can not combine Category with Sourcename or Key press clear to reset your tag</span>"

          }


        }else if(slider.children[0].value !== ""){
          if(minusSlide === 3){
            canNotShow.innerHTML = "<span>Sorry you can not combine Country with Key press clear to reset your tag</span>"

          }else{
            canNotShow.innerHTML = "<span>Sorry you can not combine Category with Sourcename press clear to reset your tag</span>"

          }

        }
        else if(sourceMinusSlide>1){

          if(minusSlide === 3){

            canNotShow.innerHTML = "<span>Sorry you can not combine Country with Sourcename press clear to reset your tag</span>"

          }else{
            canNotShow.innerHTML = "<span>Sorry you can not combine Category with Sourcename press clear to reset your tag</span>"

          }
        }else if(languageMinusSlide >1){
          if(minusSlide === 3){

            canNotShow.innerHTML = "<span>Sorry you can not combine Country with Language press clear to reset your tag</span>"

          }else{
            canNotShow.innerHTML = "<span>Sorry you can not combine Category with Language press clear to reset your tag</span>"

          }

        }else if(    slider.children[0].value !== ""){
          if(minusSlide === 3){

            canNotShow.innerHTML = "<span>Sorry you can not combine Country with Key press clear to reset your tag</span>"
          }else{
            canNotShow.innerHTML = "<span>Sorry you can not combine Category with Key press clear to reset your tag</span>"

          }

        }

      }else{
        canNotShow.innerHTML= ""
        canNotShow.style.display = "block"

      }


    categorySlider.slider.style.opacity = "0";
    categorySlider.categoryContentChange.style.display = "none"
  }

  if(countryMinusSlide >1 || categoryMinusSlide >1){
    sourceSlider.slider.style.opacity = "0";
    sourceSlider.sourceContentChange.style.display = "none"
    languageSlider.slider.style.opacity = "0";
    languageSlider.languageContentChange.style.display = "none"

    canNotShow.style.display = "block"




    if(minusSlide === 1 || minusSlide === 2 || minusSlide === 5){



      currenTag.style.top = "0px"



      if(countryMinusSlide >1 && categoryMinusSlide >1){


        if(minusSlide ===1){

          canNotShow.innerHTML = "<span>Sorry you can not combine Key with Country or Category press clear to reset your tag</span>"


        }else if(minusSlide === 2){
          canNotShow.innerHTML = "<span>Sorry you can not combine Sourcename with Country or Category press clear to reset your tag</span>"

        }else{
          canNotShow.innerHTML = "<span>Sorry you can not combine Language with Country or Category press clear to reset your tag</span>"

        }

      }  else if(countryMinusSlide>1){

          if(minusSlide === 1){
            canNotShow.innerHTML = "<span>Sorry you can not combine Key with Country press clear to reset your tag</span>"

          }else if(minusSlide=== 2){
            canNotShow.innerHTML = "<span>Sorry you can not combine Sourcename with Country press clear to reset your tag</span>"

          }else{
            canNotShow.innerHTML = "<span>Sorry you can not combine Language with Country press clear to reset your tag</span>"

          }

        }else if(categoryMinusSlide>1){

            if(minusSlide === 1){
              canNotShow.innerHTML = "<span>Sorry you can not combine Key with Category press clear to reset your tag</span>"

            }else if(minusSlide === 2){
              canNotShow.innerHTML = "<span>Sorry you can not combine Sourcename with Category press clear to reset your tag</span>"

            }else {
              canNotShow.innerHTML = "<span>Sorry you can not combine Language with Category press clear to reset your tag</span>"

            }


        }


    }else{
      canNotShow.innerHTML= ""
      canNotShow.style.display = "block"

    }



  }else{
    slider.inputKeyword.disabled = false
    slider.inputKeyword.placeholder = "Keyword"

  }





}












for(let i=0; i< sourceSlider.children.length; i++){



    if(sourceSlider.children[i] !== undefined){
      sourceSlider.children[i].addEventListener("click",function(){

          let tag = sourceSlider.children[i];
          contentChangeClick(tag, sourceSlider.children.length, i, sourceSlider.sourceContentChange, sourceMinusSlide, sourceContentChangeWidth )

        })

  }
}

for(let i=0; i< countrySlider.children.length; i++){



    if(countrySlider.children[i] !== undefined){
      countrySlider.children[i].addEventListener("click",function(){

          let tag = countrySlider.children[i];
          contentChangeClick(tag, countrySlider.children.length, i, countrySlider.countryContentChange, countryMinusSlide, countryContentChangeWidth)

        })

  }
}

for(let i=0; i< categorySlider.children.length; i++){



    if(categorySlider.children[i] !== undefined){
      categorySlider.children[i].addEventListener("click",function(){

          let tag = categorySlider.children[i];
          contentChangeClick(tag, categorySlider.children.length, i, categorySlider.categoryContentChange, categoryMinusSlide, categoryContentChangeWidth)

        })

  }
}

for(let i=0; i< languageSlider.children.length; i++){



    if(languageSlider.children[i] !== undefined){
      languageSlider.children[i].addEventListener("click",function(){

          let tag = languageSlider.children[i];
          contentChangeClick(tag, languageSlider.children.length, i, languageSlider.languageContentChange, languageMinusSlide, languageContentChangeWidth)

        })

  }
}


for( let i =0; i< slider.children.length; i++){


  if(slider.children[i] !== undefined){

      slider.children[i].addEventListener("click",function(){

          let tag = slider.children[i];

          contentChangeClick(tag, slider.children.length, i, slider.sliderContentChange, minusSlide, sliderContentChangeWidth)


      })

  }


}



function tagsContentChangeClick(tag, length, i, contentChange, minus, offsetWidth){



  let totalLeft = offsetWidth;

  let nummer = i;



  if(minusSlide>1){

  }else{


  }

  if(nummer>0){
    currenTag.style.top = "-25px"

    canNotShow.style.top = "0px"


  }else{
    canNotShow.style.top = "40px"

  }
  tagsMinusSlide = nummer
  totalLeft =  (nummer * totalLeft).toString()

  contentChange.style.marginLeft = "-" + totalLeft + "px"

  if(contentChange.children[i] !== undefined){
          if(contentChange.children[i].innerText !== "Your tags"){

              let length = contentChange.children[i].children.length
              let string = ""
              for(let x = 0; x< length; x++ ){

                if(x === 0){
                  let ownInputTag = document.createElement("span");
                  ownInputTag.setAttribute("id", "ownInputTag");
                  ownInputTag.innerHTML = contentChange.children[i].children[x].innerHTML;


                  string += "<span id='ownInputTag'>"+ownInputTag.innerHTML+"</span>"
                }
                if(x === 1){
                  let ownSourceTag = document.createElement("span");
                  ownSourceTag.setAttribute("id", "ownSourceTag");
                  ownSourceTag.innerHTML = contentChange.children[i].children[x].innerHTML;



                  string += "<span id='ownSourceTag'>"+ownSourceTag.innerHTML+"</span>"
                }

                if(x === 2){
                  let ownCountryTag = document.createElement("span");
                  ownCountryTag.setAttribute("id", "ownCountryTag");
                  ownCountryTag.innerHTML = contentChange.children[i].children[x].innerHTML;


                  string += "<span id='ownCountryTag'>"+ownCountryTag.innerHTML+"</span>"
                }

                if(x === 3){
                  let ownCategoryTag = document.createElement("span");
                  ownCategoryTag.setAttribute("id", "ownCategoryTag");
                  ownCategoryTag.innerHTML = contentChange.children[i].children[x].innerHTML;


                  string += "<span id='ownCategoryTag'>"+ownCategoryTag.innerHTML+"</span>"
                }
                if(x=== 4){
                  let ownLanguageTag = document.createElement("span");
                  ownLanguageTag.setAttribute("id", "ownLanguageTag");
                  ownLanguageTag.innerHTML = contentChange.children[i].children[x].innerHTML;


                  string += "<span id='ownLanguageTag'>"+ownLanguageTag.innerHTML+"</span>"
                }
              }

            // let ownSourceTag = document.createElement("span");
            // ownSourceTag.innerText = contentChange.children[i].children[1].innerHTML
            // ownSourceTag.setAttribute("id", "ownSourceTag")

              // contentChange.children[i].children[0].setAttribute("id","ownInputTag")
              // contentChange.children[i].children[1].setAttribute("id","ownSourceTag")



          document.getElementById("ownCurrentTag").innerHTML =  string
        }else{
          document.getElementById("ownCurrentTag").innerHTML =  ""

        }
    }

  if(tagsMinusSlide> 0){
    sliderContent.style.display = "none"

    sliderContentSource.style.display = "none"
    sliderContentCountry.style.display = "none"
    sliderContentCategory.style.display = "none"
    sliderContentLanguage.style.display = "none"
    sourceSlider.slider.style.opacity = "0";
    sourceSlider.sourceContentChange.style.display = "none"
    languageSlider.slider.style.opacity = "0";
    languageSlider.languageContentChange.style.display = "none"
    countrySlider.slider.style.opacity = "0";
    countrySlider.countryContentChange.style.display = "none"
    categorySlider.slider.style.opacity = "0";
    categorySlider.categoryContentChange.style.display = "none"

    currentTag.inputTag.innerHTML = "";
    currentTag.sourceTag.innerHTML = "";
    currentTag.countryTag.innerHTML = "";
    currentTag.categoryTag.innerHTML = "";
    currentTag.languageTag.innerHTML = "";


    tagSwitch()

  }else{
    sliderContent.style.display = "block"

    sliderContentSource.style.display = "block"
    sliderContentCountry.style.display = "block"
    sliderContentCategory.style.display = "block"
    sliderContentLanguage.style.display = "block"
    clear()

  }

}


function tagSwitch(tagsMinusSlide){

    sourceCode = "";
    countryCode = "";
    categoryCode = "";
    languageCode = ""

    for(let i =0; i< ownCurrentTag.ownCurrentTag.children.length; i++){
        let child = ownCurrentTag.ownCurrentTag.children[i];



        if(i === 1){


            if(child.innerHTML !== " "){

                let source = child.innerHTML.substring(1, child.length)


              switch (source) {

                case "CNN":
                  sourceCode = 'cnn';
                  break;
                  case "BBC":
                    sourceCode = 'bbc-news';
                    break;
                    case "ABCNews":
                      sourceCode = 'abc-news';
                      break;
                      case "AlJazeera":
                        sourceCode = 'al-jazeera-english';
                        break;
                        case "ESPN":
                          sourceCode = 'espn';
                          break;
                          case "FinancialTimes":
                            sourceCode = 'financial-times';
                            break;
                            case "FoxNews":
                              sourceCode = 'fox-news';
                              break;
                              case "DailyMail":
                                sourceCode = 'daily-mail';
                                break;
                                case "TheGuardian":
                                  sourceCode = 'the-guardian-uk';
                                  break;
                                  case "TheNewYorkTimes":
                                    sourceCode = 'the-new-york-times';
                                    break;
                                    case "IGN":
                                      sourceCode = 'ign';
                                      break;
                                      case "CNNSpanish":
                                        sourceCode = 'cnn-es';
                                        break;
                                        case "Bloomberg":
                                          sourceCode = 'bloomberg';
                                          break;
                                          case "CBS":
                                            sourceCode = 'cbs-news';
                                            break;
                            default:

              }
            }
        }

        if(i === 2){

              if(child.innerHTML !== " "){

                let country = child.innerHTML.substring(1, child.length)

                switch (country) {

                  case "USA":
                    countryCode = 'us';
                    break;
                  case "Canada":
                    countryCode = 'ca';
                    break;
                  case "England":
                    countryCode = 'gb';
                    break;
                  case "Germany":
                  countryCode = 'de';
                    break;
                  case "France":
                  countryCode = 'fr';
                    break;
                  case "Australia":
                  countryCode = 'au';
                    break;
                  case "NewZeeland":
                  countryCode = 'nz';
                    break;
                  case "China":
                  countryCode = 'ch';
                    break;
                  case "Japan":
                  countryCode = 'jp';
                    break;
                  case "Russia":
                  countryCode = 'ru';
                    break;
                  case "Spain":
                  countryCode = 'es';
                    break;
                  case "Sweden":
                  countryCode = 'se';
                    break;
                  case "Norway":
                  countryCode = 'no';
                    break;
                  case "Turkey":
                  countryCode = 'tr';
                    break;


                  default:
              }

        }
    }

    if(i ===3){

      if(child.innerHTML !== " "){

        let category = child.innerHTML.substring(1, child.length)

        switch (category) {

          case "Business":
            categoryCode = 'business';
            break;
          case "Entertainment":
            categoryCode = 'entertainment';
            break;
          case "General":
            categoryCode = 'general';
            break;
          case "Health":
            categoryCode = 'health';
            break;
          case "Science":
            categoryCode = 'science';
            break;
          case "Sport":
            categoryCode = 'sports';
            break;
          case "Technology":
            categoryCode = 'technology';
            break;



          default:

        }


      }
    }

    if(i === 4){

      let language = child.innerHTML.substring(1, child.length)

      switch (language) {

        case "Arabic":
          languageCode = 'ar';
          break;
        case "English":
          languageCode = 'en';
          break;
        case "Spanish":
        languageCode = 'es';
          break;
        case "French":
        languageCode = 'fr';
          break;
        case "Hebrew":
        languageCode = 'he';
          break;
        case "Italian":
        languageCode = 'it';
          break;
        case "Dutch":
        languageCode = 'nl';
          break;
        case "Norweigan":
        languageCode = 'no';
          break;
        case "Portugues":
        languageCode = 'pt';
          break;
        case "Russian":
        languageCode = 'ru';
          break;
        case "Swedish":
        languageCode = 'se';
          break;

        default:

      }
    }

}

}
let more = document.getElementById("more")

more.addEventListener("click",function(){

  let button = document.getElementById("buttons")

  if(more.innerHTML === "More options"){

    button.style.display = "flex"
    more.innerHTML = "Hide options"
  }else{
    button.style.display = "none"
    more.innerHTML = "More options"

  }


})
