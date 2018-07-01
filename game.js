/**
 * Created by alina on 10-Dec-16.
 */


// Create the canvas for the game to display in
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);



/*Load IMAGES*/

// Load the background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    // show the background image
    bgReady = true;
};
bgImage.src = "images/nature.jpg";

// Load the wolf image
var wolfReady = false;
var wolfImage = new Image();
wolfImage.onload = function () {
    // show the here image
    wolfReady = true;
};
wolfImage.src = "images/wolf.jpg";

// Load the rabbit image
var rabbitReady = false;
var rabbitImage = new Image();
rabbitImage.onload = function () {
    // show the rabbit image
    rabbitReady = true;
};
rabbitImage.src = "images/rabbit.gif";




// Create the game objects
var wolf = {
    speed: 256 // movement speed of wolf in pixels per second
};
var rabbit = {};
var rabbitsCaught = 0;

// Handle keyboard controls
var keysDown = {};

// Check for keys pressed where key represents the keycode captured
addEventListener("keydown", function (key) {
    keysDown[key.keyCode] = true;
}, false);

addEventListener("keyup", function (key) {
     delete keysDown[key.keyCode];
}, false);



// Reset the player and rabbit positions when player catches a rabbit
var reset = function () {
    // Reset player's position to centre of canvas
    wolf.x = canvas.width / 2;
    wolf.y = canvas.height / 2;

    // Place the rabbit somewhere on the canvas randomly
    rabbit.x = 32 + (Math.random() * (canvas.width - 64));
    rabbit.y = 32 + (Math.random() * (canvas.height - 64));
};



// Update game objects - change player position based on key pressed
var update = function (modifier) {
    if (38 in keysDown) { // Player is holding up key
        wolf.y -= wolf.speed * modifier;
    }
    if (40 in keysDown) { // Player is holding down key
        wolf.y += wolf.speed * modifier;
    }
    if (37 in keysDown) { // Player is holding left key
        wolf.x -= wolf.speed * modifier;
    }
    if (39 in keysDown) { // Player is holding right key
        wolf.x += wolf.speed * modifier;
    }

    // Check if player and rabbit collider
    if (
        wolf.x <= (rabbit.x + 32)
        && rabbit.x <= (wolf.x + 32)
        && wolf.y <= (rabbit.y + 32)
        && rabbit.y <= (wolf.y + 32)
    ) {
        ++rabbitsCaught;
        reset();
    }
};



// Draw everything on the canvas
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (wolfReady) {
        ctx.drawImage(wolfImage, wolf.x, wolf.y);
    }

    if (rabbitReady) {
        ctx.drawImage(rabbitImage, rabbit.x, rabbit.y);
    }

    // Display score and time
    ctx.fillStyle = "red";
    ctx.font = "20px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Capturari : " + rabbitsCaught, 20, 20);
    ctx.fillText("Timpul: " + count, 20, 50);
    // Display game over message when timer finished
    if(rabbitsCaught==0 && count==0){
        ctx.fillText("Ai pierdut! 0 prinderi!",100,120);
    }else if(rabbitsCaught<20 && count==0){
        ctx.fillText("Ai pierdut! Iepurele a fost prins de "+rabbitsCaught+" ori!",120,170);
    }
    if(rabbitsCaught>=20){
        ctx.fillText("Ai castigat !", 200, 220);
        ctx.fillText("Iepurele a fost prins de "+rabbitsCaught +" ori!",240,270);
    }
};



var count = 30; // how many seconds the game lasts for - default 30
var finished = false;
var counter =function(){
    count=count-1; // countown by 1 every second
    // when count reaches 0 clear the timer, hide rabbit and
    // wolf and finish the game
    if (count <= 0)
    {
        // stop the timer
        clearInterval(counter);
        // set game to finished
        finished = true;
        count=0;
        // hider rabbit and wolf
        rabbitReady=false;
        wolfReady=false;
    }

}


// timer interval is every second (1000ms)
setInterval(counter, 1000);

// The main game loop
var main = function () {
    // run the update function
    update(0.02); // do not change
    // run the render function
    render();
    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
reset();
main();
