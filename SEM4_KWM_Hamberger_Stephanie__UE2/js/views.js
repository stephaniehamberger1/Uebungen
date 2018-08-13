lib = window.lib || {};

(function () {
  class LogView {
    constructor(model) {
      this.model = model;
      $(model).on('change', this.render.bind(this));
    }

    render() {
      //console.log(this.model.timezoneOffset);
    }

  }

  class DigitalView {
    constructor(model, $elem) {
      this.model = model;
      this.$elem = $elem;
      this.$container = $('<p/>');
      this.$addButton = $('<button class="addHour">+1</button>');
      this.$subButton = $('<button class="subHour">-1</button>');
      this.$toggleButton = $('<div class="toggler">Change view<label class="switch"> <input type="checkbox" class="checker"> <div class="slider round"></div> </label></div>');
      this.$timezone = $('<div class="timezone">Timezone: '+this.model.timezoneOffset+'</div>');

      this.$elem.append(this.$container).append(this.$addButton).append(this.$subButton).append(this.$toggleButton).append(this.$timezone);

      $(model).on('change', this.render.bind(this));
        this.$addButton.click(()=> {
            this.model.timezoneOffset += 1;
        });
        this.$subButton.click(()=> {
            this.model.timezoneOffset -= 1;
        });
    }

    render() {
      let changeTimezone="";
      let hours = "";
      let minutes = "";
      let seconds = "";

      if(this.model.hours<10){
        hours = "0"+this.model.hours;
      }
      else{
        hours = this.model.hours;
      }
      if(this.model.minutes<10){
        minutes = "0"+this.model.minutes;
      }
      else{
        minutes = this.model.minutes;
      }
      if(this.model.seconds<10){
        seconds = "0"+this.model.seconds;
      }
      else{
        seconds= this.model.seconds;
      }
            if($('.checker').prop('checked')){

                if(hours==0){
                    this.$container.text(12 +":"+minutes+ ":"+seconds+ " am");
                }
                else if(hours>12){
                    this.$container.text(hours-12 +":"+minutes+ ":"+seconds+ " pm");
                }
                else if(hours<12){
                    this.$container.text(hours +":"+minutes+ ":"+seconds+ " am");
                }
                else if (hours==12){
                    this.$container.text(hours +":"+minutes+ ":"+seconds+" pm");
                }
            }
            else
                this.$container.text(hours +":"+minutes+ ":"+seconds);
        this.$timezone.text("Timezone: "+this.model.timezoneOffset);
    }

  }
    class AnalogView {
        constructor(model, $elem) {
            this.model = model;
            this.$elem = $elem;
            $(model).on('change', this.render.bind(this));
            this.$elem.append('<div class="pointerH"></div><div class="pointerM"></div><div class="pointerS"></div>');
        }

        render() {
          let hours = this.model.hours;
          if (hours >12){
            hours = hours-12;
          }
          let minutes = this.model.minutes;
          hours=hours+minutes/60;
          hours= hours*30;
          minutes = minutes*6;
          let seconds = this.model.seconds*6;

          $(".pointerS").css(`transform`, `rotate(${seconds}deg)`);
          $(".pointerS").css(`transform-origin`, `0% 98%`);
          $(".pointerM").css(`transform`, `rotate(${minutes}deg)`);
          $(".pointerM").css(`transform-origin`, `0% 98%`);
          $(".pointerH").css(`transform`, `rotate(${hours}deg)`);
          $(".pointerH").css(`transform-origin`, `0% 98%`);

        }
    }
  lib.LogView = LogView;
  lib.DigitalView = DigitalView;
  lib.AnalogView = AnalogView;
}());