import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe('pk_test_51LNvaTKptIDoUbxly08ewjf8fjuM1e54WwupsgW4OKVINi4ybZPdSUz7cldw3eR441xzaku28rLy2WYtPLXG1Ti200iPwV1A0g');
  }

  return stripePromise;
}

export default getStripe;