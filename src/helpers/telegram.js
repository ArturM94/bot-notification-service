const axios = require('axios');

const { TELEGRAM_API } = require('../constants');

/**
 * Sends message to user by chat id via Telegram API.
 *
 * @param {number} chatId - recipient chat id
 * @param {string} text - message to send
 */
const sendMessage = async (chatId, text) => {
  try {
    const URL = `${TELEGRAM_API}/sendMessage`;
    const data = {
      chat_id: chatId,
      text,
    };

    const response = await axios.post(URL, data);

    console.log(response.status, response.statusText);
  } catch (error) {
    console.error(error.response.data.description);
  }
};

/**
 * Sends message with attachments to user by chat id via Telegram API.
 *
 * @param {number} chatId - recipient chat id
 * @param {string} text - message to send
 * @param {string} attachments - attachments to sent
 */
const sendPhoto = async (chatId, text, attachments) => {
  try {
    const URL = `${TELEGRAM_API}/sendPhoto`;
    const params = {
      chat_id: chatId,
      photo: attachments,
      caption: text,
    };

    const response = await axios.post(URL, {}, { params });

    console.log(response.status, response.statusText);
  } catch (error) {
    console.error(error.response.data.description);
  }
};

module.exports = { sendMessage, sendPhoto };
