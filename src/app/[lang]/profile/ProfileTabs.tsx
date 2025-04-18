import { useGetCurrentUser } from "@/app/api/hooks/queries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobProposalsTab from "./JobProposalsTab";
import JobRequestTab from "./JobRequestTab";
import { getDictionary } from "@/app/dictionaries";

const ProfileTabs = ({ dictionary }: { dictionary: Awaited<ReturnType<typeof getDictionary>>; }) => {
  const { data: currentUser, isLoading } = useGetCurrentUser();
  const { common } = dictionary

  return (
    <Tabs defaultValue="requests">
      <TabsList>
        <TabsTrigger value="requests">{common.service_requests}</TabsTrigger>
        <TabsTrigger value="proposals">{common.service_proposals}</TabsTrigger>
      </TabsList>
      <TabsContent value="requests">
        <JobRequestTab dictionary={dictionary} isLoading={isLoading} servicesRequests={currentUser?.requests || []} />
      </TabsContent>
      <TabsContent value="proposals">
        <JobProposalsTab dictionary={dictionary} isLoading={isLoading} servicesProposals={currentUser?.proposals || []} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
