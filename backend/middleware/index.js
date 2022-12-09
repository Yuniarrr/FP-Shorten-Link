import admin from '../config/firebase-service-account.config.js';
import helper from '../utils/helper.util.js';
import { auth, db } from '../config/firebase.config.js';

class Middleware {
	async decodeToken(req, res, next) {
		try {
			const session = req.headers.authorization.split('Bearer ')[1];
			const decodeValue = await admin.auth().verifySessionCookie(session);
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
		let link;
		await db.collection('links').doc(req.body.id).get()
		.then((doc) => {
			link = doc.data();
		})
		.catch((error) => {
			return res.status(500).send({
				code: 500,
				message: 'Internal Server Error: Failed to get data from database',
				error
			})
		});

		if(link.user_id !== req.user.user_id) {
			return res.status(403).send({
				code: 403,
				message: 'Forbidden: You do not have permission to access this resource'
			});
		}

		return next();
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
		db.collection('links').where('path', '==', (req.body.path === undefined ? "" : req.body.path)).get()
		.then((querySnapshot) => {
			if (querySnapshot.empty) {
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
			} else {
				return res.status(400).send({
					code: 400,
					message: 'Bad Request: Requested path is already taken'
				})
			}
		})
		.catch((error) => {
			return res.status(500).send({
				code: 500,
				message: 'Internal Server Error: Failed to get data from database',
				error
			})
		});
	};

}

export const middleware = new Middleware();