import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
import Login from "../components/login.vue";
import Home from "../components/home.vue";
import Profile from "../components/profile.vue";
import TechnicalQuestion from "../components/technical-question.vue";
import PersonalQuestion from "../components/personal-question.vue";
import ResponseEvalaute from "../components/response-evalaute.vue";
const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { hideNavigation: true }
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile
  },
  {
    path: "/technical-question/:type/:id",
    name: "technical",
    component: TechnicalQuestion
  },
  {
    path: "/personal-question/:type/:id",
    name: "personal",
    params: "type/id",
    component: PersonalQuestion
  },
  {
    path: "/response-evalaute",
    name: "response",
    component: ResponseEvalaute
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
