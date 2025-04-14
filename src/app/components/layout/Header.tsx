"use client";
import { getLocalStorageItem } from "@/app/utils/local-storage";
import { Button } from "@/components/ui/button";
import { AUTH_TOKEN } from "@/constants/local-storage-keys";
import Link from "next/link";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import useLocation from "@/app/dictionaries/useLocation";
import { getDictionary } from "@/app/dictionaries";

const Header = ({ dictionary }: { dictionary: Awaited<ReturnType<typeof getDictionary>>}) => {
  const { common } = dictionary;
  const token = getLocalStorageItem(AUTH_TOKEN);
  const { localizeUrl } = useLocation()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={localizeUrl("/")} className="text-2xl mr-2 font-bold text-primary">
          Warap
        </Link>
        <div className="flex items-center gap-1">
          <Link href={localizeUrl("/post-job")}>
            <Button>{common.post_a_job}</Button>
          </Link>
          <LanguageSwitcher />
          {!token ? (
            <Link href={localizeUrl("/login")}>
              <Button variant="outline">{common.login}</Button>
            </Link>
          ) : (
            <Link href={localizeUrl("/profile")}>
              <Button variant="link">{common.profile}</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
