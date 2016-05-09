import Ember from 'ember';

/* global d3 */
export default Ember.Component.extend({
  className: 'population-chart',
  data: [
    {faction: "Vanu Sovereignty"},
    {faction: "Terran Republic"},
    {faction: "New Conglomerate"}
  ],
  chart: {},

  didInsertElement: function () {
    this._super(...arguments);
    var chart = d3.select(this.get('element')).append('svg')
      .attr('width', 1000)
      .attr('height', 1000)
      .chart('Pie', {
        height: 1000,
        width: 1000,
        donut: {
        }
      });

    this.set('chart', chart);
  },

  init: function () {
    this._super(...arguments);
    this.get('ps2socket').on('population', this, 'populationUpdated');
    this.get('data');
  },

  populationUpdated: function (pop) {
    var global = pop.global;
    var data = this.get('data');
    data.forEach(function (dataObj, index) {
      data[index].count = global[dataObj.faction];
    });
    this.set('data', data);
    this.draw();
  },

  draw: function () {
    this.get('chart').draw(this.get('data'));
  }
});
