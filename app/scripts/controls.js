    
window.Controls = (function() {
    'use strict';

    /**
     * A singleton class which abstracts all player input,
     * should hide complexity of dealing with keyboard, mouse
     * and touch devices.
     * @constructor
     */
    var Controls = function() {
        this._didJump = false;
        this._didSwim = false;
        //this._spaceHit = false;
        this._mute = false;
        $(window)
            .on('keydown', this._onKeyDown.bind(this))
            .on('keyup', this._onKeyUp.bind(this));
        
        $('.GameCanvas')
            .on('mousedown touchstart', this._onMouseDown.bind(this))
            .on('mouseup touchend', this._onMouseUp.bind(this));
        $('.MuteButton')
            .on('click', this._onMuteClick.bind(this));
    };

    Controls.prototype._onKeyDown = function(e) {
        // Only jump if space wasn't pressed.

        if (e.keyCode === 32 && !this._didSwim) {
            this._didJump = true;
        }

        // Remember that this button is down.
        if (e.keyCode === 32) {
            this._didSwim = true;
            return false;
        }
    };

    Controls.prototype._onKeyUp = function(e) {
        if (e.keyCode === 32) {
            this._didSwim = false;
            return false;
        }
    };

    Controls.prototype._onMouseDown = function(e) {

        this._didSwim = true;
    };

    Controls.prototype._onMouseUp = function(e) {

        this._didSwim = false;
    };

    Controls.prototype._onMuteClick = function(e) {

        var el = document.getElementById('MuteButton');
        //get audio elements
        var oceanSound = $('.Ocean')[0];
        var loserSound = $('.Loser')[0];
        if (el.firstChild.data === 'Mute') {

            el.firstChild.data = 'Unmute';
            this._mute = true;
            //mute ocean sound:
            oceanSound.muted = true;
            loserSound.muted = true;
        } else {

            el.firstChild.data = 'Mute';
            this._mute = false;
            oceanSound.muted = false;
            loserSound.muted = false;
        }
    };

    /**
     * Only answers true once until a key is pressed again.
     */
    Controls.prototype.didJump = function() {
        var answer = this._didJump;
        this._didJump = false;
        return answer;
    };
    
    // Export singleton.
    return new Controls();
})();
