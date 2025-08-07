Hosted On - https://watch-do-ist.vercel.app/login

## Backend Flow - 

1. `index.ts`
    - Fires up the server via `startServer`
    - `startServer` connects the database and starts the server
2. `app.ts`
    - Initializes endpoints
    - We have 2 auth routes - Register/Login and Movie CRUD routes

---

3. `auth.route.ts`
    - `/register`: Token Signing and Register User
    - `/login`: Compare Password and Signin User

4. `auth.controller.ts`
    - Abstracts functionality used in auth routes
    - In case of complex logic, should be further abstracted to `auth.service.ts`

---

5. `movie.route.ts`
    - Has routes like `createMovie`, `getMovies`, `getMovieById`, `updateMovie` and `deleteMovie`
    - Uses **auth Middleware** to ensure all routes are protected - Meaning all require `Bearer ${Token}`

6. `movie.controller.ts`
    - `/createMovie`: Collects `req.body` and `req.file`(CDN) to create movie
    - `/getMovies`: Fetches all movie for Authentication Token's `user_id`
    - `/getMovieById`: Fetches a movie
    - `/updateMovie`: Updates a movie, checking change in `req.body` and/or `req.file`
    - `/deleteMovie`: Deletes a movie

---

## Remaining Files

1. `user.model.ts` and `movie.model.ts`
    - Contain mongoDB schematics for `user` and `movie`

2. `auth.middleware.ts`
    - Extracts `user_id` from authentication token

3. `multer.middleware.ts`
    - Goto file upload handler, it handles multipart form's file requests and stores them in buffer
4. `cloudinary.config.ts`
    - Initilizes cloudinary CDN via Secret Keys

5. `utils/cloudinary.ts`
    - Upload functionality to upload `file` from its `Buffer` storage

6. `jwt.ts`
    - Standard Sign and Verify token functionality

    
