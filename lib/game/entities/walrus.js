ig.module(
  'game.entities.walrus'
)
.requires(
  'impact.entity'
  //'game.entities.testLump'
)
.defines(function() {
  EntityWalrus = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/walrus1.png', 558, 414),
    size: { x: 500, y: 100 },
    zIndex: 200,
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.NONE,
    collides: ig.Entity.COLLIDES.PASSIVE,
    gravityFactor: 0,
    walruses: [],

    init: function(x, y, settings) {
      this.parent(x, y, settings);
      this.loadAnimation();
    },

    loadAnimation: function() {
      var walrusNum = Math.floor((Math.random() * 4) + 1);
      switch(walrusNum) {
      case 1:
        this.animSheet = new ig.AnimationSheet('media/walrus1.png', 558, 414); // 30
        this.addAnim('hover', 0.02, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);
        break;
      case 2:
        this.animSheet = new ig.AnimationSheet('media/walrus2.png', 178, 138); // 40
        this.addAnim('hover', 0.02, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39]);
        break;
      case 3:
        this.animSheet = new ig.AnimationSheet('media/walrus3.png', 178, 138); // 40
        this.addAnim('hover', 0.02, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39]);
        break;
      case 4:
        this.animSheet = new ig.AnimationSheet('media/walrus4.png', 240, 228); // 40
        this.addAnim('hover', 0.02, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39]);
        break;
      default:
        // nothing (the animSheet is already set to a default value).
      }
      this.currentAnim = this.anims.hover;
    }

  });
});