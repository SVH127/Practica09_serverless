export default {
  hashPassword: (password) => password,
  comparePassword: (password, hash) => password === hash
};
