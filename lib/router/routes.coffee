module.exports =
  index: new RegExp /\/$/
  all: '/*'
  healthCheck: new RegExp /\/health-check$/
  register: new RegExp /\/register$/
  login: new RegExp /\/login$/
  newPaste: new RegExp /\/new$/
<<<<<<< HEAD
  paste: new RegExp /\/paste/
  pastes: '/echo'
=======
  paste: new RegExp /\/paste\/.+/
>>>>>>> master
