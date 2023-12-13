const express = require('express');
const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Custom middleware to verify time
const checkWorkingHours = (req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday
  const hour = date.getHours();

  const isWorkingHours = dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 23;

  if (!isWorkingHours) {
    res.send('The web application is only available during working hours (Monday to Friday, 9AM to 5PM).');
  } else {
    next();
  }
};

// Middleware to check working hours for all routes
app.use(checkWorkingHours);

// Routes
app.get('/', (req, res) => {
  res.render('homePage'); // Render your homePage.ejs
});

app.get('/ourservices', (req, res) => {
  res.render('ourServices'); // Render your ourServices.ejs
});

app.get('/contactus', (req, res) => {
  res.render('contactUs'); // Render your contactUs.ejs
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

