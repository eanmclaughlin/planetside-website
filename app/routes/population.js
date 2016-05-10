import Ember from 'ember';

var worlds = ['Connery', 'Emerald', 'Briggs', 'Miller', 'Cobalt'];
var zones = ['Indar', 'Amerish', 'Esamir', 'Hossin', 'VR Training'];

export default Ember.Route.extend({
  model() {
    return {
      worlds: worlds,
      zones: zones
    };
  }
});
