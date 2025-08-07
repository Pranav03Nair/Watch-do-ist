import mongoose, { Schema, Document } from "mongoose";
const MovieSchema = new Schema({
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
}, { timestamps: true });
export const Movie = mongoose.model("Movie", MovieSchema);
//# sourceMappingURL=movie.model.js.map