lib = window.lib || {};

//----------------------------------- Library  ------------------------------------

(function (lib) {

//------------------------------------ Slider Component  ---------------------------

    class Slider {
        constructor({ min = 0, max = 1, value = 0, thumb, track, view }) { // {min: 0, max: 10, value: 100} {
            this.min = min;
            this.max = max;
            this.view = view;
            this.thumb = thumb;
            this.track = track;
            this.value = value;
            this.dx = 0;
            this.thumb.css('transition', 'left 1s');

            // init the state machine
            this.view.on('mousedown', this.onMouseDown.bind(this));
            //this.value = this.val;
        };




        //-------------------------- public --------------------------------------------

        get value() {
            return this._value;
        };

        set value(v) {
            if (v === this.val) return;
            else{
                if(v > this.max) this.val = this.max;
                else if(v < this.min) this.val = this.min;
                else this.val = v; // set the backing field
            }
            this.thumb.css('left', this.valueToPosition(this.val)); // update the thumb's position
            $(this).trigger('change'); // notify observers
        };


        //-------------------------- private --------------------------------------------

        /**
         *
         * @param value The value in the range between min and max
         * @returns The thumb's position ('left' property) in pixels
         * @private
         */
        valueToPosition(value) {
            const pxPerVal = (this.track.width() - this.thumb.width()) / (this.max - this.min);
            return (value - this.min) * pxPerVal;
        };

        /**
         *
         * @param position
         * @returns inverse function to _valueToPosition
         * @private
         */
        positionToValue(position) {
            const valPerPx = (this.max - this.min) / (this.track.width() - this.thumb.width());
            console.log('positionToValue: ' + ((position * valPerPx) + this.min))
            return (position * valPerPx) + this.min;
        };

        //-------------------------- event handlers -------------------------------------

        onMouseDown(e) {
            e.preventDefault();
            if(e.target == this.thumb[0]) {
                this.dx = e.pageX - this.thumb.offset().left;
            } else if(e.target == this.track[0]) {
                this.dx = this.thumb.width()/2;
            }
            this.view.addClass('active');
            $(document).on('mousemove.slider', this.onMouseMove.bind(this));
            $(document).one('mouseup', this.onMouseUp.bind(this));
            this.avoidX = e.pageX;
            this.value = this.positionToValue(e.pageX - this.track.offset().left - this.dx);
        };

        onMouseMove(e) {
            this.value = this.positionToValue(e.pageX - this.track.offset().left - this.dx);
            if (e.pageX != this.avoidX) this.thumb.css('transition', 'left 0s');
            e.preventDefault();
        }

        onMouseUp(e) {
            this.view.removeClass('active');
            $(document).off('mousemove.slider');
            this.thumb.css('transition', 'left 1s');
        }
    }

//-------------------------- Expose Constructor function  ---------------------------

    lib.Slider = Slider;

}(window.lib));