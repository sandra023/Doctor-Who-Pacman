const gameBoard = [
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


let square;
function generateMaze(){
    //loop to make the html 
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
generateMaze();                               
   

function colorMaze (){
    for(let i = 0; i < gameBoard.length; i++){
        for(let b = 0; b < gameBoard[i].length; b++){
                if(gameBoard[i][b]=== 0){
                    square.css('background-color','black')         
                }        
        }
    }
}

function grabSquare(x,y){
    return $(`.square[x="${x}"][y="${y}"]`)
}

// let snd = new Audio("Mario-coin-sound/Mario-coin-sound.mp3");
// snd.play();

let timeout;
const doctor = {
    energy: -1,
    x:0,
    y:9,
    lives: 3,
    direction: null,
    itemsFound: 0,
    alive: true,
    className: "doctor11",
    screwDriver: 'screwdriver11',
    render(){
        $(`.${this.className}`).removeClass('key')
        $(`.${this.className}`).removeClass(`${this.screwDriver}`)
        $(`.${this.className}`).removeClass('coin')
        $(`.${this.className}`).removeClass(`${this.className}`)
        grabSquare(this.x,this.y).addClass(`${this.className}`)

    },
    move(){
        if (this.alive){
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
            // console.log("Collected an energy coin!")
            // console.log(this.energy)
            this.energy++
            $('#energy').text(this.energy)
        } else if (grabSquare(this.x,this.y).hasClass('key')){
            // console.log("You've found the Tardis Key!")
                    // add key image to score board
                    $('.first').addClass('key')
            this.itemsFound++
        } else if (grabSquare(this.x,this.y).hasClass(`${this.screwDriver}`)){
            // console.log("You've found the Sonic Screwdriver!")
                //add screwdriver picture to scoreboard
                $('.second').addClass(`${this.screwDriver}`)
            this.itemsFound++
        }
    },
    // whichWay (){
    //     if (this.direction === 'left'){
                // this.className = this.className'left'
    //     } else if (this.direction === 'right'){
                // this.className = .doctor11Left

    //         $('.doctor').css('background-image','url(DoctorWho/11RunningRight.gif)')
    //     }
    // },
    doctorDies (){
        $(`.${this.className}`).removeClass(`${this.className}`);
        this.alive = false;
        this.lives--
        direction = null
        $('#lives').text(this.lives)
        alert(`Be carefull! The Doctor has ${this.lives} regenerations left!`)
        this.regeneration();
    },
    regeneration(){
        this.x = 0
        this.y = 9
        if (this.lives === 2){
            this.className = 'doctor12'
            $(`.${this.screwDriver}`).removeClass(`${this.screwDriver}`);
            this.screwDriver= 'screwdriver12'
            lostItems[1].render()
        } else if (this.lives === 1){
            $(`.${this.screwDriver}`).removeClass(`${this.screwDriver}`);
            this.className = 'doctor13'
            this.screwDriver= 'screwdriver13'
            lostItems[1].render()
        }
        grabSquare(this.x,this.y).addClass(`${this.className}`)
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
            alert("You've reached the Tardis!")
            endGame();
            score();
            } else {
                alert("You're missing something! Make sure you find everything that was lost.")
                this.x = 10
                this.y = 1
                this.direction = null
                grabSquare(this.x,this.y).addClass(`${this.className}`)
            }
        }
    },
    gameOver (){
        if(this.lives === 0){
        alert("Game Over")
        this.stopAliens();
        endGame();
        setTimeout(()=>{
            score();
        },250)
        }
    }
}


doctor.render()
doctor.move()


$('body').on('keydown', function(e){
    // console.log(typof e.which);
    switch(e.which){
        case 37:
        doctor.direction = "left";
        break;
        case 39:
        doctor.direction ="right";
        break;
        case 38:
        doctor.direction ="down";
        break;
        case 40:
        doctor.direction = "up"
    
    }
})
// let interval;


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
    }  
    render(){
        grabSquare(this.x,this.y).addClass(this.image)
    }
    checkKill (){
        if (grabSquare(this.x,this.y).hasClass(`${doctor.className}`)){
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
    },
}
]

lostItems[0].render();
lostItems[1].render();
lostItems[2].render();



/// scoreboard
let playerScore = 0
let highScoreArray = []
let playerName = ''
function endGame(){
    playerScore = doctor.energy
    $('body').empty()
}

function buildScoreboard(){
    const board = $('<div>').addClass("highScoreBoard")
    $('body').append(board)
    const highScore = $('<h2 class=highScore/>').text("HIGH SCORE")
    $('.highScoreBoard').append(highScore)
    const theplayerScore = $('<h2 class=playerScore/>')
    $('.highScoreBoard').append(theplayerScore)
    $('.playerScore').text(playerScore)
    const nameReg = $('<h2 class=nameRegister/>').text("NAME REGISTRATION")
    $('.highScoreBoard').append(nameReg)
    const name = $('<div class=columnC id=name/>').text("Name:")
    const nameEnter = $('<div class=columnC id=nameEnter/>')
    $('.highScoreBoard').append(name)
    $('.highScoreBoard').append(nameEnter)
}
/* <div class="column" id="middle"></div> */

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
    const enter = $(`<div class=letter id=28>`).text('END')
    $('.alphabet').append(enter)
    enter.click(function(){
        highScoreArray.push(playerName)
        playerName = ''
        for(let y = 1; y < 11; y++){
            $(`.columnD${y}`).text('');
        }
    })
}
function buildHighScoreNameBox (){
    const nameListHeader = $('<h3 class=nameRegistared/>').text("YOUR NAME WAS REGISTERED.")
    $('.highScoreBoard').append(nameListHeader)
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


function score(){
    endGame();
    buildScoreboard();
    buildNameBoxes();
    buildLetters();
    buildHighScoreNameBox();
    buildScoreHolderTable();
}

