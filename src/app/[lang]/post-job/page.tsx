// "use client";
import { getDictionary, LocaleType } from "@/app/dictionaries";
import PostJobPage from "./post-job-page";

export default async function PostJob({
  params,
}: {
  params: Promise<{ lang: LocaleType }>
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  // const token = getLocalStorageItem(AUTH_TOKEN);
  // const router = useRouter();
    // if (!token) return router.push(`/${LOGIN}`);

  return <PostJobPage dictionary={dictionary} />;
}