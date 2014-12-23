;(function() {
  var Game = function(canvasId) {
    var canvas = document.getElementById(canvasId);
    var screen = canvas.getContext('2d');
    var gameSize = { x: canvas.width, y: canvas.height };

    this.bodies = createInvaders(this).concat(new Player(this, gameSize)).concat(new Ground(this, gameSize));

    this.playerCanFire = true;
    
    var self = this;
    loadSound("sounds/shoot.wav", function(shootSound) {
      self.shootSound = shootSound;

      var tick = function() {
        self.update(gameSize);
        self.draw(screen, gameSize);
        requestAnimationFrame(tick);
      };

      tick();
    });
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

  var createInvaders = function(game) {
    var invaders = [];

    for (var i = 0; i < 24; i ++) {
      var x = 30 + (i % 8) * 30;
      var y = 30 + (i % 3) * 30;
      
      invaders.push(new Invader(game, { x: x, y: y }));
    }
    return invaders;
  };

  var drawRect = function(screen, body) {
    screen.fillRect(body.center.x - body.size.x / 2,
                    body.center.y - body.size.y / 2,
                    body.size.x, 
                    body.size.y);
  };

  var colliding = function(b1, b2) {
    return !(b1 === b2 || 
            b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
            b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
            b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
            b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2);
  };

  var loadSound = function(url, callback) {
    var loaded = function() {
      callback(sound);
      sound.removeEventListener('canplaythrough', loaded);
    };

    var sound = new Audio(url);
    sound.addEventListener('canplaythrough', loaded);
    sound.load();
  };

  window.onload = function() {
    new Game("screen");
  };

  Array.prototype.contains = Array.prototype.contains || function(obj)
  {
    var i, l = this.length;
    for (i = 0; i < l; i++)
    {
      if (this[i] == obj) return true;
    }
    return false;
  };
})();
