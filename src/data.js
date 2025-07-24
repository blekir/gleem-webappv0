import { CreateOutlined, CollectionsOutlined } from "@mui/icons-material";
import create from "./assets/icons/create.svg";
import orders from "./assets/icons/orders.svg";
import settings from "./assets/icons/settings.svg";

export const APP_VERSION = "1.0.00";
export const SIDEBAR_MENU_ITEMS = [
  {
    name: "Create image",
    url: "create",
    icon: <img src={create} alt="create" style={{ width: 24, height: 24 }} />,
  },
  {
    name: "My orders",
    url: "orders",
    icon: <img src={orders} alt="create" style={{ width: 24, height: 24 }} />,
  },
  // {
  //   name: "Settings",
  //   url: "settings",
  //   icon: <img src={settings} alt="create" style={{ width: 24, height: 24 }} />,
  // },
];
