import dbClient from './dbConfig.js';
import dotenv from 'dotenv';

dotenv.config();

const waitConnection = () => {
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
    
})();