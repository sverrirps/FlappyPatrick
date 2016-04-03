window.Moai = (function() {
	'use strict';

	//var Player = window.Player;
	var SPEED = 10;

	var Moai = function(el, game) {
		this.el = el;
		this.game = game;
		console.log('rassi fuck');
		this.moais = [
			{
				name: 'moai1',
				upperMoai: new MakeMoai(this.el.find('.Moai'), 200, 0, 0),
				lowerMoai: new MakeMoai(this.el.find('.MoaiReverse'), 200, 0, 45)
			},
			{
				name: 'moai2',
				upperMoai: new MakeMoai(this.el.find('.Moai2'), 400, 0, 0),
				lowerMoai: new MakeMoai(this.el.find('.MoaiReverse2'), 400, 0, 0)
			},
			{
				name: 'moai3',
				upperMoai: new MakeMoai(this.el.find('.Moai3'), 600, 0, 0),
				lowerMoai: new MakeMoai(this.el.find('.MoaiReverse3'), 600, 0, 90)
			}
		];
		console.log(this.moais[0].lowerMoai.pos.angle);
		console.log(this.moais);
	};

	var MakeMoai = function(moai, x, y, angle) {
		this.moai = moai;
		this.pos = {x: x, y: y, angle: angle};
		//console.log('moai angle: ');
		//.log(angle);
	};

	Moai.prototype.reset = function() {
		console.log(this.moais);
		for (var i = 0; i < this.moais.length; i++) {
			this.moais[i].upperMoai.pos.x = this.game.WORLD_WIDTH + (4 * i * this.game.WORLD_WIDTH / 10);
			this.moais[i].lowerMoai.pos.x = this.game.WORLD_WIDTH + (4 * i * this.game.WORLD_WIDTH / 10);
		}
	};

	Moai.prototype.onFrame = function(delta){
		//console.log('onframe maoi');
		//console.log('playerAlive: ' + Player.playerAlive);
		//if (Player.playerAlive) {
			//console.log('onframe maoi playerAlive');
			//Move moais
		for (var i = 0; i < this.moais.length; i++) {
			this.moais[i].upperMoai.pos.x -= delta * SPEED;
			this.moais[i].lowerMoai.pos.x -= delta * SPEED;
		}
		//}

		// Update UI
								
		for (var j = 0; j < this.moais.length; j++) {

			this.el[j * 2].style.transform = 'translate3d(' + this.moais[j].upperMoai.pos.x + 'em, ' + this.moais[j].upperMoai.pos.y + 'em, 0em) rotate(' + this.moais[j].upperMoai.pos.angle + 'deg)';

			this.el[j * 2].style.MozTransform = 'translate3d(' + this.moais[j].upperMoai.pos.x + 'em, ' + this.moais[j].upperMoai.pos.y + 'em, 0em) rotate(' + this.moais[j].upperMoai.pos.angle + 'deg)';

			this.el[j * 2].style.webkitTransform = 'translate3d(' + this.moais[j].upperMoai.pos.x + 'em, ' + this.moais[j].upperMoai.pos.y + 'em, 0em) rotate(' + this.moais[j].upperMoai.pos.angle + 'deg)';
		
			this.el[j * 2 + 1].style.transform = 'translate3d(' + this.moais[j].lowerMoai.pos.x + 'em, ' + this.moais[j].lowerMoai.pos.y + 'em, 0em) rotate(' + this.moais[j].lowerMoai.pos.angle + 'deg)';

			this.el[j * 2 + 1].style.MozTransform = 'translate3d(' + this.moais[j].lowerMoai.pos.x + 'em, ' + this.moais[j].lowerMoai.pos.y + 'em, 0em) rotate(' + this.moais[j].lowerMoai.pos.angle + 'deg)';

			this.el[j * 2 + 1].style.webkitTransform = 'translate3d(' + this.moais[j].lowerMoai.pos.x + 'em, ' + this.moais[j].lowerMoai.pos.y + 'em, 0em) rotate(' + this.moais[j].lowerMoai.pos.angle + 'deg)';
		}

	};

	return Moai;

})();