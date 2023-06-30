import messagesModel from "../models/messages.js";

export async function getMessages() {
  try {
    const messages = await messagesModel.find().lean();
    return messages;
  } catch (error) {
    throw new Error({ error: "Error al obtener los mensajes" });
  }
}

export async function sendMessage(user, message) {
  try {
    const newMessage = await messagesModel.create(user, message);
    return newMessage;
  } catch (error) {
    throw new Error({ error: "Error al enviar el mensaje" });
  }
}

export default { getMessages, sendMessage };
