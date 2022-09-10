const body = document.getElementsByTagName('body')[0];

const btnLight = document.getElementById('btn-light');
const btnDark = document.getElementById('btn-dark');

const btnPlay = document.getElementById('btn-play');
const btnPause = document.getElementById('btn-pause');
const btnStop = document.getElementById('btn-stop');

const elSeconds = document.getElementById('timer-seconds');
const elMinutes = document.getElementById('timer-minutes');
const elHours = document.getElementById('timer-hours');

var tid = setInterval(handleTimer, 1000);
var timerSeconds = 0;
var timerMinutes = 0;
var timerHours = 0;

var isPausedTimer = true;

function handleLightTheme() {
    body.classList.remove('dark');
    btnDark.classList.remove('active');

    body.classList.add('light');
    btnLight.classList.add('active');
}

function handleDarkTheme() {
    body.classList.remove('light');
    btnLight.classList.remove('active');

    body.classList.add('dark');
    btnDark.classList.add('active');
}

function handleTimer() {
    if (isPausedTimer) {
        return;
    }

    timerSeconds++;

    if (timerSeconds >= 60){
        timerSeconds = 0;
        timerMinutes ++;
    }

    if (timerMinutes >= 60) {
        timerMinutes = 0;
        timerHours ++;
    }

    renderTime();
}

function handleStartTimer() {
    isPausedTimer = false;

    if (tid == null)
        tid = setInterval(handleTimer, 1000);

    btnPlay.disabled = true;
    btnPause.disabled = false;
    btnStop.disabled = false;
}

function handleStopTimer() {
    clearInterval(tid);

    timerSeconds = 0;
    timerMinutes = 0;
    timerHours = 0;
    tid = null;

    btnPlay.disabled = false;
    btnPause.disabled = true;
    btnStop.disabled = true;

    renderTime();
}

function handlePauseTimer() {
    isPausedTimer = true;

    btnPlay.disabled = false;
    btnPause.disabled = true;
    btnStop.disabled = false;
}

function renderTime() {
    let seconds = pad(timerSeconds, 2);
    let minutes = pad(timerMinutes, 2);
    let hours = pad(timerHours, 2);

    elSeconds.innerHTML = seconds;
    elMinutes.innerHTML = minutes;
    elHours.innerHTML = hours;
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

btnLight.addEventListener('click', handleLightTheme);
btnDark.addEventListener('click', handleDarkTheme);

btnPlay.addEventListener('click', handleStartTimer);
btnStop.addEventListener('click', handleStopTimer);
btnPause.addEventListener('click', handlePauseTimer);