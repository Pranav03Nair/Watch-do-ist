import { Movie } from "../models/movie.model.js";
import uploadToCloudinary from "../utils/cloudinary.js";
export const createMovie = async (req, res) => {
    try {
        const { title, note, genre, releaseYear, isWatched, watchAt, watchType, personalRating, } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        if (!req.file) {
            return res.status(400).json({ message: "Movie poster is required" });
        }
        const result = (await uploadToCloudinary(req.file.buffer, title));
        if (!result?.secure_url) {
            return res.status(500).json({ message: "Image upload failed" });
        }
        const movie = await Movie.create({
            title,
            note,
            genre: genre ? genre.split(",") : [],
            releaseYear,
            isWatched,
            watchAt,
            watchType,
            personalRating,
            posterUrl: result.secure_url,
            userId: req.userId,
        });
        res.status(201).json(movie);
    }
    catch (err) {
        console.error("Create Movie Error:", err);
        res.status(500).json({ message: "Server Error" });
    }
};
export const getMovies = async (req, res) => {
    const movies = await Movie.find({ userId: req.userId }).sort({
        createdAt: -1,
    });
    res.json(movies);
};
export const getMovieById = async (req, res) => {
    const movie = await Movie.findOne({ _id: req.params.id, userId: req.userId });
    if (!movie)
        return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
};
export const updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findOne({
            _id: req.params.id,
            userId: req.userId,
        });
        if (!movie)
            return res.status(404).json({ message: "Movie not found" });
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, req.body.title || movie.title);
            // @ts-ignore
            movie.posterUrl = result.secure_url;
        }
        const { title, note, genre, releaseYear, isWatched, watchAt, watchType, personalRating, } = req.body;
        if (title)
            movie.title = title;
        if (note)
            movie.note = note;
        if (genre)
            movie.genre = genre.split(",");
        if (releaseYear)
            movie.releaseYear = Number(releaseYear);
        if (typeof isWatched !== "undefined")
            movie.isWatched = isWatched === "true";
        if (watchAt)
            movie.watchAt = watchAt;
        if (watchType)
            movie.watchType = watchType;
        if (personalRating)
            movie.personalRating = Number(personalRating);
        await movie.save();
        res.json(movie);
    }
    catch (err) {
        console.error("Update Movie Error:", err);
        res.status(500).json({ message: "Server Error" });
    }
};
export const deleteMovie = async (req, res) => {
    const movie = await Movie.findOneAndDelete({
        _id: req.params.id,
        userId: req.userId,
    });
    if (!movie)
        return res.status(404).json({ message: "Movie not found" });
    res.json({ message: "Movie deleted" });
};
//# sourceMappingURL=movie.controller.js.map