import { User } from "./users";

export type ServiceRequest = {
  uuid?: string;
  socials?: {
    whatsapp?: string;
    phone?: string;
  };
  user?: User;
  title: string;
  description: string;
  status?: string;
  city: string;
  district: string;
  duration: string;
  fixed_amount: number;
  created_at?: string;
  updated_at?: string;
};

export type ServiceProposalCategory = {
  uuid: string;
  fr_name: string;
  en_name: string;
  fr_description: string;
  en_description: string;
};

export type CreateServiceRequest = {
  title: string;
  description?: string;
  city: string;
  district: string;
  duration: number;
  fixed_amount: number;
  email?: string;
  phone?: string;
  whatsapp?: string;
  telegram?: string;
};

export type CreateProposalRequest = {
  title: string;
  description?: string;
  skills?: string[];
  category_uuid?: string;
  hourly_rate?: number;
};

export type ServiceProposal = {
  uuid: string;
  skills?: string[];
  category?: string;
  user: User;
  title: string;
  description?: string;
  hourly_rate?: number;
  created_at?: Date;
  updated_at?: Date;
};

export interface BaseService extends ServiceRequest {
  uuid: string;
  skills?: string[];
  category?: string;
  user: User;
  title: string;
  hourly_rate?: number;
}