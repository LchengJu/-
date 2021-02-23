<template>
  <el-upload
    class="avatar-uploader"
    :action="imgUpload"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :value='imageUrl'
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import {questionUpload} from '../../../api/question.js'
export default {
  name: "imgUpload",
  props:['value'],
  data() {
    return {
      imgUpload:questionUpload(),
      //   图片预览路径
      imageUrl: "",
    };
  },
  methods: {
    // 上传图片
    handleAvatarSuccess(res, file) {
        this.$emit('input',res.data.url)
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  created() {
    if (this.value) {
      this.imageUrl = process.env.VUE_APP_BASEURL + this.value
    }
  },

};
</script>

<style>
.avatar-uploader {
  display: inline-block;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>