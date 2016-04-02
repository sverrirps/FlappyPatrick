window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;
	var GRAVITY = 1;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0, rotation: 0 };
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		this.pos.rotation = 0;
		SPEED = 30;	
	};

	Player.prototype.onFrame = function(delta) {

		
		if ((Controls._spaceHit) || (Controls._didClick)) {

			SPEED = 30;
			this.pos.y -= delta * (SPEED * 3);
			
			if(this.pos.rotation > 0) {
				this.pos.rotation = -25;
			}

		} else {
			SPEED += GRAVITY;
			this.pos.y += delta * SPEED;

			if(this.pos.rotation < 90) {
				this.pos.rotation += (delta * SPEED * 8);
			}
			
		}

		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotate(' + this.pos.rotation + 'deg)');

		this.el.css('-moz-transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotate(' + this.pos.rotation + 'deg)');

		this.el.css('-webkit-transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotate(' + this.pos.rotation + 'deg)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < -100 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
	};

	return Player;

})();
 