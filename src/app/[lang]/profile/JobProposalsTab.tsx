import { JobPostItem } from "@/app/components/job-post-item";
import { getDictionary } from "@/app/dictionaries";
import { BaseService } from "@/app/types/services";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ProposalForm from "./ProposalForm";

const JobProposalsTab = ({
  servicesProposals,
  dictionary,
}: {
  servicesProposals: BaseService[];
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) => {
  const [showForm, setShowForm] = useState(false);
  const [jobPosts, setJobPosts] =
    useState<Partial<BaseService>[]>(servicesProposals);
  const { common } = dictionary;

  const handleEditJob = (editedJob: Partial<BaseService>) => {
    setJobPosts(
      servicesProposals.map((job) =>
        job?.uuid === editedJob?.uuid ? editedJob : job
      )
    );
  };

  const handleDeleteJob = (jobId: string) => {
    setJobPosts(jobPosts?.filter((job) => job?.uuid !== jobId));
  };

  return (
    <div className="space-y-6">
      {showForm ? (
        <ProposalForm onClose={() => setShowForm(false)} />
      ) : (
        <>
          <div className="flex justify-end">
            <Button onClick={() => setShowForm(true)}>
              {common.create_new_proposal}
            </Button>
          </div>
          {servicesProposals.map((job) => (
            <JobPostItem
              key={job.uuid}
              job={job}
              onEdit={handleEditJob}
              onDelete={handleDeleteJob}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default JobProposalsTab;
