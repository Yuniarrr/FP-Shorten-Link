import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
      children: [
        {
          path: "",
          name: "dashboardhome",
          component: () => import("../components/dashboard/Home.vue"),
        },
        {
          path: "links",
          name: "links",
          component: () => import("../components/dashboard/Links.vue"),
          children: [
            {
              path: "",
              name: "linksHome",
              component: () => import("../components/dashboard/ListLink.vue"),
            },
            {
              path: ":id",
              name: "detailLink",
              component: () => import("../components/dashboard/DetailLink.vue"),
            },
          ],
        },
        {
          path: "settings",
          name: "settings",
          component: () => import("../components/dashboard/Settings.vue"),
        },
        {
          path: "profile",
          name: "profile",
          component: () => import("../components/dashboard/Profile.vue"),
        },
      ],
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/:pathLink([a-zA-Z0-9]{5,40}$)",
      name: "redirect",
      component: () => import("../views/RedirectView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

export default router;
