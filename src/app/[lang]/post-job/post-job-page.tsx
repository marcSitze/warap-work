"use client";

import PostForm from "@/app/components/PostForm/PostForm";
import { getDictionary } from "@/app/dictionaries";
import { useRouter } from "next/navigation";
import { getLocalStorageItem } from "@/app/utils/local-storage";
import { AUTH_TOKEN } from "@/constants/local-storage-keys";
import { LOGIN } from "@/constants/routes";

export default function PostJobPage({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const token = getLocalStorageItem(AUTH_TOKEN);
  const router = useRouter();
  if (!token) router.push(`/${LOGIN}`);

  return (
    <div className="min-h-screen bg-background">
      <PostForm dictionary={dictionary} />
    </div>
  );
}
