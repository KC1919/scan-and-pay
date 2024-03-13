/**
 * tell ts to grab the Request from express
 * and add table_number and user using declaration merging
 */
// tif
// declare global {
//     declare namespace Express {
//         export interface Request {
//             table_number?: number; // Define the table_number property as optional
//             user?: string; // Define the user property as optional
//         }
//     }
// }
// src/types/express/index.d.ts

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from 'express';
declare global {
    namespace Express {
        interface Request {
            user?: string;
            table_number?: string;
        }
    }
}