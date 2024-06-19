import express from "express";
const app = express();
import db from "@repo/db/client";
app.post("/hdfcWebhook", (req, res) => {
  //TODO: Add zod validation here?
  // Check if the request comes from hdfc bank or not, use a webhook secret here
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  // Update balance in db, add txn
  const balance = db.balance.findFirst({
    where: {
      userId: paymentInformation.userId,
    },
  });

  const updateBalance = db.balance.update({
    where: {
      userId: paymentInformation.userId,
    },
    data: {
      amount: balance + paymentInformation.amount,
    },
  });
});
