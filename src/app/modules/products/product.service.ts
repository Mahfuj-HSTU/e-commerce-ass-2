import { TProduct } from './product.interface';
import { Product } from './product.model';

const addProductIntotDb = async (productData: TProduct) => {
  const product = new Product(productData);

  const result = await product.save();
  return result;
};

const getAllProductsFromDb = async () => {
  const result = await Product.find();
  return result;
};
const getSingleProductsFromDb = async (productId: string) => {
  const result = await Product.findOne({ _id: productId });
  // console.log(result);
  return result;
};

const updateProductIntoDb = async (
  productId: string,
  updatedProductData: TProduct
) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updatedProductData,
    { new: true }
  );
  return updatedProduct;
};

export const ProductServices = {
  addProductIntotDb,
  getAllProductsFromDb,
  getSingleProductsFromDb,
  updateProductIntoDb,
};
