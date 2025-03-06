/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Clock, Briefcase } from "lucide-react"
import Link from "next/link"

// Mock data for job offers
const jobOffers = [
  {
    id: 1,
    title: "Garden Maintenance",
    location: "Brooklyn, NY",
    rate: "$25/hr",
    category: "Gardening",
    description: "Looking for someone to help with regular garden maintenance including mowing, weeding, and pruning.",
    postedTime: "2 hours ago",
    type: "Part-time",
  },
  {
    id: 2,
    title: "House Painting",
    location: "Queens, NY",
    rate: "$200/day",
    category: "Home Improvement",
    description: "Need an experienced painter to paint the interior of a 2-bedroom apartment. Materials provided.",
    postedTime: "5 hours ago",
    type: "One-time",
  },
  {
    id: 3,
    title: "Dog Walking",
    location: "Manhattan, NY",
    rate: "$15/hr",
    category: "Pet Care",
    description: "Looking for a reliable dog walker for my golden retriever, 3 times a week.",
    postedTime: "1 day ago",
    type: "Recurring",
  },
  {
    id: 4,
    title: "Website Development",
    location: "Remote",
    rate: "$40/hr",
    category: "Technology",
    description: "Need a developer to create a simple portfolio website. Experience with React required.",
    postedTime: "2 days ago",
    type: "Project-based",
  },
  {
    id: 5,
    title: "Moving Assistance",
    location: "Bronx, NY",
    rate: "$150/day",
    category: "Moving",
    description: "Need help moving from a 1-bedroom apartment to a new location. Heavy lifting required.",
    postedTime: "3 days ago",
    type: "One-time",
  },
  {
    id: 6,
    title: "Tutoring in Mathematics",
    location: "Online",
    rate: "$30/hr",
    category: "Education",
    description: "Looking for a tutor to help my high school student with advanced algebra and calculus.",
    postedTime: "4 days ago",
    type: "Recurring",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Warap
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/post-job">
              <Button>Post a Job</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </div>
        </div>
      </header>

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
                    <SelectItem value="gardening">Gardening</SelectItem>
                    <SelectItem value="home-improvement">Home Improvement</SelectItem>
                    <SelectItem value="pet-care">Pet Care</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="moving">Moving</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
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
            {jobOffers.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" size="lg">
              Load More Jobs
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-muted mt-16 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Warap</h3>
              <p className="text-muted-foreground">
                Connecting people with small jobs and those looking to earn extra income.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Newsletter</h3>
              <p className="text-muted-foreground mb-4">
                Subscribe to our newsletter for the latest job opportunities.
              </p>
              <div className="flex gap-2">
                <Input placeholder="Your email" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} SmallJobs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function JobCard({ job }: any) {
  return (
    <div className="bg-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold">{job.title}</h3>
          <Badge
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
          </Badge>
        </div>

        <div className="flex items-center text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{job.location}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">{job.postedTime}</span>
          </div>
          <div className="font-medium text-primary">{job.rate}</div>
        </div>

        <p className="text-muted-foreground mb-4 line-clamp-2">{job.description}</p>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-primary/10">
            <Briefcase className="h-3 w-3 mr-1" />
            {job.category}
          </Badge>
          <Link href={`/jobs/${job.id}`}>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

