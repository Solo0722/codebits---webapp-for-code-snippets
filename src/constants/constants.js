export const LIGHTTHEME = "app_light_theme";
export const DARKTHEME = "app_dark_theme";

export const routeNames = {
  LANDING: "/",
  AUTH: "/auth",
  BLOGS: "/app",
  SNIPPETS: "/app/snippets",
  PROMPTS: "/app/prompts",
  DEBUGCODE: "/app/debug_code",
  EXPLAINCODE: "/app/explain_code",
  TRANSLATECODE: "/app/translate_code",
  OPTIMIZECODE: "/app/optimize_code",
  SETTINGS: "/app/settings",
};

export const sidebarMenu = [
  {
    name: "Blogs",
    iconName: "solar:home-2-bold",
    route: routeNames.BLOGS,
  },
  {
    name: "Snippets",
    iconName: "solar:layers-bold",
    route: routeNames.SNIPPETS,
  },
  {
    name: "Prompts",
    iconName: "solar:dialog-2-bold",
    route: routeNames.PROMPTS,
  },

  {
    name: "Code with AI",
    iconName: "solar:chat-line-bold",
    route: routeNames.DEBUGCODE,
  },
  {
    name: "Debug code",
    iconName: "solar:bug-bold",
    route: routeNames.DEBUGCODE,
  },
  {
    name: "Explain code",
    iconName: "solar:chat-line-bold",
    route: routeNames.EXPLAINCODE,
  },
  {
    name: "Optimize code",
    iconName: "solar:bolt-circle-bold",
    route: routeNames.OPTIMIZECODE,
  },
  {
    name: "Translate code",
    iconName: "solar:text-field-focus-bold",
    route: routeNames.TRANSLATECODE,
  },
  {
    name: "Settings",
    iconName: "solar:settings-bold",
    route: routeNames.SETTINGS,
  },
];

export const DEFAULT_IMAGE_URI =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export const storageKeys = {
  USER: "codebits-current-user",
  APP_THEME: "codebits-app-theme",
};
