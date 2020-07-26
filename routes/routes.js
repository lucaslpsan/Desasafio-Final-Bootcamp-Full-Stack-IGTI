import transactions from '../services/transactionService.js';
import express from 'express';
const transactionRouter = express.Router();

transactionRouter.get('', transactions.findAll);
transactionRouter.get('/periods', transactions.getYearMonths);
transactionRouter.get('/:id', transactions.findOne);
transactionRouter.put('/:id', transactions.updateOne);
transactionRouter.post('', transactions.create);
transactionRouter.delete('/:id', transactions.deleteOne);

export { transactionRouter as routes };
