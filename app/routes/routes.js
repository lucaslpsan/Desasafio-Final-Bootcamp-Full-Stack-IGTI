import transactions from '../services/transactionService.js';
// const express = require('express');
import express from 'express';
const transactionRouter = express.Router();

transactionRouter.get('', transactions.findAll);
transactionRouter.get('/periods', transactions.getYearMonths);
transactionRouter.get('/:id', transactions.findOne);

export { transactionRouter as routes };
