const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
const connectDB = require('./config/db');
/** Connect to MongoDB */
connectDB();

/** Init Middleware */
app.use(express.json({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('root route');
});

app.use('/api/log', require('./routes/api/logs'));
app.use('/api/tech', require('./routes/api/tech'));

// /** Serve static assets in production */
if (process.env.NODE_ENV === 'production') {
  console.log('Starting front end build...');
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Server started on PORT : ${port}`));
