// Enemies our player must avoid
var Enemy = function(x, y, z) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.z = z;
    this.c = Math.random()*3 + 1;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >= 505) {
        this.x = -101;
        this.c = Math.random()*3 + 1;
        this.y = 60 + (Math.floor(Math.random() * 3))*83;
    }
    else {
        this.z = this.x;
        this.x += this.c * 100 * dt;
    }

};

Enemy.prototype.reset = function(){
    this.x = -101;
    this.y = 60 + (Math.floor(Math.random() * 3))*83;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.handleInput = function(input){
    if (input == 'left' && this.x != 0) {
        this.x -= 101;
    }
    else if (input == 'right' && this.x != 404) {
        this.x += 101;
    }
    else if (input == 'up') {
        this.y-= 83;
    }
    else if (input == 'down' && this.y !=392) {
        this.y+= 83;
    }
};

Player.prototype.update = function() {
    this.handleInput()
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Bonus = function(){
    this.x = (Math.floor(Math.random() * (4-1)) + 1) * 101;
    this.y = 60 + (Math.floor(Math.random() * (4-1)) + 1) * 83;
    this.sprite = 'images/Star.png';
};

Bonus.prototype.update = function() {
    this.x = (Math.floor(Math.random() * 5)) * 101;
    this.y = 60 + (Math.floor(Math.random() * 3 ) * 83);
};

Bonus.prototype.reset = function() {
    this.x = -101;
    this.y = -101;
};

Bonus.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var BlueGem = function(){
    Bonus.call();
    this.sprite = 'images/Gem_Blue.png';
    this.score = 100;
};

BlueGem.prototype = Object.create(Bonus.prototype);
BlueGem.prototype.constructor = BlueGem;

var GreenGem = function(){
    Bonus.call();
    this.sprite = 'images/Gem_Green.png';
    this.score = 200;
};

GreenGem.prototype = Object.create(Bonus.prototype);
GreenGem.prototype.constructor = GreenGem;

var Star = function(){
    Bonus.call();
    this.sprite = 'images/Star.png';
    this.score = 500;
};

Star.prototype = Object.create(Bonus.prototype);
Star.prototype.constructor = Star;

var Heart = function(){
    Bonus.call();
    this.sprite = 'images/Heart.png';
    this.score = 0;
};

Heart.prototype = Object.create(Bonus.prototype);
Heart.prototype.constructor = Heart;

var Life = function(){
    this.x = 50;
    this.y = 600;
    this.sprite = 'images/frog.png';
};

Life.prototype.render = function(i) {
    ctx.drawImage(Resources.get(this.sprite), this.x * i, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(-101,60);
var enemy2 = new Enemy(-101,143);
var enemy3 = new Enemy(-101,226);
var enemy4 = new Enemy(-101,226);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];
var player = new Player(202,392);
var blueGem = new BlueGem();
var blueGem1 = new BlueGem();
var blueGem2 = new BlueGem();
var greenGem = new GreenGem();
var greenGem1 = new GreenGem();
var star = new Star();
var heart = new Heart();
var allBonuses = [blueGem, blueGem1, blueGem2, greenGem, greenGem1, star];
var life = new Life();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
