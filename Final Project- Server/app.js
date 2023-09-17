const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("./utils/loggingMiddleware");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const apiRouter = require("./routes/api");
const config = require("config");
const initialData = require("./initialData/initialData");
const usersServiceModel = require("./model/mongodb/users/usersService");
const app = express();
const rateLimit = require("express-rate-limit");

app.set('trust proxy', 'loopback');
app.use(cors());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/initialData", express.static(path.join(__dirname, "initialData")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
initialData();

const uploadPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    
    cb(null, uploadPath);
  },
  
  filename: (req, file, cb) => {
    
    const fileName = Date.now() + "-" + file.originalname;
    console.log("Uploaded file name:", fileName);
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, 
  max: 300, 
  
});

app.use(limiter); 


app.put("/api/users/:id/upload-image", upload.single("image"), async (req, res) => {
  try {
    // Get the uploaded file path
    const imagePath = req.file.path;
    const publicImageUrl = `/uploads/${path.basename(imagePath)}`; 
    const userId = req.params.id;
    
    // Update the user with the image path
    await usersServiceModel.updateUser(userId, {image: {url: publicImageUrl}});
    res.json({ message: "Image uploaded successfully", imageUrl: publicImageUrl });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.use("/api", apiRouter);
app.use((req, res, next) => {
  res.status(404).json({ err: "page not found" });
});

module.exports = app;
