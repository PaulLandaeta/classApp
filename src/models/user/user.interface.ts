import { Roles } from "../roles.interface";

export interface UserInterface {
  email:    string;
  photoURL: string;
  roles:    Roles;
}