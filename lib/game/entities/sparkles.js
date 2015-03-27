ig.module(
  'game.entities.sparkles'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntitySparkles = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/sparkles.png', 932, 916),
    callBack: null,
    idleTimer: null,
    zIndex: 700,
    playerx: 0,
    playery: 0,
    playerSpawned: false,
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.NONE,
    collides: ig.Entity.COLLIDES.PASSIVE,
    target: null,
    //harpSFX: new ig.Sound('media/sounds/dream-harp-03.*'),

    init: function(x, y, settings) {
      this.parent(x, y, settings);
      this.addAnim('sparkle', 0.02, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);
      this.currentAnim = this.anims.sparkle;
      //this.harpSFX.volume = 0.4;
      //this.harpSFX.play();
    },

    update: function() {
      // if (this.idleTimer.delta() > this.playerSpawnTime && !this.playerSpawned) {
      //   this.target.kill();
      //   ig.game.spawnEntity(EntityPlayer, this.playerx, this.playery);
      //   this.playerSpawned = true;
      // }

      // if (this.idleTimer.delta() > this.lifetime) {
      //   this.kill();
      //   // if (this.callBack) {
      //   //   this.callBack();
      //   // }
      //   return;
      // }
      this.parent();
    }
  });
});