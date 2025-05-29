import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {connectDB} from './lib/database.js';
import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js';
import movieRoutes from './routes/movie.js';
import tvshowRoutes from './routes/tvshow.js';
import commentRoutes from './routes/comment.js';
import ratingRoutes from './routes/rate.js';
import likeRoutes from './routes/like.js';

import fileUpload from 'express-fileupload';
import path from 'path';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve(); // Get the current directory name

app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use(express.json()); // Parse JSON bodies 
app.use(cookieParser()); // Parse cookies for the use of token authentication
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies for

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: path.join(__dirname, "tmp"),
		createParentPath: true,
		limits: {
			fileSize: 10 * 1024 * 1024, // 10MB  max file size
		},
	})
); // Enable file upload handling


app.use("/api/user",userRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/movies",movieRoutes);
app.use("/api/tvshows",tvshowRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/ratings",ratingRoutes);
app.use("/api/likes",likeRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});



