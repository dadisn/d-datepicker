moment = require "moment/min/moment-with-langs.min"
ViewHelpers = require("./viewHelpers").ViewHelpers
Builders = require "./builders"

module.exports = class Datepicker extends ViewHelpers
  view: __dirname + "/../views"
  name: 'd-datepicker'


  init: (model) ->
    @lang = model.get("lang") || "en"
    @builders = new Builders(@lang, moment)
    currentDate = moment()
    @gotoMonthView currentDate
  
  create: (model, dom) ->
    global.moment = moment
    dom.on "click", (e) =>
      if @parent.contains(e.target)
        model.set "show", true, =>
          @emit "show"
    dom.on "mousedown", (e) =>
      unless @parent.contains(e.target) or not model.get "show"
        model.set "show", false, => 
          @emit "cancel"

  gotoMonthView: (date) ->
    @setCurrentDate date
    @monthView date
  
  monthView: (date) ->
    return unless date
    date = moment(date)
    weeks = @builders.buildMonthView(date)
    @model.set "weeks", weeks
    @model.set "view", "month"
  
  gotoYearView: (date) ->
    date = moment(date, "YYYY-MM-DD")
    @setCurrentDate date, "YYYY-MM-DD"
    @yearView date
  
  yearView: (date) ->
    months = @builders.buildYearView(date)
    @model.set "months", months
    @model.set "view", "year"
  
  nextYear: ->
    # get current month
    currentDate = moment(@getCurrentDate())
  
    # calculate previous year from date
    nextYearDate = currentDate.add("years", 1)
    @gotoYearView nextYearDate
  
  prevYear: ->
    # get current month
    currentDate = moment(@getCurrentDate())
  
    # calculate previous year from date
    prevYearDate = currentDate.subtract("years", 1)
    @gotoYearView prevYearDate
  
  gotoDecadeView: (date) ->
    date = moment(date)
    @setCurrentDate date
    @decadeView date
  
  decadeView: (date) ->
    years = @builders.buildDecadeView(date)
    @model.set "years", years
    @model.set "view", "decade"
  
  prevDecade: ->
    currentDate = moment(@getCurrentDate())
    prevDecadeDate = currentDate.subtract("years", 10)
    @gotoDecadeView prevDecadeDate
  
  nextDecade: ->
    currentDate = moment(@getCurrentDate())
    nextDecadeDate = currentDate.add("years", 10)
    @gotoDecadeView nextDecadeDate
  
  select: (selectedDate) ->
    @emitDelayable "preselect", =>
      previousDate = @model.get "active"
      date = moment(selectedDate.fullDate)
      selectedMonth = date.month()
      currentDate = moment(@getCurrentDate())
      currentMonth = currentDate.month()
      @gotoMonthView date  if selectedMonth isnt currentMonth
      @model.set "active", selectedDate.fullDate
      @model.set "show", false
      @emit "select", previousDate

  prevMonth: ->
    # get current month
    currentDate = moment(@getCurrentDate())
  
    # calculate previous month from date
    prevMonthDate = currentDate.subtract("months", 1)
    @gotoMonthView prevMonthDate
  
  nextMonth: ->
    # get current month
    currentDate = moment(@getCurrentDate())
  
    # calculate previous month from date
    nextMonthDate = currentDate.add("months", 1)
    @gotoMonthView nextMonthDate
  
  setCurrentDate: (currentDate) ->
    @model.set "currentDate", currentDate
  
  getCurrentDate: ->
    @model.get "currentDate"