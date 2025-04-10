import { AUTH_TOKEN } from "@/constants/local-storage-keys"
import { jwtDecode } from "jwt-decode"
import { getLocalStorageItem } from "./local-storage"

const token = getLocalStorageItem(AUTH_TOKEN) || ""
console.log({ token })

type TokenUser = {
  user_id: string,
  username: string,
  exp: number,
  email: string,
  orig_iat: number,
  phone: string
}
const getDecodedToken = () => {
  if (!token) return undefined;
  const decoded = jwtDecode<Partial<TokenUser>>(token);
  if (!decoded) return undefined;
  return decoded;
}

export default getDecodedToken