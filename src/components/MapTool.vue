<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-06-02 10:25:47
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-06-12 16:21:19
-->
<template>
  <div id="maptool">
    <popscontainer
      ref="popUl0"
      :elPopover="popscontainer"
      @popChildenClick="
        (row) => {
          popChildenClick(row);
        }
      "
      @popParentClick="
        (row) => {
          popParentClick(row);
        }
      "
      :disabled="[0, 1]"
      v-if="popscontainer.data.length"
      style="top: 0px; right: 30px"
    />
  </div>
</template>

<script>
import popscontainer from "@/components/popscontainer";
import featureStyle from "@/utils/config/featureStyle";
import mapUtils from "../utils/map/mapUtils";
export default {
  name: "MapTool",
  components: {
    popscontainer,
  },
  data() {
    return {
      popscontainer: {
        data: [
          {
            text: "新增点位",
            click: "addPoint",
            visible: true,
          },
          {
            text: "结束新增",
            click: "endAddPoint",
            visible: true,
          },
          {
            text: "更多...",
            visible: true,
            children: [
              {
                text: "测距",
                click: "measureLine",
              },
              {
                text: "测面",
                click: "measurePolygon",
              },
              {

                text:"取消测量",
                click:"endMeasure"
              }
            ],
          },
        ],
      },
    };
  },
  methods: {
    popChildenClick({row}) {
      if(row.click){
        switch (row.click){
          case "measureLine":
            this.$tMap.selectClickObj&&this.$tMap.selectClickObj.setActive(false)
            this.$tMap.measureLine(featureStyle.measureLine)
          break
          case "measurePolygon":
            this.$tMap.selectClickObj&&this.$tMap.selectClickObj.setActive(false)
            this.$tMap.measurePolygon(featureStyle.measurePolygon)
          break
          case "endMeasure":
            this.$tMap.endMeasure(()=>{})
            this.$tMap.selectClickObj&&this.$tMap.selectClickObj.setActive(true)
          break
          default:
          break
        }
      }
    },
    popParentClick(row) {
      console.log(row);
      if (row.click) {
        switch (row.click) {
          case "addPoint":
            mapObj.Feature.endDraw();
            this.$tMap.selectClickObj &&
              this.$tMap.selectClickObj.setActive(false);
            mapObj.Feature.addPoint(
              {
                featureStyle: featureStyle.point.dao,
                drawStyle: {
                  //绘制中的样式
                  fillColor: "rgba(0, 0, 0, 0.2)", //绘制中的填充颜色
                  stroke: {
                    color: "rgba(0, 0, 0, 0.5)",
                    lineDash: [10, 10], //线型
                    width: 5,
                  },
                  image: {
                    src: `./static/img/star.png`, //图标的URL
                    color: "#fff", //颜色、渐变或图案
                    offset: [0, 0], //偏移值，默认为[0,0]
                    opacity: 1, //默认是1  （0，1）
                    scale: 0.6, //默认是1
                  },
                },
              },
              (e) => {
                setTimeout(() => {
                  mapObj.Feature.removePoint(
                    e.featureId[e.featureId.length - 1]
                  );
                });
                // this,$EventBus.$emit('showFormDialog',true)
                this.$store.commit('setShowFormDialog',true)
                this.$store.commit('setPosition',e.feature.getGeometry().getCoordinates())
                
              }
            );
            break;
          case "endAddPoint":
            mapObj.Feature.endDraw();
            this.$tMap.selectClickObj &&
              this.$tMap.selectClickObj.setActive(true);
            break;
          default:
            break;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#maptool {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
