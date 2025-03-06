"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { JobPostItem } from "../components/job-post-item"
import Link from "next/link"

// Mock user data
const user = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/placeholder.svg?height=100&width=100",
  joinDate: "January 2023",
  jobsPosted: 12,
  rating: 4.8,
}

// Mock job posts data
const initialJobPosts = [
  {
    id: 1,
    title: "Garden Maintenance",
    description: "Looking for someone to help with regular garden maintenance including mowing, weeding, and pruning.",
    location: "Brooklyn, NY",
    rate: "$25/hr",
    type: "Recurring",
    postedTime: "2 days ago",
  },
  {
    id: 2,
    title: "House Painting",
    description: "Need an experienced painter to paint the interior of a 2-bedroom apartment. Materials provided.",
    location: "Queens, NY",
    rate: "$200/day",
    type: "One-time",
    postedTime: "1 week ago",
  },
  // Add more mock job posts as needed
]

export default function ProfilePage() {
  const [jobPosts, setJobPosts] = useState(initialJobPosts)

  const handleEditJob = (editedJob: any) => {
    setJobPosts(jobPosts.map((job) => (job.id === editedJob.id ? editedJob : job)))
  }

  const handleDeleteJob = (jobId: any) => {
    setJobPosts(jobPosts.filter((job) => job.id !== jobId))
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            SmallJobs
          </Link>
          <Button variant="outline">Logout</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your account</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                <p className="text-muted-foreground mb-4">{user.email}</p>
                <div className="text-sm text-muted-foreground">
                  <p>Member since: {user.joinDate}</p>
                  <p>Jobs posted: {user.jobsPosted}</p>
                  <p>Rating: {user.rating}/5</p>
                </div>
                <Button className="mt-4">Edit Profile</Button>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Job Posts</h2>
              <Link href="/post-job">
                <Button>Create New Job</Button>
              </Link>
            </div>
            <div className="space-y-6">
              {jobPosts.map((job) => (
                <JobPostItem key={job.id} job={job} onEdit={handleEditJob} onDelete={handleDeleteJob} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-muted mt-16 py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SmallJobs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

