export class RegisterResponseDto {
  id: number;
  name: string;
  password: string;
  email: string;
}

export class RegisterRequestDto {
  name: string;
  password: string;
  email: string;
}
