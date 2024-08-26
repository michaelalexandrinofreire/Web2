const Tesseract = require('tesseract.js');

const reconhecerPlaca = async (imagemPath) => {
  try {
    const { data: { text } } = await Tesseract.recognize(imagemPath, 'eng');
    return text.trim();
  } catch (error) {
    throw new Error('Erro ao reconhecer placa: ' + error.message);
  }
};

module.exports = { reconhecerPlaca };
