(function(){
  "use strict";

  if (window.history && window.history.pushState && isProduction()) {
    App.Router.reopen({
      location: 'history'
    });
  }

  function isProduction() {
    return location.hostname.match('bridgetown');
  }

  App.Router.map(function() {

    // generated by ember-generate --scaffold
    this.resource('events');
    this.resource('event', {path: '/event/:events_id'});
    // end generated routes


    // generated by ember-generate --scaffold
    // this.resource('newsposts');
    // this.resource('newspost', {path: '/newspost/:urlId'});
    // end generated routes


    // generated by ember-generate --scaffold
    this.resource('performers');
    this.resource('performer', {path: '/performer/:pageUrl'});
    this.resource('shows');
    this.resource('show', {path: '/show/:pageUrl'});
    // this.route('edit_performer', {path: '/performers/:performer_id/edit'});
    // this.route('new_performer', {path: '/performers/new'});
    // end generated routes

    this.route('sponsors');
    this.route('schedule');
    this.route('thursday_schedule');
    this.route('friday_schedule');
    this.route('saturday_schedule');
    this.route('sunday_schedule');

    this.route('venues');
    this.resource('venue', {path: '/venue/:pageUrl'});
    this.route('history');
    this.route('press');
    this.route('contact');
    this.route('tickets');
    this.route('faqs');


    this.route('fourOhFour', { path: '*path' });


  });

  App.Router.reopen({
    didTransition: function(infos) {
      this._super(infos);


      Ember.run.next(function(){
        try {
        ga(
          'send',
          'pageview',
          window.location.protocol +'//' + window.location.hostname + window.location.pathname + window.location.search
        );
      }
      catch(e){}
      });
    }
  });

  Ember.Route.reopen({
    render: function() {
      this._super();
      window.scrollTo(0, 0);
      $('[data-type="image"]').each(function() {
        $(this).attr('src',$(this).data('src'));
      });
    },
    activate: function() {
      this._super();
      if (this.get('title')) {
        document.title = this.get('title') + ' | Bridgetown Comedy Festival';
      } else {
        document.title = 'Bridgetown Comedy Festival';
      }
    },
    deactivate: function() {
      if ($(".navbar .navbar-collapse.collapse.in").length) {
        $(".navbar-toggle").not(".collapsed").click();
      }
    },
    retrievePageJSON: function(page) {
      var host = 'http://www.bridgetowncomedy.com/';
      return Ember.$.ajax({
        url: host + page + '?format=json-pretty',
        dataType: 'JSONP'
      }).then(function(data) {
        return data;
      });
    }
  });

  App.VenuesRoute = Ember.Route.extend({
      // renderTemplate: function() {this.render('catch_all');},
      model: function() {return this.retrievePageJSON('venues');},
      title: 'Venues'
  });

  App.ShowsRoute = Ember.Route.extend({
      // renderTemplate: function() {this.render('catch_all');},
      model: function() {return this.retrievePageJSON('shows');},
      title: 'Shows'
  });

  App.HistoryRoute = Ember.Route.extend({
      // renderTemplate: function() {this.render('catch_all');},
      model: function() {return this.retrievePageJSON('history');},
      title: 'History'
  });

  App.PressRoute = Ember.Route.extend({
      // renderTemplate: function() {this.render('catch_all');},
      model: function() {return this.retrievePageJSON('press');},
      title: 'Press'
  });

  App.SponsorsRoute = Ember.Route.extend({
      // renderTemplate: function() {this.render('catch_all');},
      title: 'Sponsors'
  });

  App.ContactRoute = Ember.Route.extend({
      // renderTemplate: function() {this.render('catch_all');},
      model: function() {return this.retrievePageJSON('contact');},
      title: 'Contact'
  });

  App.FaqsRoute = Ember.Route.extend({
      // renderTemplate: function() {this.render('catch_all');},
      model: function() {return this.retrievePageJSON('faqs');},
      title: 'Faqs'
  });

  App.fourOhFourRoute = Ember.Route.extend({
    renderTemplate: function() {this.render('four_oh_four');},
  });
}());
