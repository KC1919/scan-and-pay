export interface IRequestQuery {
    filter: string | undefined;
    filterColumn: string | undefined;
    page: number | undefined;
    limit: number | undefined;
    orderBy: string | undefined;
    search: string | undefined;
    startDate: string | undefined;
    endDate: string | undefined;
}

// declare global {
//     declare namespace Express {
//       export interface Request {
//         kquery: Partial<Query>;
//       }
//     }
//   }

export type Query = {
    sort?: string | null;
    limit?: number | null;
    page?: number | null;
    search?: string | null;

    group?: string[] | null;
};