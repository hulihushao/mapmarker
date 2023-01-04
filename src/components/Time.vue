<template>
  <div id="time">
    <div class="crayon-clock">
      <div class="crayon-clock-time">{{ time }}</div>
      <div class="crayon-clock-date">
        <span class="date">{{ date }}</span>
        <span class="week">{{ week }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CrayonClock",
  components: {},
  data() {
    return {
      time: "",
      date: "",
      week: "",
      timerHelper: false,
    };
  },
  mounted() {
    this.timerHelper = setInterval(this.updateTime, 1000);
  },
  beforeDestroy() {
    if (this.timerHelper) {
      clearInterval(this.timerHelper);
      this.timerHelper = false;
    }
  },
  methods: {
    zeroPadding(num, digit) {
      let zero = "";
      for (let i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
    updateTime() {
      const week = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      const cd = new Date();
      this.time =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2);
      this.date =
        this.zeroPadding(cd.getFullYear(), 4) +
        "-" +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        "-" +
        this.zeroPadding(cd.getDate(), 2);

      this.week = week[cd.getDay()];
    },
  },
};
</script>
<style lang="less" scoped>
#time {
  width: 100px;
  height: 50px;
  position: absolute;
  top: 40px;
  left: 50px;
  z-index: 10;
  /*  background: #0f3854;
  background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 70%);
*/
  background: radial-gradient(
    ellipse at center,
    rgba(10, 175, 230, 0.1) 70%,
    rgba(10, 175, 230, 0) 0%
  );
  background-size: 100%;
  border-radius: 10px;
}

.crayon-clock {
  /*font-family: -apple-system, BlinkMacSystemFont, Roboto, Open Sans,
    Helvetica Neue, sans-serif;*/
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  color: #0f3854;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  color: #daf6ff;
  color: #0f3854;
  font-weight: 700;
  text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
}
.crayon-clock-time {
  letter-spacing: 0.05em;
  font-size: 20px;

}
.crayon-clock-date {
  letter-spacing: 0.1em;
  font-size: 8px;
}
</style>
