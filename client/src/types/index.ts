export interface Movie {
  _id: string;
  title: string;
  note?: string;
  posterUrl: string;
  genre?: string[];
  releaseYear?: number;
  isWatched: boolean;
  watchAt?: string;
  watchType?: "watch_again" | "one_time";
  personalRating?: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMovieData {
  title: string;
  note?: string;
  genre?: string;
  releaseYear?: number;
  isWatched?: boolean;
  watchAt?: string;
  watchType?: "watch_again" | "one_time";
  personalRating?: number;
  poster: File;
}

export interface UpdateMovieData {
  title?: string;
  note?: string;
  genre?: string;
  releaseYear?: number;
  isWatched?: boolean;
  watchAt?: string;
  watchType?: "watch_again" | "one_time";
  personalRating?: number;
  poster?: File;
}
