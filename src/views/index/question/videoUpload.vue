<template>
  <el-upload
    class="avatar-uploader"
    :action="videoUrl"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">
      只能上传MP4文件，且不超过2MB
    </div>
  </el-upload>
</template>

<script>
import { questionUpload } from "../../../api/question.js";
export default {
  name: "videoUpload",
  data() {
    return {
      videoUrl: questionUpload(),
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isMP4 = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isMP4) {
        this.$message.error("上传头像图片只能是 mp4 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isMP4 && isLt2M;
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
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