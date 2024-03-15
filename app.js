const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Import route handlers for all services
const authRoutes = require('./modules/users/routes'); // Adjust path as needed
const recipeRoutes = require('./modules/recipe_management/recipeRoutes'); // Adjust path as needed
const nutritionRoutes = require('./modules/nutrionalInformation/nutrionalRoutes'); // Adjust path as needed
const aiRoutes = require('./modules/ai/aiRoutes'); // Adjust path as needed

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
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));

// API Gateway routing
// Auth Routes
app.use('/api/auth', authRoutes);

// Recipe Management Routes
app.use('/api/recipes', recipeRoutes);

// Nutritional Information Routes
app.use('/api/nutrition', nutritionRoutes);

// AI Interaction Routes
app.use('/api/ai', aiRoutes);

// If no route is matched by now, it must be a 404
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

// Error Handling Middleware - always at the end
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
