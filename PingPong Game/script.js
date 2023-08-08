const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "lightblue";
const paddle1Color = "purple";
const paddle2Color = "red";
const paddleBorder = "black";
const ballColor = "yellow";
const ballBorderColor = "black";
const ballRadius = 12.5;
const paddleSpeed = 50;


let intervalID; //session of our game
let ballSpeed; 
let ballX = gameWidth / 2; // X co-ordinate (center co-ordinate)
let ballY = gameHeight / 2;// Y  co-ordinate (center co-ordinate)
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let paddle1 = {

    width: 25,

    height: 100,

    x: 0,

    y: 0

};

let paddle2 = {

    width: 25,

    height: 100,

    x: gameWidth - 25,

    y: gameHeight - 100

};



window.addEventListener("keydown", changeDirection);

resetBtn.addEventListener("click", resetGame);

gameStart();


// Initializing and Starting the game
function gameStart(){

    createBall();

    nextTick();

};

//Automatically updating and rendering the game level
function nextTick(){
    //rendering the game value for a random interval of 10
    intervalID = setTimeout(() => {

        clearBoard();

        drawPaddles();

        moveBall();

        drawBall(ballX, ballY);

        checkCollision();

        nextTick();

    }, 10)

};

//To clear the Board
function clearBoard(){

    ctx.fillStyle = boardBackground;

    ctx.fillRect(0, 0, gameWidth, gameHeight);

};

//To draw the paddles
function drawPaddles(){

    ctx.strokeStyle = paddleBorder;

    ctx.fillStyle = paddle1Color;

    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    ctx.fillStyle = paddle2Color;

    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

};

//Creating the Ball once game starts
function createBall(){

    ballSpeed = 1;

    if(Math.round(Math.random()) == 1){

        ballXDirection =  1; //Direction is toward Right

    }

    else{

        ballXDirection = -1; //Direction is toward Left

    }

    if(Math.round(Math.random()) == 1){

        ballYDirection = Math.random() * 1; //more random directions (for upward direction)

    }

    else{

        ballYDirection = Math.random() * -1; //more random directions (for downward direction)

    }

    //initially ball is in center of the Gameboard
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;

    drawBall(ballX, ballY);

};

//To move the Ball
function moveBall(){

    ballX += (ballSpeed * ballXDirection);

    ballY += (ballSpeed * ballYDirection);

};

//To draw the Ball
function drawBall(ballX, ballY){

    ctx.fillStyle = ballColor;

    ctx.strokeStyle = ballBorderColor;

    ctx.lineWidth = 2;

    ctx.beginPath(); //Method to start a new path, essentially resetting the current path.

    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI); //draws a circular arc on the canvas
    //ballX: The X coordinate of the center of the arc (ball).
    //ballY: The Y coordinate of the center of the arc (ball).
    //ballRadius: The radius of the ball.
    //0: The starting angle in radians (0 radians corresponds to the rightmost point of the circle).
    //2 * Math.PI: The ending angle in radians (2 * Math.PI radians corresponds to a full circle).
    //This combination of ballX, ballY, ballRadius, 0, and 2 * Math.PI draws a complete circle, representing the ball on the canvas.

    ctx.stroke(); //draws the outline of the ball using the defined strokeStyle and lineWidth.

    ctx.fill(); //fills the interior of the ball using the defined fillStyle, resulting in a solid colored ball.

};

//Checking if the Ball is striking the Paddles/ the Game Boundaries
function checkCollision(){
    //If ball is hitting lower end of gameboard, then direction is upwards
    if(ballY <= 0 + ballRadius){

        ballYDirection *= -1;

    }
    //If ball is hitting upper end of gameboard, then direction is downwards
    if(ballY >= gameHeight - ballRadius){

        ballYDirection *= -1;

    }
    //Player2
    if(ballX <= 0){

        player2Score+=1;

        updateScore();

        createBall();

        return;

    }
    //Player1
    if(ballX >= gameWidth){

        player1Score+=1;

        updateScore();

        createBall();

        return;

    }
    //If ball hits left paddle, go right
    if(ballX <= (paddle1.x + paddle1.width + ballRadius)){

        if(ballY > paddle1.y && ballY < paddle1.y + paddle1.height){

            ballX = (paddle1.x + paddle1.width) + ballRadius; // if ball gets stuck

            ballXDirection *= -1;

            ballSpeed += 1;

        }

    }
    //If ball hits right paddle, go left
    if(ballX >= (paddle2.x - ballRadius)){

        if(ballY > paddle2.y && ballY < paddle2.y + paddle2.height){

            ballX = paddle2.x - ballRadius; // if ball gets stuck

            ballXDirection *= -1;

            ballSpeed += 1;

        }

    }

};

//To Change the Direction of Paddles
function changeDirection(event){

    const keyPressed = event.keyCode;

    const paddle1Up = 87; //W

    const paddle1Down = 83; //S

    const paddle2Up = 38; //Upward Arrow

    const paddle2Down = 40; //Downward Arrow

    switch(keyPressed){

        case(paddle1Up):

            if(paddle1.y > 0){

                paddle1.y -= paddleSpeed;

            }

            break;

        case(paddle1Down):

            if(paddle1.y < gameHeight - paddle1.height){

                paddle1.y += paddleSpeed;

            }

            break;

        case(paddle2Up):

            if(paddle2.y > 0){

                paddle2.y -= paddleSpeed;

            }

            break;

        case(paddle2Down):

            if(paddle2.y < gameHeight - paddle2.height){

                paddle2.y += paddleSpeed;

            }

            break;

    }

};

//Update the Score Dynamically
function updateScore(){

    scoreText.textContent = `${player1Score} : ${player2Score}`;

};

//To reset the Game
function resetGame(){

    player1Score = 0;

    player2Score = 0;

    paddle1 = {

        width: 25,

        height: 100,

        x: 0,

        y: 0

    };

    paddle2 = {

        width: 25,

        height: 100,

        x: gameWidth - 25,

        y: gameHeight - 100

    };

    ballSpeed = 1;

    ballX = 0;

    ballY = 0;

    ballXDirection = 0;

    ballYDirection = 0;

    updateScore();

    clearInterval(intervalID);

    gameStart();

};