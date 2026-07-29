import express from 'express';
import path from 'path';
import { logger } from './middlewares/logger.js';
import mongoose from 'mongoose';
import { error } from 'console';
import { request } from 'http';

const cookieConn = mongoose.createConnection(
  'mongodb://127.0.0.1:27017/cookie-shop',
);
cookieConn.on('connected', () => console.log('Connected to DB: cookie-shop'));

const cookieSchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  priceInCents: { type: Number, required: true },
  isInStock: { type: Boolean, default: true, required: true },
});

const Cookie = cookieConn.model('Cookie', cookieSchema);

let allCookies = [
  {
    id: 'chocolate-chip',
    cookie: 'Chocolate Chip',
    description:
      'The traditional recipe for these cookies includes butter, eggs, chocolate chips, and brown sugar, but it can be tweaked to fit various tastes and occasions.',
    price: '2,5€',
  },
  {
    id: 'peanut-butter',
    cookie: 'Peanut Butter',
    description:
      'Sweet, salty, and creamy, peanut butter cookies have been around since the early 1900s, when George Washington Carver began advocating for peanut farming.',
    price: '2€',
  },
  {
    id: 'oatmeal-raisin',
    cookie: 'Oatmeal Raisin',
    description:
      'Oatmeal raisin cookies are a divisive type of cookie. Many cookie eaters love them for their unique taste, chewy texture, and hints of cinnamon, while others count them less as a cookie and more as a healthy snack due to the inclusion of raisins and soluble fiber.',
    price: '2,5€',
  },
  {
    id: 'shortbread',
    cookie: 'Shortbread',
    description:
      'Composed of varying ratios of sugar, butter, and flour (depending on the recipe you follow), shortbread cookies offer a crunchy, crisp texture and a delightfully buttery flavor.',
    price: '2€',
  },
  {
    id: 'gingerbread',
    cookie: 'Gingerbread',
    description:
      'A holiday staple, gingerbread cookies come in many forms, but the most iconic is the traditional man-shaped variety.',
    price: '2,5€',
  },
];

const app = express();
const PORT = 3000;

mongoose
  .connect('mongodb://127.0.0.1:27017/cookie-shop')
  .then(() => console.log('Connected to DB:', mongoose.connection.name))
  .catch((error) => console.log(error));

app.set('view engine', 'ejs');

// Path to public folder for servng static files/pages
app.use(express.static('public'));

// Using virtual path with app.use middleware
app.use('/assets', express.static('public'));

app.use(logger);

app.use(express.urlencoded({ extended: true }));

// app.get('/', (request, response) => {
//   response.sendFile(path.resolve('./public/landing.html'));
// });

app.get('/', (request, response) => {
  response.render('index');
});

// app.get('/contact', (request, response) => {
//   response.send('Reach out to us if you have any questions');
// });

app.get('/contact', (request, response) => {
  response.sendFile(path.resolve('./public/contact.html'));
});

app.post('/contact', (request, response) => {
  console.log('Contact form submission: ', request.body);
  response.send('Thank you for your message. We will be in touch soon.');
});

app.get('/about', (request, response) => {
  response.send(
    'This page is about our huge company – me, my cat 🐈 and I, and myself as well',
  );
});

// app.get('/cookies/:id', (request, response) => {
//   const cookieId = request.params.id;

//   response.send(`You chose the cookie with the ID of ${cookieId}`);
// });

app.get('/cookies', (request, response) => {
  response.send('This is our cookie collection. Pick the ones you like most.');
});

// app.get('/cookies/:slug', (request, response) => {
//   response.send(
//     `This is the collection of our cookies. Check out the ones you like most.`,
//   );
// });

app.get('/cookies/new', (request, response) => {
  response.render('cookies/new');
});

app.get('/cookies/:slug', (request, response) => {
  const cookieName = request.params.slug;

  // const foundCookie = allCookies.find((item) => {
  //   if (item.id === cookieName) return true;
  // });

  const foundCookie = allCookies.find((item) => item.id === cookieName);

  response.send(
    `<h3>You chose the cookie with the name of <em>${foundCookie.cookie}</em></h3> 
    <p><strong>Description:</strong> ${foundCookie.description}</p> 
    <p><strong>Price:</strong> ${foundCookie.price}</p>`,
  );
});

app.post('/cookies', async (request, response) => {
  try {
    const cookie = new Cookie({
      slug: request.body.slug,
      name: request.body.name,
      priceInCents: request.body.priceInCents,
    });
    await cookie.save();

    console.log('✅ Cookie saved to cookie-shop');
    response.send('Cookie Created');
  } catch (error) {
    console.error(error);
    response.send('Error: the cookie could not be created');
  }
});

app.get('/search', (request, response) => {
  const searchQuery = request.query.q;

  if (searchQuery) {
    response.send(`
      <h1>You searched for: "${searchQuery}"</h1>
      Wanna search again?
      <button><a href="/search">Yes</a></button>`);
  } else {
    response.send(`
      <h2>You can search for something, if you want</h2>
      <form action="/search" method="get">
      <label for="q">Let's search for soemthing:</label>
      <input type="text" name="q" id="q"/>
      <button type="submit">Search</button>
      </form>
      `);
  }
});

app.get('/api/v1/cookies', (request, response) => {
  response.json({
    allCookies,
  });
});

app.get('/api/v1/cookies/:slug', (request, response) => {
  const cookieSlug = request.params.slug;
  const foundCookie = allCookies.find((item) => item.id === cookieSlug);

  response.json({ foundCookie });
});

app.listen(PORT, () => {
  console.log(`Started server on port ${PORT}`);
});
