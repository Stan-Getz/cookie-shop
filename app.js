import express, { response } from 'express';

const app = express();
const PORT = 3000;

app.get('/', (request, response) => {
  response.send('Welcome to your 🍪 Cookie Shop!');
});

app.listen(PORT, () => {
  console.log(`Started server on port ${PORT}`);
});
