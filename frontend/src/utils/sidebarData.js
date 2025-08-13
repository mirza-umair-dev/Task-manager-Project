// components/SidebarData.js
import { FaTachometerAlt, FaTasks, FaPlusSquare, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiFileAddLine } from "react-icons/ri";
import { BiTask } from "react-icons/bi";
import { LuUsers } from "react-icons/lu";
import { MdOutlineLogout } from "react-icons/md";
export const sidebarItems = [
  {
    title: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    title: "Manage Tasks",
    icon: BiTask,
    path: "/admin/manage-tasks",
  },
  {
    title: "Create Task",
    icon: RiFileAddLine,
    path: "/admin/create-task",
  },
  {
    title: "Team Members",
    icon: LuUsers ,
    path: "/admin/manage-users",
  },
  {
    title: "Logout",
    icon: MdOutlineLogout ,
    action:'logout'
  },
];
