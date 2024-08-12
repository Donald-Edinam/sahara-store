class MongoConnection {
    constructor() {
        this.dbUrl = process.env.MONGO_URL;
        this.client = new MongoClient(this.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        this.client.connect();
    }

    isAlive() {
        return !!this.client && !!this.client.topology && this.client.topology.isConnected();
    }
}

const dbClient = new DBClient();
export default dbClient;