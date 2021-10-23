var r=document.getElementById('resign')
r.addEventListener('click', resign)
const cellElements=document.querySelectorAll('[data-cell]')
const board=document.getElementById('board')
let circleTurn
const X_CLASS='x'
const winningmsg=document.querySelector('[data-winning-message-text]')
const  winningMsgElement=document.getElementById('winning-message')
const CIRCLE_CLASS='circle'
let scoreX=0
let scoreO=0

document.write(scoreX)

scoreO.innerHTML=0
const Winning_Combination=[
   [0,1,2],
   [3,4,5],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8],
   [0,4,8],
   [2,4,6]

]
startGame()
function startGame(){
   document.getElementById('scoreX').innerHTML=scoreX.toString()
document.getElementById('scoreO').innerHTML=scoreO.toString()
circleTurn=true
cellElements.forEach(cell =>{
   cell.removeEventListener('click', handleClick,{once: true})
   cell.classList.remove(X_CLASS)
   cell.classList.remove(CIRCLE_CLASS)
})
cellElements.forEach(cell =>{
   cell.addEventListener('click', handleClick,{once: true})
})
setBoardHoverClass()
}

function handleClick(e){
   const cell=e.target
   const currentClass=circleTurn ?  X_CLASS:CIRCLE_CLASS
   placeMark(cell, currentClass)
   if(checkWin(currentClass)){
       endgame(false);
       
   } else if(draw()){
         endgame(true)
   }
   switchClass()
   setBoardHoverClass()
}


function draw(){
   return [...cellElements].every(cell =>{
      return cell.classList.contains(X_CLASS)
||   cell.classList.contains(CIRCLE_CLASS) })
}
function endgame(draw){
   if(draw){
      winningmsg.innerText='Draw!'
      scoreX+=0.5
      scoreO+=0.5
   }else{
      winningmsg.innerText=`${circleTurn ? "X's" : "O's"} Wins!`
      if(circleTurn){
         scoreX+=1
         console.log(scoreX)
      }else{
         scoreO+=1
      }
   }
   winningMsgElement.classList.add('show')
}

function placeMark(cell, currentClass){
   cell.classList.add(currentClass);
}
function switchClass(){
   circleTurn=!circleTurn
}
function setBoardHoverClass(){
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if(circleTurn){
     board.classList.add(X_CLASS)
  }
  else{
   board.classList.add((CIRCLE_CLASS))
  }
}
function checkWin(currentClass){
   return  Winning_Combination.some(combination =>{
      return combination.every(index =>{
         return cellElements[index].classList.contains(currentClass)
      })
   })
}


function restart(){
   winningMsgElement.classList.remove('show')
   startGame()
}
function resign(){
   winningmsg.innerText=`${circleTurn ? "O's" : "X's"} Wins!`
   if(circleTurn){
     
      scoreO+=1
      console.log(scoreX)
   }else{
      scoreX+=1
   }
   winningMsgElement.classList.add('show')
}