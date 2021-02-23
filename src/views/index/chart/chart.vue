<template>
  <div id="chart_container">
    <el-card class="box-card">
      <ul>
        <li>
          <div>{{ titleData.increment_users }}</div>
          <span>今日新增用户</span>
        </li>
        <li>
          <div>{{ titleData.total_users }}</div>
          <span>总用户量</span>
        </li>
        <li>
          <div class="red_box">{{ titleData.increment_questions }}</div>
          <span>新增试题</span>
        </li>
        <li>
          <div class="red_box">{{ titleData.total_questions }}</div>
          <span>总试题量</span>
        </li>
        <li>
          <div class="green_box">{{ titleData.total_done_questions }}</div>
          <span>总刷题量</span>
        </li>
        <li>
          <div class="green_box">{{ titleData.personal_questions }}</div>
          <span>人均刷题量</span>
        </li>
      </ul>
    </el-card>
    <el-card class="box-chart">
      <div class="charts_box" ref="echarts"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import { getPanelData, getStatistics } from "../../../api/chart";
export default {
  name: "chart",
  data() {
    return {
      titleData: {},
    };
  },
  created() {
    // 获取面板数据
    getPanelData().then((res) => {
      this.titleData = res.data.data;
    });

  // 获取echart数据
    getStatistics().then((res) => {
      console.log(res);
      const data = res.data.data;
      const dataTitle = res.data.data.map(v=>{
        return v.name
      })
      console.log(dataTitle);
      const mychart = echarts.init(this.$refs.echarts);
      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        title: {
          text: "整体数据",
          left: "30",
        },
        legend: {
          orient: "vertical",
          right: 10,
          data:dataTitle,
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data,
            color:['#0086FA','#f76137','#f9b358']
          },
        ],
      };

      mychart.setOption(option);
    });
  },
  mounted() {},
};
</script>

<style lang='less'>
#chart_container {
  // 上半部分
  .box-card {
    ul {
      display: flex;
      justify-content: space-around;
      li {
        list-style: none;
        div {
          height: 100px;
          width: 100px;
          border: 2px solid #0086FA;
          border-radius: 50%;
          line-height: 100px;
          text-align: center;
          font-size: 25px;
          color: #0086FA;
        }
        .red_box {
          border: 2px solid #F76137;
          color: #F76137;
        }
        .green_box {
          border: 2px solid #55CD78;
          color: #55CD78;
        }
        span {
          display: block;
          text-align: center;
          margin-top: 12px;
          font-size: 17px;
          color: #737373;
        }
      }
    }
  }
  // 下半部分
  .box-chart {
    margin-top: 11px;
    .charts_box {
      height: 600px;
    }
  }
}
</style>