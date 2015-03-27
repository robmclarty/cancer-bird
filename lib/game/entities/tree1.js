ig.module(
  'game.entities.tree1'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityTree1 = ig.Entity.extend({    
    animSheet: new ig.AnimationSheet('media/tree1.png', 288, 450),
    size: { x: 288, y: 450 },
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.NONE,
    collides: ig.Entity.COLLIDES.PASSIVE,
    gravityFactor: 0,
    zIndex: 11,

    init: function(x, y, settings) {
      this.parent(x, y, settings);
      var totalFrames = 120;
      var animFrames = [];
      for (var i = 0; i < totalFrames; i++) {
        animFrames.push(i);
      }
      this.addAnim('sway', 0.02, animFrames);
      //this.addAnim('sway', 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    }
  });
});