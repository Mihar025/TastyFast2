/* tslint:disable */
/* eslint-disable */
import { Cart } from '../models/cart';
import { GrantedAuthority } from '../models/granted-authority';
import { Role } from '../models/role';
export interface User {
  accountLocked?: boolean;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  authorities?: Array<GrantedAuthority>;
  businessType?: string;
  cart?: Cart;
  createdDate?: string;
  credentialsNonExpired?: boolean;
  dateOfBirth?: string;
  email?: string;
  enabled?: boolean;
  firstname?: string;
  fullName?: string;
  id?: number;
  lastModifiedDate?: string;
  lastname?: string;
  name?: string;
  password?: string;
  roles?: Array<Role>;
  street?: string;
  username?: string;
}
