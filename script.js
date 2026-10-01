/* =====================================
FAKE OS
script.js
===================================== */

const bootScreen = document.getElementById("bootScreen");
const loginScreen = document.getElementById("loginScreen");
const desktop = document.getElementById("desktop");

const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");

const startButton = document.getElementById("startButton");
const startMenu = document.getElementById("startMenu");

const clock = document.getElementById("clock");

const shutdownBtn = document.getElementById("shutdown");

/* ===========================
비밀번호
=========================== */

if(localStorage.getItem("osPassword") === null){

    localStorage.setItem("osPassword","1234");

}

/* ===========================
부팅
=========================== */

window.addEventListener("load",()=>{

    setTimeout(()=>{

        bootScreen.style.display="none";

        loginScreen.style.display="flex";

    },2600);

});

/* ===========================
로그인
=========================== */

function login(){

    const savedPassword = localStorage.getItem("osPassword");

    if(passwordInput.value===savedPassword){

        loginScreen.style.display="none";

        desktop.style.display="block";

        passwordInput.value="";

        loginError.textContent="";

    }

    else{

        loginError.textContent="비밀번호가 올바르지 않습니다.";

        passwordInput.value="";

    }

}

loginBtn.onclick=login;

passwordInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        login();

    }

});

/* ===========================
시계
=========================== */

function updateClock(){

    const now=new Date();

    let h=String(now.getHours()).padStart(2,"0");
    let m=String(now.getMinutes()).padStart(2,"0");

    clock.textContent=h+":"+m;

}

updateClock();

setInterval(updateClock,1000);

/* ===========================
시작메뉴
=========================== */

startButton.onclick=()=>{

    if(startMenu.style.display==="block"){

        startMenu.style.display="none";

    }

    else{

        startMenu.style.display="block";

    }

};

document.addEventListener("click",(e)=>{

    if(

        !startMenu.contains(e.target)

        &&

        !startButton.contains(e.target)

    ){

        startMenu.style.display="none";

    }

});

/* ===========================
종료
=========================== */

shutdownBtn.onclick=()=>{

    desktop.style.display="none";

    bootScreen.style.display="flex";

    startMenu.style.display="none";

    setTimeout(()=>{

        bootScreen.style.display="none";

        loginScreen.style.display="flex";

    },2500);

};

/* ===========================
자동저장 준비
=========================== */

function save(key,value){

    localStorage.setItem(key,JSON.stringify(value));

}

function load(key,defaultValue){

    const data=localStorage.getItem(key);

    if(data===null){

        return defaultValue;

    }

    return JSON.parse(data);

}
/* =====================================
WINDOW ENGINE
===================================== */

const windows = document.getElementById("windows");

let highestZ = 100;

/* 창 생성 */

function createWindow(title, content){

    highestZ++;

    const win = document.createElement("div");

    win.className = "window";

    win.style.zIndex = highestZ;

    win.innerHTML =

    `
    <div class="titlebar">

        <div class="window-title">${title}</div>

        <div class="window-buttons">

            <button class="minBtn">─</button>

            <button class="maxBtn">□</button>

            <button class="closeBtn">✕</button>

        </div>

    </div>

    <div class="window-content">

        ${content}

    </div>
    `;

    windows.appendChild(win);

    dragWindow(win);

    activateWindow(win);

    setupButtons(win);

    return win;

}
