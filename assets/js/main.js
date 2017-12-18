(function(){
  var config = {
    data : { //The default value for the clock
      sec: 0,
      min: 0,
      hrs: 0,
    },
    views : { //The id of the HTML elements we want to use to display each value
      sec: 'sec',
      min: 'min',
      hrs: 'hrs',
    }
  };
  var clock = new Clock(config); //Create a clock using a configuration
  clock.start();

  //Controls
  var resumeBtn = document.getElementById('resumeBtn');
  var pauseBtn = document.getElementById('pauseBtn');
  var restartBtn = document.getElementById('restartBtn');

  resumeBtn.addEventListener('click', function(){
    clock.resume();

    if (clock.paused == false){ //disable the resume btn if clock.resume(); worked
      resumeBtn.disabled = true;
      pauseBtn.disabled = false;
    }
  });
  pauseBtn.addEventListener('click',  function(){
    clock.pause();
    if (clock.paused){ //disable the pause btn if clock.pause(); worked
      resumeBtn.disabled = false;
      pauseBtn.disabled = true;
    }
  });
  restartBtn.addEventListener('click', function(){
    clock.restart();
    //disable btns as default
    resumeBtn.disabled = true;
    pauseBtn.disabled = false;
  });

})();
