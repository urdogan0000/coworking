import { createApp } from "vue";
import { createPinia } from "pinia";
import "./styles/index.css";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify"; // Import Vuetify
import '@mdi/font/css/materialdesignicons.css';

const app = createApp(App);
app.use(vuetify);

app.use(createPinia());
app.use(router);

app.mount("#app");
