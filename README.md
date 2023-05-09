<h1 align="center">
  <br>
  <a href="https://natours-pw5m.onrender.com/"><img src="https://github.com/lgope/Natours/blob/master/public/img/logo-green-round.png" alt="Natours" width="100"></a>
  <br>
  Natours
    <h4 align="center">An Awesome Tour Booking Site BUILT ON TOP OF <a href="https://nodejs.org/en/" target="_blank">NodeJS</a>.</h4>
</h1>

<div align='center'>
  
[<img src="https://ucc71e438f2081eb0c659e77c3ad.previews.dropboxusercontent.com/p/thumb/AB5bjWoxSxKHn8QQsDVXiyn8NO93tbpu4VI3lyNDbgNAklHATcI2YGzKEilRvN1yXAUqN7it48NAK4g-ktLl8WKu-txEKz-HDSe7kkKjQDhLQxEr4iDwEIlHMa2NW7ppSlp0OFFifd5QmF5aan3sdiLkvYBsavW8Sqaj3KsM1tb1_70Z2krSDz9CK9pQDBQyymJYfcz_oqS2WTNUQWYZo_G-SNHVnhqmRxbfsWCg2Y0bVlirlhOon6On0lYwDeGzHXRgcJA4dAeIMnMm8kSYDZ8OcquvAmVWjdGUpBHLKs4DMaby1Wt_FZSbJKNoJAjMuQqa2pSKWA8cdByFn27BQidEJwTS3OSJr5MHXtfw_BbGnjtCSdvOsr_A1IcPPBX4dtYRpj0a7HE7sTIZbHg6KHBYj2i8-oMxhQNMkUSSfAEDCw/p.jpeg" width="100%">](https://www.youtube.com/watch?v=NHQDUB-fpTA)

</div>

# Natours - A Tour Booking Site
Natours is a highly functional tour booking website developed on NodeJS, which offers a wide array of features. These include authentication and authorization, providing users with the ability to log in and out of their accounts, and allow them to search for tours, book them, manage their bookings, and also update their profiles. It also provides API endpoints for accessing information about tours such as  tour stats, top 5 cheap tours, and tours within a radius.
Furthermore, it provides a secure and user-friendly credit card payment to facilitate seamless and safe transactions.

# Table of Contents
<img align="right" alt="GIF" height="250px" src="https://media.giphy.com/media/du3J3cXyzhj75IOgvA/giphy.gif" /> 
- <a href="#deployed-version">Deployed Version</a><br>
- <a href="#key-features">Key Features</a><br>
- <a href="#demonstration">Demonstration</a><br>
- <a href="#api-usage-and-documentation">API Usage</a><br>
- <a href="#how-to-use">How To Use</a><br>
- <a href="#installation">Installation</a><br> 
- <a href="#built-with">Build With</a><br>
- <a href="#future-updates">Future Updates</a><br> 
- <a href="#acknowledgement">Acknowledgement</a><br>

## Deployed Version
You can visit the live demo of Natours by clicking here. 👉 : https://natours-pw5m.onrender.com/

| Components            | 
| -------                         |
| <img src="https://github.com/MAES-Pyramids/Natours-Course-Node/blob/master/.ReadMeResources/Photos/wakatime.png" width="1000" />   | 

## Key Features
| Features                          | Description                                                                                                 |
|----------------------------------|------------------------------------------------------------------------------------------------------|
| Authentication & Authorization   | This feature provides users with login and logout functionality to access the system.                  |
| Tour Management & Modeling       | includes the ability to manage tour bookings, render tour maps, and display user reviews and ratings on each tour. |
| User Profile Updates             | This feature enables users to update their profile information, such as their username, photo, email, and password. |
| Credit Card Payment System       | This feature provides a secure payment system that enables users to make online payments using their credit cards. |


## Demonstration
Natours provides a highly interactive and user-friendly interface for users to book their tours. Some of the major highlights of Natours are:

Sign Up Page            |  Login Page | Forget Password
:-------------------------:|:-------------------------:|:-------------------------:
<img  src="https://github.com/MAES-Pyramids/Natours-Course-Node/blob/master/.ReadMeResources/Photos/Sign%20.gif" />  | <img src="https://github.com/MAES-Pyramids/Natours-Course-Node/blob/master/.ReadMeResources/Photos/login.gif" />  | <img src="https://github.com/MAES-Pyramids/Natours-Course-Node/blob/master/.ReadMeResources/Photos/Forget%20.gif" />

Home Page            |  Tour Details
:-------------------------:|:-------------------------:
  A highly intuitive and aesthetically pleasing home page with a visually appealing animation.<img src="https://github.com/MAES-Pyramids/Natours-Course-Node/blob/master/.ReadMeResources/Photos/Home%20.gif"  />  |  Users can view detailed information about tours, such as their ratings and reviews.  <img src="https://github.com/MAES-Pyramids/Natours-Course-Node/blob/master/.ReadMeResources/Photos/Tour%20.gif" />
  
Payment Process        |  Booked Tours
:-------------------------:|:-------------------------:
A streamlined payment process that allows users to pay for their tours quickly and easily. <img src="https://github.com/MAES-Pyramids/Natours-Course-Node/blob/master/.ReadMeResources/Photos/Payment.gif" />  |Users can view a list of all the tours they have booked. <img src="https://github.com/MAES-Pyramids/Natours-Course-Node/blob/master/.ReadMeResources/Photos/booking.gif"  />
  
User Profile            |  Admin Profile
:-------------------------:|:-------------------------:
Users can update their profiles, including their names, profile pictures, email addresses, and passwords.  <img src="https://github.com/MAES-Pyramids/Natours-Course-Node/blob/master/.ReadMeResources/Photos/user.gif" />  |  Administrators can manage the website and view detailed information about the tours and users.  <img src="https://github.com/MAES-Pyramids/Natours-Course-Node/blob/master/.ReadMeResources/Photos/Admin%20.gif" />

## API Usage and Documentation
Before using the API, you need to set the variables in Postman depending on your environment (development or production). Simply add:
```
- {{URL}} with your hostname as value (Eg. http://127.0.0.1:3000 or http://www.example.com)
- {{password}} with your user password as value.
```
For more info check API Documentation on Postman 👉 : [Natours API Documentation](https://documenter.getpostman.com/view/8689170/SVmzvwpY?version=latest).

- Some API End-Points: 
  - 👉 [Tours List](https://natours-pw5m.onrender.com/api/v1/tours)
  - 👉 [Tours State](https://natours-pw5m.onrender.com/api/v1/tours/tour-stats)
  - 👉 [Get Top 5 Cheap Tours](https://natours-pw5m.onrender.com/api/v1/tours/top_5_rated)
  - 👉 [Get Tours Within Radius](https://natours-pw5m.onrender.com/api/v1/tours/tours-within/200/center/34.098453,-118.096327/unit/mi)
  - 👉 [Get Tours Plans In Each Month](https://natours-pw5m.onrender.com/api/v1/tours/monthly-plan/2021)

---

## How To Use
If you want to book a tour through Natours, simply follow the steps given below:
1. Sign up or Login to the site with the following email and password.
  ```
  - Email. : loulou@example.com
  - Password : test1234
  ```
2. Search for tours you want.
3. Choose a tour and Book it.
4. Proceed to the payment checkout page.
5. Enter the card details (Test Mode):
  ```
  - Card No. : 4242 4242 4242 4242
  - Expiry date: 05 / 25
  - CVV: 222
  ```
* To access the tour you have booked, go to the "Manage Booking" page located in your user settings. Upon completion of the booking, you will be automatically directed to this page.
* Keep your profile up-to-date by modifying your username, email, password, and profile picture.

---

<h2>Installation</h2>
<p>There are two ways to get the app up and running on your local machine:</p>
<ol>
  <li>Fork the app on GitHub</li>
  <li>Git-clone the app into your local machine</li>
</ol>

<p>After that, you need to install all the dependencies by running the following command in your terminal: <code>$ npm i</code> then you will also need to set your environment variables.</p>

<p>Once you have installed the dependencies and set your environment variables, you can use the following commands to build and run the app:</p>
<ul>
  <li>To watch the JavaScript files for changes and automatically rebuild, run: <code>$ npm run watch:js</code> </li> 
  <li>To build the JavaScript files for production, run: <code>$ npm run build:js</code></li>
  <li>To start the app in development mode, run: <code>$ npm start</code></li> 
  <li>To start the app in production mode, run: <code>$ npm run start:prod</code></li> 
  <li>To run the app in debug mode, run: <code>$ npm run debug</code></li> 
</ul>

* <p>To set up ESLint and Prettier in VS Code, run the following command: </p>
<pre><code>$ npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --save-dev</code></pre>
---

## Built With
<img align="right" alt="GIF"  src="https://github.com/MAES-Pyramids/Natours-Course-Node/blob/master/.ReadMeResources/Photos/dependencies.png"  width="25%" /> 

Natours was built using the following technologies:
* [Express](http://expressjs.com/) - The web framework used 
* [Mongoose](https://mongoosejs.com/) - Object Data Modelling (ODM) library
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database service
* [Pug](https://pugjs.org/api/getting-started.html) - High performance template engine
* [JSON Web Token](https://jwt.io/) - Security token
* [ParcelJS](https://parceljs.org/) - Blazing fast, zero configuration web application bundler
* [Stripe](https://stripe.com/) - Online payment API
* [Postman](https://www.getpostman.com/) - API testing
* [Mailtrap](https://mailtrap.io/) & [Mailgun](https://www.mailgun.com/) - Email delivery platform
* [Render](https://render.com/) - Cloud platform
* I also utilize [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for code formatting and style.

## Future Updates
- Enable PWA
- Improve overall UX/UI and fix bugs
- Render ability for user to write comments
- Show Recently Viewed Tours and Featured Tours
- And More ! There's always room for improvement!

## Acknowledgement
This project is part of the online course I've taken at Udemy. Thanks to Jonas Schmedtmann for creating this awesome course! Link to the course: [Node.js, Express, MongoDB & More](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp)


## Assistance
If you require any assistance or have any questions or suggestions, please don't hesitate to contact me via [Email](mailto:mohamed.11021@stemgharbiya.moe.edu.eg). I would be more than happy to help you in any. Thank you for your time and consideration! 🙂

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=60&section=footer"  width="100%"/>
</p>
