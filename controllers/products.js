const Product = require('../models/product');

exports.getAddProductPage = (req, res, next) => {
    res.render('add-product', {pageTitle: 'Add Product', 
    path: '/admin/add-product',
    activeAddProduct: true,
    productCSS: true,
    formsCSS: true
})
}; 

exports.postAddProductPage = (req, res, next) =>{ 
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProductsPage = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop', {
          prods: products,
          pageTitle: 'Shop',
          path: '/',
          hasProducts: products.length > 0,
          activeShop: true,
          productCSS: true
        });
      });
    // had to add a third argument above to evaluate and then pass a true or false value to the template shop.handlebars
    // This has the advantage of putting more of our logic in the node express code and keep it out of the template which 
    // can become very cluttered with logic and difficult to understand.
};