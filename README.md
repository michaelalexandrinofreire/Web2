# Projeto de Cadastro de Placas

## Descrição

Este projeto é uma API para cadastro e relatório de placas de veículos. A API utiliza Node.js com Express, MongoDB para armazenamento de dados e Tesseract.js para reconhecimento de texto (OCR). Também gera relatórios em PDF usando PDFKit.

## Endpoints

- `POST /cadastroPlaca`: Envia uma foto e o nome de uma cidade para cadastrar uma placa.
- `GET /relatorio/cidade/:cidade`: Gera um relatório em PDF com os registros de placas de uma cidade específica.
- `GET /consulta/:placa`: Consulta se uma placa está registrada no banco de dados.

## Instalação

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
