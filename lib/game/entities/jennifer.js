ig.module(
  'game.entities.jennifer'
)
.requires(
  'impact.entity',
  'game.entities.explosion',
  'game.entities.deadJennifer'
)
.defines(function() {
  EntityJennifer = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/jennifer.png', 129, 117),
    size: { x: 129, y: 117 },
    maxVel: { x: 800, y: 200 },
    //maxVel: { x: 200, y: 0 },
    //damage: 10,
    zIndex: 200,
    health: 100,
    attached: true,
    flip: false,
    attachmentThreshold: 1,
    attachmentOffset: { x: 170, y: 100 },
    //player: null,
    //offset: { x: 100, y: 100 },
    virulence: 0.001,
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.B,
    collides: ig.Entity.COLLIDES.PASSIVE,
    target: null,
    speed: 800,
    deathRate: 0.3,
    dead: false,

    init: function(x, y, settings) {
      this.parent(x, y, settings);
      this.addAnim('idle', 0.02, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);
      //this.addAnim('melt', 0.04, [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45], true);
      this.currentAnim = this.anims.idle;
      // console.log("targetx: " + this.target.pos.x + ", targety: " + this.target.pos.y);
    },

    // If target is null, then just fall to the ground and die, otherwise, fly towards the target and infect it.
    update: function() {
      if (this.health > 0) {
        this.receiveDamage(this.deathRate); // Continually die while not attached to a bird.    
      }
      // } else {
      //   if (this.dead) { // do nothing, wait for user feedback
      //     //this.kill();
      //   } else { // melt, and remove from gameplay
      //     this.currentAnim = this.anims.melt;
      //     this.dead = true;
      //     //this.type = ig.Entity.TYPE.NONE; // Turn off collision detection (no longer elligible to infect more birds).
      //    // this.checkAgainst: ig.Entity.TYPE.NONE;
      //     // this.type = null;
      //     // this.checkAgainst = null;
      //   }
      // }

      // Save calculate actual target position.
      if (this.target !== null) {
        var targetx = this.target.pos.x + this.attachmentOffset.x;
        var targety = this.target.pos.y + this.attachmentOffset.y;
        var dirx = this.pos.x - targetx;
        var diry = this.pos.y - targety;
        var factor = this.speed / Math.sqrt(Math.pow(dirx, 2) + Math.pow(diry, 2));
        this.vel.x = -(dirx * factor);
        this.vel.y = -(diry * factor);
        
        // If within attachment threshold, kill the bird, and replace it with a conrollable player.
        if (dirx <= this.attachmentThreshold && diry <= this.attachmentThreshold) {
          //this.target.kill();
          this.kill();
          console.log('made it');
          //ig.game.spawnEntity(EntityPlayer, this.pos.x, this.pos.y);
          ig.game.spawnEntity(EntityExplosion, this.pos.x - 450, this.pos.y - 350, { target: this.target, playerx: this.pos.x, playery: this.pos.y });
          return;
        }
      }

      this.parent();
    },

    kill: function() {
      if (this.health <= 0) {
        ig.game.spawnEntity(EntityDeadJennifer, this.pos.x, this.pos.y, { flip: this.flip });
      }
      this.parent();
    },

    engageTarget: function(target) {
      if (this.target === null) {
        this.target = target;
      }
    }

    // handleMovementTrace: function(res) {
    //   this.parent(res);
    //   if (res.collision.x || res.collision.y) {
    //     this.kill();
    //   }
    // },

    // check: function(other) {
    //   other.receiveDamage(this.damage, this);
    //   this.kill();
    // }
  });
});