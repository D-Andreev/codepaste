module.exports = {
    '/': new RegExp(/^\/$/),
    'login': new RegExp(/^\/#login$/),
    'registration': new RegExp(/^\/#registration$/),
    'pastes': new RegExp(/^\/#pastes$/),
    'new': new RegExp(/^\/#new$/),
    'contacts': new RegExp(/^\/#contacts/),
    'paste': new RegExp(/^\/#paste\/.+$/)
};
