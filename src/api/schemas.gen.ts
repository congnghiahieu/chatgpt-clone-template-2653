// This file is auto-generated by @hey-api/openapi-ts

export const Body_upload_kb_kb_upload_postSchema = {
  properties: {
    file: {
      type: 'string',
      format: 'binary',
      title: 'File',
    },
  },
  type: 'object',
  required: ['file'],
  title: 'Body_upload_kb_kb_upload_post',
} as const;

export const ChatRequestSchema = {
  properties: {
    message: {
      type: 'string',
      title: 'Message',
    },
  },
  type: 'object',
  required: ['message'],
  title: 'ChatRequest',
} as const;

export const DataSourceInfoSchema = {
  properties: {
    id: {
      type: 'string',
      title: 'Id',
    },
    name: {
      type: 'string',
      title: 'Name',
    },
    description: {
      type: 'string',
      title: 'Description',
    },
    tables: {
      items: {
        type: 'string',
      },
      type: 'array',
      title: 'Tables',
    },
    access_level: {
      type: 'string',
      title: 'Access Level',
    },
    has_access: {
      type: 'boolean',
      title: 'Has Access',
    },
  },
  type: 'object',
  required: ['id', 'name', 'description', 'tables', 'access_level', 'has_access'],
  title: 'DataSourceInfo',
} as const;

export const FileInfoSchema = {
  properties: {
    filename: {
      type: 'string',
      title: 'Filename',
    },
    size: {
      type: 'integer',
      title: 'Size',
    },
    upload_date: {
      type: 'string',
      title: 'Upload Date',
    },
    file_type: {
      type: 'string',
      title: 'File Type',
    },
  },
  type: 'object',
  required: ['filename', 'size', 'upload_date', 'file_type'],
  title: 'FileInfo',
} as const;

export const HTTPValidationErrorSchema = {
  properties: {
    detail: {
      items: {
        $ref: '#/components/schemas/ValidationError',
      },
      type: 'array',
      title: 'Detail',
    },
  },
  type: 'object',
  title: 'HTTPValidationError',
} as const;

export const UserCreateSchema = {
  properties: {
    username: {
      type: 'string',
      title: 'Username',
    },
    password: {
      type: 'string',
      title: 'Password',
    },
    email: {
      type: 'string',
      title: 'Email',
      default: '',
    },
    full_name: {
      type: 'string',
      title: 'Full Name',
      default: '',
    },
  },
  type: 'object',
  required: ['username', 'password'],
  title: 'UserCreate',
} as const;

export const UserLoginSchema = {
  properties: {
    username: {
      type: 'string',
      title: 'Username',
    },
    password: {
      type: 'string',
      title: 'Password',
    },
  },
  type: 'object',
  required: ['username', 'password'],
  title: 'UserLogin',
} as const;

export const UserResponseSchema = {
  properties: {
    id: {
      type: 'string',
      title: 'Id',
    },
    username: {
      type: 'string',
      title: 'Username',
    },
    email: {
      type: 'string',
      title: 'Email',
    },
    full_name: {
      type: 'string',
      title: 'Full Name',
    },
    created_at: {
      type: 'string',
      format: 'date-time',
      title: 'Created At',
    },
    role: {
      type: 'string',
      title: 'Role',
      default: 'user',
    },
  },
  type: 'object',
  required: ['id', 'username', 'email', 'full_name', 'created_at'],
  title: 'UserResponse',
} as const;

export const UserSettingsResponseSchema = {
  properties: {
    vai_tro: {
      type: 'string',
      title: 'Vai Tro',
    },
    chi_nhanh: {
      type: 'string',
      title: 'Chi Nhanh',
    },
    pham_vi: {
      type: 'string',
      title: 'Pham Vi',
    },
    du_lieu: {
      type: 'string',
      title: 'Du Lieu',
    },
    datasource_permissions: {
      items: {
        type: 'string',
      },
      type: 'array',
      title: 'Datasource Permissions',
    },
  },
  type: 'object',
  required: ['vai_tro', 'chi_nhanh', 'pham_vi', 'du_lieu', 'datasource_permissions'],
  title: 'UserSettingsResponse',
} as const;

export const UserSettingsUpdateSchema = {
  properties: {
    vai_tro: {
      type: 'string',
      title: 'Vai Tro',
    },
    chi_nhanh: {
      type: 'string',
      title: 'Chi Nhanh',
    },
    pham_vi: {
      type: 'string',
      title: 'Pham Vi',
    },
    du_lieu: {
      type: 'string',
      title: 'Du Lieu',
    },
    datasource_permissions: {
      items: {
        type: 'string',
      },
      type: 'array',
      title: 'Datasource Permissions',
    },
  },
  type: 'object',
  required: ['vai_tro', 'chi_nhanh', 'pham_vi', 'du_lieu', 'datasource_permissions'],
  title: 'UserSettingsUpdate',
} as const;

export const ValidationErrorSchema = {
  properties: {
    loc: {
      items: {
        anyOf: [
          {
            type: 'string',
          },
          {
            type: 'integer',
          },
        ],
      },
      type: 'array',
      title: 'Location',
    },
    msg: {
      type: 'string',
      title: 'Message',
    },
    type: {
      type: 'string',
      title: 'Error Type',
    },
  },
  type: 'object',
  required: ['loc', 'msg', 'type'],
  title: 'ValidationError',
} as const;
