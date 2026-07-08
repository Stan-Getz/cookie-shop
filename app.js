import express, { response } from 'express';

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

app.get('/', (request, response) => {
  response.send('Welcome to our 🍪 Cookie Shop!');
});

app.get('/contact', (request, response) => {
  response.send('Reach out to us if you have any questions');
});

app.post('/contact', (request, response) => {
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

app.listen(PORT, () => {
  console.log(`Started server on port ${PORT}`);
});
