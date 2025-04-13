"use client";

import { type getDictionary, LocaleType } from "@/app/dictionaries";
import useLocation from "@/app/dictionaries/useLocation";
import { setLocalStorageItem } from "@/app/utils/local-storage";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AUTH_TOKEN } from "@/constants/local-storage-keys";
import { LOGIN } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { useGetCurrentUser, useGetUserProfile } from "../../api/hooks/queries";
import getDecodedToken from "../../utils/getDecodedToken";
import ProfileTabs from "./ProfileTabs";

export default function ProfilePage({ dictionary }: { lang: LocaleType, dictionary: Awaited<ReturnType<typeof getDictionary>>; }) {
  const decodedUser = getDecodedToken();
  const router = useRouter();
  const { data: currentUser } = useGetCurrentUser();
  const { data } = useGetUserProfile(decodedUser?.user_id || "");
  const { localizeUrl } = useLocation()
  const { profile, common } = dictionary;

  // if(!decodedUser) return router.push(`/${LOGIN}`)

  const handleLogout = () => {
    setLocalStorageItem(AUTH_TOKEN, "");
    router.push(localizeUrl(`/${LOGIN}`))
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>{common.profile}</CardTitle>
                <CardDescription>{profile.manage_your_account}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4">
                  {/* <AvatarImage src={data.avatar} alt={user.name} /> */}
                  <AvatarFallback>{data?.first_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold mb-2">{data?.first_name}</h2>
                <p className="text-muted-foreground mb-4">{data?.email}</p>
                <div className="text-sm text-muted-foreground">
                  <p>{common.member_since}: {data?.created_at}</p>
                  <p>{common.jobs_posted}: {(currentUser?.requests || []).length}</p>
                  {/* <p>Rating: {data?.rating}/5</p> */}
                </div>
                <Button className="mt-4">{common.edit_profile}</Button>
                <Button onClick={handleLogout} className="mt-4" variant={"outline"}>{common.logout}</Button>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{profile.your_job_posts}</h2>
              {/* <Link href={localizeUrl("/post-job")}>
                <Button>{common.create_new_job}</Button>
              </Link> */}
            </div>
            <ProfileTabs dictionary={dictionary} />
          </div>
        </div>
      </main>
    </div>
  );
}
