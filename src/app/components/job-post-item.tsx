"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, DollarSign, MapPin } from "lucide-react";
import { useState } from "react";
import { useGetUserProfile } from "../api/hooks/queries";
import { BaseService } from "../types/services";
import getDecodedToken from "../utils/getDecodedToken";

type JobPostType = {
  job: Partial<BaseService>;
  onEdit: (e: Partial<BaseService>) => void;
  onDelete: (id: string) => void;
};

export function JobPostItem({ job, onEdit, onDelete }: JobPostType) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedJob, setEditedJob] = useState(job);
  const decodedUser = getDecodedToken();
  const { data: profileData } = useGetUserProfile(decodedUser?.user_id || "");

  const handleEdit = () => {
    onEdit(editedJob);
    setIsEditDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          {job.title}
          <Badge
            variant={
              // job.type === "One-time"
              //   ? "default"
              //   : job.type === "Recurring"
              //   ? "secondary"
              //   : 
                "outline"
            }
          >
            {job.duration}
          </Badge>
        </CardTitle>
        <CardDescription>
          <div className="flex items-center space-x-4 text-sm">
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {profileData?.district}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Posted {job.created_at}
            </span>
            <span className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              {job.fixed_amount}
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{job.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Job Post</DialogTitle>
              <DialogDescription>
                Make changes to your job post here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={editedJob.title}
                  onChange={(e) =>
                    setEditedJob({ ...editedJob, title: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={editedJob.description}
                  onChange={(e) =>
                    setEditedJob({ ...editedJob, description: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rate" className="text-right">
                  Rate
                </Label>
                <Input
                  id="fixed_amount"
                  value={editedJob.fixed_amount}
                  onChange={(e) =>
                    setEditedJob({ ...editedJob, fixed_amount: Number(e.target.value) })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleEdit}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button variant="destructive" onClick={() => onDelete(job?.uuid || "")}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
