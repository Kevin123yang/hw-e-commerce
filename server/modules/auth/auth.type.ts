export type AuthUser = {
    id: number;
    username: string;
    email: string;
  };
  
  export type JwtPayload = {
    userId: number;
    email: string;
  };