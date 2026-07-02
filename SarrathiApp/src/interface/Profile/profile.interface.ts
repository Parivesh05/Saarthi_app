import { User } from 'src/interface/Auth/login.interface';

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: User;
}
