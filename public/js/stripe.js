/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_51MlujHC14TiH4jC199hgXpkW1oV15a3lKJB7J0YFlwvVmjA1IF42MtU8ZgJRjFSjnAhApABhLUXncnsIAfafivaN00TVlRgtsu');

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session.data.session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      // sessionId: session.data.session.id,
      lineItems: [{
          price: session.data.session.amount_total.toString(),
          quantity: 1
        }],
        mode: 'subscription',
         successUrl: session.data.session.success_url,
      }).then((result) => {console.log(result)});;
    await window.location.assign(session.data.session.url)
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};