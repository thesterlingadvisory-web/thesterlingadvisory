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

const path = require('path');

app.use('/api/leads', leadRoutes);
app.use('/api/contact', leadRoutes);

// Serve static frontend build if available
const frontendBuildPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendBuildPath));

// SPA Fallback: handle any route like /services by serving index.html
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(frontendBuildPath, 'index.html'), (err) => {
    if (err) {
      res.status(404).send('Frontend build not found. Please run "npm run build" in the frontend directory or use the Vite dev server.');
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
