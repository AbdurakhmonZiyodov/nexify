import PeopleIcon from "@mui/icons-material/People";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CategoryIcon from "@mui/icons-material/Category";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { DashboardTabs } from "@/store/dashboard.store";

export const MAX_SIDEBAR_WIDTH = 240;
export const MIN_SIDEBAR_WIDTH = 60;

export const dashboardTabs = [
  {
    type: DashboardTabs.USERS,
    Icon: PeopleIcon,
  },
  {
    type: DashboardTabs.POSTS,
    Icon: PostAddIcon,
  },
  {
    type: DashboardTabs.PRODUCTS,
    Icon: CategoryIcon,
  },
  {
    type: DashboardTabs.TODOS,
    Icon: PlaylistAddCheckIcon,
  },
];
