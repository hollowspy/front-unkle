export interface ContractUser {
    id?:number,
    id_contract?: number;
    id_user?: number;
    status?: string;
    date_start?:Date;
    date_end?:Date | null;
    date_resiliation?:Date;
}
