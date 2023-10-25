
require('dotenv').config();

const YAML = require('yamljs');
const express = require('express');

const app = express();
const port = process.env.PORT || 3001;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('./swagger.yaml');

const chatbotController = require('./controllers/chatbotController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/chatbot', chatbotController.postChatbot)

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
