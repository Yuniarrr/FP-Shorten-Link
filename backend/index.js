import { auth, db } from './config/firebase.config.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { middleware } from './middleware/index.js';
import helper from './utils/helper.util.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.get('/api', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    try {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return res.send({
                code: 200,
                message: "Login successfull",
                data: {
                    token: user.accessToken,
                    refreshToken: user.refreshToken,
                    expirationTime: user.expirationTime,
                }
            });
        })
        .catch((error) => {
            return res.status(400).send({
                code: 400,
                message: "Login failed",
                error

            });
        });
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Internal Server Error',
            error
        })
    }
});

app.post('/api/register', (req, res) => {
    const { email, password, cpassword } = req.body;

    if(password !== cpassword) {
        return res.status(400).json({
            code: 400,
            message: "Passwords don't match",
        });
    }

    try {
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            res.send({
                code: 200,
                message: "User registerered successfully",
                data: {
                    token: user.accessToken,
                    expirationTime: user.expirationTime,
                    refreshToken: user.refreshToken
                }
            })
        })
        .catch((error) => {
            res.status(400).send({
                code: 400,
                message: "User registerered failed",
                error,
            })
        });
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Internal Server Error',
            error
        })
    }
});

app.post('/api/links', middleware.decodeToken, middleware.reqURLValidation, middleware.reqPathValidation, (req, res) => {
    try {
        db.collection('links').add({
            user_id: req.user.user_id,
            url: req.url,
            path: req.shorten_path,
            created_at: + new Date(),
            updated_at: + new Date()
        })
        .then((docRef) => {
            return res.send({
                code: 200,
                message: 'Link created successfully',
                data: {
                    id: docRef.id,
                    user_id: req.user.user_id,
                    url: req.url,
                    path: req.shorten_path,
                }
            });
        })
        .catch((error) => {
            return res.status(500).send({
                code: 500,
                message: 'Internal Server Error: Failed to update database',
                error
            })
        });
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Internal Server Error',
            error
        })
    }
});

app.patch('/api/links', middleware.decodeToken, middleware.reqURLValidation, middleware.reqPathValidation, middleware.checkPermission, (req, res) => {
    try {
        db.collection('links').doc(req.body.id).update({
            url: req.url,
            path: req.shorten_path,
            updated_at: + new Date()
        })
        .then(() => {
            return res.send({
                code: 200,
                message: 'Link updated successfully',
                data: {
                    id: req.body.id,
                    user_id: req.user.user_id,
                    url: req.url,
                    path: req.shorten_path,
                }
            });
        })
        .catch((error) => {
            return res.status(500).send({
                code: 500,
                message: 'Internal Server Error: Failed to update database',
                error
            })
        });
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Internal Server Error',
            error
        })
    }
});

app.delete('/api/links', middleware.decodeToken, (req, res) => {
    try {
        db.collection('links').doc(req.body.id).delete()
        .then(() => {
            return res.send({
                code: 200,
                message: 'Link deleted successfully',
            });
        })
        .catch((error) => {
            return res.status(500).send({
                code: 500,
                message: 'Internal Server Error: Failed to update database',
                error
            })
        });
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Internal Server Error',
            error
        })
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});