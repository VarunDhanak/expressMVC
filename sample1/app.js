const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(__filename),'data', 'cart.json');

class Cart{
    constructor(index, name, description, price, qty){
        this.index = index
        this.name = name;
        this.description = description;
        this.price = price;
        this.qty = qty;
    }

    static addproduct(products){
        fs.readFile(p, (err,data)=>{

            let cart = {products:{}, price:0}
            let cartNew = {products:[{index:products.index, products:products.name,description:products.description, qty:products.qty}],
                        price:(products.price*products.qty)}
            if (!err){
                cart = JSON.parse(data);
                //console.log(cart);
                const existingProductIndex = cart.products.findIndex(prod => prod.index === products.index)
                const existingProduct = cart.products[existingProductIndex]
                let updatedProduct;
                
                if(existingProduct){
                    updatedProduct = {...existingProduct};
                    updatedProduct.qty = updatedProduct.qty + products.qty;
                    cart.products[existingProductIndex] = updatedProduct
                    cart.price = cart.price + cartNew.price;
                    console.log(cart);
                }else{
                    cart.products = [...cart.products, ...cartNew.products]
                    cart. price = cart.price + cartNew.price;
                    console.log(cart);
                }
                fs.writeFile(p, JSON.stringify(cart), err =>{
                    if(err){
                        console.log(err);
                    }
                })
            }else{
                fs.writeFile(p, JSON.stringify(cartNew), err =>{
                    if(err){
                        console.log(err);
                    }
                })
            }


        })

    }
}

const productsData = new  Cart('12356','Nike','pants',23, 2)
Cart.addproduct(productsData)