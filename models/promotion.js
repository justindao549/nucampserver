const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Currency = mongoose.Types.Currency;
const promotionSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		image: {
			type: String,
			required: true,
		},
		featured: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: false,
		},
		cost: {
			type: Currency,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);
const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
