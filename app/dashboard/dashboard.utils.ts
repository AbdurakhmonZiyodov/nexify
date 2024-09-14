import { MAX_SIDEBAR_WIDTH, MIN_SIDEBAR_WIDTH } from "./dashboard.constants";

export function getSidebarWidth(isOpen: boolean): number {
  return isOpen ? MAX_SIDEBAR_WIDTH : MIN_SIDEBAR_WIDTH;
}
