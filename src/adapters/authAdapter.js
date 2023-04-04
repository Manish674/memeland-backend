const auth = require('../use-cases/auth');

console.log('auth use case --> ', auth);

const authAdapter = (() => {
  const { register, login } = auth

  return {
    login: () => login(),
    register: () => register()
  }
})();


module.exports = authAdapter;
// Framework -> adapters -> useCases -> Entities
