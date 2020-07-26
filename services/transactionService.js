import mongoose from 'mongoose';
import { logger } from '../config/logger.js';
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
    const data = await tm.find({ yearMonth: period });

    if (!data) {
      res.status(404).send({ message: 'Nenhum lançamento encontrado' });
    }

    res.status(200).send({ data: data });
    logger.info(`GET /api/transaction?period=${period}`);
  } catch (err) {
    res.status(500).send({ data: 'Erro ao buscar pelo período' });
    logger.error(
      `GET /api/transaction?period=${period} - ${JSON.stringify(error.message)}`
    );
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await tm.findById({ _id: id });

    if (!data) {
      res.status(404).send({ message: `Lançamento ${id} não encontrado` });
    }

    res.status(200).send({ data: data });
    logger.info(`GET /api/transaction/id=${id}`);
  } catch (err) {
    res.status(500).send({ data: `Erro ao buscar pelo lançamento ${id}` });
    logger.error(
      `GET /api/transaction/id=${id} - ${JSON.stringify(error.message)}`
    );
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await tm.findByIdAndDelete({ _id: id });

    if (!data) {
      res
        .status(404)
        .send({ message: `Lançamento ${id} não encontrado para exclusão` });
    }

    res.status(200).send({ data: data });
    logger.info(`DELETE /api/transaction/id=${id}`);
  } catch (err) {
    res.status(500).send({ data: `Erro ao excluir lançamento ${id}` });
    logger.error(
      `DELETE /api/transaction/id=${id} - ${JSON.stringify(error.message)}`
    );
  }
};

const updateOne = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const { id } = req.params;

  try {
    const data = await tm.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (data.length < 1) {
      res
        .status(404)
        .send({ message: 'Nenhum lançamento encontrado para atualizar' });
    } else {
      res.send(data);
    }
    logger.info(`PUT /api/transaction/id=${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Erro ao atualizar o lançamento id: ' + id });
    logger.error(
      `PUT /api/transaction/id=${id} - ${JSON.stringify(error.message)}`
    );
  }
};

const create = async (req, res) => {
  const {
    category,
    day,
    description,
    month,
    type,
    value,
    year,
    yearMonth,
    yearMonthDay,
  } = req.body;

  const transaction = new tm({
    category,
    day,
    description,
    month,
    type,
    value,
    year,
    yearMonth,
    yearMonthDay,
  });

  try {
    await transaction.save(transaction);

    res.send({ message: 'Lançamento inserido com sucesso' });
    logger.info(`POST /api/transaction/`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /api/transaction/- ${JSON.stringify(error.message)}`);
  }
};

const getYearMonths = async (req, res) => {
  try {
    let data;
    await tm.distinct('yearMonth', function (error, ids) {
      // if (error) throw new Error('Erro => ' + error);
      data = ids;
    });

    if (!data) {
      res.status(404).send({ message: 'Nenhum período encontrado' });
    }

    res.status(200).send({ data: data });
    // logger.info(`GET /api/transaction?period=${period}`);
  } catch (err) {
    res.status(500).send({ data: 'Erro ao buscar períodos' });
    // logger.error(
    //   `GET /api/transaction?period=${period} - ${JSON.stringify(error.message)}`
    // );
  }
};

export default {
  findAll,
  findOne,
  deleteOne,
  getYearMonths,
  updateOne,
  create,
};
