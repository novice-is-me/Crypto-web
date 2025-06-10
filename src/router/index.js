import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Market from "../pages/Market.vue";
import Watchlist from "../pages/Watchlist.vue";
import Compare from "../pages/Compare.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/market",
    name: "Market",
    component: Market,
  },
  {
    path: "/watchlist",
    name: "Watchlist",
    component: Watchlist,
  },
  {
    path: "/compare",
    name: "Compare",
    component: Compare,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
