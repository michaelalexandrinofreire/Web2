const multer = require('multer');
const path = require('path');
const Placa = require('../models/placa');
const { reconhecerPlaca } = require('../services/ocrService');
const { gerarRelatorioPDF } = require('../services/pdfService');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

const cadastrarPlaca = async (req, res) => {
  try {
    const { cidade } = req.body;
    const arquivo = req.file.path;
    const placa = await reconhecerPlaca(arquivo);

    const novaPlaca = new Placa({ placa, cidade });
    await novaPlaca.save();

    fs.unlinkSync(arquivo);  // Remove o arquivo após o processamento
    res.status(201).json({ mensagem: 'Placa cadastrada com sucesso!' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao cadastrar placa', erro: error.message });
  }
};

const gerarRelatorio = async (req, res) => {
  try {
    const { cidade } = req.params;
    const placas = await Placa.find({ cidade });
    const outputPath = 'uploads/relatorio.pdf';

    gerarRelatorioPDF(placas, outputPath);
    res.download(outputPath, 'relatorio.pdf', (err) => {
      if (err) {
        res.status(500).json({ mensagem: 'Erro ao gerar PDF', erro: err.message });
      }
      fs.unlinkSync(outputPath);  // Remove o arquivo após o download
    });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao gerar relatório', erro: error.message });
  }
};

const consultarPlaca = async (req, res) => {
  try {
    const { placa } = req.params;
    const existePlaca = await Placa.exists({ placa });
    res.json({ existe: existePlaca ? true : false });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao consultar placa', erro: error.message });
  }
};

module.exports = { cadastrarPlaca, gerarRelatorio, consultarPlaca, upload };
