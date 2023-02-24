
// Start Screen
const startScreen = document.querySelector('.startScreen')
const button1 = document.querySelector('#player1');
const button2 = document.querySelector('#player2');
// Game Screen
const gameScreen = document.querySelector('.gameScreen')
const hero1 = document.querySelector('.hero1');
const bodyEl = document.querySelector('body');
const ammo = document.querySelector('#bullets');
const enemy = document.querySelector('#enemies');
const pixels = document.querySelector('#zoom');
const gameOver = document.querySelector('.gameOverScreen');
const playAgain = document.querySelector('.playAgain')
const healthBar = document.querySelector('#healthBar')
// Leaderboard Screen
const leaderboardbtn = document.querySelector('.leaderboard');
const leaderboardScreen = document.querySelector('.highscoreScreen');
const scores = document.querySelector('#scores')
const scoreLeaderboard = document.querySelector('#leaderboard');
const rankLeaderboard = document.querySelector('#rank');


const game = {
    screen: 'startScreen',
    numOfPlayers: 1,
    player1:{
        xPos: 0,
        yPos: 0,
        hp: 3
    },
    enemies: [],
    bullets: [],
    score: 0,
    gameOver: false,
    pixelPos:[],
    level: 1,
    speed: 1,
    leaderboardstatus:[]
};

let makeAndRemoveMultipleBulletIntervalId;
let collidedWithEnemyIntervalId;
let healthBarCounter = 1;


/* <--     Functions    --> */

// -- Game Start

function gameStart1(){
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    renderAll();  
}

// -- Leaderboard
function showLeaderBoard(){
    startScreen.style.display = 'none';
    leaderboardScreen.style.display = 'grid';
}

function setHighscore(){
    const score = game.score
    const score1 = document.getElementById('counter1');

    score1.textContent = score.toString().padStart(6, '0');
}

function storeScore(){
    const score = game.score;
    const leaderboard = game.leaderboardstatus

    leaderboard.push(score)
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function updateAndDisplayLeaderboard(){
    const mainHighscores = document.querySelectorAll('.mainScore');
    const leaderboard = game.leaderboardstatus
    const getStoredScore = JSON.parse(localStorage.getItem('leaderboard'))
    leaderboard.push(getStoredScore)
    const justArray = leaderboard.flat(Infinity)
    
    let inOrder = justArray.sort((a,b)=>b-a);

    mainScore = inOrder[0]

    for (let i = 0; i < mainHighscores.length; i++) {
        const mainHighscore = mainHighscores[i];
        
        mainHighscore.innerText = mainScore.toString().padStart(6, '0')
    }

    for (let j = 0; j < Math.min(inOrder.length, 10); j++) {
        const inOrderEl = inOrder[j];

        let newDiv = document.createElement('p');
        newDiv.setAttribute('class', 'scores');
        scoreLeaderboard.appendChild(newDiv);
        const scores = document.querySelectorAll('.scores')

        let rankDiv = document.createElement('p');
        rankDiv.setAttribute('class', 'ranks');
        rankLeaderboard.appendChild(rankDiv);
        const ranks = document.querySelectorAll('.ranks')

        ranks[j].textContent = [j + 1];
        scores[j].textContent = inOrderEl
    }
}

  
// -- Player 1
let counterBullet = 0;

function player1Movements(event){
    game.player1.xPos = event.clientX;
    game.player1.yPos = event.clientY;
    hero1.style.left = game.player1.xPos + 'px';
    hero1.style.top = game.player1.yPos + 'px';
    hero1.style.cursor = 'none';
}

// -- Player 1 Bullet
function bulletProps(){
    const makeBullet = {
        xPos: 50,
        yPos: - 10,
        damage: 10
    };
    makeBullet.xPos = game.player1.xPos
    makeBullet.yPos = game.player1.yPos - 15;
    game.bullets.push(makeBullet)
    displayBullets(makeBullet);
}

function displayBullets(bullet){
    const bulletEl = document.createElement('div');
    bulletEl.classList.add('bullet');
    ammo.appendChild(bulletEl);
    bulletEl.style.display = 'block';
    bulletEl.style.top = bullet.yPos + 'px';
    bulletEl.style.left = bullet.xPos + 'px';
}


function removeBullets() {
    const bulletEls = document.querySelectorAll('.bullet');
    const bullets = game.bullets;

    if(bullets.length === 0){
        return;
    }

    const bullet = bullets[0];
    const bulletEl = bulletEls[0];

    bullet.yPos -=10;
    bulletEl.style.top = bullet.yPos + 'px';
    
    for (let i = 0; i < bullets.length; i++) {
        const bullet = bullets[i];
        const bulletEl = bulletEls[i];
        
        
        if(bullet.yPos < 0 || bulletEl.getBoundingClientRect().bottom < 0){
            bulletEl.remove();
            bullets.shift();
        }
    }
    setInterval(collisionDetection, 100)
}

function collisionDetection() {
    const enemies = game.enemies;
    const bullets = game.bullets;
  
    if (enemies.length === 0 || bullets.length === 0) {
      return;
    }
  
    const bulletEls = document.querySelectorAll('.bullet');
    const enemyEls = document.querySelectorAll('.enemy1');
  
    for (let i = bullets.length - 1; i >= 0; i--) {
      const bulletRect = bulletEls[i].getBoundingClientRect();
  
      for (let j = 0; j < enemies.length; j++) {
        const enemyRect = enemyEls[j].getBoundingClientRect();
  
        if (
          bulletRect.right >= enemyRect.left &&
          bulletRect.left <= enemyRect.right &&
          bulletRect.bottom >= enemyRect.top &&
          bulletRect.top <= enemyRect.bottom
        ) {
            bulletEls[i].remove();
            bullets.splice(i, 1);
            
            enemyEls[j].classList.add('exploded');

            setTimeout(()=>{
                enemyEls[j].remove();
                enemies.splice(j, 1);
            },500)
    
            
            game.score += 10;

            if(game.score % 100 === 0 && game.score >=10){

                upLevel();
            }
        }
      }
    }
}

function makeAndRemoveMultipleBullet() {
    makeAndRemoveMultipleBulletIntervalId = setInterval(() => {
        bulletProps();
    }, 1000);

    setInterval(() => {
        removeBullets();
    }, 1000)
}

// -- player 1 losing health

function collidedWithEnemy(){
    const enemyEls = document.querySelectorAll('.enemy1');
    const heroPos = game.player1;
    const hero1Rect = hero1.getBoundingClientRect();
    const enemies = game.enemies
    const bullet = document.querySelectorAll('.bullets');

    for (let i = 0; i < enemyEls.length; i ++){
        const enemy = enemyEls[i];
        const enemyRect = enemy.getBoundingClientRect();
        
        if (
            hero1Rect.right >= enemyRect.left &&
            hero1Rect.left <= enemyRect.right &&
            hero1Rect.bottom >= enemyRect.top &&
            hero1Rect.top <= enemyRect.bottom
            ) {
                enemy.remove();
                enemies.splice(i, 1);
                heroPos.hp -= 1

                healthBarDepletes();

                if(heroPos.hp === 0){
                    hero1.classList.add('exploded');

                    setTimeout(()=>{
                        hero1.style.display = 'none';
                    },500)

                    clearInterval(makeAndRemoveMultipleBulletIntervalId);
                    game.gameOver = true
                    gameVeryOver();
              }
          }

    }
}

function displayHealthBar(){
    let newDiv = document.createElement('div');
    newDiv.classList.add('healthBar');
    healthBar.appendChild(newDiv);
}

function display3HealthBar(){
    for (let i = 0; i < game.player1.hp; i++) {
        displayHealthBar();
        healthBarCounter ++;
        
        if(healthBarCounter === 3){
            return;
        }
    }
}

function concurrentHealthBar(){
    displayHealthBar();
    display3HealthBar();
}

function healthBarDepletes(){
    const healthBarEls = document.querySelectorAll('.healthBar');
    const lastHealthBar = healthBarEls[healthBarEls.length - 1];
    lastHealthBar.remove();
}

function playerLoop(){
    makeAndRemoveMultipleBullet();
    collidedWithEnemyIntervalId = setInterval(collidedWithEnemy, 100);
    concurrentHealthBar(); 
}

// -- enemies
let counter = 0;

function makeEnemy(){
    const makeSimpleEnemy = {
        xPos: 50,
        yPos: -1,
        hp:10,
        damage: 1
    };
    makeSimpleEnemy.xPos = Math.floor(Math.random() * 1000);
    game.enemies.push(makeSimpleEnemy);



};

function newEnemy(){
    const enemy1 = document.createElement('div');
    enemy1.classList.add('enemy1');
    enemy.appendChild(enemy1);
    enemy1.style.display = 'block';
    if(game.enemies.length > 0){
        const lastEnemy = game.enemies[game.enemies.length - 1];
        enemy1.style.left = lastEnemy.xPos + 'px';
    }
}

function makeMultipleEnemies() {
    setInterval(()=>{
            makeEnemy();
            newEnemy(game.enemies.length - 1);
    }, 1300);
}

function moveEnemy(){
    const enemyElements = document.querySelectorAll('.enemy1');
    for (let i = 0; i < game.enemies.length; i++) {
        const element = game.enemies[i];

        if (element.yPos !== undefined) {
            element.yPos += 2;
            enemyElements[i].style.top = element.yPos + 'px';  
        }

        if(element.yPos >= 563){
            removeEnemy(i);
            i --;
        }
    }
}

function removeEnemy(index){
    const enemyElements = document.querySelectorAll('.enemy1');
    game.enemies.splice(index, 1);
    const enemyElement = enemyElements[index];

    if (enemyElement && enemyElement.parentNode) {
        enemyElement.parentNode.removeChild(enemyElement);
    }
}    

function enemyLoop(){
    makeEnemy();
    newEnemy();
    makeMultipleEnemies();
    setInterval(moveEnemy,16.67 / game.speed);
    removeEnemy();
}


// -- fly

function makePlaneFly(){
    const makeFlyEffect = {
        xPos: 50,
        yPos: 50,
    };
    makeFlyEffect.xPos = Math.floor(Math.random() * 1000);
    game.pixelPos.push(makeFlyEffect);
};

function makeNewFlyEffect(){
    const fly = document.createElement('div');
    fly.classList.add('zoom');
    pixels.appendChild(fly);
    fly.style.display = 'block';
    
    if(game.pixelPos.length > 0){
        
        const lastPixel = game.pixelPos[game.pixelPos.length - 1];
        fly.style.left = lastPixel.xPos + 'px';
        fly.style.top = lastPixel.yPos + 'px';
    }
}

function makePixelMove(){
    const pixelEls = document.querySelectorAll('.zoom');
    for (let i = 0; i < game.pixelPos.length; i++) {
        const pixelPos = game.pixelPos[i];
        pixelPos.yPos += 2;
        pixelEls[i].style.top = pixelPos.yPos + 'px';  
        
        if(pixelPos.yPos >= 563){
            removeExtraPixel(i);
            i --;
        }
    }
}

function removeExtraPixel(index){
    const pixelEls = document.querySelectorAll('.zoom');
    game.pixelPos.splice(index, 1);
    const pixelEl = pixelEls[index];
    
    if (pixelEl && pixelEl.parentNode) {
        pixelEl.parentNode.removeChild(pixelEl);
    }
    
}


function makeMultiplePlaneFly(){
    setInterval(makePlaneFly, 1300 );
    setInterval(makeNewFlyEffect,1300 );
    setInterval(makePixelMove, 16.67 / game.speed);
}

function pixelEffectLoop(){
    makeMultiplePlaneFly();
}

// -- winning Condition
function gameVeryOver(){
    if(game.gameOver === true){
        gameOver.style.display = 'block'
        displayData();
        storeScore();
    }
}

function displayData(){
    let scoreData = game.score;
    const score = document.querySelector('.scoreNumber');
    const enemyShot = document.querySelector('.enemyDown')
    score.innerText = game.score;
    enemyShot.innerText = scoreData / 10;
}


function renderAll(){
    enemyLoop();
    playerLoop();
    pixelEffectLoop();
    setInterval(setHighscore, 100)

};

// -- Difficulty Level

function upLevel(){
    game.level += 1;
    game.speed += 0.1;
}

function playAgainAndAgain(){
    location.reload();
}

/* <--     eventListener    --> */

function main(){
    button1.addEventListener('click', gameStart1);
    bodyEl.addEventListener('mousemove', player1Movements);
    playAgain.addEventListener('click', playAgainAndAgain );
    leaderboardbtn.addEventListener('click', showLeaderBoard);
    updateAndDisplayLeaderboard();

}

main();

