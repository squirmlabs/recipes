const queryADatabase = function(mysql, query) {
  return new Promise((resolve, reject) => {
    mysql.query(query, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

/**
 * What we're doing here is creating a promise that resolves or rejects
 * based on the outcome of an SQL query.
 * Breaking it down, our outermost function
 * takes a database instance and an SQL query.
 * That function will return a promise.
 * That promise will reject if the SQL query throws
 * resolve if the query goes through successfully.
 * */
