const screens = document.querySelectorAll('.screen');
const chooseBoberBtn = document.querySelectorAll('.choose-bober-btn');
const startButton = document.getElementById('start-btn');
const gameNode = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const bober2 = document.querySelector('.bober2')


let seconds = 0;
let score = 0;
let selectBober = {};

startButton.addEventListener('click', () =>{
    screens[0].classList.remove('visible');
    screens[1].classList.add('visible');
});

chooseBoberBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');

        selectBober = { src };

        screens[1].classList.remove('visible');
        screens[2].classList.add('visible');

        startGame();
    });
});

function startGame() {
    setInterval(increaseTime, 1000)
    createBober();
}

function increaseTime() {
    timeEl.innerHTML = `time: ${seconds}`;
    seconds++;
}

function createBober() {
    const { x, y } = getRandomLocation();
    
    const bober = document.createElement('img')
    bober.src = selectBober.src;
    
    bober.classList.add('bober');
    bober.style.display = 'block';
    bober.style.top = `${y}px`;
    bober.style.left = `${x}px`;
    bober.style.transform = `rotate(${Math.random() * 360}deg)`;

    bober.addEventListener('click', catchBober)
    bober2.addEventListener('click', catchBober2)

    gameNode.appendChild(bober);
}

function getRandomLocation(){
    const width = window.innerWidth
    const height = window.innerHeight

    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100

 return { x, y }
}

function playKurwaSound(){
    const audio = document.getElementById('kurwa');

    audio.play();
}

function playKurwaSoundSecond(){
    const audio = document.getElementById('kurwa2');

    audio.play();
}

function catchBober() {
    playKurwaSound();
    increaseScore();

    this.remove();

    addBober();
}

function catchBober2() {
    playKurwaSoundSecond();
    increaseScore();

    this.remove();

    addBober();
}

function addBober() {
    setTimeout(createBober, 100)
}

function increaseScore() {
  score++

 scoreEl.innerHTML = `score: ${score}`
}
