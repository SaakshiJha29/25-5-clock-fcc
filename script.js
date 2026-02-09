let breakLen = 5;
let sessionLen = 25;

let mins = sessionLen;
let secs = 0;
let timer;
let running = false;
let mode = "session";

const timeEl = document.getElementById("time-left");
const beep = document.getElementById("beep");

function format(){
  return `${mins.toString().padStart(2,"0")}:${secs.toString().padStart(2,"0")}`;
}

function updateDisplay(){
  timeEl.textContent = format();
}

function tick(){
  if(secs === 0){
    if(mins === 0){
      beep.play();
      if(mode==="session"){
        mode="break";
        mins=breakLen;
      }else{
        mode="session";
        mins=sessionLen;
      }
      secs=0;
      document.getElementById("timer-label").textContent = mode;
      return;
    }
    mins--;
    secs=59;
  }else{
    secs--;
  }
  updateDisplay();
}

document.getElementById("start_stop").onclick = ()=>{
  if(!running){
    timer = setInterval(tick,1000);
    running=true;
  }else{
    clearInterval(timer);
    running=false;
  }
};

document.getElementById("reset").onclick = ()=>{
  clearInterval(timer);
  running=false;
  breakLen=5;
  sessionLen=25;
  mins=25;
  secs=0;
  mode="session";
  beep.pause();
  beep.currentTime=0;

  document.getElementById("break-length").textContent=5;
  document.getElementById("session-length").textContent=25;
  document.getElementById("timer-label").textContent="Session";
  updateDisplay();
};

document.getElementById("break-inc").onclick=()=>{
  breakLen++;
  document.getElementById("break-length").textContent=breakLen;
};

document.getElementById("break-dec").onclick=()=>{
  if(breakLen>1) breakLen--;
  document.getElementById("break-length").textContent=breakLen;
};

document.getElementById("session-inc").onclick=()=>{
  sessionLen++;
  document.getElementById("session-length").textContent=sessionLen;
  mins=sessionLen;
  updateDisplay();
};

document.getElementById("session-dec").onclick=()=>{
  if(sessionLen>1) sessionLen--;
  document.getElementById("session-length").textContent=sessionLen;
  mins=sessionLen;
  updateDisplay();
};

updateDisplay();
