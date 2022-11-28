const express = require('express');
const authenticate = require('../authenticate');
const Partner = require('../models/partner');
const partnerRouter = express.Router();
const cors = require('./cors');

partnerRouter
	.route('/')
	.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
	.get(cors.cors, (req, res, next) => {
		Promotion.find()
			.then((promotion) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(promotion);
			})
			.catch((err) => next(err));
		Partner.find()
			.then((partner) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(partner);
			})
			.catch((err) => next(err));
	})
	.post(
		cors.corsWithOptions,
		authenticate.verifyUser,
		authenticate.verifyAdmin,
		(req, res, next) => {
			Partner.create(req.body)
				.then((partner) => {
					console.log('partner Created', partner);
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(partner);
				})
				.catch((err) => next(err));
		}
	)
	.put(
		cors.corsWithOptions,
		authenticate.verifyUser,
		authenticate.verifyAdmin,
		(req, res) => {
			res.statusCode = 403;
			res.end('PUT operation not supported on /partners');
		}
	)
	.delete(
		cors.corsWithOptions,
		authenticate.verifyUser,
		authenticate.verifyAdmin,
		(req, res, next) => {}
	);

partnerRouter
	.route('/:partnerId')
	.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
	.get(cors.cors, (req, res, next) => {
		Partner.findById(req.params.partnerId)
			.then((partner) => {
				if (partner) {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(partner);
				} else {
					err = new Error(`partner ${req.params.partnerId} not found`);
					err.status = 404;
					return next(err);
				}
			})
			.catch((err) => next(err));
	})
	.post(
		cors.corsWithOptions,
		authenticate.verifyUser,
		authenticate.verifyAdmin,
		(req, res, next) => {
			Partner.findById(req.params.partnerId)
				.then((partner) => {
					if (partner) {
						partner.comments.push(req.body);
						partner
							.save()
							.then((partner) => {
								res.statusCode = 200;
								res.setHeader('Content-Type', 'application/json');
								res.json(partner);
							})
							.catch((err) => next(err));
					} else {
						err = new Error(`Partner ${req.params.partnerId} not found`);
						err.status = 404;
						return next(err);
					}
				})
				.catch((err) => next(err));
		}
	)
	.put(
		cors.corsWithOptions,
		authenticate.verifyUser,
		authenticate.verifyAdmin,
		(req, res) => {}
	)
	.delete(
		cors.corsWithOptions,
		authenticate.verifyUser,
		authenticate.verifyAdmin,
		(req, res, next) => {
			Promotion.findByIdAndDelete(req.params.promotionId)
				.then((response) => {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(response);
				})
				.catch((err) => next(err));
		}
	);

module.exports = partnerRouter;
