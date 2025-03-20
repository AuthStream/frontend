
export interface Token {
  id: string;
  expiredDuration: number;
  body: object;
  encryptToken: string;
  applicationId:string;
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
  providerId: string;
  adminId:string;
  tokenId: string;
  createdAt: string;
  updateAt:string;
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
  name: string;
  application:string;
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
  name: string;
  application:string;
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
  applicationId: string;
  methodId: string;
  methodName:string;
  proxyHostIp:string;
  domainName:string;
  callbackUrl:string;
  createdAt: string;
  updateAt:string;
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

export interface Log {
  id: string;
  ip: string;
  user: string;
  event: string;
  created: string;
  context: object;
  rawEvent: object;
};

export interface LogResponse {
  contents: Log[];
  totalElements: number;
};

export interface CreateLogResponse {
  success: boolean;
}

export interface EditLogResponse {
  success: boolean;
}



export interface Route {
  id:string;
  name: string;
  created: string;
  protected:boolean;
};

export interface RouteResponse {
  contents: Route[];
  totalElements: number;
};

export interface CreateRouteResponse {
  success: boolean;
}

export interface EditRouteResponse {
  success: boolean;
}

export  interface SignInResponse {
  id: string;
  username: string;
  created: string;
  password: string;
}

export interface SigninData{
  username: string;
  password:string;
}

export interface RegisterData {
  username: string;
  password: string;
  key: string;
}

export   interface RegisterResponse {
  id: string;
  username: string;
  created: string;
  password: string;
}


export interface Column{
  name: string,
  type: string,
  constraints:string[],
  referenceTo: {
    tableName: string,
    columnName: string
  }
}
export interface tableSchema{
  tableName: string,
  columns: Column[],
}

export interface dbSchema{
  databaseName: string,
  databaseSchema:tableSchema[],
}
export   interface DbConfig {
  id: string,
  username: string,
  password: string,
  uri: string,
  databaseUsername: string,
  databasePassword: string,
  databaseType: string,
  sslMode: string,
  port: number,
  connectionString: string,
  tableIncludeList: tableSchema[],
  schemaIncludeList: tableSchema[],
  collectionIncludeList:tableSchema[],
  createdAt: string,
  updatedAt: string
}

export interface DbPreviewRequest{
  connectionString:string,
  tables: tableSchema[]
}


export interface Row {
  [key: string]: string | number;
}

export interface TableData {
  tableName: string;
  rows: Row[];
}
