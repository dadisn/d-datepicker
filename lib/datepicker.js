(function() {
  var Builders, Datepicker, ViewHelpers, moment,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  moment = require("moment/min/moment-with-langs.min");

  ViewHelpers = require("./viewHelpers").ViewHelpers;

  Builders = require("./builders");

  module.exports = Datepicker = (function(_super) {
    __extends(Datepicker, _super);

    function Datepicker() {
      return Datepicker.__super__.constructor.apply(this, arguments);
    }

    Datepicker.prototype.view = __dirname + "/../views";

    Datepicker.prototype.name = 'd-datepicker';

    Datepicker.prototype.init = function(model) {
      var currentDate;
      this.lang = model.get("lang") || "en";
      this.builders = new Builders(this.lang, moment);
      currentDate = moment();
      return this.gotoMonthView(currentDate);
    };

    Datepicker.prototype.create = function(model, dom) {
      global.moment = moment;
      dom.on("click", (function(_this) {
        return function(e) {
          if (_this.parent.contains(e.target)) {
            return model.set("show", true, function() {
              return _this.emit("show");
            });
          }
        };
      })(this));
      return dom.on("mousedown", (function(_this) {
        return function(e) {
          if (!_this.parent.contains(e.target)) {
            return model.set("show", false, function() {
              return _this.emit("cancel");
            });
          }
        };
      })(this));
    };

    Datepicker.prototype.gotoMonthView = function(date) {
      this.setCurrentDate(date);
      return this.monthView(date);
    };

    Datepicker.prototype.monthView = function(date) {
      var weeks;
      if (!date) {
        return;
      }
      date = moment(date);
      weeks = this.builders.buildMonthView(date);
      this.model.set("weeks", weeks);
      return this.model.set("view", "month");
    };

    Datepicker.prototype.gotoYearView = function(date) {
      date = moment(date, "YYYY-MM-DD");
      this.setCurrentDate(date, "YYYY-MM-DD");
      return this.yearView(date);
    };

    Datepicker.prototype.yearView = function(date) {
      var months;
      months = this.builders.buildYearView(date);
      this.model.set("months", months);
      return this.model.set("view", "year");
    };

    Datepicker.prototype.nextYear = function() {
      var currentDate, nextYearDate;
      currentDate = moment(this.getCurrentDate());
      nextYearDate = currentDate.add("years", 1);
      return this.gotoYearView(nextYearDate);
    };

    Datepicker.prototype.prevYear = function() {
      var currentDate, prevYearDate;
      currentDate = moment(this.getCurrentDate());
      prevYearDate = currentDate.subtract("years", 1);
      return this.gotoYearView(prevYearDate);
    };

    Datepicker.prototype.gotoDecadeView = function(date) {
      date = moment(date);
      this.setCurrentDate(date);
      return this.decadeView(date);
    };

    Datepicker.prototype.decadeView = function(date) {
      var years;
      years = this.builders.buildDecadeView(date);
      this.model.set("years", years);
      return this.model.set("view", "decade");
    };

    Datepicker.prototype.prevDecade = function() {
      var currentDate, prevDecadeDate;
      currentDate = moment(this.getCurrentDate());
      prevDecadeDate = currentDate.subtract("years", 10);
      return this.gotoDecadeView(prevDecadeDate);
    };

    Datepicker.prototype.nextDecade = function() {
      var currentDate, nextDecadeDate;
      currentDate = moment(this.getCurrentDate());
      nextDecadeDate = currentDate.add("years", 10);
      return this.gotoDecadeView(nextDecadeDate);
    };

    Datepicker.prototype.select = function(selectedDate) {
      var currentDate, currentMonth, date, selectedMonth;
      date = moment(selectedDate.fullDate);
      selectedMonth = date.month();
      currentDate = moment(this.getCurrentDate());
      currentMonth = currentDate.month();
      return this.emitDelayable("select", (function(_this) {
        return function() {
          if (selectedMonth !== currentMonth) {
            _this.gotoMonthView(date);
          }
          _this.model.set("active", selectedDate.fullDate);
          return _this.model.set("show", false);
        };
      })(this));
    };

    Datepicker.prototype.prevMonth = function() {
      var currentDate, prevMonthDate;
      currentDate = moment(this.getCurrentDate());
      prevMonthDate = currentDate.subtract("months", 1);
      return this.gotoMonthView(prevMonthDate);
    };

    Datepicker.prototype.nextMonth = function() {
      var currentDate, nextMonthDate;
      currentDate = moment(this.getCurrentDate());
      nextMonthDate = currentDate.add("months", 1);
      return this.gotoMonthView(nextMonthDate);
    };

    Datepicker.prototype.setCurrentDate = function(currentDate) {
      return this.model.set("currentDate", currentDate);
    };

    Datepicker.prototype.getCurrentDate = function() {
      return this.model.get("currentDate");
    };

    return Datepicker;

  })(ViewHelpers);

}).call(this);
