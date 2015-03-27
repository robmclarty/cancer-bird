ig.module(
  'game.entities.tree2'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityTree2 = ig.Entity.extend({    
    animSheet: new ig.AnimationSheet('media/tree2.png', 288, 450),
    size: { x: 288, y: 450 },
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.NONE,
    collides: ig.Entity.COLLIDES.PASSIVE,
    gravityFactor: 0,
    zIndex: 10,

    init: function(x, y, settings) {
      this.parent(x, y, settings);
      var totalFrames = 100;
      var animFrames = [];
      for (var i = 0; i < totalFrames; i++) {
        animFrames.push(i);
      }
      this.addAnim('sway', 0.02, animFrames);
      //this.addAnim('sway', 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    }
  });
});