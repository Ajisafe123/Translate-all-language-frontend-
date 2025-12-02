import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "@/components/auth/LoginForm.vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";
import Translate from "@/pages/Translate.vue";
import History from "@/pages/History.vue";
import Profile from "@/pages/Profile.vue";
import Settings from "@/pages/Settings.vue";
import ForgottenPasswordAndResetPasswordPage from "./components/ForgottenPasswordAndResetPasswordPage.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginForm,
    meta: { requiresGuest: true },
  },
  {
    path: "/signup",
    name: "Signup",
    component: RegisterForm,
    meta: { requiresGuest: true },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgottenPasswordAndResetPasswordPage,
    meta: { requiresGuest: true },
  },
  {
    path: "/translate",
    name: "Translate",
    component: Translate,
    meta: { requiresAuth: true },
  },
  {
    path: "/history",
    name: "History",
    component: History,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    redirect: "/translate",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("currentUser");

  // If route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  }
  // If route requires guest (not authenticated) - redirect authenticated users to translate
  else if (to.meta.requiresGuest && isAuthenticated) {
    next("/translate");
  }
  // Allow all other routes
  else {
    next();
  }
});

export default router;
