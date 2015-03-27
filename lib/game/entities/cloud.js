ig.module(
  'game.entities.cloud'
)
.requires(
  'impact.entity'
  //'game.entities.testLump'
)
.defines(function() {
  EntityCloud = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/cloud_1.png', 572, 107),
    size: { x: 500, y: 100 },
    flip: false,
    zIndex: 1,
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.NONE,
    collides: ig.Entity.COLLIDES.PASSIVE,
    gravityFactor: 0,
    resetX: 23000,
    clouds: [],

    init: function(x, y, settings) {
      this.parent(x, y, settings);
      this.vel.x = -(Math.floor((Math.random() * 100) + 1) + 100); // Random number between 1 and 100 + 100.
      this.loadAnimation();
    },

    // update: function() {
    //   this.parent();
    // },

    handleMovementTrace: function(res) {
      // Override default draw function so object ignores collision layer (this works because we're doing what `parent` does without invoking it).
      this.pos.x += this.vel.x * ig.system.tick;
      this.pos.y += this.vel.y * ig.system.tick;

      // If object reaches extreme left side of level, reset its position to the extreme right side.
      if (this.pos.x < 0) {
        this.pos.x = this.resetX;
      }
    },

    loadAnimation: function() {
      var cloudNum = Math.floor((Math.random() * 2) + 1);
      switch(cloudNum) {
      case 1:
        this.animSheet = new ig.AnimationSheet('media/cloud_1.png', 572, 107);
        break;
      case 2:
        this.animSheet = new ig.AnimationSheet('media/cloud_2.png', 368, 151);
        break;
      case 3:
        this.animSheet = new ig.AnimationSheet('media/rainbow.png', 700, 700);
        break;
      default:
        // nothing (the animSheet is already set to a default value).
      }
      this.addAnim('hover', 1, [0]);
      this.currentAnim = this.anims.hover;
    }

  });
});