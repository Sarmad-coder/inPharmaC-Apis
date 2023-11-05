
let PharmacyOrder = require("../infrastructure/models/pharmacyOrder")
let Pharmacy = require("../infrastructure/models/pharmacy")
let User = require("../infrastructure/models/user")
const { ObjectId } = require("mongodb");
const { notify } = require('../util/notification');





function socket(io) {

    const userNsp = io.of("/user")
    const pharmacyNsp = io.of("/pharmacy")





    userNsp.on("connection", (socket) => {
        console.log("user socket connected");

        socket.on("newOrder", async (data, cb) => {
            try {


                // data,data.images = data.images.map((image) => image.filename);
                data.userId = new ObjectId(data.userId)

                let order = new PharmacyOrder(data)
                await order.save()
                // console.log(result);
                cb({ status: "success", data: order });
                // console.log(result, ";;;;;;;;;;;;;;");


                // const fifteenMinutesAgo = new Date(new Date().getTime() - 15 * 60 * 1000);
                // const oldOrder = await PharmacyOrder.find({
                //     createdAt: {
                //         $gte: fifteenMinutesAgo,
                //     },
                // });
                // if (oldOrder.length > 0) {
                //     for (const order of oldOrder) {
                //         await PharmacyOrder.updateById(order._id, { status: "cancelled" });
                //     }
                // }





                if (data.OrderMethod == "Pickup") {

                    pharmacyNsp.emit("pickupOrder", { status: "success", data: order });

                    let pharmacys = Pharmacy.find({ serviceOptions: 'pickup' })

                    pharmacys.forEach((element) => {
                        console.log(element.fcmToken)
                        notify(element.fcmToken, "New pickup order", `New pickup order has been made`)
                    });




                    // notify(rider.dataValues.fcmToken, "New Ride", `New Hourly Ride request has been made`)
                } else {
                    pharmacyNsp.emit("deliveryOrder", { status: "success", data: order });

                    let pharmacys = Pharmacy.find({ serviceOptions: 'delivery' })
                    pharmacys.forEach(element => {
                        notify(element.fcmToken, "New delivery order", `New delivery order has been made`)
                    });

                }

                console.log("newOrder", "success");
            } catch (error) {
                cb({ status: "error", message: error.message });
                // console.log(error, ";;;;;;;;;;;;;");

            }
        })

        socket.on("acceptBid", async (data, cb) => {
            try {

                let pharmacyId = new ObjectId(data.pharmacyId)
                let order = await PharmacyOrder.findByIdAndUpdate(data.id, { OrderStatus: "accepted", pharmacyId: pharmacyId })
                // console.log(result);
                cb({ status: "success", data: order });
                // console.log(result, ";;;;;;;;;;;;;;");
                let pharmacy=Pharmacy.findById(pharmacyId)
                notify(pharmacy.fcmToken, "AcceptBid", `User has accepted your bid`)
                pharmacyNsp.emit("acceptBid", { status: "success", data: order });
                console.log("acceptBid", "success");
            } catch (error) {
                cb({ status: "error", message: error.message });
                // console.log(error, ";;;;;;;;;;;;;");

            }
        })
        
        socket.on("cancelOrder", async (data, cb) => {
            try {

                let order = await PharmacyOrder.findByIdAndUpdate(data.id, { OrderStatus: "cancelled" })
                // console.log(result);
                // console.log(result, ";;;;;;;;;;;;;;");

                pharmacyNsp.emit("cancelOrder", { status: "success", data: order });
                // if (order.pharmaId) {
                //     let pharmacy = await Pharmacy.findById(order.pharmaId)
                //     console.log(pharmacy)
                //     notify(pharmacy.fcmToken, "Cancel Order", `User has cancel his order`)
                // }

                console.log("cancelOrder", "success");
                cb({ status: "success", data: order });
            } catch (error) {
                console.log()
                cb({ status: "error", message: error.message });
                // console.log(error, ";;;;;;;;;;;;;");

            }
        })
    })

    pharmacyNsp.on("connection", (socket) => {
        console.log("pharmacyNsp socket connected");


        socket.on("acceptPharmacy", async (data, cb) => {
            try {

                let id = data.id
                delete data.id
                let order = await PharmacyOrder.findByIdAndUpdate(id, {pharmaId:data.pharmaId,acceptedOffer:true})

                let pharmacy = await Pharmacy.findById(data.pharmaId)

                // console.log(result);
                cb({ status: "success", data: order });
                // console.log(result, ";;;;;;;;;;;;;;");
                order = await PharmacyOrder.findById(id)
                userNsp.emit("acceptPharmacy", { status: "success", data: { order, pharmacy } });


                // fcm.send(message, function(err, response){
                //     if (err) {
                //         console.log(err)
                //     } else {
                //         console.log("Successfully sent with response: ", response)
                //     }
                // })
                let user= await User.findById(order.userId);
                notify(user.fcmToken, "Pharmacy accpet request", `pharmacy has accepted your order`)
                console.log("acceptPharmacy", "success");
            } catch (error) {
                cb({ status: "error", message: error.message });
                // console.log(error, ";;;;;;;;;;;;;");ß

            }
        })

        socket.on("pharmacyBid", async (data, cb) => {
            try {

                let id = data.id
                delete data.id
                let order = await PharmacyOrder.findByIdAndUpdate(id, data)
                let pharmacy = await Pharmacy.findById(data.pharmaId)

                // console.log(result);
                cb({ status: "success", data: order });
                // console.log(result, ";;;;;;;;;;;;;;");
                order = await PharmacyOrder.findById(id)
                userNsp.emit("pharmacyBid", { status: "success", data: { order, pharmacy } });


                // fcm.send(message, function(err, response){
                //     if (err) {
                //         console.log(err)
                //     } else {
                //         console.log("Successfully sent with response: ", response)
                //     }
                // })
                let user= await User.findById(order.userId);
                notify(user.fcmToken, "Pharmacy order request", `pharmacy has made a request related to your order`)
                console.log("pharmacyBid", "success");
            } catch (error) {
                cb({ status: "error", message: error.message });
                // console.log(error, ";;;;;;;;;;;;;");ß

            }
        })


        socket.on("orderCompleted", async (data, cb) => {
            try {


                let order = await PharmacyOrder.findByIdAndUpdate(data.id, { OrderStatus: "completed" })
                // console.log(result);
                cb({ status: "success", data: order });
                // console.log(result, ";;;;;;;;;;;;;;");

                let user= await User.findById(order.userId);
                notify(user.fcmToken, "Order Completed", `pharmacy has completed your order`)
                userNsp.emit("orderCompleted", { status: "success", data: order });
                console.log("orderComplete", "success");
            } catch (error) {
                cb({ status: "error", message: error.message });
                // console.log(error, ";;;;;;;;;;;;;");

            }
        })


        socket.on("cancelOrder", async (data, cb) => {
            try {


                let order = await PharmacyOrder.findByIdAndUpdate(data.id, { OrderStatus: "cancelled" })
                // console.log(result);
                cb({ status: "success", data: order });
                // console.log(result, ";;;;;;;;;;;;;;");

                userNsp.emit("cancelOrder", { status: "success", data: order });
                let user = await User.findById(order.userId);
                notify(user.fcmToken, "Cancel Order", `Pharmacy has canceled your order`)
                console.log("cancelOrder", "success");
            } catch (error) {
                cb({ status: "error", message: error.message });
                // console.log(error, ";;;;;;;;;;;;;");

            }
        })
    })
}
module.exports = socket