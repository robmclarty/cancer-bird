ig.module(
  'game.entities.jenniferStart'
)
.requires(
  'impact.entity'
  //'game.entities.testLump'
)
.defines(function() {
  EntityJenniferStart = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/jenniferStart.png', 1280, 754),
    zIndex: 1200,
    idleDelay: 1,
    idleTimer: null,

    init: function(x, y, settings) {
      this.parent(x, y, settings);
      this.addAnim('idle', 0.02, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);
      this.addAnim('jump', 0.04, [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59], true);
      this.currentAnim = this.anims.idle;
    },

    jump: function() {
      this.currentAnim = this.anims.jump;
      this.idleTimer = new ig.Timer();
    },

    update: function() {
      this.parent();
      if (this.idleTimer !== null && this.idleTimer.delta() > this.idleDelay) {
        ig.system.setGame(CancerBirdGame); // Start the game.
      }
    }
  });
});