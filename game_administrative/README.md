# **Battle-1942**

## **Game Description**

It is in the year 1942, the world is at war but the Japanese is retreating. Get every single plane shot down before they resupply back at their base. If they did, be prepared to be hunt down. Better be the hunter then being the hunted!

### **Background**

**1942**

<p>1942 is a vertical scrolling shooter game made by Capcom that was released for the arcades in the year 1984. It was first designed by Yoshiki Okamoto, he soon became a legend in the 194X franchise!

1942 is set in the Pacific Theater of World War II. Despite the game being created by Japanese developers, the goal is to reach Tokyo and prevent them from resupply; this was due to being the first Capcom game designed with Western markets in mind. It went on to be a commercial success in arcades, becoming Japan's fifth highest-grossing table arcade game of 1986 and one of top five highest-grossing arcade conversion kits that year in the United States. It was then made availble to the consoles such as the NES, selling over 1 million copies worldwide.</p>

---

### **Screenshots**

1. Welcome Screen  
   ![welcome screen](./1942_pictures/startScreen.png "Welcome Screen")
2. Game Screen  
   ![game screen](./1942_pictures/gameScreen.png "Game Screen")
3. Result Screen  
   ![result screen](./1942_pictures/resultScreen.png "Result Screen")

### **Technologies & Tools Used**

1. HTML
2. CSS
3. JavaScript
4. Git & GitHub

### **Getting Started**

#### **Instructions**

1. There will be a swarm of enemy airplanes that you have to shoot down! Go get them tiger!
2. To Win: Be the best than the rest! Get the highest score possible and look at the people below you in the leaderboard! Just don't crash and burn! You have 3 chances! [Play The Battle-1942 Game Now]()

### **Next Steps**

- Increased complexity of the game (additional player, powerups, boss level)
- MVC Approach

### **Biggest Challenge**

1. To generate a function where there is collision between elements.

- Get the pixels of each elements and create a condition where clientX and clientY overlapped between each other.

- If there is a collision between each element, I need to remove the element from the DOM.

```javascript
function collisionDetection() {
    const enemies = game[0].enemies;
    const bullets = game[0].bullets;
  
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
    
            
            game[0].score += 10;

            if(game[0].score % 100 === 0 && game[0].score >=10){

                upLevel();
            }
        }
      }
    }
}
```

2. Creating a leaderboard system through the localStorage

- Needed somewhere to store the keys and values and to be able to retrieve it when session ended.

```javascript
unction updateAndDisplayLeaderboard(){
    const mainHighscores = document.querySelectorAll('.mainScore');
    const leaderboard = game[0].leaderboardstatus
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
```

### **Key Learnings**

<p>
1. Recognition of weaker areas - for loop/forEach; callback function; passing arguements into functions; proper coding etiquette<br/>
2. Learning priorities - Understanding the concept -> Be familiar with the key concepts -> MVC -> Dry Code -> Short hand synthax -> CSS Grid/Flexbox -> OOP -> Primitive and Non-primitive<br/>
3. Be patient by breaking problems to smaller problems - look at everything as input -> output<br/>
4. Realising that having a plan first before anything is important!<br/></p>

### **Q&A**

Thank you :)

### **Resources**