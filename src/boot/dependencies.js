import axios from "axios";
import apolloClient from "../utils/apollo";
import VueClipboard from "vue-clipboard2";
import VueApexCharts from 'vue-apexcharts'
import moment from "moment";
import { ensureSingleTab } from '../composables/broadcastChannel';

export default async ({ Vue }) => {
  const allowed = await ensureSingleTab({ timeout: 400 });
  if (!allowed) {

    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.top = '0';
    el.style.left = '0';
    el.style.right = '0';
    el.style.bottom = '0';
    el.style.zIndex = '999999';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    el.style.background = 'white';
    el.style.color = '#333';
    el.style.fontFamily = 'Arial, Helvetica, sans-serif';
    el.innerHTML = `<div style="max-width:90%;text-align:center;padding:24px;"><h2>Ya tienes una instancia de la aplicación en este navegador</h2><p>Por seguridad, la aplicación no puede abrirse en más de una pestaña del mismo navegador. Cierre la otra pestaña e inténtelo de nuevo.</p></div>`;
    document.body.appendChild(el);
    return;
  }

  VueClipboard.config.autoSetContainer = true; // add this line
  Vue.use(VueClipboard);
  Vue.use(VueApexCharts);
  Vue.component('apexchart', VueApexCharts);
  Vue.prototype.$apollo = apolloClient;
  Vue.prototype.$axios = axios;
  Vue.prototype.$moment = moment;
};
