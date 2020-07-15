import mongoose from 'mongoose';
import TransactionModel from './TransactionModel';
// import gradesModel from './gradesModel.js';

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.grades = TransactionModel;

export { db };
