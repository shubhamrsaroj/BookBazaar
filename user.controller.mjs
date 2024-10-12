import UserModel from "../models/user.model.mjs";
import ProductsModel from '../models/products.model.mjs';

export default class UserController {
    getRegistration(req, res) {
        res.render('registration');
    }

    getLogin(req, res) {
        res.render('login', { errorMessage: null });
    }

    postRegistration(req, res) {
        const { name, email, password } = req.body;
        UserModel.add(name, email, password);
        res.render('login', { errorMessage: 'User registered successfully. Please login.' });
    }

    postLogin(req, res) {
        const { email, password } = req.body;
       
        const user = UserModel.isValidUser(email, password);
        if (!user) {
            
            return res.render('login', { errorMessage: 'Invalid Credentials' });
        }

        req.session.userEmail=email;
        
    
        let products = ProductsModel.get();
        res.render('products', { products ,userEmail:req.session.userEmail});
    }


    logout(req,res){
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }
            else{

                res.redirect('/login');

            }
        })

        res.clearCookie('lastVisit');
    }
}