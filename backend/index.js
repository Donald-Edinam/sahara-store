import express from 'express';
import cartRouter from './api/routes/cartRoutes.js';
import dotenv from 'dotenv';
import dbClient from './config/dbConfig.js';
import authRouter from './auth/routes/authRoutes.js';
import productRouter from './api/routes/productRoutes.js';

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api', cartRouter);
app.use('/api', productRouter)
/* app.use('/api', userRouter); */
app.use('/auth', authRouter);

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        // Handle JSON parsing errors
        return res.status(400).json({
            message: 'Invalid JSON data provided',
            error: err.message
        });
    }
    // Pass the error to the default error handler if it's not a JSON parsing error
    next(err);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});