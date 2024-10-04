import path from 'path';
import ProductsModel from '../models/products.model.mjs';
import { error } from 'console';


export default class ProductsController{

    getProducts(req,res){
       let products = ProductsModel.get();
       console.log(products);

      
        res.render("products",{products:products,userEmail:req.session.userEmail});  // first is html templ
    }

    //adding form
    getaddform(req,res){
        return res.render("newproduct",{errorMessage:null,userEmail:req.session.userEmail},);
    }

    //addnew product

    addNewProduct(req,res,next){
        console.log(req.body);
        
        const {name,description,price}=req.body;
        const imageUrl='images/'+req.file.filename;
        ProductsModel.add(name,description,price,imageUrl);
        let products = ProductsModel.get()
        return res.render('products',{products,userEmail:req.session.userEmail})
        
    }

    getupdateproduct(req,res,next){

        const id=req.params.id;   

        const productfind=ProductsModel.getId(id);

        if(productfind){
            return res.render('updateproduct',{product:productfind,errorMessage:null,userEmail:req.session.userEmail});
        }
        else{
            return res.status(404).send("Product not found");
        }

    }


    deleteproducts(req,res,next){

        const id=req.params.id;   
        const productfind=ProductsModel.getId(id);

        if(!productfind){
            return res.status(404).send("Product not found");
        }


        ProductsModel.deleteproduct(id);
        var products=ProductsModel.get();
        return res.render("products",{products,userEmail:req.session.userEmail});
        


    }





    postUpdateProductResponse(req,res){
        
        ProductsModel.updateProduct(req.body);  
        let products = ProductsModel.get()
        return res.render('products',{products,userEmail:req.session.userEmail})

    }





}


