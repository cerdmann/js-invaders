/*
 * readyplayerone.player.js 
*  defines a Player
*/

/*jshint              bitwise  : true,  camelcase : false,
    curly    : true,  eqeqeq   : true,  freeze    : true,
    immed    : true,  indent   : 2,     noarg     : true,
    nonbsp   : true,  nonew    : true,  quotmark  : single,
    undef    : true,  unused   : true,  strict    : true,
    trailing : true,  maxdepth : 2,     maxlen    : 78,
    jquery   : true,  plusplus : true
*/

var Player = function(game, gameSize) {
  'use strict';
  this.game = game;
  this.size = {x: 15, y:15 };
  this.center = { x: gameSize.x /2, y: gameSize.y - this.size.y };
  this.boundary = { left: 0 + this.size.x/2, right: gameSize.x - this.size.x/2};
  this.keyboarder = new Keyboarder();
};

Player.prototype = {
  update: function() {
    'use strict';
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
      this.center.x -= 2;   
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.center.x += 2;   
    }

    if (this.center.x < this.boundary.left ) {
      this.center.x = this.boundary.left;
    }

    if (this.center.x > this.boundary.right) {
      this.center.x = this.boundary.right;
    }
    if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
      if(this.game.playerCanFire) {
        this.game.switchFiringCapability();
        var bullet = new Bullet( {  x: this.center.x, 
                                    y: this.center.y - this.size.x / 2},
                                 {  x: 0, y: -6 },
                                 true);
        this.game.addBody(bullet);
        this.game.shootSound.load();
        this.game.shootSound.play();
      }
    }
  },

  die: function(game) {
    'use strict';
    console.log('player dying');
  }
};

