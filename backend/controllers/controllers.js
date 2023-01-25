
let Product = require('../models/products');
exports.getAllproducts = async (req,res)=>{
    const produits = await Product.find()
    res.status(200).json({
        success:true,
        count:produits.lenght,
        produits
    })
}
exports.addproducts = async (req,res)=>{
const produit=new Product(req.body)
await produit.save()
res.status(200).json({
    succes:true,
    produit
})
}

exports.getproductsbyID = async (res,req)=>{
   const produit = await Produit.findone({
    _id :req.params.idprod
})
    res.status(200 ).json({
        succes:true,
        produit
    })
}
exports.updateproduct =async (req,res)=>{
    const update_prod =await Product.updateOne({ _id:req.params.idprod},
        {
            $set:req.body
        })
        res.status(200 ).json({
            succes:true,
            update_prod
        })
}
exports.deleteprod =async(req,res)=>{
    const del_prod= await Produit.deleteOne(
        {_id:req.params.idprod}
        )
        res.status(200 ).json({
            delete:true,
           del_prod
        })
}


