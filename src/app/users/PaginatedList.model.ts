export class PaginatedList<T>{
    public pageIndex: number;
    public totalPages: number;
    public totalCount: number;
    public nextPage: number;
    public previousPage: number;
    public pageSize: number;
    public hasNextPage: boolean;
    public hasPreviousPage: boolean;
    public items: T[]
}