const appError = require("../error");
const axios = require("axios");
const stripe = require("stripe")(
  "sk_test_51Pnl2RL5kaM3Eh5sNvXPqkjLNJevQfy49AsnPLOa2SZ9r45YLMO9wTgT8SzAw55dz0Bi1Y0HT2GUJZ9ZweDpGVIY00JOiHeJc6"
);

// Function to convert amount to USD based on the currency type
//This function will convert  USD to cents and apply Math.floor

// LOCAL cURRENCY TO USD => USD TO CENTS
async function convertToUSDInCents(amount, currency) {
  try {
    const response = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/USD"
    ); // Fetch exchange rates
    const rates = response.data.rates; // Extract rates data

    // Convert amount to USD based on the currency
    const convertedAmount = parseFloat(amount) / rates[currency.toUpperCase()];

    // Convert USD to cents and apply Math.floor
    const amountInCents = Math.floor(convertedAmount * 100);

    // Return the final amount in cents as a number
    return amountInCents;
  } catch (error) {
    console.error("Error converting to USD and cents:", error);
    return null; // Return null in case of error
  }
}

exports.createInstance = async (req, res, next) => {
  // Check if amount and currency type is provided in the request
  console.log(req.body);
  if (!req.body.amount || !req.body.currency) {
    return next(
      new appError("Please provide the amount and currency type", 400)
    );
  }

  // Convert amount to USD in cents
  const amountInCents = await convertToUSDInCents(
    req.body.amount,
    req.body.currency
  );

  console.log(amountInCents);

  if (!amountInCents) {
    return next(new appError("Error converting amount to USD", 503));
  }

  // Create a payment intent
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Check if the client_secret exists in the paymentIntent
    if (!paymentIntent.client_secret) {
      return next(new appError("Error to set up card payemnt.", 503));
    }

    // Send the response with the client secret
    res.status(200).json({
      status: "success",
      data: {
        message: "Payment intent created successfully",
        client_secret: paymentIntent.client_secret, // Correct the reference here
      },
    });
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    return next(new appError("Error creating payment intent", 500));
  }
};
