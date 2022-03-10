import { createApp } from "vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import App from "./App.vue";
import { loadFonts } from "./plugins/webfontloader";

const vuetify = createVuetify({
  components,
  directives,
});

loadFonts();

createApp(App).use(vuetify).mount("#app");
