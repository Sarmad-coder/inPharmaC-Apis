const express = require("express");

const router = express.Router();
const Admin = require("../infrastructure/models/admin");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { resolveError } = require("../public/javascripts/error");

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email: email });
        console.log(admin);
        if (admin == null) return res.status(200).json({ message: "user with this email does not exist", status: false });

        // const isMatch = await bcrypt.compare(password, admin.password);

        // if (!isMatch) return res.status(200).json({ message: "incorrect password", status: false });

        const token = jwt.sign(
            {
                email: admin.email,
                userId: admin._id.toString()
            },
            "somesecretsecret",
            { expiresIn: "24h" }
        );

        res.status(200).json({ token: token, status: true });
        // await Admin.create({email:"admin@gmail.com",password:"1234"})
        //  res.json(data)
    } catch (error) {
        console.log(error);
        resolveError(error, res);
    }
});

router.get("/getAll", async (req, res, next) => {

    try {
        const admin = await Admin.find({});

        res.status(200).json({ message: admin });
    } catch (error) {
        resolveError(error, res);
    }
});
// router.post("/signup", async (req, res, next) => {
//     const { email, password } = req.body;

//     try {
//         const admin = await Admin.findOne({ email: email });
//         if (admin != null) return res.status(404).json({ message: "user with this email already exist" });

//         const hashedPassword = await bcrypt.hash(password, 12);

//         const newAdmin = new Admin({
//             email: email,
//             password: hashedPassword
//         });

//         await newAdmin.save();

//         res.status(201).json({ message: "admin created" });
//     } catch (error) {
//         resolveError(error, res);
//     }
// });

module.exports = router;
