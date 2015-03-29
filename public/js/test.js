;(function() {
  var Game = function(canvasId) {
    var canvas = document.getElementById(canvasId);
    var screen = canvas.getContext('2d');
    var gameSize = { x: canvas.width, y: canvas.height };
    
    var self = this;

    drawRect(screen, "red", 0, 0, 50);
    drawRect(screen, "black", 5, 5, 40);
    drawRect(screen, "red", 6, 6, 38);
    drawRect(screen, "white", 20, 20, 10);

    x = 0;

    y = 310

    var tick = function() {
      drawRect(screen, "white", 0, 0, 310);
      moveRectBack(screen, y);
      moveRect(screen, x);
      x++;

      if ( x > 310) {
        x =0;
      }

      y--;

      if ( y < 0) {
        y = 310;
      }
      requestAnimationFrame(tick);
    };

    tick();

  };

  var moveRect = function(screen, i) {
    drawRect(screen, "green", i, 0, 50);
    drawRect(screen, "yellow", i + 5,  5, 40);
  };

  var moveRectBack = function(screen, i) {
    drawRect(screen, "green", 260, (310 - i), 50);
    drawRect(screen, "yellow", 265, (315 - i), 40);

  };

  var drawRect = function(screen, color, startX, startY, side) {
    screen.fillStyle = color;
    screen.fill();
    screen.fillRect(startX, startY, side, side);
  };

  Game.prototype = {
    update: function(gameSize) {
      var bodies = this.bodies;
      var notCollidingWithAnything = function(b1) {
        return bodies.filter(function(b2) { return colliding(b1, b2); }).length === 0;
      };

      var destroyedBodies = this.bodies.filter(function(b1) {return !notCollidingWithAnything(b1);});
      
      var lostBodies = this.bodies.filter(function(b1) {return b1.center.y < 0 || b1.center.y > gameSize.y });

      var removableBodies = destroyedBodies.concat(lostBodies);

      this.bodies = this.bodies.filter( function(b1) { 
        return !(removableBodies.contains(b1));
      });
      
      for (var i = 0; i < removableBodies.length; i++) {
        removableBodies[i].die(this);
      }

      for (var u = 0; u < this.bodies.length; u++) {
        this.bodies[u].update();
      }
    },

    draw: function(screen, gameSize) {
      screen.clearRect(0, 0, gameSize.x, gameSize.y);
      for (var i = 0; i < this.bodies.length; i++) {
        drawRect(screen, this.bodies[i]);
      }
    },
      
    addBody: function(body) {
      this.bodies.push(body);
    },

    invadersBelow : function(invader) {
      return this.bodies.filter(function (b) {
        return b instanceof Invader &&
          b.center.y > invader.center.y &&
          b.center.x - invader.center.x < invader.size.x;
      }).length > 0;
    },
    switchFiringCapability : function() {
      if(this.playerCanFire) {
        this.playerCanFire = false;
      } else {
        this.playerCanFire = true;
      }
    }
  };

  window.onload = function() {
    new Game("screen");
  };

})();
