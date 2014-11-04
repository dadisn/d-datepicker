(function() {
  var ViewHelpers, moment;

  moment = require("moment/min/moment-with-langs.min");

  exports.ViewHelpers = ViewHelpers = (function() {
    function ViewHelpers() {}

    ViewHelpers.prototype.getMonth = function(currentDate) {
      return moment(currentDate).lang(this.lang).format("MMMM");
    };

    ViewHelpers.prototype.getYear = function(currentDate) {
      return moment(currentDate).format("YYYY");
    };

    ViewHelpers.prototype.getDecadeRange = function(currentDate) {
      var currentYear, firstYearInDecade, lastYearInDecade, yearInDecade;
      currentYear = moment(currentDate).year();
      yearInDecade = currentYear % 10;
      firstYearInDecade = currentYear - yearInDecade;
      lastYearInDecade = firstYearInDecade + 9;
      return firstYearInDecade + " - " + lastYearInDecade;
    };

    ViewHelpers.prototype.activeDate = function(active, date) {
      active = this.model.get("active");
      return active === date;
    };

    ViewHelpers.prototype.activeMonth = function(active, date) {
      var activeDate;
      activeDate = moment(active);
      date = moment(date);
      return activeDate.year() === date.year() && activeDate.month() === date.month();
    };

    ViewHelpers.prototype.activeYear = function(active, year) {
      var activeDate, yearDate;
      activeDate = moment(active);
      yearDate = moment({
        year: year
      });
      return activeDate.year() === yearDate.year();
    };

    ViewHelpers.prototype.weekDays = function() {
      var days, i, _i;
      days = [];
      moment.lang(this.lang);
      for (i = _i = 0; _i <= 6; i = ++_i) {
        days.push(moment.weekdaysMin(i));
      }
      return days;
    };

    return ViewHelpers;

  })();

}).call(this);
