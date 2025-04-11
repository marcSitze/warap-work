"use client";
import { getLocalStorageItem } from "@/app/utils/local-storage";
import { Button } from "@/components/ui/button";
import { AUTH_TOKEN } from "@/constants/local-storage-keys";
import Link from "next/link";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import useLocation from "@/app/dictionaries/useLocation";

const Header = () => {
  const token = getLocalStorageItem(AUTH_TOKEN);
  const { localizeUrl } = useLocation()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={localizeUrl("/")} className="text-2xl font-bold text-primary">
          Warap
        </Link>
        <div className="flex items-center gap-4">
          <Link href={localizeUrl("/post-job")}>
            <Button>Post a Job</Button>
          </Link>
          <LanguageSwitcher />
          {!token ? (
            <Link href={localizeUrl("/login")}>
              <Button variant="outline">Login</Button>
            </Link>
          ) : (
            <Link href={localizeUrl("/profile")}>
              <Button variant="link">Profile</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
