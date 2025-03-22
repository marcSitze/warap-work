/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { useGetServiceCategories, useGetServicesRequestsList } from "./api/hooks/queries";
import { ServiceRequest } from "./types/services";

export default function LandingPage() {
  const { data } = useGetServicesRequestsList();
  const { data: categories } = useGetServiceCategories();
  console.log("data: ", data?.requests);
  console.log("categories: ", categories);

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Find the perfect small job</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse through our listings of small jobs and gigs in your area or post your own job offer.
          </p>
        </div>

        <div className="bg-card rounded-lg shadow-sm p-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search jobs..." className="pl-10" />
            </div>
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories?.map(category => <SelectItem key={category?.uuid} value={category?.uuid}>{category["en_name"]}</SelectItem>)}
                  {/* <SelectItem value="gardening">Gardening</SelectItem>
                  <SelectItem value="home-improvement">Home Improvement</SelectItem>
                  <SelectItem value="pet-care">Pet Care</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="moving">Moving</SelectItem>
                  <SelectItem value="education">Education</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="brooklyn">Brooklyn, NY</SelectItem>
                  <SelectItem value="queens">Queens, NY</SelectItem>
                  <SelectItem value="manhattan">Manhattan, NY</SelectItem>
                  <SelectItem value="bronx">Bronx, NY</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full mt-4">Search Jobs</Button>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Job Offers</h2>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="highest-pay">Highest Pay</SelectItem>
              <SelectItem value="lowest-pay">Lowest Pay</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.requests?.map((job) => (
            <JobCard key={job?.uuid} job={job} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg">
            Load More Jobs
          </Button>
        </div>
      </section>
    </main>
  )
}

function JobCard({ job }: {job: ServiceRequest}) {
  return (
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
            <span className="text-sm">{job?.created_at}</span>
          </div>
          <div className="font-medium text-primary">{job?.fixed_amount}</div>
        </div>

        <p className="text-muted-foreground mb-4 line-clamp-2">{job?.description}</p>

        <div className="flex items-center justify-between">
          {/* <Badge variant="outline" className="bg-primary/10">
            <Briefcase className="h-3 w-3 mr-1" />
            {job.category}
          </Badge> */}
          <Link href={`/jobs/${job.uuid}`}>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

