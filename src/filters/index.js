import Vue from 'vue'
import moment from 'moment'

Vue.filter('getData', function (value) {
    // 日期过滤
    return moment(value).format("YYYY年MM月DD日");
})

