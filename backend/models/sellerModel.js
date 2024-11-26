const {Schema, model} = require("mongoose");

const sellerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },     
    role: {
        type: String,
        default: 'seller'
    },
    status: {
        type: String,
        default: 'pending'
    },
    payment: {
        type: String,
        default: 'inactive'
    },
    method: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    shopInfo: {
        type: Object,
        default: {}
    },
  },
  { timestamps: true }
);


// We can serach it by the name or email
sellerSchema.index({
    name: 'text',
    email: 'text', 
},{
    weights: {
        name: 5, // 4 and 5 are priority. The priority is high then the name field
        email: 4, 
    }
});

module.exports = model("sellers", sellerSchema);    
