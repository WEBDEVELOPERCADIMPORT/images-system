export interface User {
    id: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    roles?: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUser extends Omit<User, 'id' | 'isActive' | 'createdAt' | 'updatedAt'> {
    roles?: string[];
}

export interface UpdateUser extends Partial<Omit<User, 'id' | 'isActive' | 'createdAt' | 'updatedAt'>> {
    roles?: string[];
}

export interface GetUser extends Omit<User, 'passwordHash'> {
    roles: string[];
}

export interface GetSimpleUser extends Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'isActive'> {
    roles: string[];
}
