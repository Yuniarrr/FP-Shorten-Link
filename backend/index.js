import { auth, db } from './config/firebase.config.js';
import admin from './config/firebase-service-account.config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { middleware } from './middleware/index.js';
import helper from './utils/helper.util.js';

const app = express();
const port = 3000;

const corsOptions = {
    origin: 'http://localhost',
    credentials: true,
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
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
            return user
        })
        .then((user) => {
            admin.auth().createSessionCookie(user.accessToken, { expiresIn: 60 * 60 * 24 * 5 * 1000 })
            .then((sessionCookie) => {
                const options = { maxAge: 60 * 60 * 24 * 5 * 1000, httpOnly: true, secure: true };
                return res.send({
                    code: 200,
                    message: "Login successfull",
                    result: {
                        session: sessionCookie,
                        options
                    }
                })
            })
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
        admin.auth().createUser({
            email: email,
            emailVerified: false,
            password: password,
            displayName: 'User',
            disabled: false
        })
        .then((userRecord) => {
            res.send({
                code: 200,
                message: "User registerered successfully",
                result: {
                    userRecord
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

app.post('/api/signout', middleware.decodeToken, (req, res) => {
    admin.auth().revokeRefreshTokens(req.user.sub)
    .then(() => {
        return admin.auth().getUser(req.user.user_id)
    })
    .then((userRecord) => {
        return res.send({
            code: 200,
            message: 'User record fetched successfully',
            result: {
                userRecord
            }
        })
    })
    .catch((error) => {
        return res.status(500).send({
            code: 500,
            message: 'Internal Server Error',
            error
        })
    });
})

app.post('/api/links', (req, res) => {
    try {
        db.collection('links').where('path', '==', req.body.path).get()
        .then((querySnapshot) => {
            if(querySnapshot.empty) {
                return res.status(404).send({
                    code: 404,
                    message: 'Link not found',
                })
            }
            querySnapshot.forEach((doc) => {
                db.collection('logs').add({
                    link_id: doc.id,
                    ip: req.ip,
                    user_agent: req.headers['user-agent'],
                    timestamp: + new Date(),
                });
                return res.send({
                    code: 200,
                    message: 'Link fetched successfully',
                    result: {
                        url: doc.data().url,
                        path: doc.data().path,
                    }
                });
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


app.put('/api/links', middleware.decodeToken, middleware.reqURLValidation, middleware.reqPathValidation, (req, res) => {
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
                result: {
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
                result: {
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