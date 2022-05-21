export interface ComputadorRegisterDto {
  nr_serie: string;
  cod_utilizador?: number;
  cod_escritorio?: number;
  cod_tipo?: number;
  marca: string;
  modelo: string;
  descricao?: string;
  so?: string;
  cpu?: string;
  ram?: number;
  hdd?: number;
  garantia?: Date;
  data_instalacao?: Date;
  fim_emprestimo?: Date;
  aviso?: boolean;
}
