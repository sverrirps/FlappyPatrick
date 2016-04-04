window.Moai = (function() {
	'use strict';

	//var Player = window.Player;
	var SPEED = 10;
	var MOAIWIDTH = 12.8;
	var CLEARANCE = 25;

	var Moai = function(el, game) {
		this.el = el;
		this.game = game;
		console.log('rassi fuck');
		this.moais = [
			{
				name: 'moai1',
				upperMoai: new MakeMoai(this.el.find('.Moai'), this.game.WORLD_WIDTH, 0, 180),
				lowerMoai: new MakeMoai(this.el.find('.MoaiReverse'), this.game.WORLD_WIDTH, 0, 0)
			},
			{
				name: 'moai2',
				upperMoai: new MakeMoai(this.el.find('.Moai2'), this.game.WORLD_WIDTH * 1.4, 0, 180),
				lowerMoai: new MakeMoai(this.el.find('.MoaiReverse2'), this.game.WORLD_WIDTH * 1.4, 0, 0)
			},
			{
				name: 'moai3',
				upperMoai: new MakeMoai(this.el.find('.Moai3'), this.game.WORLD_WIDTH * 1.8, 0, 180),
				lowerMoai: new MakeMoai(this.el.find('.MoaiReverse3'), this.game.WORLD_WIDTH * 1.8, 0, 0)
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

			//Find new random height 
			//Get random integer between 1 and 10 (Math.random() * (max - min + 1) + min;)
			var randomHeight = Math.floor(Math.random() * (34 - 9 + 1)) + 9;

			this.el[i * 2].style.height = randomHeight + 'em';
			this.el[i * 2 + 1].style.height = (this.game.WORLD_HEIGHT - randomHeight - CLEARANCE) + 'em';
		}
	};

	Moai.prototype.onFrame = function(delta){
		//Move moais
		SPEED = 21;
		for (var i = 0; i < this.moais.length; i++) {
			this.moais[i].upperMoai.pos.x -= delta * SPEED;
			this.moais[i].lowerMoai.pos.x -= delta * SPEED;

			if (this.moais[i].upperMoai.pos.x + MOAIWIDTH < 0) {
				//Find new random height 
				//Get random integer between 1 and 10 (Math.random() * (max - min + 1) + min;)
				var randomHeight = Math.floor(Math.random() * (34 - 9 + 1)) + 9;

				//TODO set height
				this.el[i * 2].style.height = randomHeight + 'em';
				this.el[i * 2 + 1].style.height = (this.game.WORLD_HEIGHT - randomHeight - CLEARANCE) + 'em';

				this.moais[i].upperMoai.pos.x = this.game.WORLD_WIDTH * 1.2 - MOAIWIDTH;
				this.moais[i].lowerMoai.pos.x = this.game.WORLD_WIDTH * 1.2 - MOAIWIDTH;
			}
		}
		
		// Update UI				
		for (var j = 0; j < this.moais.length; j++) {

			this.el[j * 2].style.transform = 'translate3d(' +
				this.moais[j].upperMoai.pos.x + 'em, ' +
				this.moais[j].upperMoai.pos.y + 'em, 0em) rotate(' +
				this.moais[j].upperMoai.pos.angle + 'deg)';

			this.el[j * 2].style.MozTransform = 'translate3d(' +
				this.moais[j].upperMoai.pos.x + 'em, ' +
				this.moais[j].upperMoai.pos.y + 'em, 0em) rotate(' +
				this.moais[j].upperMoai.pos.angle + 'deg)';

			this.el[j * 2].style.webkitTransform = 'translate3d('+
				this.moais[j].upperMoai.pos.x + 'em, ' +
				this.moais[j].upperMoai.pos.y + 'em, 0em) rotate(' +
				this.moais[j].upperMoai.pos.angle + 'deg)';
		
			this.el[j * 2 + 1].style.transform = 'translate3d(' +
				this.moais[j].lowerMoai.pos.x + 'em, '+
				this.moais[j].lowerMoai.pos.y + 'em, 0em) rotate(' +
				this.moais[j].lowerMoai.pos.angle + 'deg)';

			this.el[j * 2 + 1].style.MozTransform = 'translate3d(' +
				this.moais[j].lowerMoai.pos.x + 'em, ' +
				this.moais[j].lowerMoai.pos.y + 'em, 0em) rotate(' +
				this.moais[j].lowerMoai.pos.angle + 'deg)';

			this.el[j * 2 + 1].style.webkitTransform = 'translate3d(' +
				this.moais[j].lowerMoai.pos.x + 'em, '+
				this.moais[j].lowerMoai.pos.y + 'em, 0em) rotate(' +
				this.moais[j].lowerMoai.pos.angle + 'deg)';
		}
	};

	return Moai;

})();