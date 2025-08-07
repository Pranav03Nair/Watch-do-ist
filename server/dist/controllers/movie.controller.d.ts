import type { Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";
export declare const createMovie: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMovies: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const getMovieById: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateMovie: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteMovie: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=movie.controller.d.ts.map