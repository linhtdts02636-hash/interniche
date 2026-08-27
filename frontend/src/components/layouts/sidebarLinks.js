import {
  ChatDots,
  ChatDotsFill,
  Gear,
  GearFill,
  Bell,
  BellFill,
  HouseDoor,
  HouseDoorFill,
} from "react-bootstrap-icons";

const sidebarLinks = [
  { to: "/home", icon: HouseDoor, activeIcon: HouseDoorFill, text: "Home" },
  { to: "/notification", icon: Bell, activeIcon: BellFill, text: "Notifications" },
  { to: "/direct", icon: ChatDots, activeIcon: ChatDotsFill, text: "Direct messages" },
  { to: "/setting", icon: Gear, activeIcon: GearFill, text: "Settings" },
];

export default sidebarLinks;