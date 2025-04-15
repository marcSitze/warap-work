"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, MapPin, Search } from "lucide-react";
import Link from "next/link";
import {
  useGetServiceCategories,
  useGetServicesRequestsList,
} from "../api/hooks/queries";
import { ServiceRequest } from "../types/services";
import { useState } from "react";
import { getDictionary, LocaleType } from "../dictionaries";
import useLocation from "../dictionaries/useLocation";
import moment from "moment";
import formatAmount from "../utils/formatAmount";
import { Pagination } from "../components/Pagination/Pagination";

export default function LandingPage({
  dictionary,
}: {
  lang: LocaleType;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const [page, setPage] = useState(1);
  const { data } = useGetServicesRequestsList({ page });
  const { data: categories } = useGetServiceCategories();
  const [searchText, setSearchText] = useState("");
  const { common, home } = dictionary;

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{home.hero}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {home.subtitle}
          </p>
        </div>

        <div className="bg-card rounded-lg shadow-sm p-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={`${common.search_jobs}...`}
                className="pl-10"
              />
            </div>
            <div className="w-full">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={common.category} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {dictionary.common.all_categories}
                  </SelectItem>
                  {categories?.map((category) => (
                    <SelectItem key={category?.uuid} value={category?.uuid}>
                      {category["en_name"]}
                    </SelectItem>
                  ))}
                  {/* <SelectItem value="gardening">Gardening</SelectItem>
                  <SelectItem value="home-improvement">Home Improvement</SelectItem>
                  <SelectItem value="pet-care">Pet Care</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="moving">Moving</SelectItem>
                  <SelectItem value="education">Education</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{common.all_locations}</SelectItem>
                  <SelectItem value="brooklyn">Brooklyn, NY</SelectItem>
                  <SelectItem value="queens">Queens, NY</SelectItem>
                  <SelectItem value="manhattan">Manhattan, NY</SelectItem>
                  <SelectItem value="bronx">Bronx, NY</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full mt-4">{common.search_jobs}</Button>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{home.latest_job_offers}s</h2>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">{common.newest_first}</SelectItem>
              <SelectItem value="oldest">{common.oldest_first}</SelectItem>
              <SelectItem value="highest-pay">{common.highest_pay}</SelectItem>
              <SelectItem value="lowest-pay">{common.lowest_pay}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.requests
            ?.filter((item) => item.title.toLowerCase().includes(searchText))
            .map((job) => (
              <JobCard key={job?.uuid} job={job} />
            ))}
        </div>

        {/* {data?.more && (
          <div className="mt-8 text-center">
            <Button
              onClick={() => setPage(page + 1)}
              variant="outline"
              size="lg"
            >
              {common.load_more_jobs}
            </Button>
          </div>
        )} */}
        <Pagination
          page={page}
          onPageChange={(page: number) => setPage(page)}
          total={data?.total || 0}
          hasMore={data?.more || false}
        />
      </section>
    </main>
  );
}

function JobCard({ job }: { job: ServiceRequest }) {
  const { localizeUrl } = useLocation();

  return (
    <Link href={localizeUrl(`/jobs/${job.uuid}`)}>
      <div className="bg-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            {/* <Badge
            variant={
              job.type === "One-time"
                ? "default"
                : job.type === "Recurring"
                  ? "secondary"
                  : job.type === "Part-time"
                    ? "outline"
                    : "destructive"
            }
          >
            {job.type}
          </Badge> */}
          </div>

          <div className="flex items-center text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{job?.district}</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">
                {moment(job?.created_at).fromNow()}
              </span>
            </div>
            <div className="font-medium text-primary">
              {formatAmount(job?.fixed_amount)}
            </div>
          </div>

          <p className="text-muted-foreground mb-4 line-clamp-2">
            {job?.description}
          </p>

          <div className="flex items-center justify-between">
            {/* <Badge variant="outline" className="bg-primary/10">
            <Briefcase className="h-3 w-3 mr-1" />
            {job.category}
          </Badge> */}
            {/* <Link href={`/jobs/${job.uuid}`}> */}
            <Button variant="outline" size="sm">
              View Details
            </Button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </Link>
  );
}
