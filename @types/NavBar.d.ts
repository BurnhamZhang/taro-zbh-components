import { ComponentClass } from "react";

export interface NavBarProps {
  extClass?: string;
  title?: string;
  background?: string;
  color?: string;
  back?: 'auto'| true |false ; // 
  loading?: boolean;
  animated?: boolean;
  show?: boolean;
  delta?: number;
  displayStyle?: string;
  isNative?: boolean;
  renderRight?: () => any;
  renderLeft?: () => any;
}

declare const NavBar: ComponentClass<NavBarProps>;

export default NavBar;
