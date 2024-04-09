const mongoose = require('mongoose');
// const mongoURI =  "mongodb://root:MjgzMi1icnVzYWxp@127.0.0.1:27017";
const dbUrl = 
"mongodb+srv://brunio97:Bruno19970602@clustermed.6b1nzj8.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMed"

/*connection params*/
const connectionParams ={
    useNewUrlParser:true,
    useUnifiedTopology: true,
}

const connectToMongo = async (retryCount) => {
    const MAX_RETRIES = 3;
    const count = retryCount ?? 0;
    try {
        await mongoose.connect(dbUrl, connectionParams);
        console.info('Connected to Mongo Successfully')

        return;
    } catch (error) {
        console.error(error);

        const nextRetryCount = count + 1;

        if (nextRetryCount >= MAX_RETRIES) {
            throw new Error('Unable to connect to Mongo!');
        }

        console.info(`Retrying, retry count: ${nextRetryCount}`)

        return await connectToMongo(nextRetryCount);

    }
};

// const connectToMongo = async (retryCount) => {
//     const MAX_RETRIES = 3;
//     const count = retryCount ?? 0;
//     try {
//         await mongoose.connect(mongoURI, { dbName: 'stayhealthybeta1'});
//         console.info('Connected to Mongo Successfully')

//         return;
//     } catch (error) {
//         console.error(error);

//         const nextRetryCount = count + 1;

//         if (nextRetryCount >= MAX_RETRIES) {
//             throw new Error('Unable to connect to Mongo!');
//         }

//         console.info(`Retrying, retry count: ${nextRetryCount}`)

//         return await connectToMongo(nextRetryCount);

//     }
// };

module.exports = connectToMongo;