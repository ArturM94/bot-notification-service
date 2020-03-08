const axios = require('axios');

const { TELEGRAM_API } = require('../constants');
const logger = require('../helpers/logger');

/**
 * Sends message to user by chat id via Telegram API.
 *
 * @param {number} chatId Recipient chat id
 * @param {string} text Message to send
 */
const sendMessage = async (chatId, text) => {
  try {
    const URL = `${TELEGRAM_API}/sendMessage`;
    const data = {
      chat_id: chatId,
      text,
    };

    const response = await axios.post(URL, data);

    logger.info(`${response.status}: ${response.statusText}`);
  } catch (error) {
    logger.error(error.response.data.description);
  }
};

/**
 * Sends message with image to user by chat id via Telegram API.
 *
 * @param {number} chatId Recipient chat id
 * @param {string} text Message to send
 * @param {string} image Image to sent
 */
const sendPhoto = async (chatId, text, image) => {
  try {
    const URL = `${TELEGRAM_API}/sendPhoto`;
    const params = {
      chat_id: chatId,
      photo: image,
      caption: text,
    };

    const response = await axios.post(URL, {}, { params });

    logger.info(`${response.status}: ${response.statusText}`);
  } catch (error) {
    logger.error(error.response.data.description);
  }
};

/**
 * Sends sticker to user by chat id via Telegram API.
 *
 * @param {number} chatId Recipient chat id
 * @param {string} sticker Sticker to send
 */
const sendSticker = async (chatId, sticker) => {
  try {
    const URL = `${TELEGRAM_API}/sendSticker`;

    const params = {
      chat_id: chatId,
      sticker,
    };

    const response = await axios.post(URL, {}, { params });

    logger.info(`${response.status}: ${response.statusText}`);
  } catch (error) {
    logger.error(error.response.data.description);
  }
};

module.exports = { sendMessage, sendPhoto, sendSticker };
