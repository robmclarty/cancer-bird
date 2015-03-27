ig.module(
  'game.entities.hud'
)
.requires(
  'impact.entity'
)
.defines(function(){
  EntityHud = ig.Entity.extend({
    //animSheet: new ig.AnimationSheet('media/healthBar.png')
    size: { x: 320, y: 20 },
    zIndex: 5,
    //animSheet: new ig.AnimationSheet( 'media/hud.png', 320, 20 ),
    collides: ig.Entity.COLLIDES.NEVER,
    gravityFactor: 0,

    _wmDrawBox: true,
    _wmBoxColor: 'rgba(196, 255, 0, 0.7)',

    init: function(x, y, settings) {
      //this.addAnim( 'idle', 1, [0] );
      this.parent(x, y, settings);
      this.pos.x = ig.game.screen.x;
      this.pos.y = ig.game.screen.y;
      console.log("HUD initialized");
    },

    update: function(){
      this.pos.x = ig.game.screen.x;
      this.pos.y = ig.game.screen.y;
      if (ig.input.mouse.y <= 20) {
        console.log('in the mouse zone');
      } else {
      }
      this.parent();
    },

    draw: function(){
      this.parent();
      ig.game.hudText.draw("Stamina: " + ig.game.stamina, 7, 5);
      // switch (ig.game.playmode) {
      // case "timeattack":
      //   ig.game.font.draw( 'Score: ' + ig.game.score, 7, 5);
      //   ig.game.font.draw('Collected: ' + ig.game.drops + "/" + ig.game.tdrops, 167, 5);
      //   var CurrentTimeValue = new Date(Math.round(ig.game.getEntitiesByType(EntityLevelstats)[0].currentTime * 1000));
      //   ig.game.font.draw('Time: ' + CurrentTimeValue.getMinutes() + '\'' + CurrentTimeValue.getSeconds() + '\'' + Math.round((CurrentTimeValue.getMilliseconds() / 10)), 7, 220);
      //   break;
      // case "story":
      //   ig.game.font.draw( 'Score: ' + ig.game.score, 7, 5);
      //   ig.game.font.draw('Collected: ' + ig.game.drops + "/" + ig.game.tdrops, 167, 5);
      //   var CurrentTimeValue = new Date(Math.round(ig.game.getEntitiesByType(EntityLevelstats)[0].currentTime * 1000));
      //   break;
      // }
    }
  });
});