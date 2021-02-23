<template>
  <el-select
    :value="value"
    @input="$emit('input', $event)"
    placeholder="请选择企业"
  >
    <el-option
      v-for="item in company"
      :key="item.id"
      :label="item.short_name"
      :value="item.id"
    >
    </el-option>
  </el-select>
</template>

<script>
import { getEnterprise } from "../../../api/company.js";
export default {
  name: "companyList",
  props: ["value"],
  data() {
    return {
      company: [],
    };
  },
  created() {
      getEnterprise({ limt: 999999 }).then((res) => {
        console.log(res);
        this.company = res.data.data.items;
      });
  },
};
</script>

<style>
</style>