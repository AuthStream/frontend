export interface Token {
    id: string;
    name: string;
    expired: number;
    body: string;
    encrypt: string;
  };
  
export interface TokenResponse {
    contents: Token[];
    totalElements: number;
  };

 export interface CreateTokenResponse {
    success: boolean;
  }

  export interface EditTokenResponse {
    success: boolean;
  }