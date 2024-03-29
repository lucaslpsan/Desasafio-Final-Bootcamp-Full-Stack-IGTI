export default (mongoose) => {
  let schema = mongoose.Schema({
    description: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
    yearMonth: {
      type: String,
      required: true,
    },
    yearMonthDay: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  });

  return mongoose.model('transaction', schema);
};
