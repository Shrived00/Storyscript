const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const profileRoutes = require("./routes/profileRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require('cors');


const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());

//let render run with cron-job
app.get('/hi', (req, res) => {
    console.log('Successfully === Cron-Job');
    res.type('text/plain');
    res.status(200).send('lol');
});




app.use('/api/users', userRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/profile', profileRoutes)



app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is Connected to ${PORT}`));


