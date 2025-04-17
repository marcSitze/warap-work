import { getDictionary, LocaleType } from "@/app/dictionaries"
import SignupPage from "./signup-page"

export default async function Signup({
  params,
}: {
  params: Promise<{ lang: LocaleType }>
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  return <SignupPage dictionary={dictionary} />
}

