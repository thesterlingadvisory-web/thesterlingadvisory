require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const leadRoutes = require('./routes/leadRoutes');

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'TheSterlingAdvisory API is running' });
});

app.use('/api/leads', leadRoutes);
app.use('/api/contact', leadRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
