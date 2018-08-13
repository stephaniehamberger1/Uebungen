lib = window.lib || {};

(function () {
  class ClockModel {
    constructor() {
      this.date = null;
      this._updateTime();
        this.timezone = this.date.getTimezoneOffset()/-60;
      setInterval(this._updateTime.bind(this), 1000);
    }

    get timezoneOffset() {
        return this.timezone;
    }

    set timezoneOffset(value) {
      if(value<=12 && value >=-12)
        this.timezone = value;
      this._updateTime();
    }

    get seconds() {
      return this.date.getUTCSeconds();
    }

    get minutes() {
      return this.date.getMinutes();
    }

    get hours(){
      let hour=this.date.getUTCHours() + this.timezone;
      hour = hour % 24;
      return hour;
    }


    // ----- private -----

    _updateTime() {
      this.date = new Date();
      $(this).trigger('change');
    }
  }

  lib.ClockModel = ClockModel;
}());