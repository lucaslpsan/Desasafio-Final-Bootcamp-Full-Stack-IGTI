import transactions from '../services/transactionService.js';
// const express = require('express');
import express from 'express';
const transactionRouter = express.Router();

transactionRouter.get('', transactions.findAll);

export { transactionRouter as routes };
