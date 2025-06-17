import type { UserDetails } from "@/types/user";

export interface AuthState {
  authToken: string | null;
  isAuthenticated: boolean;
  user: UserDetails | null;
}
