<template>
  <el-select
    :value="value"
    @input="$emit('input', $event)"
    placeholder="请选择学科"
  >
    <el-option
      v-for="item in subject"
      :key="item.id"
      :label="item.short_name"
      :value="item.id"
    >
    </el-option>
  </el-select>
</template>

<script>
import { getSubject } from "../../../api/subject.js";
export default {
  name: "subjectList",
  props: ["value"],
  data() {
    return {
      subject: [],
    };
  },
  created() {
      getSubject({ limt: 999999 }).then((res) => {
        console.log(res);
        this.subject = res.data.data.items;
      });
  },
};
</script>

<style>
</style>