import { Roles } from "../roles.interface";
import {UserInterface} from "./user.interface"
export class User implements UserInterface {
    email: string;
    photoURL: string;
    roles: Roles;
  
    constructor(authData) {
      this.email    = authData.email
      this.photoURL = authData.photoURL
      this.roles    = { reader: true }
    }
    
  }