const express = require("express");

const router = express.Router();

const { resolveError } = require("../public/javascripts/error");

const isAuth = require("../middleware/isAuth");

const Commission = require("../infrastructure/models/commission");

router.post("/create", async (req, res, next) => {
    try {
        
        // req.body.categoryId = new ObjectId(req.body.categoryId)
        const commission = new Commission(req.body);

        await commission.save();

        res.status(200).json({ status:"sucess",commission});
    } catch (error) {
        res.json(error)
    }
});

router.get("/getById/:id", async (req, res, next) => {
    try {
        let prescription = await Commission.findById(req.params.id);
        res.status(200).json({ prescription });
    } catch (error) {
        resolveError(error, res);
    }
});

router.get("/getAll", async (req, res, next) => {
    try {
        let commission = await Commission.find().populate({ path: "categoryId"});
        res.status(200).json({ commission });
    } catch (error) {
        resolveError(error, res);
    }
});

router.post("/updateById/:id", async (req, res, next) => {
    try {
        let { id } = req.params;
        let commission = await Commission.findByIdAndUpdate(id, req.body);

        res.status(200).json({ message: "commission updated" });
    } catch (error) {
        resolveError(error, res);
    }
});

router.delete("/deleteById/:id", async (req, res, next) => {
    try {
        let { id } = req.params;
        await Commission.findByIdAndRemove(id);

        res.status(200).json({ message: "commission deleted" });
    } catch (error) {
        resolveError(error, res);
    }
});



module.exports = router;