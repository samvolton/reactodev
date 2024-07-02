// src/types.ts
export interface User {
    id: number;
    name: string;
    email: string;
    companyName: string;
    country: string;
  }
  
  export interface FormData {
    name: string;
    email: string;
    companyName: string;
    country: string;
  }
  
  export interface FormErrors {
    name: string;
    email: string;
  }