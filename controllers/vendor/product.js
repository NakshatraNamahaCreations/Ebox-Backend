const productSchema = require("../../models/vendor/product");

exports.addProduct = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);
    const {
      vendor_id,
      product_category,
      product_type,
      product_name,
      // product_image,
      //   product_video,
      product_price,
      mrp_rate,
      discount,
      brand,
      stock_in_hand,
      model_name,
      material_type,
      product_dimension,
      product_weight,
      country_of_orgin,
      warranty,
      manufature_name,
      product_color,
      Specifications,
    } = req.body;
    // Ensure Specifications are in the correct format
    let specificationsArray;
    try {
      specificationsArray = JSON.parse(Specifications);
    } catch (e) {
      return res.status(400).json({ message: "Invalid Specifications format" });
    }
    if (
      !Array.isArray(specificationsArray) ||
      specificationsArray.some((prop) => !prop.name || !prop.value)
    ) {
      return res.status(400).json({ message: "Invalid Specifications format" });
    }
    // Process images and video
    const product_image = req.files.images.map((file) => file.path);
    const product_video = req.files.video ? req.files.video[0].path : null;
    // Create a new product
    const newProduct = new productSchema({
      vendor_id,
      product_category,
      product_type,
      product_name,
      product_image,
      product_video,
      product_price,
      mrp_rate,
      discount,
      brand,
      stock_in_hand,
      model_name,
      material_type,
      product_dimension,
      product_weight,
      country_of_orgin,
      warranty,
      manufature_name,
      product_color,
      Specifications: specificationsArray, // This will include all the specifications
    });
    await newProduct.save();
    res
      .status(200)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const allProduct = await productSchema.find();

    if (allProduct.length < 0) {
      return res.status(404).json({ message: "products not found" });
    }
    res.status(200).json(allProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllRentalProduct = async (req, res) => {
  try {
    const allRentalProduct = await productSchema.find({ product_type: "sell" });
    if (allRentalProduct.length < 0) {
      return res.status(404).json({ message: "products not found" });
    }
    res.status(200).json(allRentalProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProduct = async (req, res) => {
  try {
    // let productId = req.params.id;
    const product = await productSchema.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: "products not found" });
    }
    res.status(200).json({ product: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllSellProduct = async (req, res) => {
  try {
    const allSellProduct = await productSchema.find({ product_type: "sell" });

    if (allSellProduct.length < 0) {
      return res.status(404).json({ message: "products not found" });
    }
    res.status(200).json({ allSellProduct: allSellProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.writeReview = async (req, res) => {
  // console.log("api hitting");
  try {
    // console.log("api hitting");
    const { user_id, user_name, review_title, review_description, ratings } =
      req.body;
    // if (
    //   !user_id ||
    //   !userName ||
    //   !review_title ||
    //   !review_description ||
    //   !ratings
    // ) {
    //   return res.status(400).json({ message: "Missing required fields" });
    // }
    // console.log("Request Body:", req.body);
    // console.log("Product ID:", req.params.id);

    let productId = req.params.id;
    // console.log("productId", productId);
    let findProduct = await productSchema.findOne({ _id: productId });
    if (!findProduct) {
      console.log("Product not found");
      return res.status(404).json({ message: "product not found" });
    }

    const rating = Number(ratings);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Invalid rating value. It should be between 1 and 5.",
      });
    }

    findProduct.Reviews.push({
      user_id,
      user_name,
      review_title,
      review_description,
      ratings: rating,
    });
    await findProduct.save();

    res.status(200).json({ message: "Review added successfully", findProduct });
  } catch (error) {
    console.error(error);
  }
};