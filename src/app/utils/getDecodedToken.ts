import { AUTH_TOKEN } from "@/constants/local-storage-keys"
import { jwtDecode } from "jwt-decode"
import { getLocalStorageItem } from "./local-storage"

const token = getLocalStorageItem(AUTH_TOKEN) || ""

type TokenUser = {
  user_id: string,
  username: string,
  exp: number,
  email: string,
  orig_iat: number,
  phone: string
}
const getDecodedToken = () => {
  const decoded = jwtDecode<Partial<TokenUser>>(token);

  return decoded;
}

export default getDecodedToken