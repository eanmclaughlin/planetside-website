import Ember from 'ember';

var worlds = ['Connery', 'Emerald', 'Briggs', 'Miller', 'Cobalt'];
var zones = ['Indar', 'Amerish', 'Esamir', 'Hossin', 'VR Training', 'Koltyr'];

export default Ember.Route.extend({
  model() {
    return {
      worlds: worlds,
      zones: zones
    };
  }
});
