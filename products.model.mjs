export default class ProductsModel {
    constructor(id, name, description, price, imageUrl) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.imageUrl = imageUrl;
    }
  
    static get() {
      return products;
    }

     static add(name,description,price,imageUrl){
         let newproduct=new ProductsModel(
          products.length+1,
          name,
          description,
          price,
          imageUrl);
          
         products.push(newproduct);
     }

     static getId(id){
      return products.find((product)=>product.id==id);
     }

     static updateProduct(productObj){
         
         const index=products.findIndex((product)=>product.id==productObj.id);
         products[index]=productObj;
         
     }

     static deleteproduct(id){
      const index=products.findIndex((product)=>product.id==id);
      products.splice(index,1);
     }

  }
  
  const products = [
    new ProductsModel(1, "Product 1", "Description for Product 1", 19.20, "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg"),
    new ProductsModel(2, "Product 2", "Description for Product 2", 29.99, "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg"),
    new ProductsModel(3, "Product 3", "Description for Product 3", 39.99, "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg"),
  ];