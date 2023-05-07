/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51N44EQKN3s4s4hmp0zu9gNNUK6dXp1Cb3sGAy28M0n5kMNEbYNAFGrPWAoXkfaS6ThPUc5FJsQHXKJGMNwNQZfcp004uOE9KQX'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
