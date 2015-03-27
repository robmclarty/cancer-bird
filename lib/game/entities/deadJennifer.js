ig.module(
  'game.entities.deadJennifer'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityDeadJennifer = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/jennifer.png', 129, 117),
    size: { x: 129, y: 117 },
    maxVel: { x: 800, y: 200 },
    //maxVel: { x: 200, y: 0 },
    //damage: 10,
    zIndex: 200,
    health: 100,
    flip: false,
    attachmentThreshold: 4,
    attachmentOffset: { x: 350, y: 260 },
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.NONE,
    collides: ig.Entity.COLLIDES.PASSIVE,
    deathSFX: new ig.Sound('media/sounds/fail-buzzer-02.*'),
    idleTimer: null,
    idleDelay: 1,

    init: function(x, y, settings) {
      this.parent(x, y, settings);
      this.addAnim('melt', 0.04, [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45], true);
      this.currentAnim = this.anims.melt;
      this.deathSFX.play();
      this.idleTimer = new ig.Timer();
    },

    update: function() {
      this.parent();
      if (this.idleTimer.delta() > this.idleDelay) {
        ig.system.setGame(FailScreen);
      }
    }
  });
});