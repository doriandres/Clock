var Clock =  function(config){
  'use strict';
  var clock = this;
  clock.hrs = config.data.hrs;
  clock.min = config.data.min;
  clock.sec = config.data.sec;
  clock.paused = false;
  clock.interval;
  clock.secElm = document.getElementById(config.views.sec);
  clock.minElm = document.getElementById(config.views.min);
  clock.hrsElm = document.getElementById(config.views.hrs);
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
