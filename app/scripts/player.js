window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1280x720px canvas.
	var SPEED = 30; // * 10 pixels per second
	var PLAYERWIDTH = 10;
	var PLAYERHEIGHT = 11.5;
	var MOAISWIDTH = 12.8;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;
	var GRAVITY = 1.0;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0, angle: 0 };
		this.playerAlive = true;
		this.highScore = 0;
		document.getElementById('Highscore').innerHTML = this.highScore;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		this.pos.angle = 0;
		this.playerAlive = true;
		this.nextMaoiNr = 0;
		this.currentScore = 0;
		SPEED = 30;
		document.getElementById('Score').innerHTML = this.currentScore;
		document.getElementById('ScorePlaying').innerHTML = this.currentScore;
	};

	Player.prototype.onFrame = function(delta) {
		if ((Controls._spaceHit) || (Controls._didClick)) {

			//play sound:
			if (!Controls._mute) {
				var audio = $('.Huh')[0];
				if (audio.paused) {
			        audio.play();
			    }else{
			        audio.currentTime = 0;
			    }
			}

			SPEED = 10;
			this.pos.y -= delta * (SPEED * 10);
			
			if(this.pos.angle > 0) {
				this.pos.angle = 0;
			}

		} else {
			SPEED += GRAVITY;
			this.pos.y += delta * SPEED;

			if(this.pos.angle < 120) {
				this.pos.angle += (delta * SPEED * 4);
			}
		}

		this.checkCollisionWithBounds();
		this.checkCollisionWithMoais();

		// Update UI
		this.el.css('transform', 'translate3d(' + this.pos.x +
			'em, ' + this.pos.y + 'em, 0em) rotate(' + this.pos.angle + 'deg)');

		this.el.css('-moz-transform', 'translate3d(' + this.pos.x +
			'em, ' + this.pos.y + 'em, 0em) rotate(' + this.pos.angle + 'deg)');

		this.el.css('-webkit-transform', 'translate3d(' + this.pos.x +
			'em, ' + this.pos.y + 'em, 0em) rotate(' + this.pos.angle + 'deg)');

	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + PLAYERWIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < -100 ||
			this.pos.y + PLAYERHEIGHT > this.game.WORLD_HEIGHT - 7) {
			
			this.playerAlive = false;
			this.playLoserSound();
			return this.game.gameover();
		}
	};

	Player.prototype.checkCollisionWithMoais = function() {
		for (var i = 0; i < this.game.moai.moais.length; i++) {
			//Check for x-ais collision
			if ((this.pos.x + PLAYERWIDTH >= this.game.moai.moais[i].upperMoai.pos.x) &&
				(this.pos.x + PLAYERWIDTH < this.game.moai.moais[i].upperMoai.pos.x + MOAISWIDTH + PLAYERWIDTH)) {

				var lower = parseFloat(this.game.moai.el[i * 2].style.height);
				var higher = this.game.WORLD_HEIGHT - parseFloat(this.game.moai.el[i * 2 + 1].style.height);

				//Check for y-ais collision
				if ((this.pos.y <= lower) ||
					((this.pos.y + PLAYERHEIGHT) >= higher)) {
					console.log('Y collision');

					this.playerAlive = false;
					this.playLoserSound();
					return this.game.gameover();
				} else if (i === this.nextMaoiNr) {
					this.currentScore++;
					document.getElementById('ScorePlaying').innerHTML = this.currentScore;
					document.getElementById('Score').innerHTML = this.currentScore;
					if (this.currentScore > this.highScore) {
						this.highScore = this.currentScore;
						document.getElementById('Highscore').innerHTML = this.highScore;
					}
					this.nextMaoiNr = (this.nextMaoiNr + 1) % this.game.moai.moais.length;
				}
			}
		}
	};

	Player.prototype.playLoserSound = function() {
		//play gameoversound
		if (!Controls._mute) {
			var audio2= $('.Loser')[0];
			if (audio2.paused) {
		        audio2.play();
		    }else{
		        audio2.currentTime = 0;
		    }
		}
	};

	return Player;

})();
 