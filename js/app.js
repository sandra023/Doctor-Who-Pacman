const gameBoardLevelOne = [
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,0,0,1,1,1,1,1],
    [0,1,0,0,1,1,1,1,0,0,1,0],
    [0,1,0,1,1,0,0,1,1,0,1,0],
    [0,1,1,1,0,1,1,0,1,1,1,0],
    [0,0,0,1,1,1,1,1,1,0,0,0],
    [0,1,1,1,0,1,1,0,1,1,1,0],
    [0,1,0,1,1,0,0,1,1,0,1,0],
    [0,1,0,0,1,1,1,1,0,0,1,0],
    [1,1,0,1,1,0,0,1,1,0,1,0],
    [0,1,1,1,0,0,0,0,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
]

const gameBoardLevelTwo = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,0,1,1,1,0,1,1,1,1,1],
    [0,1,0,0,1,0,1,0,1,0,1,0,0,1,0],
    [0,1,0,1,1,1,1,0,1,1,1,1,0,1,0],
    [0,1,1,1,0,0,1,1,1,0,0,1,1,1,0],
    [0,1,0,1,1,1,1,0,1,1,1,1,0,1,0],
    [0,1,1,1,0,1,0,1,0,1,0,1,1,1,0],
    [0,0,0,1,0,1,1,1,1,1,0,1,0,0,0],
    [0,1,1,1,0,1,0,1,0,1,0,1,1,1,0],
    [0,1,0,1,1,1,1,0,1,1,1,1,0,1,0],
    [0,1,1,1,0,0,1,1,1,0,0,1,1,1,0],
    [0,1,0,1,1,1,1,0,1,1,1,1,0,1,0],
    [1,1,0,0,1,0,1,0,1,0,1,0,0,1,0],
    [0,1,1,1,1,0,1,1,1,0,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]


// put this to  start button click ("#gameMusic").attr("src","songFilename.mp3")
let gameBoard = gameBoardLevelOne
let square;

function buildInfoBoard(){
    const mazeContainer = $('<div id=mazeContainer>')
    $('body').append(mazeContainer)
    const infoDiv = $('<div>').addClass('infoBoard')
    $(mazeContainer).append(infoDiv)
    const leftDiv =  $('<div class=column id=left>')
    const middleDiv = $('<div class=column id=middle>')
    const rightDiv = $('<div class=column id=right>')
    const farRightDiv = $('<div class=column id=level>')
    const levelH4 = $('<h4 id=level>').text('Level')
    const levelNumber = $('<p id=levelNumber>').text(1)
    const energyH4 = $('<h4 id=energyCoins>').text('Energy Coins')
    const itemsH4 = $('<h4 id=items>').text('Items Found')
    const livesH4 =$('<h4 id=h4lives>').text('Lives')
    const first = $('<div class=columnB>').addClass('first')
    const second = $('<div class=columnB>').addClass('second')
    const third = $('<div class=column>').addClass('third')
    const energy = $('<p id=energy>').text(0)
    const lives = $('<p id=lives>').text(3)
    $(infoDiv).append(leftDiv, middleDiv, rightDiv, farRightDiv)
    $(leftDiv).append(energyH4)
    $(energyH4).append(energy)
    $(middleDiv).append(itemsH4, first, second, third)
    $(rightDiv).append(livesH4)
    $(livesH4).append(lives)
    $(farRightDiv).append(levelH4)
    $(levelH4).append(levelNumber)
    const mazeDiv = $('<div>').addClass('maze')
    $('#mazeContainer').append(mazeDiv)
}

function generateMaze() {
        for(let y=0; y<gameBoard.length; y++){
        const div = $('<div>').addClass(`column${y+1}`)
        $('.maze').append(div)
        for (let x=0; x<gameBoard[y].length; x++){
            const square = $(`<div x=${y} y=${x}/>`);
            square.addClass('square');
            $(`.column${y+1}`).append(square)
            if(gameBoard[x][y]=== 0){
                square.addClass('wall')} 
            else if(gameBoard[x][y]=== 1){
                square.addClass('path')
                square.addClass('coin')
            }
        }
  
    }
}

// buildInfoBoard();     
// generateMaze();        


function grabSquare(x,y){
    return $(`.square[x="${x}"][y="${y}"]`)
}

// let snd = new Audio("Mario-coin-sound/Mario-coin-sound.mp3");
// snd.play();

const doctor = {
    gameBoard: gameBoardLevelOne,
    level: 1,
    energy: -1,
    x:0,
    y:9,
    lives: 3,
    direction: null,
    itemsFound: 0,
    alive: true,
    className: 'doctor11',
    screwDriver: 'screwdriver11',
    doctorDirection: 'Right',
    
    render(){
        $(`.${this.className}Left`).removeClass('key')
        $(`.${this.className}Right`).removeClass('key')
        $(`.${this.className}Right`).removeClass(`${this.screwDriver}`)
        $(`.${this.className}Left`).removeClass(`${this.screwDriver}`)
        $(`.${this.className}Left`).removeClass('coin')
        $(`.${this.className}Right`).removeClass('coin')
        $(`.${this.className}Right`).removeClass(`${this.className}Right`)
        $(`.${this.className}Left`).removeClass(`${this.className}Left`)

        grabSquare(this.x,this.y).addClass(`${this.className}${this.doctorDirection}`)
    },
    move(){
        if (this.alive)
        {
        if(this.direction=== "left" && grabSquare(this.x-1,this.y).hasClass('path')){
            this.x--;
        } else if (this.direction === "right" && grabSquare(this.x+1,this.y).hasClass('path')){
            this.x++;
        } else  if (this.direction=== "up" && grabSquare(this.x,this.y+1).hasClass('path')){
            this.y++;
        } else if (this.direction === "down" && grabSquare(this.x,this.y-1).hasClass('path')){
            this.y--
        }
        this.gatherItems()
        this.render();

        setTimeout(()=>{
            this.move();  
        },250)
        }
    },
    gatherItems(){
        if (grabSquare(this.x,this.y).hasClass('coin')){
            this.energy++
            $('#energy').text(this.energy)
        } else if (grabSquare(this.x,this.y).hasClass('key')){
            $('.first').addClass('key')
            this.itemsFound++
            this.engery+=10
        } else if (grabSquare(this.x,this.y).hasClass(`${this.screwDriver}`)){
            $('.second').addClass(`${this.screwDriver}`)
            this.itemsFound++
            this.energy+=15
        }
    },
    doctorDies (){
        $(`.${this.className}${this.doctorDirection}`).removeClass(`${this.className}${this.doctorDirection}`);
        this.alive = false;
        this.lives--
        direction = null
        $('#lives').text(this.lives)
        alert(`Be carefull! The Doctor has ${this.lives} regenerations left!`)
        if (this.level === 1){
            this.x = 0
            this.y = 9
        } if (this.level === 2){
            this.x = 0
            this.y = 12
        }
        this.regeneration();
    },
    regeneration(){
        if (this.lives=== 3){
            this.direction = null
            this.className = 'doctor11'
            $(`.${this.screwDriver}`).removeClass(`${this.screwDriver}`);
            this.screwDriver= 'screwdriver11'
            lostItems[1].render()
        
        // else if (this.lives === 2){
        //     this.className = 'doctor12'
        //     $(`.${this.screwDriver}`).removeClass(`${this.screwDriver}`);
        //     this.screwDriver= 'screwdriver12'
        //     lostItems[1].render()
        // } else if (this.lives === 1){
        //     $(`.${this.screwDriver}`).removeClass(`${this.screwDriver}`);
        //     this.className = 'doctor13'
        //     this.screwDriver= 'screwdriver13'
        //     lostItems[1].render()
        // }
        } else if (this.lives === 2){
            if($('.second').hasClass(`${this.screwDriver}`)){       
                ($('.second').removeClass(`${this.screwDriver}`))
                this.className = 'doctor12'
                this.doctorDirection = 'Right'
                this.screwDriver= 'screwdriver12';    
                ($('.second').addClass(`${this.screwDriver}`))
            }else {
                this.className = 'doctor12'
                this.doctorDirection = 'Right'
                $(`.${this.screwDriver}`).removeClass(`${this.screwDriver}`);
                this.screwDriver= 'screwdriver12'
                if(this.level === 1){
                    lostItems[1].render()
                } else {
                    lostItems[4].render()
                }
            }   
        } else if (this.lives === 1){
            if($('.second').hasClass(`${this.screwDriver}`)){       
                ($('.second').removeClass(`${this.screwDriver}`))
                this.className = 'doctor13'
                this.doctorDirection = 'Right'
                this.screwDriver= 'screwdriver13';    
                ($('.second').addClass(`${this.screwDriver}`))
            }else {
                this.className = 'doctor13'
                this.doctorDirection = 'Right'
                $(`.${this.screwDriver}`).removeClass(`${this.screwDriver}`);
                this.screwDriver= 'screwdriver13'
                if(this.level === 1){
                    lostItems[1].render()
                } else {
                    lostItems[4].render()
                }
                
            }
        }
        grabSquare(this.x,this.y).addClass(`${this.className}${this.doctorDirection}`)
        this.alive = true
        this.render()
    },
    stopAliens (){
        Alien2.destroy();
        Alien3.destroy();
        Alien4.destroy();
        Alien5.destroy();

    },
    checkWin (){
        if(grabSquare(this.x,this.y).hasClass('tardis')){
            if ($('.first').hasClass('key') &&  $('.second').hasClass(`${this.screwDriver}`)){
                console.log('this.level', this.level)
                this.level += 1
                gameBoard = gameBoardLevelTwo
                // this.gameboard = gameBoardLevelTwo
                console.log("this.level",this.level)
                $('#levelNumber').text(this.level)
                alert("You've reached the Tardis!")
                if(this.level === 2){
                    nextLevel()
                } else if (this.level > 2){
                score();
                }

           
            } else {
                alert("You're missing something! Make sure you find everything that was lost.")
                this.x = 10
                this.y = 1
                this.direction = null
                grabSquare(this.x,this.y).addClass(`${this.className}${this.doctorDirection}`)
                // grabSquare(this.x,this.y).addClass(`${this.classNameLeft}`)

            } 
        }
    },
    gameOver (){
        if(this.lives === 0){
        alert("Game Over")
        this.stopAliens();
        // endGame();
        setTimeout(()=>{
            score();
        },250)
        }
    }
}

// buildInfoBoard();     
// generateMaze();       
// doctor.render()
// doctor.move()


$('body').on('keydown', function(e){
    // console.log(typof e.which);
    switch(e.which){
        case 37:
        doctor.direction = "left";
        doctor.doctorDirection = 'Left'
        break;
        case 39:
        doctor.direction ="right";
        doctor.doctorDirection = 'Right'
        break;
        case 38:
        doctor.direction ="down";
        break;
        case 40:
        doctor.direction = "up"
    
    }
})
// let interval;

const aliens = [];
class Alien{
    constructor(x,y,image, speed){
        this.x = x
        this.y = y
        this.image = image;
        this.render();
        this.speed = speed
        this.interval1 = setInterval(()=>{ 
            this.alienMoves();
        }, this.speed);
        this.interval2 = setInterval(()=>{ 
            this.checkKill();
            doctor.checkWin();
        }, 10);
        aliens.push(this);
    }  
    render(){
        grabSquare(this.x,this.y).addClass(this.image)
    }
    checkKill (){
        if (grabSquare(this.x,this.y).hasClass(`${doctor.className}${doctor.doctorDirection}`)){
            doctor.doctorDies();
            doctor.gameOver();
        }
    }
    destroy() {
        clearInterval(this.interval1);
        clearInterval(this.interval2)
    }
    alienMoves (){
    let randomNum = Math.floor(Math.random() * 4);
        if (randomNum === 0){
            //move Left
            if(grabSquare(this.x-1,this.y).hasClass('path')){
                this.removeAlien();
                this.x--;
                this.render()
                // this.checkKill();
        }
        } else if (randomNum === 1){
            //move right
            if (grabSquare(this.x+1,this.y).hasClass('path')){
                this.removeAlien();
                this.x++;
                this.render();
                // this.checkKill();
        }
        } else if (randomNum === 2){
            //move up
            if (grabSquare(this.x,this.y+1).hasClass('path')){
                // && !grabSquare(this.x,this.y+1).hasClass(this.image)
                this.removeAlien();
                this.y++;
                this.render();
                // this.checkKill();
        }
        } else if (randomNum === 3){
            //move down
            if (grabSquare(this.x,this.y-1).hasClass('path')){
                this.removeAlien();
                this.y--
                this.render();
                // this.checkKill();
        }
        }   
    }
    removeAlien(){
        grabSquare(this.x,this.y).removeClass(this.image)
    }
}


const Alien2 = new Alien(7,5,"alien1",500);
const Alien3 = new Alien(5,6,"alien2",500);
const Alien4 = new Alien(5,4,"alien3",500);
const Alien5 = new Alien(6,6,"alien4",500);

const lostItems = [
    key = {
    x:1,
    y:1,
    render(){
        grabSquare(this.x,this.y).removeClass('coin')
        grabSquare(this.x,this.y).addClass('key')
    }
},
    screwdriver = {
    x:10,
    y:10,
    render(){
        grabSquare(this.x,this.y).removeClass('coin')
        grabSquare(this.x,this.y).addClass(`${doctor.screwDriver}`)
    }
},
    tardis = {
    x:11,
    y:1,
    render(){
        grabSquare(this.x,this.y).removeClass('coin')
        grabSquare(this.x,this.y).addClass('tardis')
    }
},
    tardisLevelTwo = {
        x:14,
        y:1,
        render(){
            grabSquare(this.x,this.y).removeClass('coin')
            grabSquare(this.x,this.y).addClass('tardis')
        }, 
    },
    screwdriverLevelTwo = {
        x:13,
        y:13,
        render(){
            grabSquare(this.x,this.y).removeClass('coin')
            grabSquare(this.x,this.y).addClass(`${doctor.screwDriver}`)
        }
    },

]

// lostItems[0].render();
// lostItems[1].render();
// lostItems[2].render();



function start (){
    for(let i = 0; i < aliens.length; i++){
        aliens[i].destroy();
        aliens[i].removeAlien();
    }
    $('body').empty()
    doctor.gameBoard = gameBoardLevelOne,
    doctor.lives = 3
    doctor.level = 1
    doctor.energy = 0
    doctor.direction =  null,
    doctor.doctorDirection = 'Right'
    doctor.itemsFound = 0
    buildInfoBoard()
    generateMaze()
    doctor.regeneration()
    lostItems[2].render();
    grabSquare(1,1).removeClass('coin')
    grabSquare(1,1).addClass('key')
    grabSquare(10,10).removeClass('coin')
    grabSquare(10,10).addClass(`${doctor.screwDriver}`)
    $('.alien2').removeClass('alien2')
    $('.alien3').removeClass('alien3')
    $('.alien4').removeClass('alien4')
    $('.alien5').removeClass('alien5')
    let Alien6 = new Alien(7,5,"alien1",500);
    let Alien7 = new Alien(5,6,"alien2",500);
    let Alien8 = new Alien(5,4,"alien3",500);
    let Alien9 = new Alien(6,6,"alien4",500);
}

function nextLevel (){
    for(let i = 0; i < aliens.length; i++){
        aliens[i].destroy();
        aliens[i].removeAlien();
    }
    $('.maze').empty()
    doctor.direction =  null,
    doctor.itemsFound = 0
    generateMaze()
    $('.square').css({'height': '4.5vh'}, {'width': '4.5vh'});
    doctor.x = 0
    doctor.y = 12
    doctor.regeneration()
    $('.first').removeClass('key')
    $(`.${doctor.screwDriver}`).removeClass(`${doctor.screwDriver}`);
    lostItems[3].render();
    grabSquare(1,1).removeClass('coin')
    grabSquare(1,1).addClass('key')
    grabSquare(13,13).removeClass('coin')
    grabSquare(13,13).addClass(`${doctor.screwDriver}`)
    $('.alien2').removeClass('alien2')
    $('.alien3').removeClass('alien3')
    $('.alien4').removeClass('alien4')
    $('.alien5').removeClass('alien5')
    let Alien6 = new Alien(8,7,"alien1",500);
    let Alien7 = new Alien(7,7,"alien2",500);
    let Alien8 = new Alien(6,7,"alien3",500);
    let Alien9 = new Alien(7,8,"alien4",500);
    let Alien10 = new Alien(7,6,"alien5",500);
    let Alien11 = new Alien(3,3,"alien6",500);
    let Alien12 = new Alien(11,11,"alien7",500)
}


function readyPlayerOne (){
    buildInfoBoard();     
    generateMaze();       
    doctor.render()
    doctor.move()
    lostItems[0].render();
    lostItems[1].render();
    lostItems[2].render();
}
readyPlayerOne()









////////////////// scoreboard

let playerScore = 0
let playerName = ''
const highScoreArray = [
    {
        name: 'PACMAN',
        score: 5
    },
    {
        name: 'MS.PACMAN',
        score: 4
    },
    {
        name: 'MARIO',
        score: 3
    },
    {
        name: 'LUIGI',
        score: 2
    },
    {
        name: 'DONKEY KONG',
        score: 1
    }
]

function endGame(){
    playerScore = doctor.energy
    doctor.level = 1
    console.log("doctor.level",doctor.level)
    $('body').empty()
}

/////////build score board

function buildScoreboard(){
    const boardContainer = $('<div class=boardContainer>')
    $('body').append(boardContainer)
    const firstDiv = $('<div>').addClass('firstDiv')
    const board = $('<div>').addClass("highScoreBoard")
    $('.boardContainer').append(firstDiv, board)
    const highScore = $('<h2 class=highScore/>').text("HIGH SCORE")
    const theplayerScore = $('<h2 class=playerScore/>')
    const nameReg = $('<h2 class=nameRegister/>').text("NAME REGISTRATION")
    const name = $('<div class=columnC id=name/>').text("Name:")
    const nameEnter = $('<div class=columnC id=nameEnter/>')
    $(board).append(highScore, theplayerScore, nameReg, name, nameEnter)
    $('.playerScore').text(playerScore)
}

function buildNameBoxes (){
    for(let i = 0; i < 10; i++){
        const div = $('<div class=row1>').addClass(`columnD${i+1}`)
        $('#nameEnter').append(div)
    }
}

function buildLetters (){
    const alphabet = $('<div class=alphabet>')
    $('.highScoreBoard').append(alphabet)
    for (let i = 65; i <91; i++){
        const letterDiv = $(`<div class=letter id=${i-64}>`).text(String.fromCharCode(i))
        $('.alphabet').append(letterDiv)
        letterDiv.click(function(e) {
            playerName += e.target.innerHTML
            for (let x =1; x<11; x++) {
                if($(`.columnD${x}`).text() === ''){
                    $(`.columnD${x}`).text(e.target.innerHTML);
                    break;
                }
            }
        });
    }
} 

function addEnterButton (){
    const enter = $(`<div class=letter id=28>`).text('SUBMIT')
    $('.alphabet').append(enter)
    enter.click(function(){
        addNameScore();
        for(let y = 1; y < 11; y++){
            $(`.columnD${y}`).text('');
            $(`.columnD${y}`).css('text-decoration','none');
        }
        playerName = ''
        playerScore = 0
        // buildHighScoreNameBox();
        $('.nameRegisteredSpot').text('YOUR NAME HAS BEEN REGISTERD')
        fillInPlayerStats();
       
    })
}

function addNameScore (){
    highScoreArray.push(playerName)
    for (let i = 0; i< highScoreArray.length; i++){
        if(highScoreArray[i].name === '' || playerScore > highScoreArray[4].score){
            highScoreArray[5] =  {"name": playerName, "score": playerScore}
            // highScoreArray[5].score = playerScore
            break; 
        }
    }
}

function buildScoreHolderTable (){
    const playerNameTable = $('<div>').addClass('playerNameTable')
    $('.highScoreBoard').append(playerNameTable)
    for(let i = 1; i<6; i++){
        const playerDiv = $('<div>').addClass(`playerRow player${i}`)
        $(playerNameTable).append(playerDiv)
        const rank = $('<div>').addClass(`rank rank${i}`)
        const score = $('<div>').addClass(`score score${i}`)
        const name = $('<div>').addClass(`playerName name${i}`)
        $(playerDiv).append(rank)
        $(playerDiv).append(score)
        $(playerDiv).append(name)
        }
    let ranks = ['1ST','2ND','3RD','4TH','5TH']
    for(let i = 1; i<6; i++){
        $(`.rank${i}`).text(ranks[i-1])
    }
}

function fillInPlayerStats (){
    const sortedArray = highScoreArray.sort(function(a,b) {
        return b.score - a.score
    });
    console.log(sortedArray[0].score)
    for(i=0; i<5; i++){
        $(`.score${i+1}`).text(sortedArray[i].score)
        $(`.name${i+1}`).text(sortedArray[i].name)
    }
}
function buildStartButton (){
    const replay = $('<div class=replayButton>').text('REPLAY')
    $('.boardContainer').append(replay)
    // $('.highScoreBoard').append(replay)
    replay.click(function(e) {
        start();
        // readyPlayerOne()
    });
}

function addEmptySpot (){
    const emptySpot = $('<div class=nameRegisteredSpot>')
    $('.highScoreBoard').append(emptySpot)
}

function score(){
    endGame();
    buildScoreboard();
    buildNameBoxes();
    buildLetters();
    addEnterButton();
    addEmptySpot();
    buildScoreHolderTable();
    buildStartButton();
    fillInPlayerStats();
}


// function colorMaze (){
//     for(let i = 0; i < gameBoard.length; i++){
//         for(let b = 0; b < gameBoard[i].length; b++){
//                 if(gameBoard[i][b]=== 0){
//                     square.css('background-color','black')         
//                 }        
//         }
//     }
// }