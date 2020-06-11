const mongoose = require('mongoose');
const config = require('config');
const mongoURI = config.get('mongoURI');
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('MongoDB connected !');
  } catch (err) {
    console.error('Can Not connect MongoDB');
    console.error(err.message);
    /** Exit with failure */
    process.exit(1);
  }
};

module.exports = connectDB;
