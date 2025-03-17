export type UserDTO = {
  first_name: string;
  last_name: string;
  email: string;
  phone?:string;
  city?:	string;
  district?:	string;
  password:	string;
  confirm_password:	string;
  }

export type User = {
  uuid?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?:string;
  city?:	string;
  district?:	string;
  last_login?:	string;
  is_verified:	string;
  created_at?:	string;
  updated_at?:	string;
}
