import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    reset() {
      this.get('ps2socket').send('resetPop',{});
    }
  }
});
