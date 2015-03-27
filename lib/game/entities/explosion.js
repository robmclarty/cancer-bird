ig.module(
  'game.entities.explosion'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityExplosion = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/smoke.png', 1024, 768),
    size: { x: 1024, y: 768 },
    lifetime: 1,
    playerSpawnTime: 0.2,
    callBack: null,
    idleTimer: null,
    zIndex: 400,
    playerx: 0,
    playery: 0,
    playerSpawned: false,
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.NONE,
    collides: ig.Entity.COLLIDES.PASSIVE,
    target: null,
    splodeSFX: new ig.Sound('media/sounds/water-droplet-1.*'),

    init: function(x, y, settings) {
      this.parent(x, y, settings);
      this.addAnim('splode', 0.02, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34], true);
      this.currentAnim = this.anims.splode;
      this.idleTimer = new ig.Timer();
      this.splodeSFX.play();
    },

    update: function() {
      if (this.idleTimer.delta() > this.playerSpawnTime && !this.playerSpawned) {
        this.target.kill();
        ig.game.spawnEntity(EntityPlayer, this.playerx, this.playery);
        this.playerSpawned = true;
      }

      if (this.idleTimer.delta() > this.lifetime) {
        this.kill();
        // if (this.callBack) {
        //   this.callBack();
        // }
        return;
      }
      this.parent();
    }
  });
});