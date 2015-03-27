ig.module(
  'game.entities.cleanBird'
)
.requires(
  'impact.entity',
  'game.entities.dyingBird',
  'game.entities.jennifer',
  'game.entities.sparkles'
)
.defines(function() {
  EntityCleanBird = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/bird_g.png', 514, 404),
    size: { x: 514, y: 404 },
    offset: { x: 0, y: 0 },
    flip: false,
    zIndex: 50,
    defaultVelX: -400,
    defaultVelY: 100,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,
    changeVerticalDirectionDelay: 2,
    changeVerticalDirectionTimer: null,
    gravityFactor: 0,
    resetX: 23000,
    engaged: false,
    sparkles: null,
    sparkling: false,
    sparkleOffset: { x: -270, y: -230 },

    init: function(x, y, settings) {
      this.parent(x, y, settings);
      this.addAnim('fly', 0.02, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);
      this.addAnim('glide', 0.04, [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91]);
      this.currentAnim = this.anims.fly;
      this.vel.x = this.defaultVelX;
      this.changeVerticalDirectionTimer = new ig.Timer();
      this.changeVerticalDirection();
    },

    // update: function() {
    //   // Alter the vertical direction every so often.
    //   if (this.changeVerticalDirectionTimer.delta() > this.changeVerticalDirectionDelay) {
    //     this.changeVerticalDirectionTimer.reset();
    //     this.changeVerticalDirection();
    //   }

    //   this.parent();
    // },

    handleMovementTrace: function(res) {
      // Override default draw function so object ignores collision layer (this works because we're doing what `parent` does without invoking it).
      this.pos.x += this.vel.x * ig.system.tick;
      this.pos.y += this.vel.y * ig.system.tick;

      // If object reaches extreme left side of level, reset its position to the extreme right side.
      if (this.pos.x < -200) {
        this.pos.x = this.resetX;
      }

      // Change vertical velocity randomly to give object a more natural sense of movement.
      if (this.changeVerticalDirectionTimer.delta() > this.changeVerticalDirectionDelay) {
        this.changeVerticalDirectionTimer.reset();
        this.changeVerticalDirection();
      }

      // Turn on sparkles if currently touching player hitbox.
      var player = ig.game.getEntitiesByType(EntityPlayer)[0];
      if (player) {
        if (this.touches(player) && !this.sparkling) {
          this.sparkles = ig.game.spawnEntity(EntitySparkles, this.pos.x + this.sparkleOffset.x, this.pos.y + this.sparkleOffset.y);
          this.sparkling = true;
        } else if (this.touches(player) && this.sparkling) {
          this.sparkles.pos.x = this.pos.x + this.sparkleOffset.x;
          this.sparkles.pos.y = this.pos.y + this.sparkleOffset.y;
        } else if (!this.touches(player) && this.sparkling) {
          this.sparkles.kill();
          this.sparkles = null;
          this.sparkling = false;
        }
      }
    },

    // Change vertical direction if hitting extreme edges (here, 4800 is hardcoded based on the specific level being used. TODO: adjust this to be more dynamic).
    // If not hitting the extreme vertical edges, change direction randomly (up, down, or straight).
    changeVerticalDirection: function(direction) {
      if (this.pos.y < 0 || this.pos.y > 4800) {
        this.vel.y *= -1;
      } else {
        var direction = Math.floor((Math.random() * 3) + 1); // `direction` is a value between 1 and 3 inclusive.
        if (direction === 1) {
          this.vel.y = this.defaultVelY; // move down
        } else if (direction === 2) {
          this.vel.y = -this.defaultVelY; // move up
        } else {
          this.vel.y = 0; // fly straight
        }
      }

      // Change animation to glide when going down or straight and fly when going up.
      if (this.vel.y <= 0) {
        this.currentAnim = this.anims.fly;
      } else {
        this.currentAnim = this.anims.glide;
      }
    },

    // If collision between player and this, initiate "within zone of infection" functions.
    check: function(other) {
      //if (other instanceof EntityJennifer) {
        var offsetx = 50;
        var offsety = 100;
        var spawnx = other.pos.x + offsetx;
        var spawny = other.pos.y + offsety;
        //ig.game.spawnEntity(EntityJennifer, spawnx, spawny, { target: this });
        //other.kill();
        //other.target = this;
        other.engageTarget(this);
      //}
    },

    // handleMovementTrace: function(res) {
    //   // collision with start? death...
    //   if (res.collision.x) {
    //     this.kill();
    //   }

    //   this.parent(res);
    // }, 

    kill: function() {
      if (this.sparkling || this.sparkles !== null) {
        this.sparkles.kill();
      }
      this.parent();
      //ig.game.spawnEntity(EntityPlayer, this.pos.x, this.pos.y);
      //ig.game.spawnEntity(EntityDyingBird, this.pos.x, this.pos.y, { flip: this.flip });
    }

  });
});