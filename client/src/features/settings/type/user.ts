export type User = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
  };
  
  export type UpdateUserInput = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
  };