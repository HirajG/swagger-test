const express = require('express');
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const morgan = require('morgan');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./docs/swagger-output.json');
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');
const rateLimit = require('express-rate-limit');

connectDb();
const app = express();

// Swagger UI
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(
  '/api-docs',
  swaggerUi.serveFiles(swaggerFile, {
    swaggerOptions: {
      url: '/swagger.json', // Load your spec from a direct endpoint
    },
  }),
  swaggerUi.setup(swaggerFile)
);

// Serve the spec as raw JSON
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerFile);
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 15,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  statusCode: 429,
});

app.use(limiter);
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

app.use(contactRoutes);
app.use(userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

module.exports = app;
