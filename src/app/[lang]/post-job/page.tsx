"use client";
import { useRouter } from "next/navigation";
import PostJobPage from "./post-job-page"
import { getLocalStorageItem } from "@/app/utils/local-storage";
import { AUTH_TOKEN } from "@/constants/local-storage-keys";
import { LOGIN } from "@/constants/routes";

export default function PostJob() {
  const token = getLocalStorageItem(AUTH_TOKEN);
  const router = useRouter();
    if (!token) return router.push(`/${LOGIN}`);

  return <PostJobPage />;
}