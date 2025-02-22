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


export interface User {
  id: string;
  email: string;
  password: string;
  created: string;
};

export interface UserResponse {
  contents: User[];
  totalElements: number;
};

export interface CreateUserResponse {
  success: boolean;
}

export interface EditUserResponse {
  success: boolean;
}

export interface Role {
  id: string;
  email: string;
  password: string;
  created: string;
};

export interface RoleResponse {
  contents: Role[];
  totalElements: number;
};

export interface CreateRoleResponse {
  success: boolean;
}

export interface EditRoleResponse {
  success: boolean;
}

export interface Group {
  id: string;
  email: string;
  password: string;
  created: string;
};

export interface GroupResponse {
  contents: Group[];
  totalElements: number;
};

export interface CreateGroupResponse {
  success: boolean;
}

export interface EditGroupResponse {
  success: boolean;
}


export interface Permission {
  id: string;
  email: string;
  password: string;
  created: string;
};

export interface PermissionResponse {
  contents: Permission[];
  totalElements: number;
};

export interface CreatePermissionResponse {
  success: boolean;
}

export interface EditPermissionResponse {
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

export interface EditTokenResponse {
  success: boolean;
}

export interface Message {
  id: string;
  name: string;
  type: string;
  body: string;
  created: string;
};

export interface MessageResponse {
  contents: Message[];
  totalElements: number;
};

export interface CreateMessageResponse {
  success: boolean;
}

export interface EditMessageResponse {
  success: boolean;
}


