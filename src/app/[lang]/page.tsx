import { getDictionary, LocaleType } from "@/app/dictionaries";
import HomePage from "./home-page";

export default async function Profile({
  params,
}: {
  params: Promise<{ lang: LocaleType }>
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  return <HomePage lang={lang} dictionary={dictionary} />
}