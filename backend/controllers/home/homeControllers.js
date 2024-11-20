const productModel = require('../../models/productModel');
const categoryModel = require('../../models/categoryModel');
const { responseReturn } = require("../../utiles/response");
const queryProducts = require('../../utiles/queryProducts');

class homeControllers {
    formatProduct = (products) => {
        const productArray = [];
        let i = 0;

        while (i < products.length) {
            let temp = [], j = i;

            while (j < i + 3) {
                if (products[j]) temp.push(products[j]);
                j++;
            }

            productArray.push([...temp]);
            i = j
        }

        return productArray;
    }

    get_categories = async(req, res) => {
        try {
            const categories = await categoryModel.find({});

            responseReturn(res, 200, { categories });
        } catch (error) {
            
        }
    }

    get_products = async(req, res) => {
        try {
            const products = await productModel.find({}).limit(12).sort({createdAt: -1});
            const allProduct1 = await productModel.find({}).limit(9).sort({createdAt: -1});
            const latest_product = this.formateProduct(allProduct1);
            
            const allProduct2 = await productModel.find({}).limit(9).sort({rating: -1});
            const topRated_product = this.formateProduct(allProduct2);
           
            const allProduct3 = await productModel.find({}).limit(9).sort({discount: -1});
            const discount_product = this.formateProduct(allProduct3);

            responseReturn(res, 200, {
                products,
                latest_product,
                topRated_product,
                discount_product
            });
            
        } catch (error) {

        }
    }

    price_range_product = async (req, res) => {
        try {
            const priceRange = { low: 0, high: 0 };
            const products = await productModel.find({}).limit(9).sort({ createdAt: -1 });
            const latest_product = this.formateProduct(products);

            const getForPrice = await productModel.find({}).sort({ 'price': 1 });
            if (getForPrice.length > 0) {
                priceRange.high = getForPrice[getForPrice.length - 1].price;
                priceRange.low = getForPrice[0].price;
            }

            responseReturn(res, 200, {
                latest_product,
                priceRange
            });
        } catch (error) { }
    }

    query_products = async (req, res) => {
        const parPage = 12;
        req.query.parPage = parPage;

        try {
            const products = await productModel.find({}).sort({ createdAt: -1 });

            const totalProduct = new queryProducts(products, req.query).categoryQuery().ratingQuery().priceQuery().sortByPrice().countProducts();
            const result = new queryProducts(products, req.query).categoryQuery().ratingQuery().priceQuery().sortByPrice().skip().limit().getProducts();
            
            responseReturn(res, 200, { products: result, totalProduct, parPage });
        } catch (error) {
            
        }
    }
}

module.exports = new homeControllers();