import { Router } from "express";
import {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from "../controllers/movie.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { upload } from "../middleware/multer.middleware";

const router = Router();

router.use(requireAuth);

router.post("/", upload.single("poster"), createMovie);
router.get("/", getMovies);
router.get("/:id", getMovieById);
router.put("/:id", upload.single("poster"), updateMovie);
router.delete("/:id", deleteMovie);

export default router;
