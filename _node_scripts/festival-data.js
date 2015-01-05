var http = require("http");
var fs = require("fs");
var stripBom = require('strip-bom');
var util = require( "./utilities" );

function FestivalData() {
  this.tmpEventsPath = "./tmp/events.json";
  this.tmpPerformersPath = "./tmp/performers.json";
  this.tmpSchedulePath = "./tmp/schedule.json";
  this.tmpShowsPath = "./tmp/shows.json";
  this.tmpVenuesPath = "./tmp/venues.json";
}

FestivalData.prototype.getEventObject = function() {
  return JSON.parse(this.getEventData());
}

FestivalData.prototype.getEventData = function() {
  return fs.readFileSync( this.tmpEventsPath, "utf8" );
}

FestivalData.prototype.getVenueObject = function() {
  return JSON.parse(this.getVenueData().replace(/[^\w\s\[\]\{\}\,\"\'\:]/gi, ''));
}

FestivalData.prototype.getVenueData = function() {
  return fs.readFileSync( this.tmpVenuesPath, "utf8" );
}

FestivalData.prototype.getPerformerObject = function() {
  return JSON.parse(this.getPerformerData());
}

FestivalData.prototype.getPerformerData = function() {
  return fs.readFileSync( this.tmpPerformersPath, "utf8" );
}

FestivalData.prototype.getShowObject = function() {
  return JSON.parse( this.getShowData() );
}

FestivalData.prototype.getShowData = function() {
  return fs.readFileSync( this.tmpShowsPath, "utf8" );
}

FestivalData.prototype.getScheduleObject = function() {
  return JSON.parse(this.getScheduleData());
}

FestivalData.prototype.getScheduleData = function() {
  return fs.readFileSync( this.tmpSchedulePath, "utf8" );
}

FestivalData.prototype.getPerformersForEvents = function( id ) {
  var scheduleObj = this.getScheduleObject();
  var returnArray = [];
  for (var key in scheduleObj) {
    var idCheck = parseInt(scheduleObj[key].EventId,10);
    if (idCheck === parseInt(id,10) && this.doesPerformerExistForId(scheduleObj[key].PerformerId)) {
      returnArray.push(scheduleObj[key].PerformerId);
    }
  }
  return returnArray;
}

FestivalData.prototype.doesPerformerExistForId = function(id) {
  var performerObj = this.getPerformerObject();
  id = parseInt(id,10);
  for (var key in performerObj) {
    var performerId = parseInt(performerObj[key].id,10);

    if (performerId === id) {
      return true;
    }
  }
  return;
}

FestivalData.prototype.doesEventExistForId = function(id) {
  var eventObj = this.getEventObject();
  id = parseInt(id,10);
  for (var key in eventObj) {
    var eventId = parseInt(eventObj[key].id,10);

    if (eventId === id) {
      return true;
    }
  }
  return
}

module.exports = new FestivalData();