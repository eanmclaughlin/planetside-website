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
  height: 400,
  width: 400,
  chartName: Ember.computed('world', 'zone', function () {
    return `${this.get('world')} ${this.get('zone') ? this.get('zone') : ''}`;
  }),

  didInsertElement: function () {
    this._super(...arguments);
    var chart = d3.select(this.get('element')).select('svg')
      .attr('width', this.get('width'))
      .attr('height', this.get('height'))
      .chart('Pie', {
        height: this.get('height'),
        width: this.get('width'),
        donut: true,
        labels: true
      });

    this.set('chart', chart);
  },

  init: function () {
    this._super(...arguments);
    this.get('ps2socket').on('population', this, 'populationUpdated');
  },

  populationUpdated: function (pop) {
    var world = this.get('world');
    var zone = this.get('zone');

    var path = "";
    if (world) {
      path += 'worlds.' + world;
    }
    if (zone) {
      path += '.zones.' + zone;
    }

    var population = resolve(path, pop, true);
    if (population) {
      var data = this.get('data');
      data.forEach(function (dataObj, index) {
        if (!population[dataObj.faction]) {
          data[index].count = 0;
        }
        else {
          data[index].count = population[dataObj.faction];
        }
      });
      this.set('data', data);
      this.draw();
    }
  },

  draw: function () {
    this.get('chart').draw(this.get('data'));
  }
});
