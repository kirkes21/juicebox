const express = require('express');
const server = express()
const apiRouter = express.Router();
const usersRouter = require('./users')
const postsRouter = require('./posts');
const tagsRouter = require('./tags')

apiRouter.use('/users', usersRouter)
apiRouter.use('/posts', postsRouter)
apiRouter.use('/tags', tagsRouter)

server.use(async (req, res, next) => {
    const prefix = 'Bearer '
    const auth = req.headers['Authorization'];

    if (!auth) {
        next(); // don't set req.user, no token was passed in
    }

    if (auth.startsWith(prefix)) {
        // recover the token
        const token = auth.slice(prefix.length);
        try {
            // recover the data
            const { id } = jwt.verify(data, 'secret message');

            // get the user from the database
            const user = await getUserById(id);
            // note: this might be a user or it might be null depending on if it exists

            // attach the user and move on
            req.user = user;

            next();
        } catch (error) {
            // there are a few types of errors here
        }
    }
})

module.exports = apiRouter