ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.sound',
	//'impact.debug.debug', // use this to load the game with the debugger tools turned on
	'game.levels.sandbox',
	'game.entities.player',
	//'game.entities.staminaBar',
	'game.entities.healthBar',
	'game.entities.rotatingEarth',
	'game.entities.jenniferStart'
	//'game.levels.bg-test'
)
.defines(function() {
	CancerBirdGame = ig.Game.extend({
		gravity: 150,
		healthBar: null,
		//staminaBar: null,

		init: function() {
			// setup music
			ig.music.add('media/sounds/easy-listening-jazz.*');
			ig.music.volume = 0.5;
			ig.music.loop = true;
			ig.music.play();

			// Initialize your game here; bind keys etc.
			this.loadLevel(LevelSandbox);
			//this.loadLevel(LevelBgTest);
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
			ig.input.bind(ig.KEY.UP_ARROW, 'up');
			ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
			ig.input.bind(ig.KEY.SPACE, 'drop');
			// ig.input.bind(ig.KEY.F, 'shoot');
			// ig.input.bind(ig.KEY.TAB, 'switch');
			
			//this.staminaBar = ig.game.spawnEntity('EntityStaminaBar', ig.game.screen.x + 20, ig.game.screen.y + 70, {});
			this.healthBar = ig.game.spawnEntity('EntityHealthBar', ig.game.screen.x + 20, ig.game.screen.y + 70, {});

			//this.hud = new EntityHud(0, 0);
		},
		
		update: function() {
			// screen follows the player
			//var player = this.getEntitiesByType(EntityBird)[0];
			var player = this.getEntitiesByType(EntityPlayer)[0];
			var jennifer = this.getEntitiesByType(EntityJennifer)[0];
			if (player) {
				this.screen.x = player.pos.x - ig.system.width / 2;
				this.screen.y = player.pos.y - ig.system.height / 2;
				
				//this.updateStaminaBar();
				this.updateHealthBar(player.health);
			}
			if (jennifer) {
				this.screen.x = jennifer.pos.x - ig.system.width / 2;
				this.screen.y = jennifer.pos.y - ig.system.height / 2;
				this.updateHealthBar(jennifer.health);
			}

			// update all entities and backgroundmaps
			this.parent();
		},

		// Update stamina bar with current value.
		updateStaminaBar: function() {
			//this.staminaBar.updateStamina(player.stamina);
		},

		// Update health bar with the current value.
		updateHealthBar: function(value) {	
			this.healthBar.updateHealth(value);
		},
		
		draw: function() {
			// Draw all entities and backgroundMaps
			this.parent();

			// // Update stamina HUD.
			// this.statText.draw("Stamina" + this.stamina, 5, 5);

			// Draw all entities and backgroundMaps
			for (var i = 0; i < this.entities.length; i++) {
				this.entities[i].draw();
			};
			
			// Add your own drawing code here
			var x = ig.system.width / 2;
			var y = ig.system.height / 2;
		}
	});

	StartScreen = ig.Game.extend({
		background: new ig.Image('media/startscreen-bg.png'), 
		earth: null,
		lump: null,

		init: function() {
			// ig.music.add('media/sounds/midnight-ride.*');
			// ig.music.volume = 0.5;
			// ig.music.loop = true;
			// ig.music.play();
			this.earth = ig.game.spawnEntity('EntityRotatingEarth', 900, 400, {});
			this.lump = ig.game.spawnEntity('EntityJenniferStart', 0, 0, {});

			ig.input.bind(ig.KEY.SPACE, 'start'); 
		},

		update: function() { 
			if (ig.input.pressed ('start')) {
				//ig.system.setGame(CancerBirdGame); // Start the game.
				this.lump.jump();
			}
			this.parent(); 
		},

		draw: function() { 
			this.parent();
			this.background.draw(0, 0);
			this.earth.draw();
			this.lump.draw();
		}
	});

	FailScreen = ig.Game.extend({
		background: new ig.Image('media/failscreen.png'),

		init: function() {
			ig.input.bind(ig.KEY.SPACE, 'start');
		},

		update: function() {
			if (ig.input.pressed('start')) {
				ig.system.setGame(CancerBirdGame);
			}
			this.parent();
		},

		draw: function() {
			this.parent();
			this.background.draw(0, 0);
		}
	});

	WinScreen = ig.Game.extend({
		background: new ig.Image('media/winscreen.png'), 

		init: function() {
			ig.input.bind(ig.KEY.SPACE, 'start'); 
		},

		update: function() { 
			if (ig.input.pressed('start')) {
				ig.system.setGame(CancerBirdGame); // Go back to start.
			}
			this.parent(); 
		},

		draw: function() { 
			this.parent();
			this.background.draw(0, 0);
		}
	});

	ig.main('#canvas', StartScreen, 60, 1280, 800, 1);
	//ig.main('#canvas', CancerBirdGame, 60, 1200, 700, 1);
});
