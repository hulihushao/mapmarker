/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2022-06-02 09:31:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-06-02 10:13:20
 */
export default {
  // 点样式
  point: {
    // 到过的点的样式
    dao: {
      image: {
        /* 权重大于circle */
        src: "./static/img/star.png", //图标的URL
        offset: [0, 0], //偏移值，默认为[0,0]
        opacity: 1, //默认是1  （0，1）
        scale: 1, //默认是1
      },
      circle: {
        radius: "", //圆半径
        strokeColor: "", //圆边框颜色
        strokeWidth: "", //圆边框宽度
        fillColor: "", //圆的填充色
      },
      text: {
        textField: "KFQJB", //要显示的文本内容字段
        font: "normal 20px 微软雅黑", //文字样式
        textAlign: "center", //文本对齐 'left', 'right', 'center', 'end' 'start'.针对于placement: 'point',默认为'center'；针对于placement: 'line'，默认是让渲染器选择不超过maxAngle的位置
        padding: [0, 0, 0, 0], //文本周围的像素填充。数组中值的顺序是[top, right, bottom, left]
        offsetX: 0, //水*文本偏移量(以像素为单位)。正值将把文本右移。默认0
        offsetY: -10, //垂直文本偏移量(以像素为单位)。正值会将文本向下移动。默认offset:-10,
        fill: {
          //文本填充样式（即文字颜色)
          color: "red",
        }, //如果未设置，默认未#333
        stroke: {
          color: "red",
          width: 1,
        },
      },
    },
  },
  line: {},
  polygon: {},
  selectPoint: {
    circle: {
      radius: 10, //圆半径
      strokeColor: "rgba(255, 0, 0, .3)", //圆边框颜色
      strokeWidth: 3, //圆边框宽度
      fillColor: "rgba(45, 242, 242, 1)", //圆的填充色
    },
    text: {
      textField: "", //要显示的文本内容字段
      font: "normal 20px 微软雅黑", //文字样式
      textAlign: "center", //文本对齐 'left', 'right', 'center', 'end' 'start'.针对于placement: 'point',默认为'center'；针对于placement: 'line'，默认是让渲染器选择不超过maxAngle的位置
      padding: [0, 0, 0, 0], //文本周围的像素填充。数组中值的顺序是[top, right, bottom, left]
      offsetX: 0, //水*文本偏移量(以像素为单位)。正值将把文本右移。默认0
      offsetY: -10, //垂直文本偏移量(以像素为单位)。正值会将文本向下移动。默认offset:-10,
      fill: {
        //文本填充样式（即文字颜色)
        color: "red",
      }, //如果未设置，默认未#333
      stroke: {
        color: "red",
        width: 1,
      },
    },
  },
};
