import Ember from 'ember';

function resolve(path, obj, safe) {
  return path.split('.').reduce(function (prev, curr) {
    return !safe ? prev[curr] : (prev ? prev[curr] : undefined);
  }, obj);
}

/* global d3 */
export default Ember.Component.extend({
  classNames: ['population-chart'],
  data: [
    {faction: "Vanu Sovereignty"},
    {faction: "Terran Republic"},
    {faction: "New Conglomerate"}
  ],
  chart: {},

  didInsertElement: function () {
    this._super(...arguments);
    var chart = d3.select(this.get('element')).select('svg')
      .attr('width', 500)
      .attr('height', 500)
      .chart('Pie', {
        height: 500,
        width: 500,
        donut: {}
      });

    this.set('chart', chart);
  },

  init: function () {
    this._super(...arguments);
    this.get('ps2socket').on('population', this, 'populationUpdated');
    this.get('data');
  },

  populationUpdated: function (pop) {
    var population = resolve(this.get('path'), pop, true);
    var data = this.get('data');
    data.forEach(function (dataObj, index) {
      data[index].count = population[dataObj.faction];
    });
    this.set('data', data);
    this.draw();
  },

  draw: function () {
    this.get('chart').draw(this.get('data'));
  }
});
