<template>
  <canvas id="chart"></canvas>
</template>
<script>
export default {
  data() {
    return {
      chart: null,
      rendered: false,
    }
  },
  watch: {
    viewsChartData() {
      if (!this.rendered) {
        this.drawChart()
      } else {
        this.chart.update()
      }
    },
  },
  created() {
    this.drawChart()
  },
  props: ['viewsChartData'],
  methods: {
    async drawChart() {
      if (process.client) {
        await this.$nextTick()
        var ctx = document.getElementById('chart').getContext('2d')
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.viewsChartData.labels,
            datasets: [
              {
                label: 'Views',
                data: this.viewsChartData.data,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          },
        })
      }
    },
  },
}
</script>