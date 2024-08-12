import express from 'express';
import cartRouter from './api/routes/cartRoutes.js';

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api', cartRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`); 
});