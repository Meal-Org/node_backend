const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Import your route handlers
const authRoutes = require('./services/routes');

// Import error handling middleware
const { errorHandler } = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = ['http://localhost:4200', 'https://mealpal.songa.app'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }else {
            callback(new Error ('Not allowed by CORS'))
        }
    }
}));

// Routes
app.use('/api/auth', authRoutes);

// If no route is matched by now, it must be a 404
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

// Error Handling Middleware - always at the end
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
