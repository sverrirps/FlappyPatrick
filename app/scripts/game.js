
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.moai = new window.Moai(this.el.find('.MoaiObstacle'), this, this.player);
		this.isPlaying = false;

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);
		this.moai.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		var floor = document.getElementsByClassName('Floor')[0];
		var hand = document.getElementsByClassName('PlayerWings')[0];

		floor.style.WebkitAnimationPlayState = 'initial';
		floor.style.animationPlayState = 'initial';
		hand.style.WebkitAnimationPlayState = 'initial';
		hand.style.animationPlayState = 'initial';

		this.player.reset();
		this.moai.reset();
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {

		this.isPlaying = false;

		var floor = document.getElementsByClassName('Floor')[0];
		var hand = document.getElementsByClassName('PlayerWings')[0];
		
		floor.style.WebkitAnimationPlayState = 'paused';
		floor.style.animationPlayState = 'paused';
		hand.style.WebkitAnimationPlayState = 'paused';
		hand.style.animationPlayState = 'paused';
		
		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};


	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 128;
	Game.prototype.WORLD_HEIGHT = 72;

	return Game;
})();


