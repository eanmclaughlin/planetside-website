import Ember from 'ember';

var run = Ember.run;
var socket;

export default Ember.Service.extend(Ember.Evented, {
  subscription: [],
  components: [],

  init() {
    socket = this.get('io')('ws://localhost:3000/live');
    socket.on('event', run.bind(this, this.liveEventHandler));
    socket.on('population', run.bind(this, this.populationHandler));
  },

  liveEventHandler(event) {
    console.log(event);
  },

  populationHandler(pop){
    this.trigger('population', pop);
  },

  subscribe(newSub){

  },

  unsubscribe(removeSub){

  },

  send(message, payload){
    socket.emit(message, payload);
  }
});
