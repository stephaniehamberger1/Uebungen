$(function () {
  const model = new lib.ClockModel();
  const logView = new lib.LogView(model);
  const digitalView = new lib.DigitalView(model, $('.digitalView'));
  const analogView = new lib.AnalogView(model, $('.AnalogView'));

  // Test code
  //------------
  // $(model).on('change', function () {
  //   console.log(model.seconds);
  // });


});