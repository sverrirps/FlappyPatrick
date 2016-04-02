
window.Controls = (function() {
    'use strict';

    /**
     * Key codes we're interested in.
     */
    var KEYS = {
        32: 'space'
    };

    //var CLICK = false;

    /**
     * A singleton class which abstracts all player input,
     * should hide complexity of dealing with keyboard, mouse
     * and touch devices.
     * @constructor
     */
    var Controls = function() {
        this._didJump = false;
        this._didClick = false;
        this.keys = {};
        $(window)
            .on('keydown', this._onKeyDown.bind(this))
            .on('keyup', this._onKeyUp.bind(this));
        
        $('.GameCanvas')
            .on('mousedown', this._onMouseDown.bind(this))
            .on('mouseup', this._onMouseUp.bind(this));
    };

    Controls.prototype._onKeyDown = function(e) {
        console.log('in key down');
        // Only jump if space wasn't pressed.
        if (e.keyCode === 32 && !this.keys.space) {
            this._didJump = true;
        }

        // Remember that this button is down.
        if (e.keyCode in KEYS) {
            var keyName = KEYS[e.keyCode];
            this.keys[keyName] = true;
            return false;
        }
        
    };

    Controls.prototype._onKeyUp = function(e) {
        console.log('in key up');
        if (e.keyCode in KEYS) {
            var keyName = KEYS[e.keyCode];
            this.keys[keyName] = false;
            return false;
        }
        
    };

    Controls.prototype._onMouseDown = function(e) {

       this._didClick = true;
    };

    Controls.prototype._onMouseUp = function(e) {

       this._didClick = false;
    };


    /**
     * Only answers true once until a key is pressed again.
     */
    Controls.prototype.didJump = function() {
        console.log('fuck');
        var answer = this._didJump;
        this._didJump = false;
        return answer;
    };
    
    
    // Export singleton.
    return new Controls();
})();
