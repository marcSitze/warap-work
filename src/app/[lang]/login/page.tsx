import { getDictionary, LocaleType } from "@/app/dictionaries"
import LoginPage from "./login-page"

export default async function Login({
  params,
}: {
  params: Promise<{ lang: LocaleType }>
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return <LoginPage lang={lang} dictionary={dictionary} />
}

