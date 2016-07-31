// Generated by CoffeeScript 1.10.0
(function() {
  var Pastes;

  Pastes = require('../../models/pastes');

  module.exports = function(ws, msg) {
    var error, error1, q;
    q = null;
    try {
      q = JSON.parse(msg);
    } catch (error1) {
      error = error1;
      return;
    }
    return Pastes.getPastes(q.query, q.sort, q.pagination, function(err, res, totalDocsCount) {
      return ws.send(JSON.stringify({
        res: res,
        total: totalDocsCount
      }));
    });
  };

}).call(this);

//# sourceMappingURL=index.js.map
