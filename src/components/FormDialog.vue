<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-06-12 15:47:49
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-06-12 17:16:29
-->
<template>
  <div id="formDialog">
    <el-dialog title="新增点位" :visible.sync="isShowFormDialog" width="600px">
      <el-form
        :rules="rules"
        ref="formdialog"
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="名称" prop="map_point_name">
          <el-input v-model="formLabelAlign.map_point_name"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <el-input v-model="formLabelAlign.comment"></el-input>
        </el-form-item>
        <el-form-item label="旅行时间" prop="lxtime">
          <el-date-picker
            clearable
            v-model="formLabelAlign.lxtime"
            value-format="yyyy-MM-dd"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit" :loading="loading"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "right",
      loading: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      formLabelAlign: {
        map_point_name: "",
        comment: "",
        lxtime: "",
      },
      rules: {
        map_point_name: [
          { required: true, message: "请输入名称", trigger: "blur" },
        ],
      },
      isUpdate: false,
    };
  },
  computed: {
    isShowFormDialog: {
      get() {
        return this.$store.state.showFormDialog;
      },
      set() {
        this.$store.commit("setShowFormDialog", false);
        this.loading = false;
      },
    },
  },
  mounted() {
    this.$EventBus.$on("changeSj", (feature) => {
      console.log(feature);
      if (feature) {
        this.isUpdate = true;
        let ks = { ...feature };
        for (let key in ks) {
          let kp = key.split("");
          let kd = kp.map((item) => {
            if (item == item.toUpperCase()) {
              return "_" + item.toLowerCase();
            }
            return item;
          });
          kd = kd.join("");
          let keys = Object.keys(this.formLabelAlign);
          if (keys.indexOf(kd) > -1) {
            this.formLabelAlign[kd] = feature[key];
          }
        }
        this.$store.commit("setShowFormDialog", true);
      }
    });
  },
  methods: {
    cancel() {
      this.formLabelAlign={
        map_point_name: "",
        comment: "",
        lxtime: ""
      }
      //this.$refs.formdialog.resetFields();
      this.$store.commit("setShowFormDialog", false);
      this.loading = false;
    },
    submit() {
      this.$refs.formdialog.validate((valid) => {
        if (valid) {
          this.loading = true;
          if (!this.isUpdate) {
            this.$httpRequest
              .postPoint({
                ...this.formLabelAlign,
                encode_str: null,
                create_time: null,
                modify_time: null,
                xy: this.$store.state.position.join(","),
              })
              .then((res) => {
                this.cancel();
                console.log(res);
                this.$message({
                  message: "新增成功！",
                  type: "success",
                });
                mapUtils.initLayer(this.$httpRequest);
              })
              .catch((err) => {
                this.loading = false;
                this.$message({
                  message: "新增失败！",
                  type: "error",
                });
              });
          } else {
            this.$httpRequest
              .changePoint({
                ...this.formLabelAlign,
                encode_str: null,
                create_time: null,
                modify_time: null,
                xy: this.$store.state.position.join(","),
              })
              .then((res) => {
                this.cancel();
                console.log(res);
                this.$message({
                  message: "修改成功！",
                  type: "success",
                });
                mapUtils.initLayer(this.$httpRequest);
              })
              .catch((err) => {
                this.loading = false;
                this.$message({
                  message: "修改失败！",
                  type: "error",
                });
              });
          }
        }
      });
    },
  },
};
</script>

<style></style>
