const express = require("express");

const router = express.Router();

const { resolveError } = require("../public/javascripts/error");

const isAuth = require("../middleware/isAuth");

const PaymentModal = require("../infrastructure/models/Payment");


router.post("/create", async (req, res, next) => {
    try {
        const payment = new PaymentModal(req.body);

        await payment.save();

        res.status(200).json({ message: "Payment method created" });
    } catch (error) {
        resolveError(error, res);
    }
});
router.get("/getAll", async (req, res, next) => {
    try {
        const payment = await PaymentModal.find();



        res.status(200).json({ status: "success", data: payment });
    } catch (error) {
        resolveError(error, res);
    }
});
router.delete("/delete/:id", async (req, res, next) => {
    try {
        await PaymentModal.deleteOne({ _id: req.params.id });



        res.status(200).json({ status: "success" });
    } catch (error) {
        resolveError(error, res);
    }
});
module.exports = router;