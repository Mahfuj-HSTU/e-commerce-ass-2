import { UpdateQuery } from 'mongoose';
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
  updatedProductData: UpdateQuery<Partial<TProduct>>
) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updatedProductData,
    { new: true }
  );
  return updatedProduct;
};

const deleteProductFromDb = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  return result;
};

const searchProductFromDb = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, 'i');
  const searchNumber = parseFloat(searchTerm);

  const result = await Product.find({
    $or: [
      { name: regex },
      { category: regex },
      { description: regex },
      { tags: { $in: [regex] } },
      { price: !isNaN(searchNumber) ? searchNumber : undefined },
    ].filter(Boolean),
  });

  return result;
};

export const ProductServices = {
  addProductIntotDb,
  getAllProductsFromDb,
  getSingleProductsFromDb,
  updateProductIntoDb,
  deleteProductFromDb,
  searchProductFromDb,
};
