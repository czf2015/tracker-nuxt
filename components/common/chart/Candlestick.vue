<!-- 参照：https://www.cnblogs.com/yesyes/p/7161923.html -->
<template>
  <div :class="className" :id="id" :style="{height:height, width:width}" ref="chart" />
</template>
<script>
import axios from 'axios'

export default {
  props: {
    className: {
      type: String,
      default: 'yourClassName'
    },
    id: {
      type: String,
      default: 'yourID'
    },
    width: {
      type: String,
      default: 'inherit'
    },
    height: {
      type: String,
      default: '350px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      function calculateMA(dayCount, data) {
        let result = [];
        for (let i = 0, len = data.length; i < len; i++) {
          if (i < dayCount) {
            result.push('-');
            continue;
          }
          let sum = 0;
          for (let j = 0; j < dayCount; j++) {
            sum += data[i - j][1];
          }
          result.push(sum / dayCount);
        }
        return result;
      }
      this.chart = echarts.init(this.$refs.chart);
      // 异步获取的数据
      axios.get('/api/rawData.json').then(res => {
        let rawData = res.data.rawData
        let dates = rawData.map(item => {
          return item[0]
        })
        let data = rawData.map(item => {
          return [+item[1], +item[2], +item[3], +item[4]];
        })
        this.chart.setOption({
          backgroundColor: '#21202D',
          legend: {
            data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
            inactiveColor: '#777',
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false,
              type: 'cross',
              lineStyle: {
                color: '#376df4',
                width: 2,
                opacity: 1
              }
            }
          },
          xAxis: {
            type: 'category',
            data: dates,
            axisLine: { lineStyle: { color: '#8392A5' } }
          },
          yAxis: {
            scale: true,
            axisLine: { lineStyle: { color: '#8392A5' } },
            splitLine: { show: false }
          },
          grid: {
            bottom: 60
          },
          dataZoom: [{
            textStyle: {
              color: '#8392A5'
            },
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            dataBackground: {
              areaStyle: {
                color: '#8392A5'
              },
              lineStyle: {
                opacity: 0.8,
                color: '#8392A5'
              }
            },
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }, {
            type: 'inside'
          }],
          animation: false,
          series: [{
              type: 'candlestick',
              name: '日K',
              data: data,
              itemStyle: {
                normal: {
                  color: '#FD1050',
                  color0: '#0CF49B',
                  borderColor: '#FD1050',
                  borderColor0: '#0CF49B'
                }
              }
            },
            {
              name: 'MA5',
              type: 'line',
              data: calculateMA(5, data),
              smooth: true,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1
                }
              }
            },
            {
              name: 'MA10',
              type: 'line',
              data: calculateMA(10, data),
              smooth: true,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1
                }
              }
            },
            {
              name: 'MA20',
              type: 'line',
              data: calculateMA(20, data),
              smooth: true,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1
                }
              }
            },
            {
              name: 'MA30',
              type: 'line',
              data: calculateMA(30, data),
              smooth: true,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1
                }
              }
            }
          ]
        })
      })
    }
  }
}

</script>
<style scoped></style>
