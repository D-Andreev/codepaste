module.exports =
  healthCheck: require './health_check'
  index: require './app'
  register: require './register'
  login: require './login'
  newPaste: require './newpaste'
  paste: require './paste'
  pastes: require './pastes'
  validate: require './validate'
