export interface UserCreateDto {
  companyName: string;
  email: string;
  password: string;
  internalCode: string;
  taxId: string;
  currency: string;
  monthlyRequestFee: number;
}

export interface UserUpdateDto {
  taxId?: string;
  currency?: string;
}
