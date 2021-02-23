<template>
  <div id="editQuestion_container">
    <el-dialog title="编辑学科" :visible.sync="dialogFormVisible" fullscreen>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="50px"
        class="demo-ruleForm"
      >
        <el-form-item label="学科" prop="subject">
          <subjectList v-model="ruleForm.subject"></subjectList>
        </el-form-item>

        <el-form-item label="阶段" prop="step">
          <el-select v-model="ruleForm.step" placeholder="请选择阶段">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise">
          <companyList v-model="ruleForm.enterprise"></companyList>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-cascader
            :options="options"
            v-model="ruleForm.city"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="题型" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">多选</el-radio>
            <el-radio :label="3">简答</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="难度" prop="difficulty">
          <el-radio-group v-model="ruleForm.difficulty">
            <el-radio :label="1">简单</el-radio>
            <el-radio :label="2">一般</el-radio>
            <el-radio :label="3">困难</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-divider></el-divider>
        <el-form-item
          label="试题标题"
          prop="title"
          label-width="70px"
          class="richText"
        >
          <quill-editor
            ref="myQuillEditor"
            v-model="ruleForm.title"
            :options="editorOption"
          />
        </el-form-item>

        <div class="group">
          <el-form-item label="单选" prop="single_select_answer" v-if="ruleForm.type == 1"
          >
            <el-radio-group v-model="ruleForm.single_select_answer">
              <div
                class="miniGroup"
                v-for="(item, index) in ruleForm.select_options"
                :key="index"
              >
                <el-radio :label="item.label"></el-radio>
                <el-input v-model="item.text"></el-input>
                <imgUpload v-model="item.image"></imgUpload>
              </div>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="多选"
            prop="multiple_select_answer"
            v-else-if="ruleForm.type == 2"
          >
            <el-checkbox-group v-model="ruleForm.multiple_select_answer">
              <div
                class="miniGroup"
                v-for="(item, index) in ruleForm.select_options"
                :key="index"
              >
                <el-checkbox :label="item.label"></el-checkbox>
                <el-input v-model="item.text"></el-input>
                <imgUpload v-model="item.image"></imgUpload>
              </div>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="简答" prop="short_answer" v-else>
            <el-input v-model="ruleForm.short_answer"></el-input>
          </el-form-item>
        </div>

        <el-divider></el-divider>

        <el-form-item label="解析视频" prop="video" label-width="70px">
          <videoUpload v-model="ruleForm.video"></videoUpload>
        </el-form-item>
        <el-divider></el-divider>

        <el-form-item
          label="答案解析"
          prop="answer_analyze"
          label-width="70px"
          class="richText"
        >
          <quill-editor
            ref="myQuillEditor"
            v-model="ruleForm.answer_analyze"
            :options="editorOption"
          />
        </el-form-item>

        <el-divider></el-divider>

        <el-form-item label-width="100px" label="试题备注" prop="remark">
          <el-input
            style="width: 100%; height: 52px"
            v-model="ruleForm.remark"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import { regionData } from "element-china-area-data";
import subjectList from "./subjectList";
import companyList from "./companyList";
import imgUpload from "./imgUpload";
import videoUpload from "./videoUpload";
import { editQuestion } from "../../../api/question.js";

export default {
  name: "editQuestion",
  components: {
    quillEditor,
    subjectList,
    companyList,
    imgUpload,
    videoUpload,
  },
  data() {
    return {
      dialogFormVisible: false,
      //   富文本数据
      content: "",
      editorOption: {},

      // 文件列表
      fileList: [],
      // 城市列表
      options: regionData,

      ruleForm: {
        select_options: [
          {
            label: "A",
            text: "",
            image: "",
          },
          {
            label: "B",
            text: "",
            image: "",
          },
          {
            label: "C",
            text: "",
            image: "",
          },
          {
            label: "D",
            text: "",
            image: "",
          },
        ],
        title: "",
        subject: "",
        step: "",
        enterprise: "",
        city: [],
        type: "",
        difficulty: "",
        // 单选题答案
        single_select_answer: "",
        // 简答题答案
        short_answer: "",
        // 多选题答案
        multiple_select_answer: [],
        video: "",
        // 答案解析
        answer_analyze: "",
        remark: "",
      },
      input: "",
      rules: {
        subject: [
          {
            required: true,
            message: "请输入正确内容",
            trigger: "blur",
          },
        ],
        step: [
          {
            required: true,
            message: "请输入正确内容",
            trigger: "blur",
          },
        ],
        enterprise: [
          {
            required: true,
            message: "请输入正确内容",
            trigger: "blur",
          },
        ],
        city: [
          {
            required: true,
            message: "请输入正确内容",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "请输入正确内容",
            trigger: "blur",
          },
        ],
        difficulty: [
          {
            required: true,
            message: "请输入正确内容",
            trigger: "blur",
          },
        ],
        title: [
          {
            required: true,
            message: "请输入正确内容",
            trigger: "blur",
          },
        ],
        single_select_answer: [
          {
            required: true,
            message: "请输入正确内容",
            trigger: "blur",
          },
        ],
        multiple_select_answer: [
          {
            required: true,
            message: "请输入正确内容",
            trigger: "blur",
          },
        ],
        answer_analyze: [
          {
            required: true,
            message: "请输入正确内容",
            trigger: "blur",
          },
        ],
        remark: [
          {
            required: true,
            message: "请输入正确内容",
            trigger: "blur",
          },
        ],
        short_answer: [
          { required: true, message: "请输入正确内容", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 富文本事件
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
    },
    // 富文本结束

    // 省市区三级联动
    handleChange(value) {
      console.log(value);
    },
    editClick() {
      editQuestion({
        ...this.ruleForm,
      }).then((res) => {
        if (res.code == 200) {
          this.$message.success("修改成功");
          this.$parent.getList();
          this.dialogFormVisible = false;
        } else {
          this.$message.error(res.message);
        }
      });
    },
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
};
</script>

<style lang='less'>
#editQuestion_container {
  .el-dialog {
    background: #ffffff;
    box-shadow: 0px 2px 5px 6px rgba(63, 63, 63, 0.35);
    .el-dialog__header {
      text-align: left;
      background: linear-gradient(to right, #01c4fa, #1394fa);
      padding: 0;
      padding-left: 20px;
      line-height: 54px;
      .el-dialog__title {
        color: white;
      }
    }
    .el-dialog__body {
      padding: 30px 300px;
      .el-form-item {
        .el-form-item__label {
          text-align: left;
          margin-left: 0;
        }
      }
      //   富文本编辑器
      .el-form-item.richText {
        .el-form-item__content {
          margin-left: 0 !important;
          padding-top: 65px;
        }
      }
      .el-input {
        width: 364px;
      }
      .group {
        margin-bottom: 45px;
        .el-form-item__label {
          margin-right: 0;
        }
        .el-radio-group {
          width: 100% !important;
        }
        .miniGroup {
          // 上传图片
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin-bottom: 45px;
          .el-input {
            width: 476px;
            height: 40px;
            border-radius: 4px;
          }
        }
      }
      //   上传解析视频
      .upload-demo {
        padding-left: 30px;
      }
    }
    .el-dialog__footer {
      padding-top: 0;
      text-align: center;
      margin-top: 50px;
    }
  }
}
</style>