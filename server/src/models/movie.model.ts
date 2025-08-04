import mongoose, { Schema, Document } from "mongoose";

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

const MovieSchema = new Schema<MovieInterface>(
  {
    title: { type: String, required: true },
    note: { type: String },
    posterUrl: { type: String, required: true },
    genre: [{ type: String }],
    releaseYear: { type: Number },
    isWatched: { type: Boolean, default: false },
    watchAt: { type: String },
    watchType: {
      type: String,
      enum: ["watch_again", "one_time"],
    },
    personalRating: { type: Number, min: 0, max: 10 },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Movie = mongoose.model<MovieInterface>("Movie", MovieSchema);
