let animitems = document.querySelectorAll('._anim-items')
const timerContainer = document.getElementById('timerContainer');

const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

if (animitems.length > 0) {
    window.addEventListener("scroll", animOnScroll);
    function animOnScroll(params) {
        for (let i = 0; i < animitems.length; i++) {
            const animitem = animitems[i]
            const animitemHeight = animitem.offsetHeight
            const animitemOffset = offset(animitem).top
            const animStart = 1;

            let animitemPoint = window.innerHeight - animitemHeight / animStart;

            if (animitemHeight > window.innerHeight) {
                animitemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animitemOffset - animitemPoint) && pageYOffset < (animitemOffset + animitemHeight)) {
                animitem.classList.add("active")
            } else {
                animitem.classList.remove("active")
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect();
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }

}

const $calendar = document.querySelector('#calendar');

function renderCalendarDays() {

    $calendar.innerHTML = '';

    const daysNames = ["Երկ", "Երք", "Չրք", "Հնգ", "Ուրբ", "Շաբ", "Կիր"];

    daysNames.forEach(el => {
        const day = document.createElement('div');
        day.textContent = el;
        day.className = 'name hidden';
        $calendar.appendChild(day);
    });

    for (let i = 1; i <= 31; i++) {
        const day = document.createElement('div');
        day.className = 'block hidden';
        day.textContent = i;
        $calendar.appendChild(day);
    }

    const blocks = document.querySelectorAll('.block');

    for (let i = 21; i < 28; i++) {
        if (blocks[i]) blocks[i].classList.remove('hidden');
    }

    blocks.forEach(block => {
        if (block.textContent.trim() === "25") {
            const heart = document.createElement("div");
            heart.className = "hearth";
            heart.style.backgroundImage = 'url("images/heart.png")';
            heart.style.width = '60px';
            heart.style.height = '60px';
            heart.style.backgroundSize = 'contain';
            heart.style.backgroundRepeat = 'no-repeat';
            block.style.position = "relative";
            block.appendChild(heart);
        }
    });
}


function disableScroll() {
    document.body.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = '';
}

disableScroll();

setTimeout(enableScroll, 5000);

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

renderCalendarDays();

const targetDate = new Date('2025-12-25T00:00:00');

function calculateTimeLeft() {
    const difference = targetDate - new Date();
    if (difference <= 0) return null;

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
}


function disableScroll() {
    document.body.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = '';
}

disableScroll();

setTimeout(enableScroll, 5000);

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}


function updateTimer() {
    const timeLeft = calculateTimeLeft();

    if (!timeLeft) {
        timerContainer.innerHTML = '<div style="font-size: 24px; color: red;">Time over</div>';
        return;
    }

    daysElement.textContent = String(timeLeft.days).padStart(2, '0');
    hoursElement.textContent = String(timeLeft.hours).padStart(2, '0');
    minutesElement.textContent = String(timeLeft.minutes).padStart(2, '0');
    secondsElement.textContent = String(timeLeft.seconds).padStart(2, '0');
}

setInterval(updateTimer, 1000);
updateTimer();