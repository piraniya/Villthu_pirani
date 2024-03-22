const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")("sk_test_51OtXhpIYbWOlM8JLm0GEAr6KYb96CZXro2p9uhzNtUasOwk1igEPJ3hegQmG0t1CVf1Pj0hmyx5QiIFP7Ra4Vyhr00AhjloeYL");

router.post("/payment", async (req, res) => {
  try {
    console.log("it's working good")
    const { cartItems, token } = req.body;
    const product = cartItems[0].product;
    const transactionKey = uuidv4();

    return stripe.customers.create({
      email: token.email,
      source: token.id
    }).then((customer) => {
      stripe.charges.create({
        amount: product.price * 100, // Multiply by 100 for cents
        currency: "LKR",
        customer: customer.id,
        receipt_email: token.email,
        description: product.name
      }).then((result) => {
        res.json(result);
      }).catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Error creating charge" });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
