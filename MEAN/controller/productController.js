/* -------------------------------------------------------------------------- */
/*                                Imports here                                */
/* -------------------------------------------------------------------------- */
//TODO: Test all routes STATUS:WORKING


//@desc   add product
//@route  POST /product/addProduct
//@access Public
// add product to database
const addProduct = async (req, res, next) => {
    try {
        const product = await products.create(req.body);
        res.status(201).json({
            success: true,
            data: product,
            message: 'Product added'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Invalid product data'
        });
    }
}

//@desc   edit product
//@route  PUT /product/edit/:id
//@access Public
// edit product
const editProduct = async (req, res, next) => {
    res.status(200).send("Edit product stub")
}

//@desc   delete product
//@route  DELETE /product/deleteProduct/:id
//@access Public
//delete product
const deleteProduct = async (req, res, next) => {
    res.status(200).send("Delete product stub")
}

//@desc   view product
//@route  GET /product/viewProduct/:id
//@access Public
//view product
const viewProduct = async (req, res, next) => {
    res.status(200).send("View product stub")
}

/* -------------------------- ANCHOR module section ------------------------- */

module.exports = {
    addProduct,
    editProduct,
    deleteProduct,
    viewProduct
};