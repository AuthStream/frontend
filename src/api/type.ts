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

export interface Application {
  id: string;
  name: string;
  provider: string;
  token: string;
};

export interface ApplicationResponse {
  contents: Application[];
  totalElements: number;
};

export interface CreateApplicationResponse {
  success: boolean;
}

export interface EditApplicationResponse {
  success: boolean;
}



export interface ProviderType {
  id: string;
  name: string;
  type: string;
  domain: string;
  token: string;
  callBackUrl: string;
};

export interface ProviderResponse {
  contents: ProviderType[];
  totalElements: number;
};

export interface CreateProviderResponse {
  success: boolean;
}

export interface EditProviderResponse {
  success: boolean;
}


