ig.module(
  'game.entities.testLump'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityTestLump = ig.Entity.extend({
    // size: { x: 5, y: 3 },
    animSheet: new ig.AnimationSheet('media/testlump.png', 82, 72),
    //maxVel: { x: 200, y: 0 },
    //damage: 10,
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.NONE,
    collides: ig.Entity.COLLIDES.PASSIVE,
    zIndex: 300,
    //cancerHost: null,

    //init: function(x, y, settings, cancerHost) {
    init: function(x, y, settings) {
      //this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
      //this.addAnim('idle', 0.2, [0]);
      //this.parent(x + (settings.flip ? -4 : 8), y + 8, settings);
      //this.cancerHost = cancerHost;
      this.addAnim('idle', 1, [0]);
    }//,

    // update: function() {
    //   this.pos.x = this.cancerHost.pos.x;
    //   this.pos.y = this.cancerHost.pos.y;
    // }

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