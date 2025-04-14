"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n, type Locale } from "../../../i18n-config";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div>
      <ul className="flex">
        {i18n.locales.map((locale, idx) => {
          return (
            <li key={locale}>
              <Link className="pr-2 pl-2" href={redirectedPathname(locale)}>{locale.toUpperCase()}</Link>{idx === 0 && "|"}
            </li>
          );
        })}
      </ul>
    </div>
  );
}