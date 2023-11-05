const express = require("express");

const router = express.Router();

const { resolveError } = require("../public/javascripts/error");

const isAuth = require("../middleware/isAuth");

const FairModal = require("../infrastructure/models/Fairs");


router.post("/create", async (req, res, next) => {
    try {
        const Fair = new FairModal(req.body);

        await Fair.save();

        res.status(200).json({ message: "Fair created" });
    } catch (error) {
        resolveError(error, res);
    }
});
router.get("/getAll", async (req, res, next) => {
    try {
        const Fair = await FairModal.find();



        res.status(200).json({ status: "success", data: Fair });
    } catch (error) {
        resolveError(error, res);
    }
});
router.delete("/delete/:id", async (req, res, next) => {
    try {
        await FairModal.deleteOne({ _id: req.params.id });



        res.status(200).json({ status: "success" });
    } catch (error) {
        resolveError(error, res);
    }
});
module.exports = router;