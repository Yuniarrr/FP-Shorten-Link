import admin from '../config/firebase-service-account.config.js';
import helper from '../utils/helper.util.js';

class Middleware {
	async decodeToken(req, res, next) {
		try {
			const token = req.headers.authorization.split(' ')[1];
			const decodeValue = await admin.auth().verifyIdToken(token);
			if (decodeValue) {
				req.user = decodeValue;
				return next();
			}
			return res.status(401).json({ 
				code: 401,
				message: 'Unauthorized'
			});
		} catch (error) {
			return res.status(500).json({
				code: 500,
				message: 'Internal Server Error',
				error
			});
		}
	};
	async checkPermission(req, res, next){
		console.log(req.user)
		return res.send({
			'checkPermission': true
		});
	};
	async reqURLValidation(req, res, next) {
		if (req.body.url === undefined) {
            return res.status(400).send({
                code: 400,
                message: 'Bad Request: Please provide a url'
            })
        } else if (!helper.validateUrl(req.body.url)) {
            return res.status(400).send({
                code: 400,
                message: 'Bad Request: Requested url is not valid'
            })
        } else {
            req.url = req.body.url;
			return next();
        }
	};
	async reqPathValidation(req, res, next) {
		if(req.body.path === undefined) {
            req.shorten_path = helper.generateRandomString(5);
			return next();
        } else if (!helper.validatePath(req.body.path)) {
            return res.status(400).send({
                code: 400,
                message: 'Bad Request: Requested path is not valid'
            })
        } else {
            req.shorten_path = req.body.path;
			return next();
        }
	};

}

export const middleware = new Middleware();