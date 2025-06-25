import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
// Importing the main CSS file for Tailwind CSS
import "./assets/main.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { createPinia } from "pinia";
import Primevue from "primevue/config";

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.use(Primevue);
app.mount("#app");
