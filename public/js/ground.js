/*
 * readyplayerone.ground.js 
*  defines the ground 
*/

/*jshint              bitwise  : true,  camelcase : false,
    curly    : true,  eqeqeq   : true,  freeze    : true,
    immed    : true,  indent   : 2,     noarg     : true,
    nonbsp   : true,  nonew    : true,  quotmark  : single,
    undef    : true,  unused   : true,  strict    : true,
    trailing : true,  maxdepth : 2,     maxlen    : 78,
    jquery   : true,  plusplus : true
*/

var Ground = function(game, gameSize) {
  'use strict';
  this.game = game;
  this.size = {x: gameSize.x, y: 10};
  this.center = { x: gameSize.x /2, y: 280 }; //gameSize.y - this.size.y };
};

Ground.prototype = {
  update: function() {
    'use strict';

  },

  die: function(game) {
    'use strict';
    console.log('ground dying');
  }
};

