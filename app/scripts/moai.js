window.Moai = (function(){
	'use strict';

	var Player = window.Player;
	var SPEED = 10;

	var MakeMoai = function(moai, x, y, angle) {
		this.moai = moai;
		this.pos = {x: x, y: y, angle: angle};
	};

	var Moai = function(el, game) {
		this.el = el;
		this.game = game;

		var moais = [
			{
				name: 'moai1',
				upperMoai: new MakeMoai(this.el.find('.Moai'), this.game.WORLD_WIDTH, 0, 180),
				lowerMoai: new MakeMoai(this.el.find('.MoaiReverse'), this.game.WORLD_WIDTH, 30, 0)
			},
			{
				name: 'moai2',
				upperMoai: new MakeMoai(this.el.find('.Moai2'), this.game.WORLD_WIDTH * 1.4, 0, 180),
				lowerMoai: new MakeMoai(this.el.find('.MoaiReverse2'), this.game.WORLD_WIDTH * 1.4, 30, 0)
			},
			{
				name: 'moai3',
				upperMoai: new MakeMoai(this.el.find('.Moai3'), this.game.WORLD_WIDTH * 1.8, 0, 180),
				lowerMoai: new MakeMoai(this.el.find('.MoaiReverse3'), this.game.WORLD_WIDTH * 1.8, 30, 0)
			}
		];
		console.log(moais);
	};

	Moai.prototype.reset = function() {
		for (var i = 0; i < this.moais.length; i++) {
			this.moais[i].upperMoai.pos.x = this.game.WORLD_WIDTH + (4 * i * this.game.WORLD_WIDTH / 10);
			this.moais[i].lowerMoai.pos.x = this.game.WORLD_WIDTH + (4 * i * this.game.WORLD_WIDTH / 10);
		}
	};

	Moai.prototype.onFrame = function(delta){
		if (Player.playerAlive) {
			//Move moais
			for (var i = 0; i < this.moais.length; i++) {
				this.moais[i].upperMoai.pos.x -= delta * SPEED;
				this.moais[i].lowerMoai.pos.x -= delta * SPEED;
			}
		}

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.moais[0].upperMoai.pos.x + 'em, ' + this.moais[0].upperMoai.pos.y + 'em) rotate(' + this.moais[0].upperMoai.pos.angle + 'deg)');

		this.el.css('-moz-transform', 'translateZ(0) translate(' + this.moais[0].upperMoai.pos.x + 'em, ' + this.moais[0].upperMoai.pos.y + 'em) rotate(' + this.moais[0].upperMoai.pos.angle + 'deg)');

		this.el.css('-webkit-transform', 'translateZ(0) translate(' + this.moais[0].upperMoai.pos.x + 'em, ' + this.moais[0].upperMoai.pos.y + 'em) rotate(' + this.moais[0].upperMoai.pos.angle + 'deg)');
	};

})();