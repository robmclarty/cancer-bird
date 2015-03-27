ig.module(
  'game.entities.dyingBird'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityDyingBird = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/bird_g.png', 514, 404),
    size: { x: 100, y: 50 },
    offset: { x: 187, y: 147 },
    maxVel: { x: 400, y: 800 },
    //friction: { x: 100, y: 0 },
    flip: false,
    zIndex: 49,
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.NONE,
    collides: ig.Entity.COLLIDES.PASSIVE,
    gravityFactor: 800,

    init: function(x, y, settings) {
      this.parent(x, y, settings);
      this.addAnim('dying', 0.01, [123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153], true);
      this.currentAnim = this.anims.dying;
    },

    handleMovementTrace: function(res) {
      if (res.collision.y) {
        this.kill();
      }

      this.parent(res);
    }

  });
});