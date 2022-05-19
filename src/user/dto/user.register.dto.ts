export interface UserRegisterDto {
  username: string;
  nome: string;
  apelido: string;
  email: string;
  pass: string;
  grupo?: string;
  cod_escritorio?: number;
}
