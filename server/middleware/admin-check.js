const pool = require('./../databasePool');

module.exports = (req, res, next) => {
  const { email, admin } = req.body;
  if (email && admin) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, email,"adminPrivileges" FROM account WHERE email = $1`,
        [email],
        (err, response) => {
          if (response.rows.length && response.rows[0].adminPrivileges) {
            resolve(true);
            next();
          } else {
            const error = new Error('Forbidden ');
            error.status = 403;
            reject(err);
            next(error);
          }
        }
      );
    });
  } else {
    const error = new Error('AUTHENTICATION_REQUIRED');
    error.status = 401;
    next(error);
  }
  // Checks if the user is an admin
};
