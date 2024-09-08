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

export const ProductServices = {
  addProductIntotDb,
  getAllProductsFromDb,
};
