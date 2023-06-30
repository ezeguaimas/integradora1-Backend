import mongoose from "mongoose";

const collection = "carts";

const schema = new mongoose.Schema({
    products: {
        type: Array,
        required: true,
    },
});

const cartsModel = mongoose.model(collection, schema);

export default cartsModel;
