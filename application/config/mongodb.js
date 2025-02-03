const {MongoClient} = require('mongodb')
const client = new MongoClient(process.env.MONGODB);
console.log(`client:${client}`);

module.exports.init = async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        const db = client.db("ducktale");
        console.log(`db:${db}`);

        return db;
    } 
    catch(err) {

        return err;
    }
}