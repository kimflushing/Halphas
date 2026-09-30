function login(){

document.getElementById("login-screen").style.display="none";

document.getElementById("desktop").style.display="block";

}



function clock(){

let now=new Date();

let h=String(now.getHours()).padStart(2,"0");

let m=String(now.getMinutes()).padStart(2,"0");


document.getElementById("clock").innerHTML=h+":"+m;


}


setInterval(clock,1000);

clock();