  var Bullet = function(center, velocity, isPlayerBullet) {
    this.size = {x: 3, y: 3 };
    this.center = center;  
    this.velocity = velocity;
    this.playerBullet = isPlayerBullet;
  };

  Bullet.prototype = {
    update: function() {
      this.center.x += this.velocity.x;   
      this.center.y += this.velocity.y;
    },

    die: function(game) {
      if(this.playerBullet) {
        game.switchFiringCapability();
      }

      console.log('bullet dying');
    }
  };

