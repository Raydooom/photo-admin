<template>
  <div class>
    <div class="badge-wrap">
      <badge class="badge" icon="el-icon-tickets" color="#66CCCC" name="文章数" :count="baseData.articleCount"></badge>
      <badge class="badge" icon="el-icon-tickets" color="#99CCFF" name="用户数" :count="baseData.userCount"></badge>
      <badge class="badge" icon="el-icon-tickets" color="#99CCFF" name="总评论" :count="baseData.commentCount"></badge>
      <badge class="badge" icon="el-icon-tickets" color="#99CCFF" name="精选" :count="baseData.dailyCount"></badge>
    </div>
    <div class="item-wrap">
      <div class="chart-wrap">
        <v-chart :options="line"/>
      </div>
    </div>
  </div>
</template>

<script>
import badge from "../components/chartBadge";
import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/chart/line";
import { getDashBoardData, getDailyVisitor } from "../api/admin";
export default {
  components: {
    "v-chart": ECharts,
    badge
  },
  data() {
    return {
      baseData: "",
      // 配置显示的数据，key需对应接口字段
      chartLineItem: [
        {
          name: "访问量",
          type: "line",
          smooth: true,
          areaStyle: {},
          color: "#66CCCC",
          key: "times"
        },
        {
          name: "访问用户",
          type: "line",
          smooth: true,
          areaStyle: {},
          color: "#CCCCFF",
          key: "users_count"
        }
      ],
      line: {
        title: {
          text: "流量统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: []
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: [],
        color: ["#CCCCFF"]
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      // 基本数据
      getDashBoardData().then(res => {
        this.baseData = res.data;
      });
      getDailyVisitor().then(res => {
        let legendData = []; // 图例
        let xAxisData = []; // x轴数据
        let seriesData = []; // 折现数据
        // 循环统计项
        this.chartLineItem.forEach(item => {
          let data = [];
          legendData.push(item.name);
          xAxisData = [];
          res.data.dailyVisitor.forEach(el => {
            xAxisData.push(el.day);
            data.push(el[item.key]);
            item.data = data;
          });
          seriesData.push(item);
        });

        this.line.legend.data = legendData;
        this.line.xAxis.data = xAxisData;
        this.line.series = seriesData;
        console.log(this.line);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.badge-wrap {
  display: flex;
  justify-content: flex-start;
  .badge {
    margin-right: 20px;
  }
}
.item-wrap {
  padding-top: 20px;
  display: flex;
  .chart-wrap {
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
  }
}
</style>
