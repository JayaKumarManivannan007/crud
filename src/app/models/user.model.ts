export interface User {
  id: number;
  name: string;
  role: string;
  status: 'Active' | 'Inactive';
  social: string[];
  promote: boolean;
  rating: number;
  lastLogin: string;
}
