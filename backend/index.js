import express from 'express';
import cartRouter from './api/routes/cartRoutes.js';
import dotenv from 'dotenv';
import dbClient from './config/dbConfig.js';
import authRouter from './auth/routes/authRoutes.js';

dotenv.config();

/* const waitConnection = () => {
    return new Promise((resolve, reject) => {
        let i = 0;
        const repeatFct = async () => {
            await setTimeout(() => {
                i += 1;
                if (i >= 10) {
                    reject()
                }
                else if(!dbClient.isAlive()) {
                    repeatFct()
                }
                else {
                    resolve()
                }
            }, 1000);
        };
        repeatFct();
    })
};

(async () => {
    try {
        console.log(dbClient.isAlive());
        await waitConnection();
        console.log(dbClient.isAlive());
    } catch(e) {
        console.log(e)
    }
    
})(); */

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api', cartRouter);
/* app.use('/api', userRouter); */
app.use('/auth', authRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`); 
});