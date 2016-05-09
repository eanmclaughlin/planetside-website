/**
 * Created by Pepper on 5/8/2016.
 */
/* global d3 */

(function (d3) {

  /* An animated pie/donut chart
   Mainly intended for faction-based data such as population.
   */

  var factions = {
    "Vanu Sovereignty": 1,
    "Terran Republic": 2,
    "New Conglomerate": 3
  };

  d3.chart('Pie', {
    initialize: function (options) {
      var pieGroup;

      this.color = d3.scale.ordinal().range(["#8B30C9", "#D21600", "#0B73DA"]);

      options = options || {};

      this.width(options.width || this.base.attr('width') || 200);
      this.height(options.height || this.base.attr('height') || 200);
      this.radius(options.radius || this.width()/3);
      if (options.donut) {
        this.innerRadius(options.donut.radius || (this.width() - (this.width()/2.5))/3);
      }

      this.arc = d3.svg.arc()
        .startAngle(function (d) {
          return d.startAngle;
        })
        .endAngle(function (d) {
          return d.endAngle;
        })
        .innerRadius(this.ir)
        .outerRadius(this.r);

      this.pie = d3.layout.pie()
        .sort(null)
        .value(function (d) {
          return d.count;
        });

      pieGroup = this.base.append('g')
        .attr('class', 'arc')
        .attr('transform', 'translate(' + options.width / 2 + ',' + options.height / 2 + ')');

      this.key = function (d) {
        return d.faction;
      };

      this.layer('slices', pieGroup, {
        dataBind: function (data) {
          return this.selectAll('path')
            .data(data);
        },

        insert: function () {
          return this.insert('path')
            .attr('class', 'slice');
        },

        events: {
          enter: function () {
            var chart = this.chart();

            this.attr('fill', function (d) {
                return chart.color(factions[d.data.faction]);
              })
              .attr('d', chart.arc);
          },

          "merge:transition": function () {
            var chart = this.chart();

            this.transition().duration(1000)
              .attrTween('d', function (d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function (t) {
                  return chart.arc(interpolate(t));
                };
              });
          }
        }
      });
    },

    transform: function (data) {
      return this.pie(data, this.key);
    },
    width: function (newWidth) {
      if (!arguments.length) {
        return this.w;
      }
      this.w = newWidth;
    },
    height: function (newHeight) {
      if (!arguments.length) {
        return this.h;
      }
      this.h = newHeight;
    },
    radius: function (newRadius) {
      if (!arguments.length) {
        return this.r;
      }
      this.r = newRadius;
    },
    innerRadius: function (newRadius) {
      if (!arguments.length) {
        return this.ir;
      }
      this.ir = newRadius;
    }
  });
})(d3 || window.d3);
