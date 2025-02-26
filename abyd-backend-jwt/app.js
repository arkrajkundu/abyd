import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { getQuestions, createUser, deleteUser, getUserData } from './controllers/userDataController.js';
import { loadQuestionsData } from './questionsData.js';
import authRoutes from './routes/authRoutes.js';
import userDataRoutes from './routes/userDataRoutes.js'
import questionRoutes from './routes/questionRoutes.js'
import User from './models/User.js';
import config from './config.js';

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true
}));

mongoose.connect(`${config.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

loadQuestionsData()
    .then(() => console.log("Questions data loaded successfully."))
    .catch(err => console.error("Failed to load questions data:", err));

// Routes for creating a user and fetching questions
app.post('/create-user', createUser);
app.post('/get-questions', getQuestions);

// Auth routes
app.use('/auth', authRoutes);
app.use('/user', userDataRoutes);
app.use('/questions', questionRoutes);

app.get('/dashboard', async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const userEmail = req.user.email; // req.user contains authenticated user data
            const userData = await User.findOne({ email: userEmail }); // Use the User model to fetch data

            if (userData) {
                res.json({ loggedIn: true, userData });
            } else {
                res.json({ loggedIn: true, message: 'No user data found' });
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({ error: 'Error fetching user data' });
        }
    } else {
        res.json({ loggedIn: false });
    }
});

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


const IP = 'localhost';
const PORT = process.env.PORT || 8888;  // Backend port

// Start the backend server
app.listen(PORT, IP, () => {
    console.log(`Backend is running on http://${IP}:${PORT}`);
});