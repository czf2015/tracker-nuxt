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
      default: '1280px'
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
      this.chart = echarts.init(this.$refs.chart);
      // 异步获取的数据
      axios.get('/api/rawData.json').then(res => {
        let rawData = res.data.rawData
        let counts = rawData.map(item => [new Date(item[0]), 1]).sort()
        for (let i = 1; i < counts.length; i++) {
          if (counts[i][0] === counts[i-1][0]) {
            counts[i][1] += counts[i-1][1]
            counts[i-1][1] = 0
          }
        }
        let data = counts.filter(item => item[1] > 0)
        //   .map(item => [item[0].getFullYear(), item[0].getMonth(), item[0].getDate(), item[0].getDay() || 7, item[1]])
        // let data = counts.map(item => [item[1] * 4 + Math.floor(item[2] / 7), item[3] - 1, item[4] || '-', item[0], item[1], item[2]])
        this.chart.setOption({
          title: {
            top: 10,
            id: '',
            text: '训练情形',
            link: '',
            target: 'blank'
          },
          textStyle: {
            // color: 'red'
            // rich: {}
          },
          // backgroundColor: '#21202D',
          tooltip: {
            position: 'top',
            formatter: function (params) {
              return `${params.value[0].getDate()}日: ${params.value[1]}次`
            }
          },
          animation: false,
          // grid: {
          //   height: '50%',
          //   y: '8%'
          // },
          visualMap: {
            min: 0,
            max: 1000,
            calculable: true,
            // type: 'piecewise',
            orient: 'horizontal',
            // left: 'center',
            top: 10,
            right: 5,
            textStyle: {
                color: '#000'
            }
          },
          calendar: {
            top: 120,
            left: 30,
            right: 30,
            // width: 960,
            // height: 'auto',
            cellSize: [15, 20],
            orient: document.body.clientWidth > 600 ? 'horizontal' : 'vertical',
            splitLine: {
              show: false
            },
            range: '2018',
            itemStyle: {
              normal: {borderWidth: 0.5}
            },
            yearLabel: {show: true},
            monthLabel: {nameMap: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']},
            dayLabel: {nameMap: 'cn'}
          },
          series: [{
            name: '日期：次数',
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: data,
            label: {
              normal: {
                show: true
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }, {
            type: 'scatter',
            coordinateSystem: 'calendar',
            symbolSize: 1,
            label: {
                normal: {
                    show: true,
                    formatter: function (params) {
                        return params.value[1]
                    },
                    textStyle: {
                        color: '#ccc'
                    }
                }
            },
            data: data
          },],
        })
      })
    }
  }
}
</script>

<style scoped></style>
