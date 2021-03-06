module.exports =
  index: new RegExp /\/$/
  all: '/*'
  healthCheck: new RegExp /\/health-check$/
  register: new RegExp /\/register$/
  login: new RegExp /\/login$/
  newPaste: new RegExp /\/new$/
  paste: new RegExp /\/paste/
  validate: new RegExp /\/validate/
  pastes: '/echo'
  contacts: new RegExp /\/contacts/
  rating: new RegExp /\/rating/
