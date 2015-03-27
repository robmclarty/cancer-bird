ig.module(
  'game.entities.player'
)
.requires(
  'impact.entity',
  'game.entities.jennifer',
  'game.entities.staminaBar'
  //'impact.sound',
  //'game.entities.bullet',
  //'game.entities.grenade',
  //'game.entities.explosion'
)
.defines(function() {
  EntityPlayer = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/bird_g.png', 514, 404),
    size: { x: 300, y: 200 },
    // animSheet: new ig.AnimationSheet('media/crappy-bird.png', 50, 50),
    // size: { x: 50, y: 50 },
    offset: { x: 150, y: 150 },
    flip: true,
    maxVel: { x: 400, y: 250 },
    friction: { x: 50, y: 100 },
    accelGround: 400,
    accelAir: 150,
    accelRate: 500,
    stamina: 1, // multiplier times acceleation that affects how fast you can go
    //decelStamina: 0.003,
    decelStamina: 0, // stamina never runs out
    accelStamina: 0.001,
    infectionRate: 0.2,
    //jump: 175,
    fly: 200,
    health: 100,
    infection: null,
    //staminaBar: null,
    zIndex: 100,
    //weapon: 0,
    //totalWeapons: 2,
    //activeWeapon: 'EntityBullet',
    // jumpSFX: new ig.Sound('media/sounds/jump.*'),
    // shootSFX: new ig.Sound('media/sounds/shoot.*'),
    deathSFX: new ig.Sound('media/sounds/whip-whoosh-04.*'),
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.NONE,
    collides: ig.Entity.COLLIDES.PASSIVE,
    startPosition: null,

    init: function(x, y, settings) {
      this.startPosition = { x: x, y: y };
      this.setupAnimation();
      this.parent(x, y, settings);
      //this.infect();
    },

    setupAnimation: function() {
      //this.addAnim('fly', 0.02, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);
      //this.addAnim('glide', 0.04, [61, ... , 91]);
      this.addAnim('fly', 0.02, [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]);
      this.addAnim('glide', 0.04, [92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121]);
      this.currentAnim = this.anims.glide;
    },

    update: function() {
      // move left or right
      if (ig.input.state('left') && this.stamina > 0) {
        this.accel.x = -this.accelRate * this.stamina;
        this.flip = false;
      } else if (ig.input.state('right') && this.stamina > 0) {
        this.accel.x = this.accelRate * this.stamina;
        this.flip = true;
      } else {
        this.accel.x = 0;
      }

      // vertical movement
      if (ig.input.state('up') && this.stamina > 0) {
        this.vel.y = -this.fly * this.stamina;
      } else if (ig.input.state('down')) {
        this.vel.y = this.fly;
      }

      // disengage
      if (ig.input.state('drop')) {
        //this.receiveDamage(this.health); // die
        this.kill();
      }

      // end of level
      if (this.pos.x > 22660) {
        ig.system.setGame(WinScreen);
      }

      //drainStamina();
      
      this.drainHealth();

      // adjust lump
      // if (this.lump !== null) {
      //   this.lump.pos.x = this.pos.x;
      //   this.lump.pos.y = this.pos.y;
      // }

      // set the current animation, based on the player's speed
      if (this.vel.y < 0 || this.accel.x != 0) {
        this.currentAnim = this.anims.fly;
      // } else if (this.vel.y > 0) {
      //   this.currentAnim = this.anims.fall;
      // } else if (this.vel.x != 0) {
      //   this.currentAnim = this.anims.glide;
      } else {
        this.currentAnim = this.anims.glide;
      }

      // flip if needed
      this.currentAnim.flip.x = this.flip;
      //this.infection.flip
      //this.infection.currentAnim.flip.x = this.flip;

      // move!
      this.parent();
    },

    // if accelerating or acending, reduce stamina
    drainStamina: function() {
      if (ig.input.state('up') || ig.input.state('left') || ig.input.state('right')) {
        this.stamina -= this.decelStamina;
        if (this.stamina < 0) {
          this.stamina = 0;
        }
      } else {
        this.stamina += this.accelStamina;
        if (this.stamina > 1) {
          this.stamina = 1;
        }
      }

      // Update game stamina bar.
      ig.game.stamina = Math.round(this.stamina * 100);
    },

    handleMovementTrace: function(res) {
      // collision with floor? death...
      // if (res.collision.y) {
      //   this.kill();
      // }

      this.parent(res);
    }, 

    drainHealth: function() {
      this.receiveDamage(this.infectionRate, this);
    },

    infect: function() {
      //this.infection = ig.game.spawnEntity('EntityJennifer', this.posx, this.posy, { flip: this.flip });
    },

    kill: function() {
      this.deathSFX.play();
      this.parent();
      ig.game.spawnEntity(EntityDyingBird, this.pos.x, this.pos.y, { flip: this.flip });

      // If killed because health reached zero, also add a dying lump.
      //if (this.health <= 0) {
        ig.game.spawnEntity(EntityJennifer, this.pos.x, this.pos.y, { flip: this.flip });
      //}
    },

    // receiveDamage: function(amount, from) {
    //   if (this.invincible) {
    //     return;
    //   } else {
    //     this.parent(amount, from);
    //   }
    // },

    draw: function() {
      if (this.invincible) {
        this.currentAnim.alpha = this.invincibleTimer.delta() / this.invincibleDelay * 1;
      }
      this.parent();
    }
  });
});