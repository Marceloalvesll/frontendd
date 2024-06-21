import { Estado } from "./estado.model";

export class Endereco {
    id!: number;
    rua!: String;
    numero!: number;
    cidade!: String;
    cep!: String;
    estado!: Estado;
}