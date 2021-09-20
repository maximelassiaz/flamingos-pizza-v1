# :pizza: Flamingo's Pizza

## :grey_question: What is Flamingo's Pizza project ?

### :bulb: Concept

**Flamingo's Pizza** is MERN (MongoDB Express React Node) full-stack website project.
This pizza e-commerce website allows a user to look at the pizza menu and to purchase them. 
The website's admin is able to manipulate the pizzas data.

### :mag_right: Features

For non logged-in user :
* see homepage
* see pizza menu
* see pizza details

For logged-in user (non admin) :
* everything a non-logged user can do
* able to add pizzas to shopping cart
* able to purchase items from shopping cart

For logged-in admin :
* everything a logged-in user can do
* edit, create and delete pizza

## :blue_book: How to start this app ?

### Database (MongoDB/Mongoose)

This project use MongoDB as database, meaning you need to have MongoDB installed.

You will also need to replace the database path in `flamingos-pizza-api/server.js` or set the database url environnement variable (DATABASE_URL) in a `.env` file.

### Back-end (Node/Express) : `flamingos-pizza-api`

This project use Node for the server, make sure you have a proper version of Node installed.

To start the api from the root folder :

```bash
cd flamingos-pizza-api
npm start
```

### Font-end (React) : `flamingos-pizza-react-app`

This project use the React library on the front-end.

To start the api from the root folder :

```bash
cd flamingos-pizza-react-api
npm start
```

