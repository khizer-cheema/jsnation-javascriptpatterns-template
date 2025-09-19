const processPaymentWithPayPal = (amount) => {
  console.log(`processing $${amount} through paypall`);
};
const processPaymentWithStripe = (amount) => {
  console.log(`processing $${amount} through stripe`);
};
const processPaymentUnsupported = (amount) => {
  console.log(`processing $${amount} Unsupported`);
};

const getPaymentProcessor = (type) => {
  const processors = {
    paypall: processPaymentWithPayPal,
    stripe: processPaymentWithStripe,
  };
  return processors[type] || processPaymentUnsupported;
};

const paymentOrder = (paymentType, amount) => {
  const processPayment = getPaymentProcessor(paymentType);
  processPayment(amount);
};

paymentOrder("paypall", 450);
paymentOrder("stripe", 300);
paymentOrder("jazzCash", 100);
