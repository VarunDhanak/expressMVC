const Cart = require('../models/cart');
const cart = require('../models/cart');
const Product = require('../models/products');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows]) =>{
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err =>{
    console.log(err)
  });
};

exports.getProductByFetch = (req,res, next) =>{
  const prodId = req.params.productId;
  console.log(res);
  Product.findById(prodId)
    .then(([product]) =>{
      console.log(product,"++++")
      res.render('shop/product-details', {
        product:product[0], 
        pageTitle:product.title,
        path:'/products'
      })
    })
    .catch(err => {
    console.log(err)
  });
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(([rows, fieldData]) =>{
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch( err =>{
    console.log(err)
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart =>{
      Product.fetchAll(products =>{
        const cartProduct = [];
        for(product of products){
          const cartproductData = cart.products.find(prod => prod.id === product.id)
          if(cartproductData){
            cartProduct.push({productData:product, qty: cartproductData.qty});
          }
        }
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products:cartProduct
      });
    });
  });
};

exports.postCart = (req, res, next) =>{
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  console.log(prodId);
  res.redirect('/cart');
};

exports.postCartdeleteProduct = (req,res,next) =>{
  const prodId = req.body.productId;
  Product.findById(prodId, product =>{
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Order'
  });
};


exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};