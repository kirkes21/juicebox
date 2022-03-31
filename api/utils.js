function requireUser(req, res, next) {
    if (!req.user) {
        next({
            name: "MissingUserError",
            message: "You must be logged in to perform this action"
        });
    }

    next();
}

function requireActiveUser(req, res, next) {
    if (!req.user.active) {
        next({
            name: "UserInactiveError",
            message: "You must have an active user account to perform this action"
        });
    }

    next();
}

module.exports = {
    requireUser,
    requireActiveUser
}