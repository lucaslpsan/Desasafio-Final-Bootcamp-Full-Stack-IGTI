// const mongoose = require('mongoose');
// import mongoose from 'mongoose';

export default (mongoose) => {
  let schema = mongoose.Schema({
    description: String,
    value: Number,
    category: String,
    year: Number,
    month: Number,
    day: Number,
    yearMonth: String,
    yearMonthDay: String,
    type: String,
  });

  return mongoose.model('transaction', schema);
};
// const TransactionModel = mongoose.model('transaction', schema);

// export default { TransactionModel };
