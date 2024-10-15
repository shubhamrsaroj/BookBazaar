import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import ProductsController from './src/controller/products.controller.mjs'; 

import Usercontroller from './src/controller/user.controller.mjs';

import path from 'path';
import validation from './src/middleware/validation.middleware.js';
import {uploadFile} from './src/middleware/file-upload.middleware.js';
import session from 'express-session';
import { cookie } from 'express-validator';
import { auth } from './src/middleware/auth.middleware.mjs';

import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middleware/lastVisit.middleware.js';

const server=express();


server.set("view engine","ejs");

server.set("views",path.join(path.resolve(),'src','views'));


server.use(session({
    secret:'SecretKey',
    resave:'false',
    saveUninitialized:'true',
    cookie:{secure:false},

}))


server.use(cookieParser());



server.use(expressEjsLayouts);

server.use(express.static('public'));

server.use(express.urlencoded({extended:true}));  // the code is converted to json format 

const products=new ProductsController();

const usercontroller=new Usercontroller();


server.get('/',auth,setLastVisit,products.getProducts);

server.get('/new',auth,products.getaddform);

server.get('/',auth,products.addNewProduct);

server.post('/',auth,uploadFile.single('imageUrl'),validation,products.addNewProduct);

server.post('/updateproduct',auth,products.postUpdateProductResponse);

server.get('/updateproduct/:id',auth,products.getupdateproduct);

server.post('/deleteproducts/:id',auth,products.deleteproducts);


server.get('/registration', usercontroller.getRegistration);
server.post('/registration', usercontroller.postRegistration);
server.get('/login', usercontroller.getLogin);
server.post('/login', usercontroller.postLogin);

server.get('/logout',usercontroller.logout);

server.listen(3005);




=======

import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import ProductsController from './src/controller/products.controller.mjs'; 

import Usercontroller from './src/controller/user.controller.mjs';

import path from 'path';
import validation from './src/middleware/validation.middleware.js';
import {uploadFile} from './src/middleware/file-upload.middleware.js';
import session from 'express-session';
import { cookie } from 'express-validator';
import { auth } from './src/middleware/auth.middleware.mjs';

import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middleware/lastVisit.middleware.js';

const server=express();


server.set("view engine","ejs");

server.set("views",path.join(path.resolve(),'src','views'));


server.use(session({
    secret:'SecretKey',
    resave:'false',
    saveUninitialized:'true',
    cookie:{secure:false},

}))


server.use(cookieParser());



server.use(expressEjsLayouts);

server.use(express.static('public'));

server.use(express.urlencoded({extended:true}));  // the code is converted to json format 

const products=new ProductsController();

const usercontroller=new Usercontroller();


server.get('/',auth,setLastVisit,products.getProducts);

server.get('/new',auth,products.getaddform);

server.get('/',auth,products.addNewProduct);

server.post('/',auth,uploadFile.single('imageUrl'),validation,products.addNewProduct);

server.post('/updateproduct',auth,products.postUpdateProductResponse);

server.get('/updateproduct/:id',auth,products.getupdateproduct);

server.post('/deleteproducts/:id',auth,products.deleteproducts);


server.get('/registration', usercontroller.getRegistration);
server.post('/registration', usercontroller.postRegistration);
server.get('/login', usercontroller.getLogin);
server.post('/login', usercontroller.postLogin);

server.get('/logout',usercontroller.logout);

server.listen(3005);
