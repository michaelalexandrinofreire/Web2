const express = require('express');
const { cadastrarPlaca, gerarRelatorio, consultarPlaca, upload } = require('../controllers/placaController');
const router = express.Router();

router.post('/cadastroPlaca', upload.single('foto'), cadastrarPlaca);
router.get('/relatorio/cidade/:cidade', gerarRelatorio);
router.get('/consulta/:placa', consultarPlaca);

module.exports = router;
