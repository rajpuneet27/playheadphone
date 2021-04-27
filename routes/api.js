const express = require("express");

const router = express.Router();

const CartItems = require("../models/CartItems")

//Routes
router.get('/something',(req,res)=>{
    res.json({message:"something"});
})

router.get('/', (req, res) => {

    CartItems.find({ })
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log("error: ", error);
    })
});


// Delete the data
router.post('/delete/:id',(req,res)=>{
    CartItems.findByIdAndRemove(req.params.id,(err)=>{
        if(err){
            console.log(err);
        }
        else{
            CartItems.find({ })
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                console.log("error: ", error);
            })
        }
    });
    
})


// Update the data
router.post("/update/:id", async (req, res) => {
	try {
		const CartItem = await CartItems.findOne({ _id: req.params.id })

		if (req.body.qty) {
			CartItem.qty = req.body.qty
            console.log("XXXXXXXXXXXXXXXXX")
		}
		await CartItem.save()
		// res.send(CartItem)
        CartItems.find({ })
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                console.log("error: ", error);
            })
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})


//Save the data
router.post('/save', (req, res) => {
    console.log('Body: ', req.body);
    const data = req.body;

    const newCartItem = new CartItems(data);

    //save
    newCartItem.save((error) => {
        if(error){
            res.status(500).json({
                msg: 'Sorry, Internal Server error'
            })
        }
        else{
            res.json({
                msg: "we received your data!!!"
            })
        }
    })


    
});

module.exports = router;