const {Schema, model} = require("mongoose");

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// We add this here because we will search category using it's name
categorySchema.index({
    name: 'text'
});

module.exports = model('categories',categorySchema);