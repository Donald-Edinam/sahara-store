import express from 'express';
import session from 'express-session';
import cartRouter from './api/routes/cartRoutes.js';
import dotenv from 'dotenv';
import dbClient from './config/dbConfig.js';
import authRouter from './auth/routes/authRoutes.js';
import productRouter from './api/routes/productRoutes.js';
import paymentRouter from './api/routes/paymentRoutes.js';
import cors from "cors"


dotenv.config();

const app = express();
app.set('json spaces', 2); // Pretty-print JSON responses
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use(session({
    secret: '878iwndhjj0wi2nsjmj102oefhsjlweld',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 * 7// 24 hours
    }
}));

app.use('/api', cartRouter);
app.use('/api', productRouter)
app.use('/cart', cartRouter);
/* app.use('/api', userRouter); */
app.use('/api/payment', paymentRouter);
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