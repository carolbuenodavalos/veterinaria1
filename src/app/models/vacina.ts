import { Animal } from "./animal";

export class Vacina {
    id!: number;
    nome!: string;
    dataAplicacao!: Date;
    dataProximaDose!: Date;
    dataValidade!: Date;
    lote!: string;
    observacoes!: string;
    animais!: Animal[];
}