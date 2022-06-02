const { MongoClient } = require("mongodb");
const Db = "mongodb://tester:4NvQeeVM9QmathZh@pacmangamecluster.lpr2t.mongodb.net/?retryWrites=true&writeConcern=majority";
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            // Verify we got a good "db" object
            if (db) {
                _db = db.db("PacmanDB");
                console.log("Successfully connected to MongoDB.");
            }
            return callback(err);
        });
    },
    getDb: function () {
        return _db;
    },
};