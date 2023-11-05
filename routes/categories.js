const express = require("express");

const router = express.Router();

let multer = require("multer")
const path = require("path");

const isAuth = require("../middleware/isAuth");
const Category = require("../infrastructure/models/categories");
const { resolveError } = require("../public/javascripts/error");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let path = './public/images'
  
      cb(null, path)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage, limits: { fieldSize: 20971520 } })


router.get("/findAll", async (req, res, next) => {
    try {
        let categoryList = await Category.find();
        res.status(200).json({ status:"sucess",categoryList});
    } catch (error) {
        resolveError(error, res);
    }
});

router.get("/findById/:id",async (req, res, next) => {
    const { id } = req.params;
    try {
        let category = await Category.findById(id);
        res.status(200).json({ status:"sucess",category});
    } catch (error) {
        resolveError(error, res);
    }
});

router.post("/create", upload.fields([
    { name: "image", maxCount: 1 },

]), async (req, res, next) => {
    try {
        if (req.files) {
            req.body.image=req.files.image[0].filename
        }

        const newCategory = new Category(req.body);

        await newCategory.save();

        res.status(200).json({ status:"sucess",newCategory});
    } catch (error) {
        res.json(error)
    }
});
router.delete("/delete/:id",async (req, res, next) => {
    try {
        await Category.findByIdAndRemove(req.params.id);

        res.status(200).json({ message: "category deleted" });
    } catch (error) {
        resolveError(error, res);
    }
});

router.put("updateById/:id", isAuth, async (req, res, next) => {
    try {
        let category= await Category.findByIdAndUpdate(id, req.body);

        res.status(200).json({ status:"sucess",category});
    } catch (error) {
        resolveError(error, res);
    }
});




module.exports = router;
