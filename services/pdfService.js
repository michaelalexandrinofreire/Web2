const PDFDocument = require('pdfkit');
const fs = require('fs');

const gerarRelatorioPDF = (placas, outputPath) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(outputPath));

  doc.fontSize(12).text('Relatório de Placas');

  placas.forEach(placa => {
    doc.text(`Placa: ${placa.placa}, Cidade: ${placa.cidade}, Data e Hora: ${placa.dataHora}`);
  });

  doc.end();
};

module.exports = { gerarRelatorioPDF };
