export const LIGHTTHEME = "app_light_theme";
export const DARKTHEME = "app_dark_theme";

export const routeNames = {
  DASHBOARD: "/app",
  TOOLS: "/app/tools",
  COMMUNITIES: "/app/settings",
  SETTINGS: "/app/settings",
  MYSNIPPETS: "/app/mysnippets",
};

export const sidebarMenu = [
  {
    name: "Blogs",
    iconName: "solar:home-2-bold",
    route: routeNames.DASHBOARD,
  },
  {
    name: "Snippets",
    iconName: "solar:layers-bold",
    route: routeNames.MYSNIPPETS,
  },
  {
    name: "Prompts",
    iconName: "solar:dialog-2-bold",
    route: routeNames.COMMUNITIES,
  },

  {
    name: "Debug code",
    iconName: "solar:bug-bold",
    route: routeNames.COMMUNITIES,
  },
  {
    name: "Explain code",
    iconName: "solar:chat-line-bold",
    route: routeNames.COMMUNITIES,
  },
  {
    name: "Optimize code",
    iconName: "solar:bolt-circle-bold",
    route: routeNames.COMMUNITIES,
  },
  {
    name: "Translate code",
    iconName: "solar:text-field-focus-bold",
    route: routeNames.COMMUNITIES,
  },
  {
    name: "Settings",
    iconName: "solar:settings-bold",
    route: routeNames.SETTINGS,
  },
];
