var nameBox = document.getElementById("gamerName");
var nameGamer = document.getElementById("gamer");
var game = document.getElementById("game");
var picture = document.getElementById("picture");
var btnPlay = document.getElementById("btnPlay");
var rate = document.getElementById("rate");
var mt = document.getElementById("min-tem");
var st = document.getElementById("sec-tem");
var c1 = document.getElementById("c1");
var c2 = document.getElementById("c2");
var c3 = document.getElementById("c3");
var boom = document.getElementById("boom");
var detonador = document.getElementById("detonador");
var clock = document.getElementById("clock");
var msn = document.getElementById("msn");
var media = document.querySelector("audio");
var reset = document.getElementById("reset");
var gamer;
var time;
var stopTempo;
var stopTempoAcele
var rateName;
var rateTime;
var ctrlCookie = false;
var c = document.cookie;
var cList = [];

isVisibleBox();
isVisiblePicture();
document.getElementById("loser").classList.add("is-hidden");
//explota bomba
function cut1() {
    document.getElementById("loser").classList.remove("is-hidden");
    // boom.style.backgroundImage = "url(images/bomda-boom.png)";
    noVisibleBox();
    isVisiblePicture();
    noVisibleBtn();
    msn.innerHTML = "...perdiste... ";
    clearInterval(stopTempo);
    clearInterval(stopTempoAcele);
    media.pause();
}
//acelera temporalizador
function cut2() {
    msn.innerHTML = "Te equivocaste el tiempo se acelera ";
    clearInterval(stopTempo);
    tempoAcele();
}
//desactiva bomba
function cut3() {
    msn.innerHTML = "enhorabuena... puntuacion " + (time + 1);
    gamer = nameBox.value;
    media.pause();
    clearInterval(stopTempo);
    clearInterval(stopTempoAcele);
    addCookie();
    isVisibleCable();
}
//  añade y comprueba la cookie
function addCookie() {
    if (ctrlCookie !== false) {
        if ((time + 1) > rateTime) {
            c = gamer + "=" + (time + 1);
            document.cookie = c + ';' + cList;
            rate.innerHTML = (time + 1);
        }
    } else {
        c = gamer + "=" + (time + 1);
        document.cookie = c + ';' + cList;
        rate.innerHTML = (time + 1);
    }
}
//comprueba gamer en la cookie
function emptyCookie() {
    if (c !== ' ') {
        existeCookie();
    }
}
//function
function existeCookie() {
    var gCookies = c.split(";");
    for (x in gCookies) {
        var n = gCookies[x].split("=");
        for (var x = 0; x < n.length - 1; x++) {
            if (n[0] == nameBox.value) {
                rateName = n[0];
                rateTime = n[1];
                rate.innerHTML = n[1];
                ctrlCookie = true; //si existe cookie del jugador
            } else {
                cList += n[0] + '=' + n[1];
            }
        }
    }
}
//change el onclick
function changeIdCable() {
    switch (Math.floor(Math.random() * 3)) {

        case 0:
            c1.onclick = cut1;
            c2.onclick = cut2;
            c3.onclick = cut3;
            break;
        case 1:
            c1.onclick = cut2;
            c2.onclick = cut3;
            c3.onclick = cut1;
            break;
        case 2:
            c1.onclick = cut3;
            c2.onclick = cut1;
            c3.onclick = cut2;
            break;
    }
}
//change background color
function changeBgc() {
    switch (Math.floor(Math.random() * 3)) {
        case 0:
            cab1.style.backgroundColor = "green";
            cab2.style.backgroundColor = "red";
            cab3.style.backgroundColor = "yellow";
            break;
        case 1:
            cab1.style.backgroundColor = "yellow";
            cab2.style.backgroundColor = "green";
            cab3.style.backgroundColor = "red";
            break;
        case 2:
            cab1.style.backgroundColor = "red";
            cab2.style.backgroundColor = "yellow";
            cab3.style.backgroundColor = "green";
            break;
    }
}
//random cables
function cutAleatorio() {
    changeBgc();
    changeIdCable();
}
//inicia  el juego
function gamePlay() {

    if (verGame()) {
        media.play();
        resetTempo();
        cutAleatorio();
        emptyCookie();
        tempo();
    }
}
//temporalizador acelerado
function tempoAcele() {
    stopTempoAcele = setInterval(endTempoAcele, 500);
    media.playbackRate = 3.5;
}
//comprobacion de temporalizador acelerado llegue a 0
function endTempoAcele() {
    // time=time-2;
    if (time >= 2) {
        st.innerHTML = ("0" + (time = time - 2)).slice(-2);
        console.log(time);
    } else {
        clearInterval(stopTempoAcele);
        noVisibleBox();
        isVisiblePicture();
        noVisibleBtn();
        document.getElementById("loser").classList.remove("is-hidden");
        msn.innerHTML = "...perdiste... ";
    }
}
//temporalizador
function tempo() {
    stopTempo = setInterval(endTempo, 1000);
}
//comprobacion de temporalizador llegue a 0
function endTempo() {
    if (time != -1) {
        st.innerHTML = ("0" + time--).slice(-2);
        console.log(time);
    } else {
        clearInterval(stopTempo);
        noVisibleBox();
        isVisiblePicture();
        noVisibleBtn();
        document.getElementById("loser").classList.remove("is-hidden");
        msn.innerHTML = "...perdiste... ";
    }
}
//resetea contador
function resetTempo() {
    time = 40; //Math.floor(media.duration);
}
//comprueba el nombre
function verGame() {
    if (isTrim(nameBox.value).length < 3 || isTrim(nameBox.value) == '') {
        msn.innerHTML = "escribe mas de 3 caracteres"
        return false;
    } else {
        msn.innerHTML = 'comienza el juego';
        showGame();
        showGamer();
        return true;
    }
}
//vizualiza el gamer
function showGamer() {
    console.log(nameBox.value);
    nameGamer.innerHTML = isTrim(nameBox.value);
}
//vizualizar el juego
function showGame() {
    noVisibleBox();
    noVisiblePicture();
    isVisiblePlay();
    picture.classList.add('is-white');
    document.getElementById("play").classList.toggle("play");
    document.getElementById("play").classList.toggle("is-hidden");
}
//quitamos espacios trim()
function isTrim(s) {
    return s.trim();
}
//boton reiniciar
function resetPlay() {
    nameBox.value = '';
    resetTempo();
    media.pause();
    media.currentTime = 0;
    media.playbackRate = 1;
   // 
    clearInterval(stopTempo);
    clearInterval(stopTempoAcele);
    msn.innerHTML = "no te pongas nervios";
    isVisibleBox();
    isVisiblePicture();
    noVisiblePlay();
    document.getElementById("loser").classList.add("is-hidden");
    document.getElementById("play").classList.add("play");
    document.getElementById("play").classList.remove("is-hidden");
    
}
// visible box datos gamer
function isVisibleBox() {
    game.classList.add('is-visible');
}

function noVisibleBox() {
    game.classList.remove('is-visible');
}
//visible picture
function noVisiblePicture() {
    picture.classList.remove('is-visible'); //
    picture.classList.add('is-white');
    picture.classList.remove('is-visible'); //
    picture.classList.remove('is-white');
    boom.classList.remove('is-visible'); //
    cable.classList.remove('is-visible'); //
    detonador.classList.remove('is-visible'); //
    reset.classList.remove("is-visible");
}

function isVisiblePicture() {
    picture.classList.remove('is-white');
    picture.classList.add('is-visible'); //
    picture.classList.add('is-white');
    boom.classList.add('is-visible'); //
    detonador.classList.add('is-visible'); //
    isVisibleCable();
    isVisibleBtn();
}
//visible boton reset
function isVisibleBtn() {
    reset.classList.add("is-visible");
}

function noVisibleBtn() {
    reset.classList.remove("is-visible");
}
//visible cables
function isVisibleCable() {
    cable.classList.add('is-visible'); //
}

function noVisibleCable() {
    cable.classList.remove('is-visible'); //
}
//visible boton play
function isVisiblePlay() {
    btnPlay.classList.add('is-visible');
}

function noVisiblePlay() {
    btnPlay.classList.remove('is-visible');
}