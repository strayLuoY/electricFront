<template>
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>吉林省电力通信智能调度平台</title>
      <link rel="stylesheet" href="css/index.css" />
    </head>
    <body>
      <!-- 头部 -->
      <header>
        <h1>吉林省电力通信智能调度平台</h1>
        <div class="show-time"></div>
      </header>

      <!-- 主体 -->
      <section class="main-box">
        <div class="column">
          <div class="panel bar" id="jrjx">
            <h2>今日检修</h2>
            <div class="chart">
              <!-- <overhaul></overhaul> -->
            </div>
            <!-- 底边框 -->
            <div class="panel-footer"></div>
          </div>
          <div class="panel line">
            <h2>明日检修</h2>
            <div class="chart">
              <tomorrow></tomorrow>
            </div>
            <!-- 底边框 -->
            <div class="panel-footer"></div>
          </div>
          <div class="panel pie">
            <h2>风险预警（一周）</h2>
            <div class="chart">
              <!-- <rise></rise> -->
            </div>
            <!-- 底边框 -->
            <div class="panel-footer"></div>
          </div>
        </div>
        <div class="column">
          <!-- 地图模块 -->
          <div class="map">
            <!--<div class="map-ball"></div>-->
            <!--<div class="map-ring"></div>-->
            <!--<div class="map-arrow"></div>-->
            <div class="chart"></div>
          </div>
          <div class="panel pictorial-bar">
            <h2>工单统计</h2>
            <!-- <count></count> -->
            <div class="chart"></div>
            <!-- 底边框 -->
            <div class="panel-footer"></div>
          </div>
        </div>
        <div class="column">
          <div class="panel bar-right">
            <h2>值班人员</h2>
            <div class="chart">
              <div class="box-person">
                <div class="chart-label">
                  <p class="label-name">
                    姓名：<span class="person-name">张三</span>
                  </p>
                  <p class="label-job">
                    岗位：<span class="person-job">XXXX</span>
                  </p>
                </div>
                <div class="chart-photo">
                  <img src="" alt="照片" />
                </div>
              </div>
              <div class="box-person">
                <div class="chart-label">
                  <p class="label-name">姓名：李四</p>
                  <p class="label-job">岗位：XXXXX</p>
                </div>
                <div class="chart-photo">
                  <img src="" alt="照片" />
                </div>
              </div>
            </div>
            <!-- 底边框 -->
            <div class="panel-footer"></div>
          </div>
          <div class="panel line-right">
            <h2>缺陷情况（一周）</h2>
            <div class="chart"></div>
            <!-- 底边框 -->
            <div class="panel-footer"></div>
          </div>
          <div class="panel pie-right">
            <h2>工作联系单（一周）</h2>
            <div class="chart"></div>
            <!-- 底边框 -->
            <div class="panel-footer"></div>
          </div>
        </div>
      </section>
    </body>
  </html>
</template>

<script>
// import Overhaul from "@/components/overhaul";
// import Tomorrow from "@/components/tomorrow";
// import Rise from "@/components/rise";
// import Count from "@/components/count";
// export default {
//   components: {
//     Overhaul,
//     Tomorrow,
//     Rise,
//     Count,
//   },
// };
</script>

<style scoped>
@import "../../assets/css/index.css";
</style>