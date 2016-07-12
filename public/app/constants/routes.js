module.exports = {
    '/': new RegExp(/^\/$/),
    'login': new RegExp(/^\/login$/),
    'register': new RegExp(/^\/$register/),
    'code-pastes': new RegExp(/^\/$code-pastes/),
    'new-pastes': new RegExp(/^\/$new/),
    'paste': new RegExp(/^\/paste\/\d+$/),
};
