var Clock =  function(config, x, y){
  'use strict';
  var clock = this;
  clock.id = document.getElementsByClassName('clock').length;
  clock.hrs = config.hrs;
  clock.min = config.min;
  clock.sec = config.sec;
  clock.paused = false;
  clock.interval;
  clock.createClock(x, y);
  clock.start();
}
//Clock creator
Clock.prototype.createClock = function(x, y){
  var clockContainer = document.createElement("div");
  clockContainer.setAttribute("class", "clock");
  clockContainer.setAttribute("id", "clock_"+this.id);
  clockContainer.setAttribute("style","position: absolute; left:"+x+"px; top:"+y+"px;");
  var h1 = document.createElement("h1");
  this.secElm = document.createElement("span");
  this.secElm.setAttribute('class', 'sec');
  this.secElm.textContent = '00';
  this.minElm = document.createElement("span");
  this.minElm.setAttribute('class', 'min');
  this.minElm.textContent = '00';
  this.hrsElm = document.createElement("span");
  this.hrsElm.setAttribute('class', 'hrs');
  this.hrsElm.textContent = '00';
  h1.appendChild(this.hrsElm);
  h1.appendChild(document.createTextNode(" : "));
  h1.appendChild(this.minElm);
  h1.appendChild(document.createTextNode(" : "));
  h1.appendChild(this.secElm);
  clockContainer.appendChild(h1);
  var label = document.createTextNode("Resume");
  this.resumeBtn = document.createElement("button");
  this.resumeBtn.setAttribute('type', 'button');
  this.resumeBtn.setAttribute('class', 'resumeBtn');
  this.resumeBtn.appendChild(label);
  clockContainer.appendChild(this.resumeBtn);
  label = document.createTextNode("Pause");
  this.pauseBtn = document.createElement("button");
  this.pauseBtn.setAttribute('type', 'button');
  this.pauseBtn.setAttribute('class', 'pauseBtn');
  this.pauseBtn.appendChild(label);
  clockContainer.appendChild(this.pauseBtn);
  label = document.createTextNode("Restart");
  this.restartBtn = document.createElement("button");
  this.restartBtn.setAttribute('type', 'button');
  this.restartBtn.setAttribute('class', 'restartBtn');
  this.restartBtn.appendChild(label);
  clockContainer.appendChild(this.restartBtn);

  document.body.appendChild(clockContainer);

  var clock = this;
  this.resumeBtn.addEventListener("click", function(){
    clock.resume();
    if (clock.paused == false){
      clock.resumeBtn.disabled = true;
      clock.pauseBtn.disabled = false;
    }
  });
  this.pauseBtn.addEventListener("click", function(){
    clock.pause();
    if (clock.paused){ //disable the pause btn if clock.pause(); worked
      clock.resumeBtn.disabled = false;
      clock.pauseBtn.disabled = true;
    }
  });
  this.restartBtn.addEventListener("click", function(){
    clock.restart();
    clock.resumeBtn.disabled = true;
    clock.pauseBtn.disabled = false;
  });
}
//Data handlers
Clock.prototype.addSecond = function(){
  if (this.sec < 59){
    this.sec ++;
  }else{
    this.sec = 0;
    this.addMin();
  }
  this.paintSec();
}
Clock.prototype.addMin = function(){
  if (this.min < 59){
    this.min ++;
  }else{
    this.min = 0;
    this.addHour();
  }
  this.paintMin();
}
Clock.prototype.addHour = function(){
  if (this.hrs < 23){
    this.hrs ++;
  }else{
    this.hrs = 0;
  }
  this.paintHrs();
}
//Controls
Clock.prototype.start = function(){
  var clock =  this;
  clock.interval = setInterval(function(){
    clock.addSecond();
  }, 1000);
}
Clock.prototype.resume = function(){
  if (this.paused == true){
    this.paused = false;
    this.start();
  }
}
Clock.prototype.pause = function(){
  if (this.paused == false){
    this.paused = true;
    clearInterval(this.interval);
  }
}
Clock.prototype.restart = function(){
  this.pause();
  this.sec = 0;
  this.paintSec();
  this.min = 0;
  this.paintMin();
  this.hrs = 0;
  this.paintHrs();
  this.resume();
}
//Painters
Clock.prototype.paintSec = function(){
  if (this.sec > 9){
     this.secElm.innerHTML = this.sec;
  }else{
    this.secElm.innerHTML = '0' + this.sec;
  }
}
Clock.prototype.paintMin = function(){
  if (this.min > 9){
     this.minElm.innerHTML = this.min;
  }else{
    this.minElm.innerHTML = '0' + this.min;
  }
}
Clock.prototype.paintHrs = function(){
  if (this.hrs > 9){
     this.hrsElm.innerHTML = this.hrs;
  }else{
    this.hrsElm.innerHTML = '0' + this.hrs;
  }
}
