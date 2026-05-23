export interface Event{
    id: number;
    name: string;
    categoryId: number;
    pembicaraId?: number;
    tanggal: Date;
    description: string;
}