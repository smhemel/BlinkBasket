const categoryModel = require('../../models/categoryModel');
const { responseReturn } = require("../../utiles/response");

class homeControllers{
    get_categories = async(req, res) => {
        try {
            const categories = await categoryModel.find({});

            responseReturn(res, 200, { categories });
        } catch (error) {
            
        }
    }
}

module.exports = new homeControllers();