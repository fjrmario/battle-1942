
// Start Screen
const startScreen = document.querySelector('.startScreen')
const button1 = document.querySelector('#player1');
const button2 = document.querySelector('#player2');
// Game Screen
const gameScreen = document.querySelector('.gameScreen')
const hero1 = document.querySelector('.hero1');
const bodyEl = document.querySelector('body')
const ammo = document.querySelector('#bullets')
const enemy = document.querySelector('#enemies')


const game = [{
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
    gameOver: false
}]





/* <--     Functions    --> */

function gameStart1(){
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    renderAll();
}
// Game Start

// -- Player 1
let counterBullet = 0;

function player1Movements(event){
    game[0].player1.xPos = event.clientX;
    game[0].player1.yPos = event.clientY;
    hero1.style.left = game[0].player1.xPos + 'px';
    hero1.style.top = game[0].player1.yPos + 'px';
    hero1.style.cursor = 'none';
}

// -- Player 1 Bullet
function bulletProps(){
    const makeBullet = {
        xPos: 50,
        yPos: - 10,
        damage: 10
    };
    makeBullet.xPos = game[0].player1.xPos
    makeBullet.yPos = game[0].player1.yPos
    game[0].bullets.push(makeBullet)
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
    const bullets = game[0].bullets;

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
    const enemies = game[0].enemies;
    const bullets = game[0].bullets;
  
    if (enemies.length === 0 || bullets.length === 0) {
      return;
    }
  
    const bulletEls = document.querySelectorAll('.bullet');
    const enemyEls = document.querySelectorAll('.enemy1');
  
    for (let i = bullets.length - 1; i >= 0; i--) {
    //   const bullet = bullets[i];
      const bulletRect = bulletEls[i].getBoundingClientRect();
  
      for (let j = 0; j < enemies.length; j++) {
        // const enemy = enemies[j];
        const enemyRect = enemyEls[j].getBoundingClientRect();
  
        if (
          bulletRect.right >= enemyRect.left &&
          bulletRect.left <= enemyRect.right &&
          bulletRect.bottom >= enemyRect.top &&
          bulletRect.top <= enemyRect.bottom
        ) {
          // Remove bullet and enemy from the DOM
          bulletEls[i].remove();
          bullets.splice(i, 1);
  
          enemyEls[j].remove();
          enemies.splice(j, 1);
  
          // Increase the player's score
          game[0].score += 10;
        }
      }
    }
  }

// const rect1 = bullet.getBoundingClientRect();
// const rect2 = enemy.getBoundingClientRect();
// if (rect1.right >= rect2.left && rect1.left <= rect2.right &&
//     rect1.bottom >= rect2.top && rect1.top <= rect2.bottom) {
//   // the elements are touching
// } else {
//   // the elements are not touching
// }

  

        
// collisionDetection();
// function collisionDetection(){
//     for (let i = 0; i < game[0].bullets.length; i++) {
//         const everyBullet = game[0].bullets[i];
//         for (let j = 0; j < game[0].enemies.length; j++) {
//             const everyEnemy = game[0].enemies[j];

//             if(Math.abs(everyBullet.xPos - everyEnemy.xPos) < 10 && Math.abs(everyBullet.yPos - everyEnemy.yPos) < 10){
//                 console.log('bullet', i, ' and enemy ', j, 'collided')
//             }

//         }

//     }
// }



// function removeBullets() {
//     const bulletEls = document.querySelectorAll('.bullet');
//     const bullets = game[0].bullets;
//     const enemies = game[0].enemies;
//     const bulletsToRemove = [];
//     const enemiesToRemove = [];
  
//     for (let i = 0; i < bullets.length; i++) {
//       const bullet = bullets[i];
//       const bulletEl = bulletEls[i];
  
//       bullet.yPos -= 10;
//       bulletEl.style.top = bullet.yPos + 'px';
  
//       if (bullet.yPos < 0 || bulletEl.getBoundingClientRect().bottom < 0) {
//         bulletsToRemove.push(i);
//         bulletEl.remove();
//       } else {
//         for (let j = 0; j < enemies.length; j++) {
//           const enemy = enemies[j];
//           const enemyEl = document.querySelector('.enemy1:nth-of-type(' + (j + 1) + ')');
  
//           if (
//             bullet.yPos <= enemy.yPos + 50 &&
//             bullet.yPos >= enemy.yPos &&
//             bullet.xPos <= enemy.xPos + 50 &&
//             bullet.xPos >= enemy.xPos
//           ) {
//             bulletsToRemove.push(i);
//             enemiesToRemove.push(j);
//             bulletEl.remove();
//             enemyEl.remove();
  
//             // Increase the player's score
//             game[0].score += 10;
//           }
//         }
//       }
//     }
  
//     // Remove bullets and enemies that collided or went offscreen
//     for (let i = bulletsToRemove.length - 1; i >= 0; i--) {
//       bullets.splice(bulletsToRemove[i], 1);
//     }
//     for (let i = enemiesToRemove.length - 1; i >= 0; i--) {
//       enemies.splice(enemiesToRemove[i], 1);
//     }
// }
  


function makeAndRemoveMultipleBullet() {
    setInterval(() => {
        bulletProps();
      }, 1000);
    
    setInterval(() => {
        removeBullets();
    }, 1000)
}


function playerLoop(){
    makeAndRemoveMultipleBullet();
}


// enemies
let counter = 0;

function makeEnemy(){
    const makeSimpleEnemy = {
        xPos: 50,
        yPos: -1,
        hp:10
    };
    makeSimpleEnemy.xPos = Math.floor(Math.random() * 1000);
    game[0].enemies.push(makeSimpleEnemy);
};

function newEnemy(){
    const enemy1 = document.createElement('div');
    enemy1.classList.add('enemy1');
    // enemy1.setAttribute('data-id', index);
    enemy.appendChild(enemy1);
    enemy1.style.display = 'block';
    if(game[0].enemies.length > 0){
        const lastEnemy = game[0].enemies[game[0].enemies.length - 1];
        enemy1.style.left = lastEnemy.xPos + 'px';
        // for (let i = 0; i < game[0].enemies.length; i++) {
        //     const element = game[0].enemies[i];
        //     enemy1.style.left = element.xPos + 'px';
        // }
    }
}

function makeMultipleEnemies() {
    const intervalID = setInterval(()=>{
        if ( game[0].enemies.length < 10) {
            makeEnemy();
            newEnemy(game[0].enemies.length - 1);
        } else{
            clearInterval(intervalID);
        }
    }, 1000);
}

function moveEnemy(){
    const enemyElements = document.querySelectorAll('.enemy1');
    for (let i = 0; i < game[0].enemies.length; i++) {
        const element = game[0].enemies[i];

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
    game[0].enemies.splice(index, 1);
    const enemyElement = enemyElements[index];

    if (enemyElement && enemyElement.parentNode) {
        enemyElement.parentNode.removeChild(enemyElement);
    }
}    

function enemyLoop(){
    makeEnemy();
    newEnemy();
    makeMultipleEnemies();
    setInterval(moveEnemy,16.67);
    removeEnemy();
}

function renderAll(){
    enemyLoop();
    playerLoop();
};


/* <--     eventListener    --> */

function main(){
    button1.addEventListener('click', gameStart1)
    bodyEl.addEventListener('mousemove', player1Movements)

}

main();

