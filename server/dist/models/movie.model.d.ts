import mongoose, { Document } from "mongoose";
export type WatchType = "watch_again" | "one_time";
export interface MovieInterface extends Document {
    title: string;
    note?: string;
    posterUrl: string;
    genre?: string[];
    releaseYear?: number;
    isWatched: boolean;
    watchAt?: string;
    watchType?: WatchType;
    personalRating?: number;
    userId: mongoose.Types.ObjectId;
}
export declare const Movie: mongoose.Model<MovieInterface, {}, {}, {}, mongoose.Document<unknown, {}, MovieInterface, {}, {}> & MovieInterface & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=movie.model.d.ts.map