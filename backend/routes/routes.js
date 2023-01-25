const express = require('express');
const routes =express.Router();
const Product=require('../models/products');
const {getAllproducts,getproductsbyID,addproducts,updateproduct,deleteprod} = require('../controllers/controllers');
routes.route('/products').get(getAllproducts);
routes.route('/products/:idprod').get(getproductsbyID);
routes.route('/addproducts').post(addproducts);
routes.route('/update/:idprod').post(updateproduct);
routes.route('/deleteprod').post(deleteprod);

module.exports= routes;

routes.get('/route',async (req,res)=>{
    const produits = await Product.find()
    res.status(200).json({
        success:true,
        
    })
})




