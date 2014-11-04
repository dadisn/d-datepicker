(function() {
  module.exports = function(app, options) {
    app.component(require('./datepicker'));
    return app.loadStyles(__dirname + '/../styles/index.css');
  };

}).call(this);
