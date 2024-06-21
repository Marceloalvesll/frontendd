 import { Endereco } from "./endereco.model";
 import { Telefone } from "./telefone.model";
 export class Cliente {
    id!: number;
    nome!: string;
     sobrenome!: string;
     dataNascimento!: Date;
    senha!: string;
    cpf!: string;
     email!: string;
    login!: string;
    listaTelefone!: Telefone[];
  listaEndereco!: Endereco[];
}