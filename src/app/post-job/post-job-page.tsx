"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function PostJobPage() {
  const [jobType, setJobType] = useState("one-time")

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            SmallJobs
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Post a New Job</CardTitle>
            <CardDescription>Fill out the form below to create a new job listing</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" placeholder="e.g. Garden Maintenance" />
                </div>

                <div>
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea id="description" placeholder="Describe the job in detail..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g. Brooklyn, NY" />
                  </div>
                  <div>
                    <Label htmlFor="job-type">Job Type</Label>
                    <Select onValueChange={setJobType} defaultValue={jobType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="one-time">One-time</SelectItem>
                        <SelectItem value="recurring">Recurring</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rate">Pay Rate</Label>
                    <Input id="rate" placeholder="e.g. $25/hr or $200 total" />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" placeholder="e.g. 2 hours or 3 months" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gardening">Gardening</SelectItem>
                      <SelectItem value="home-improvement">Home Improvement</SelectItem>
                      <SelectItem value="pet-care">Pet Care</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="moving">Moving</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {jobType === "recurring" && (
                  <div>
                    <Label htmlFor="schedule">Schedule</Label>
                    <Input id="schedule" placeholder="e.g. Every Saturday, 9AM-11AM" />
                  </div>
                )}

                <div>
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea id="requirements" placeholder="List any specific requirements or skills needed..." />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the terms and conditions
                  </label>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Post Job</Button>
          </CardFooter>
        </Card>
      </main>

      <footer className="bg-muted mt-16 py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SmallJobs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

