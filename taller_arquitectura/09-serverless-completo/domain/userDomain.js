module.exports = {
  hashPassword: (password) => password,
  comparePassword: (password, hash) => password === hash
};
