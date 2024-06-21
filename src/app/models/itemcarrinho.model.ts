import { Categoria } from "./categoria.model";

export class ItemCarrinho {
  id!: number;
  nome!: string;
  quantidade!: number;
  preco!: number;
  imagemUrl!: string;
  categoria!: Categoria; // Adicionando a categoria
}
