const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

try {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
} catch (error) {
    mongoose.createConnection(process.env.MONGODB_URI);
}

mongoose.connection.once('open', _ => console.log('MongoDB Running'))
    .on('error', e => { throw e; });

exports.mongoose