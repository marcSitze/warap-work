import { getDictionary, LocaleType } from "@/app/dictionaries"
import JobDetailsPage from "./job-details-page"

export default async function JobPage({
  params,
}: {
  params: Promise<{ lang: LocaleType }>
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  return <JobDetailsPage dictionary={dictionary} />
}

