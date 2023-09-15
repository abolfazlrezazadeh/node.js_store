const {
  paymentController,
} = require("../../http/controller/api/payment.controller"); 
const { vrefiyAccessToken } = require("../../http/middleware/verifyAccesssToken");

const router = require("express").Router();
router.post("/", paymentController.paymentGateWay);
router.post("/verify", () => {});

//------shaparak- bank mellat - pasargad - saman------------
//1-payment
//2-checkTransaction
//3-verify

//-------zarinpal - digipay - capilapay------------------
//1-payment
//2-verify
module.exports = {
  apiPayment: router,
};
