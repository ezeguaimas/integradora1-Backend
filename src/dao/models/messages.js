import mongoose from "mongoose";

const collection = "messages";

const schema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: "El campo user debe tener un formato de email válido",
      },
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const messagesModel = mongoose.model(collection, schema);

export default messagesModel;
