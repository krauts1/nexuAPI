const express = require('express');
const app = express();
const port = 3000;

const apiRoutes = require('./src/routes');

app.use(express.json());

app.use('/', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
