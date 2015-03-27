ig.module(
  'game.entities.staminaBar'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityStaminaBar = ig.Entity.extend({    
    animSheet: new ig.AnimationSheet('media/staminaBar.png', 200, 40),
    size: { x: 200, y: 40 },
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.NONE,
    collides: ig.Entity.COLLIDES.PASSIVE,
    zIndex: 1000,

    init: function(x, y, settings) {
      var totalFrames = 100;
      for (var i = 0; i < totalFrames; i++) {
        this.addAnim("frame" + i, 1, [i], true);
      }
      this.currentAnim = this.anims["frame" + 99];
    },

    update: function() {
      this.pos.x = ig.game.screen.x + 20;
      this.pos.y = ig.game.screen.y + 70;
    },

    updateStamina: function(value) {
      this.currentAnim = this.anims["frame" + parseInt(value - 1)];
    }
  });
});