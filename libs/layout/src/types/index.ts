import React, {
  Dispatch,
  SetStateAction,
  HTMLAttributeAnchorTarget,
  ReactNode,
} from "react";
import type { Demo } from "./demo";
import { Toast } from "primereact/toast";

export type Item = {
  label?: string;
  icon?: string;
  url: string;
  className?: string;
  iconStyle?: { color: string };
  command?: () => void;
};

export type MenuItem = {
  label?: string;
  icon?: string;
  url: string;
  className?: string;
  items?: Item[];
  iconStyle?: { color: string };
  template?: () => React.JSX.Element;
  onClick?: () => void;
};

export type ChildContainerProps = {
  children: ReactNode;
  menuModel?: MenuModel[];
  username?: string;
  options?: {
    profileUrl?: string;
    notificationUrl?: string;
    configUrl?: string;
  }
};

export interface AppTopbarRef {
  menubutton?: HTMLButtonElement | null;
  topbarmenu?: HTMLDivElement | null;
  topbarmenubutton?: HTMLButtonElement | null;
  username?: string;
}

/* Exported types */
export type MenuMode =
  | "static"
  | "overlay"
  | "horizontal"
  | "slim"
  | "slim-plus"
  | "reveal"
  | "drawer";

export type ColorScheme = "light" | "dark" | "dim";

export type MenuColorScheme = "colorScheme" | "primaryColor" | "transparent";

/* Breadcrumb Types */
export interface AppBreadcrumbProps {
  className?: string;
}

export interface Breadcrumb {
  labels?: string[];
  to?: string;
}

export interface BreadcrumbItem {
  label: string;
  to?: string;
  items?: BreadcrumbItem[];
}

/* Context Types */
export type LayoutState = {
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  profileSidebarVisible: boolean;
  overlaySubmenuActive: boolean;
  configSidebarVisible: boolean;
  staticMenuMobileActive: boolean;
  menuHoverActive: boolean;
  resetMenu: boolean;
  sidebarActive: boolean;
  notificationSidebarVisible:boolean;
  anchored: boolean;
};

export type LayoutConfig = {
  ripple: boolean;
  inputStyle: string;
  menuMode: MenuMode;
  menuTheme: MenuColorScheme;
  colorScheme: ColorScheme;
  theme: string;
  scale: number;
};

export interface LayoutContextProps {
  layoutConfig: LayoutConfig;
  setLayoutConfig: Dispatch<SetStateAction<LayoutConfig>>;
  layoutState: LayoutState;
  setLayoutState: Dispatch<SetStateAction<LayoutState>>;
  onMenuToggle: () => void;
  showConfigSidebar: () => void;
  showProfileSidebar: () => void;
  showNotificationSidebar: () => void;
  isSlim: () => boolean;
  isSlimPlus: () => boolean;
  isHorizontal: () => boolean;
  isDesktop: () => boolean;
  breadcrumbs?: Breadcrumb[];
  setBreadcrumbs: Dispatch<SetStateAction<Breadcrumb[]>>;
}

export interface MailContextProps {
  mails: Demo.Mail[];
  toastRef: React.RefObject<Toast>;
  updateMails: (data: Demo.Mail[]) => void;
  clearMailActions: (mail: Demo.Mail) => void;
  onStar: (id: number) => void;
  onArchive: (id: number) => void;
  onBookmark: (id: number) => void;
  onDelete: (id: number) => void;
  onDeleteMultiple: (mailArray: Demo.Mail[]) => void;
  onArchiveMultiple: (mailArray: Demo.Mail[]) => void;
  onSpamMultiple: (mailArray: Demo.Mail[]) => void;
  onTrash: (id: number) => void;
  onSend: (mail: Demo.Mail) => void;
}

export interface MenuContextProps {
  activeMenu: string;
  setActiveMenu: Dispatch<SetStateAction<string>>;
}

export interface ChatContextProps {
  users: Demo.User[];
  setUsers: Dispatch<SetStateAction<Demo.User[]>>;
  activeUser: Demo.User;
  setActiveUser: Dispatch<SetStateAction<Demo.User>>;
  getChatData: () => Promise<Demo.User[]>;
  changeActiveChat: (user: Demo.User) => void;
  sendMessage: (message: Demo.Message) => void;
}

export interface TaskContextProps {
  dialogConfig: Demo.DialogConfig;
  selectedTask: Demo.Task | null;
  tasks: Demo.Task[];
  members: Demo.Member[];
  setTasks: Dispatch<SetStateAction<Demo.Task[]>>;
  setMembers: Dispatch<SetStateAction<Demo.Member[]>>;
  setDialogConfig: Dispatch<SetStateAction<Demo.DialogConfig>>;
  setSelectedTask: Dispatch<SetStateAction<Demo.Task | null>>;
  getTasks: () => Promise<Demo.Task[]>;
  getMembers: () => Promise<Demo.Member[]>;
  addTask: (task: Demo.Task) => void;
  editTask: (task: Demo.Task) => void;
  removeTask: (id: number) => void;
  onTaskSelect: (task: Demo.Task) => void;
  markAsCompleted: (task: Demo.Task) => void;
  showDialog: (header: string, newTask: boolean) => void;
  closeDialog: () => void;
}

/* AppConfig Types */
export interface AppConfigProps {
  minimal?: boolean;
}

export interface MenuProps {
  model: MenuModel[];
}

export interface MenuModel {
  label: string;
  icon?: string;
  items?: MenuModel[];
  permission?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | undefined;
  to?: string;
  url?: string;
  target?: HTMLAttributeAnchorTarget;
  seperator?: boolean;
}

export interface UseSubmenuOverlayPositionProps {
  target: HTMLElement | null;
  overlay: HTMLElement | null;
  container: HTMLElement | null;
  when?: any;
}

type CommandProps = {
  originalEvent: React.MouseEvent<HTMLAnchorElement, MouseEvent>;
  item: AppMenuItem;
};

export interface AppMenuItem extends MenuModel {
  items?: AppMenuItem[];
  badge?: "updated" | "new";
  badgeClass?: string;
  class?: string;
  preventExact?: boolean;
  visible?: boolean;
  disabled?: boolean;
  replaceUrl?: boolean;
  command?: ({ originalEvent, item }: CommandProps) => void;
}

export interface AppMenuItemProps {
  item?: AppMenuItem;
  parentKey?: string;
  index?: number;
  root?: boolean;
  className?: string;
}
