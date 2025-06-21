// import something here
import axios from "axios";
import apolloClient from "../utils/apollo";
import VueClipboard from "vue-clipboard2";
import VueApexCharts from 'vue-apexcharts'
import moment from "moment";

export default async ({ Vue }) => {
  VueClipboard.config.autoSetContainer = true; // add this line
  Vue.use(VueClipboard);
  Vue.use(VueApexCharts);
  Vue.component('apexchart', VueApexCharts);
  Vue.prototype.$apollo = apolloClient;
  Vue.prototype.$axios = axios;
  Vue.prototype.$moment = moment;
};
