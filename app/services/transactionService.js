// const mongoose = require('mongoose');
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
// const TransactionModel = require('../models/TransactionModel');
import TransactionModel from '../models/TransactionModel.js';

const tm = TransactionModel(mongoose);

const findAll = async (req, res) => {
  const { period } = req.query;
  try {
    const result = await tm.find({ yearMonth: period });
    res.status(200).send({ data: result });
  } catch (err) {
    res.status(500).send({ data: 'Erro ao buscar pelo período' });
  }
};

export default { findAll };
