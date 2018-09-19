window.addEventListener("load", showClock)
/*Blev tvungen att göra en egen jsfil för klockan p.g.a den krockade med min kod */
 function showClock() {
        let idag = new Date();
        let time = document.getElementById("time");
        var h = idag.getHours();
        var m = idag.getMinutes();
        var s = idag.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        time.innerHTML = "Current Time: " + h + ":" + m + ":" + s;
                var t = setTimeout(showClock, 600);
        }
            function checkTime(i) {
                if (i < 10) {i = "0" + i};
                return i;
        }
