import { getDictionary, LocaleType } from "@/app/dictionaries";
import ProfilePage from "./profile-page";

export default async function Profile({
  params,
}: {
  params: Promise<{ lang: LocaleType }>
}) {
  console.log("params: ", await params)
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  return <ProfilePage lang={lang} dictionary={dictionary.products} />
}

