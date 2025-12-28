// Dark and Light theme toggle
trigg = document.getElementById('themeToggle');
trigg.addEventListener('click', function() {
    const currentTheme = document.body.className;
    var switcher = document.getElementById('themeToggle');
    var link1 = document.getElementById('link-1');
    var link2 = document.getElementById('link-2');
    var link3 = document.getElementById('link-3');
    if (currentTheme === 'light-theme') {
      document.body.className = 'dark-theme';
      switcher.className = 'dark-theme';
      link1.className = 'dark-theme';
      link2.className = 'dark-theme';
      link3.className = 'dark-theme';
    } else {
      document.body.className = 'light-theme';
      switcher.className = 'light-theme';
      link1.className = 'light-theme';
      link2.className = 'light-theme';
      link3.className = 'light-theme';
    } 
});
trigg.click();


// Time
function digitalClock() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
       //* добавление ведущих нулей */
      if (hours < 10) hours = "0" + hours;
      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;
        document.getElementById("id_clock").innerHTML = hours + ":" + minutes + ":" + seconds;
        setTimeout("digitalClock()", 1000);
   }
digitalClock();


// Visibility erection 
document.getElementById('link-1').addEventListener('click', function() {
  document.getElementById('tc').style.display = 'flex';
  document.getElementById('wc').style.display = 'none';
  document.getElementById('ac').style.display = 'none';
})
document.getElementById('link-2').addEventListener('click', function() {
  document.getElementById('tc').style.display = 'none';
  document.getElementById('wc').style.display = 'flex';
  document.getElementById('ac').style.display = 'none';
})
document.getElementById('link-3').addEventListener('click', function() {
  document.getElementById('tc').style.display = 'none';
  document.getElementById('wc').style.display = 'none';
  document.getElementById('ac').style.display = 'flex';
});
document.getElementById('id_clock').addEventListener('click', function() { 
  document.getElementById('tc').style.display = 'none';
  document.getElementById('wc').style.display = 'none';
  document.getElementById('ac').style.display = 'none';
});



// Timer
document.addEventListener('DOMContentLoaded', function() {
// Элементы DOM
const daysInput = document.getElementById('days');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

let countdown;
let totalSeconds = 0;
let isPaused = false;
let remainingSeconds = 0;

// Функция обновления отображения таймера
function updateDisplay() {
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    display.textContent = `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Функция запуска таймера
function startTimer() {
    if (totalSeconds <= 0 && !isPaused) {
        const days = parseInt(daysInput.value) || 0;
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        
        totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;
        
        if (totalSeconds <= 0) {
            // shit
            return;
        }
    } else if (isPaused) {
        totalSeconds = remainingSeconds;
        isPaused = false;
    }
    
    // Блокировка inputs и активация кнопок
    daysInput.disabled = true;
    hoursInput.disabled = true;
    minutesInput.disabled = true;
    secondsInput.disabled = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    
    // Запуск обратного отсчета
    countdown = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateDisplay();
        } else {
            clearInterval(countdown);
            // Воспроизведение звука по окончании
            const audio = document.getElementById('timerSound');
            audio.play().catch(e => console.log("Автовоспроизведение звука заблокировано"));
            alert('Время вышло!');
            audio.pause();
            resetTimer();
        }
    }, 1000);
}

// Функция паузы таймера
function pauseTimer() {
    clearInterval(countdown);
    isPaused = true;
    remainingSeconds = totalSeconds;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

// Функция сброса таймера
function resetTimer() {
    clearInterval(countdown);
    totalSeconds = 0;
    isPaused = false;
    daysInput.value = 0;
    hoursInput.value = 0;
    minutesInput.value = 0;
    secondsInput.value = 0;
    updateDisplay();
    
    // Разблокировка inputs и кнопок
    daysInput.disabled = false;
    hoursInput.disabled = false;
    minutesInput.disabled = false;
    secondsInput.disabled = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
}

// Обработчики событий для кнопок
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Валидация ввода
const inputs = [daysInput, hoursInput, minutesInput, secondsInput];
inputs.forEach(input => {
    input.addEventListener('change', function() {
        if (this.value < 0) this.value = 0;
        if (this.id === 'hours' && this.value > 23) this.value = 23;
        if ((this.id === 'minutes' || this.id === 'seconds') && this.value > 59) this.value = 59;
    });
});

// Инициализация отображения
updateDisplay();
});


// Stopwatch
let timer = document.getElementById('stopwatch');
let startBtnn = document.getElementById('startBtnn');
let pauseBtnn = document.getElementById('pauseBtnn');
let resetBtnn = document.getElementById('resetBtnn');
let seconds = 0;
let minutes = 0;
let hours = 0;
let interval;

function updateTime() {
  seconds++; 
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }
  if (minutes === 60) {
    hours++;
    minutes = 0;
  }
  timer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

startBtnn.addEventListener('click', () => {
  interval = setInterval(updateTime, 1000);
  startBtnn.disabled = true;
  pauseBtnn.disabled = false;
  resetBtnn.disabled = false;
});
pauseBtnn.addEventListener('click', () => {
  clearInterval(interval);
  startBtnn.disabled = false;
  pauseBtnn.disabled = true;
});
resetBtnn.addEventListener('click', () => {
  clearInterval(interval);
  seconds = 0;
  minutes = 0;
  hours = 0;
  timer.textContent = '00:00:00';
  startBtnn.disabled = false;
  pauseBtnn.disabled = true;
  resetBtnn.disabled = true;
});


// Alarm
let alarmTime = null;
let alarmTimeout = null;
let isAlarmSet = false;

// Обновление текущего времени
function updateCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    document.getElementById('currentTime').textContent = 
        `${hours}:${minutes}:${seconds}`;
    
    // Проверка срабатывания будильника
    checkAlarm(now);
}

// Установка будильника
function setAlarm() {
    const alarmTimeValue = document.getElementById('alarmTime').value;
    
    if (!alarmTimeValue) {
        alert('Пожалуйста, выберите время!');
        return;
    }
    
    alarmTime = alarmTimeValue;
    isAlarmSet = true;
    
    const [hours, minutes] = alarmTime.split(':');
    document.getElementById('alarmStatus').textContent = 
        `Установлен на ${hours}:${minutes}`;
    
    alert(`Будильник установлен на ${hours}:${minutes}`);
}

// Проверка срабатывания будильника
function checkAlarm(now) {
    if (!isAlarmSet || !alarmTime) return;
    
    const currentHours = now.getHours().toString().padStart(2, '0');
    const currentMinutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${currentHours}:${currentMinutes}`;
    
    if (currentTime === alarmTime) {
        triggerAlarm();
    }
}

// Срабатывание будильника
function triggerAlarm() {
    const alarmSound = document.getElementById('alarmSound');
    
    // Попытка воспроизведения звука
    alarmSound.play().catch(error => {
        console.log('Автовоспроизведение заблокировано:', error);
        alert('Будильник! Время пришло!');
    });
    
    document.getElementById('alarmStatus').textContent = 'Сработал!';
    
    isAlarmSet = false;
}

// Остановка будильника
function stopAlarm() {
    const alarmSound = document.getElementById('alarmSound');
    alarmSound.pause();
    alarmSound.currentTime = 0;
    isAlarmSet = false;
    alarmTime = null;
    
    document.getElementById('alarmStatus').textContent = 'Остановлен';
    
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alarmTimeout = null;
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Обновление времени каждую секунду
    setInterval(updateCurrentTime, 1000);
    updateCurrentTime(); // Первоначальное обновление
});

/* 
nav-container 
time-container
timer-container
input-group
buttons
watch-container
alarm-container
*/