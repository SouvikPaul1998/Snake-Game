//variable and const declarations
let inputDir={x:0, y:0};
const foodSound=new Audio('./music/food.mp3')
const gameOverSound=new Audio('./music/gameover.mp3')
const moveSound=new Audio('./music/move.mp3')
const musicSound=new Audio('./music/music.mp3')
let speed=6;
let lastPaintTime=0;
let score=0;
let snakeArr=[
    {x:13,y:15}
    
]
let food={x : 6, y: 7}

//Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime -lastPaintTime)/1000 < 1/speed) return;
    lastPaintTime= ctime;
    gameEngine();
}

// small change //remove function
function canplay(int j){
    console.log(j)
}

function isCollide(snake){  //checks whether the snake collided against any boundaries
    
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0) return true;
    for(let i=1;i<snake.length;i++){
        if(snake[0].x===snake[i].x && snake[0].y===snake[i].y)
         return true;
    }
    
    
    return false;
}

function gameEngine(){
   //updating the snake array & food

   if(isCollide(snakeArr)){
    gameOverSound.play();
    musicSound.pause();
    inputDir={x:0, y:0}
    alert("Game Over. Press any key to play again")
    snakeArr=[{x:10,y:15}]
    score=0;
   }

   //if food is eaten, increment the score and regenerate food
   if(snakeArr[0].y===food.y && snakeArr[0].x ===food.x){
    foodSound.play()
    snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y})
    let a=2;
    let b=16;
    food={x:Math.round(a+ (b-a)*Math.random()), y:Math.round(a+ (b-a)*Math.random())}
   }
    
   //Moving the snake
   for(let i=snakeArr.length-2;i>=0;i--){
    snakeArr[i+1]={...snakeArr[i]};
   }
   snakeArr[0].x+=inputDir.x;
   snakeArr[0].y+=inputDir.y;
   
    //Display the snake
    board.innerHTML="";
    snakeArr.forEach((e,idx)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(idx==0) snakeElement.classList.add('head')
        else snakeElement.classList.add('snake')
        
        board.appendChild(snakeElement);
    })
    //Display the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
   
}







//Main Logic will be written here
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    //inputDir={ x:0,y:1}
    moveSound.play()
    switch (e.key) {
        case "ArrowUp":
            //console.log("ArrowUp")
            inputDir.x=0;
            inputDir.y=-1;
            //console.log(snakeArr[0])
            break;
        case "ArrowDown":
            //console.log("ArrowDown")
            inputDir.x=0;
            inputDir.y=1;
            //console.log(snakeArr[0])
            break;
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y= 0;
            //console.log("ArrowLeft")
            //console.log(snakeArr[0])
            break;    
        case "ArrowRight":
            //console.log("ArrowRight")
            inputDir.x=1;
            inputDir.y=0;
            //console.log(snakeArr[0])
            break;
        default:
            break;
    }

})