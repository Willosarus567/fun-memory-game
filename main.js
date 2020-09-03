var timer = document.getElementById('timer');
var toggleBtn = document.getElementById('memory-card');
var resetBtn = document.getElementById('btnClick2'); 

var watch = new Stopwatch(timer);

function start() {
    toggleBtn.textContent = 'memory-card';
    watch.start();
}

function stop() {
    toggleBtn.textContent = 'btnClick2'; 
    watch.stop();
}

toggleBtn.addEventListener('click', function() {
    watch.isOn ? stop(): watch.start(); 
});

resetBtn.addEventListener('click', function() {
    watch.reset(); 
}); 