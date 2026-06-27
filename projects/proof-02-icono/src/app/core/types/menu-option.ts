export interface MenuOption {
  label: string;
  path?: string;
  children?: MenuChild[];
  visible: boolean;
}
export interface MenuChild {
  label: string;
  path: string;
  separado?: boolean;
  visible: boolean;
}
