"use client";

import { useGetServiceRequest } from "@/app/api/hooks/queries";
import JobDetailsPageSkeleton from "@/app/components/JobDetailsPage/JobDetailsPageSkeleton";
import { getDictionary } from "@/app/dictionaries";
import useLocation from "@/app/dictionaries/useLocation";
import formatAmount from "@/app/utils/formatAmount";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle,
  CircleAlert,
  Clock,
  Copy,
  MapPin,
  Share2
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import whatsappIcon from "../../../../../public/whatsapp.png";
import { toast } from 'react-toastify';

// Extended mock data for a single job with more details
// const jobDetails = {
//   id: 1,
//   title: "Garden Maintenance",
//   location: "Brooklyn, NY",
//   rate: "$25/hr",
//   category: "Gardening",
//   description:
//     "Looking for someone to help with regular garden maintenance including mowing, weeding, and pruning. The garden is approximately 500 sq ft and requires attention every two weeks. All tools and equipment will be provided, but you're welcome to bring your own if preferred.",
//   postedTime: "2 hours ago",
//   type: "Part-time",
//   duration: "3 months",
//   schedule: "Weekends, 4-5 hours per session",
//   requirements: [
//     "Previous gardening experience",
//     "Knowledge of plant care and maintenance",
//     "Ability to work outdoors in various weather conditions",
//     "Reliable transportation to the location",
//   ],
//   responsibilities: [
//     "Lawn mowing and edging",
//     "Weeding flower beds and garden areas",
//     "Pruning shrubs and small trees",
//     "Planting seasonal flowers and plants",
//     "General garden cleanup and maintenance",
//   ],
//   poster: {
//     name: "Sarah Johnson",
//     rating: 4.8,
//     jobsPosted: 12,
//     memberSince: "March 2022",
//     responseRate: "95%",
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
//   applications: 5,
//   views: 27,
// }

export default function JobDetailsPage({ dictionary }: { dictionary: Awaited<ReturnType<typeof getDictionary>>; }) {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { lang } = useLocation()
  const { data: job, isLoading } = useGetServiceRequest(id);
  const { common, jobDetails } = dictionary
  const messageTemplate = {
    "en": `Hello, I am interested in the job titled "${job?.title}" posted by ${job?.user?.first_name} at https://warap-work.vercel.app/en/jobs/${job?.uuid}. Could you please provide more details?`,
    "fr": `Bonjour, je suis intéressé par le poste intitulé "${job?.title}" publié par ${job?.user?.first_name} sur le site https://warap-work.vercel.app/fr/jobs/${job?.uuid}. Pourriez-vous me donner plus de détails ?`,
  }

  const jobLink = `https://warap-work.vercel.app/${lang}/jobs/${job?.uuid}`;
  const handleJobLinkToClipboard = (link: string) => {
    navigator.clipboard.writeText(link)
      .then(() => {
        toast.info(common.copied_to_clipboard, { position: "bottom-center" });
      })
      .catch(() => {
        toast.error(common.copy_failed, { position: "bottom-center" });
      });
  }
  // In a real application, you would fetch the job details based on the ID
  // const { id } = params
  // const [job, setJob] = useState(null)
  // useEffect(() => { fetch job data here }, [id])

  // const job = jobDetails // Using mock data for now

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 pl-0"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {common.back_to_jobs}
        </Button>

        {isLoading ? <JobDetailsPageSkeleton /> : <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main job details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">
                      {job?.title}
                    </CardTitle>
                    <CardDescription className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job?.district}, {job?.city}
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-1" />
                      {common.posted} {moment(job?.created_at).fromNow()}
                    </CardDescription>
                  </div>
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
                    className="text-sm"
                  >
                    {job.type}
                  </Badge> */}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-sm">{common.rate}</span>
                    <span className="font-medium flex items-center">
                      {/* <DollarSign className="h-4 w-4 mr-1 text-primary" /> */}
                      {formatAmount(Number(job?.fixed_amount))}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-sm">
                      {common.duration}
                    </span>
                    <span className="font-medium flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-primary" />
                      {job?.duration} {common.hours}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-sm">
                      {common.category}
                    </span>
                    <span className="font-medium flex items-center">
                      <Briefcase className="h-4 w-4 mr-1 text-primary" />
                      {/* {job.category} */}
                    </span>
                  </div>
                  {/* <div className="flex flex-col">
                    <span className="text-muted-foreground text-sm">
                      Schedule
                    </span>
                    <span className="font-medium flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-primary" />
                      {job.schedule}
                    </span>
                  </div> */}
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">{common.description}</h3>
                  <ReactMarkdown>{job?.description}</ReactMarkdown>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Responsibilities</h3>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    {/* {job.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))} */}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Requirements</h3>
                  {/* <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    {job.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul> */}
                </div>
              </CardContent>

              <CardFooter className="flex justify-between border-t pt-6">
                <div className="flex gap-2">
                  {/* <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    {common.share}
                  </Button> */}
                  <DropdownMenu dir="ltr">
                    <DropdownMenuTrigger><Share2 className="h-4 w-4 mr-2" /></DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-1 flex flex-col items-center">
                      {/* <DropdownMenuLabel><Copy /></DropdownMenuLabel>
                      <DropdownMenuSeparator /> */}
                      <DropdownMenuItem onClick={() => handleJobLinkToClipboard(jobLink)}><Copy /></DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleJobLinkToClipboard(messageTemplate[lang])}><Image src={whatsappIcon} alt="whatsapp" width={26} height={26} /></DropdownMenuItem>
                      {/* <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuItem>Subscription</DropdownMenuItem> */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {/* <Button variant="outline" size="sm">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button> */}
                </div>
                {/* <div className="text-sm text-muted-foreground">
                  <span className="mr-3">{job.views} views</span>
                  <span>{job.applications} applications</span>
                </div> */}
              </CardFooter>
            </Card>
          </div>

          {/* Sidebar with application and poster info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{jobDetails.apply_for_this_job}</CardTitle>
                <CardDescription>
                  {jobDetails.send_your_application_directly}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col">
                {/* <Button className="w-full">Apply Now</Button> */}
                <Link target="_blank" href={`https://wa.me/237${job?.socials?.whatsapp}&text=${messageTemplate[lang]}`}>
                  <Image src={whatsappIcon} alt="whatsapp" width={80} height={100} />
                </Link>
                {/* <p className="text-sm text-muted-foreground mt-4 text-center">
                  or
                </p>
                <Button variant="outline" className="w-full mt-2">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message Poster
                </Button> */}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{jobDetails.about_the_job_poster}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  {/* <Avatar>
                    <AvatarImage src={job.poster.avatar} alt={job.poster.name} />
                    <AvatarFallback>{job.poster.name.charAt(0)}</AvatarFallback>
                  </Avatar> */}
                  <div>
                    <h3 className="font-medium">{job?.user?.first_name}</h3>
                    {/* <p className="text-sm text-muted-foreground">Member since {job?.user?.created_at}</p> */}
                  </div>
                </div>

                {/* <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-medium flex items-center">
                      {job.poster.rating}
                      <span className="text-yellow-500 ml-1">★★★★★</span>
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Jobs Posted</span>
                    <span className="font-medium">{job.poster.jobsPosted}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Response Rate</span>
                    <span className="font-medium">{job.poster.responseRate}</span>
                  </div>
                </div> */}

                <Separator className="my-4" />

                <div className="space-y-2">
                  {job?.user?.is_verified ? (
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">
                          {common.verified_identity}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {common.id_has_been_verified}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2">
                      <CircleAlert className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">
                          {common.not_verified}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {common.id_has_not_been_verified}
                        </p>
                      </div>
                    </div>
                  )}
                  {/* <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Payment Method</h4>
                      <p className="text-xs text-muted-foreground">
                        Payment method verified
                      </p>
                    </div>
                  </div> */}
                  {/* <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Phone Number</h4>
                      <p className="text-xs text-muted-foreground">
                        Not yet verified
                      </p>
                    </div>
                  </div> */}
                </div>
              </CardContent>
            </Card>

            {/* <Card>
              <CardHeader>
                <CardTitle>Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <SimilarJobItem title="Lawn Mowing Service" location="Brooklyn, NY" rate="$30/hr" />
                <SimilarJobItem title="Plant Watering" location="Manhattan, NY" rate="$20/hr" />
                <SimilarJobItem title="Hedge Trimming" location="Queens, NY" rate="$35/hr" />
                <Button variant="outline" className="w-full mt-2">
                  View More
                </Button>
              </CardContent>
            </Card> */}
          </div>
        </div>}
      </main>
    </div>
  );
}

// function SimilarJobItem({ title, location, rate }: any) {
//   return (
//     <div className="border-b pb-3 last:border-0">
//       <h4 className="font-medium">{title}</h4>
//       <div className="flex justify-between text-sm text-muted-foreground">
//         <span className="flex items-center">
//           <MapPin className="h-3 w-3 mr-1" />
//           {location}
//         </span>
//         <span>{rate}</span>
//       </div>
//     </div>
//   )
// }
