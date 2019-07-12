// function addNameAndScore (){
//     const tempArr = highScoreArray.slice();
//     highestScore = 0
//     highestName
//     for (let i = 0; i<tempArr.length; i++){
//         if(tempArr[i].score > highestScore){
//             highestScore = tempArr[i].score
//         }
//     }
// }
console.log('hello')


function sortArray(){
        highScoreArray.push(playerName)
        for (let i = 0; i< highScoreArray.length; i++){
            if(playerScore > highScoreArray[4].score){
                highScoreArray[5].name = playerName
                highScoreArray[5].score = playerScore
                break; 
            }
        }
        playerName = ''
        playerScore = 0
        for(let y = 1; y < 11; y++){
            $(`.columnD${y}`).text('');
            $(`.columnD${y}`).css('text-decoration','none');
        }
}


function fillInPlayerStats (){
    for(i=0; i<highScoreArray.length; i++){
        $(`.score${i+1}`).text(highScoreArray[i].score)
        $(`.name${i+1}`).text(highScoreArray[i].name)
    }
}

const highScoreArray = [
    {
        name: 'f',
        score: 3
    },
    {
        name: 'e',
        score: 5
    },
    {
        name: 'd',
        score: 1
    },
    {
        name: 's',
        score: 6
    },
    {
        name: 'a',
        score: 2
    }
]
// let sortArray
// function sortArry (){
const sorted = highScoreArray.sort(function(a,b) {
	 return a.score - b.score
});

console.log(sorted)


// console.log(sortArry());
