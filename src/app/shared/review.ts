export interface Review {
  id: number;
  user_id: number;
  name: string;
  category: string;
  district: string;
  rating: number;
  comment: string;
  recommended: boolean;
  visit_date: string;
}