export type ServiceRequest = {
  uuid?: string;
  socials?: string;
  user?: string;
  title: string;
  description: string;
  status?: string;
  city: string;
  district: string;
  duration: string;
  fixed_amount: number;
  created_at?: string;
  updated_at?: string;
}

export type ServiceProposalCategory = {
  uuid:	string;
  fr_name: string;
  en_name: string;
  fr_description: string;
  en_description: string;
}