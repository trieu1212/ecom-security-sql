const db = require('../orm/models/index');
const ProductController = {
  getAllProduct: async(req,res)=>{
    const limit = req.query.limit
    try {
      const product = await db.Product.findAll(
        {attributes:['id','title','description','image','price','inStock'],
        limit: limit ? parseInt(limit) : 10},
      );
      res.status(200).json(product)
    }catch(err){
      res.status(500).json(err)
    }
  },
  getOneProduct: async(req,res)=>{
    const id = req.params.id
    try {
      const product = await db.Product.findByPk(id,
        {
          include:[
            {
              model:db.Category,
              attributes:['id','name']
            }
          ]
        }
      )
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json({message:error.message})
    }
  }
  // getAllProduct: async (req, res) => {
  //   const qNew = req.query.new;
  //   const qCategory = req.query.category;
  //   try {
  //     let products;

  //     if (qNew) {
  //       products = await productModel.find().sort({ createdAt: -1 }).limit(1);
  //     } else if (qCategory) {
  //       products = await productModel.find({
  //         categories: {
  //           $in: [qCategory],
  //         },
  //       });
  //     } else {
  //       products = await productModel.find();
  //     }

  //     res.status(200).json(products);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
  // createProduct:async(req,res)=>{
  //   const newProduct = new productModel(req.body);
  //   try {
  //     const product = await newProduct.save();
  //     res.status(201).json(product);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // }
};

module.exports = ProductController;