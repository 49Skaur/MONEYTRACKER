const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/moneytracker', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connection Successful!');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
