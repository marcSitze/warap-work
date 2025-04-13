import { JobPostItem } from "@/app/components/job-post-item";
import PostForm from "@/app/components/PostForm/PostForm";
import { getDictionary } from "@/app/dictionaries";
import { BaseService } from "@/app/types/services";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const JobRequestTab = ({
  servicesRequests,
  dictionary,
}: {
  servicesRequests: BaseService[];
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) => {
  const [showForm, setShowForm] = useState(false);
  const [jobPosts, setJobPosts] =
    useState<Partial<BaseService>[]>(servicesRequests);
  const { common } = dictionary;

  const handleEditJob = (editedJob: Partial<BaseService>) => {
    setJobPosts(
      servicesRequests.map((job) =>
        job.uuid === editedJob.uuid ? editedJob : job
      )
    );
  };

  const handleDeleteJob = (jobId: string) => {
    setJobPosts(jobPosts?.filter((job) => job.uuid !== jobId));
  };

  return (
    <div className="space-y-6">
      {showForm ? (
        <PostForm dictionary={dictionary} onClose={() => setShowForm(false)} />
      ) : (
        <>
          <div className="flex justify-end">
            <Button onClick={() => setShowForm(true)}>
              {common.create_new_job}
            </Button>
          </div>
          {servicesRequests.map((job) => (
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

export default JobRequestTab;
