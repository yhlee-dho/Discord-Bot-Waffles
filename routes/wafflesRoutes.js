var nbServerTimer = require("../data/nbServerTimer");
var nbUpdateTimer = require("../data/nbUpdateTimer");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  app.get("/api/nbServerTimer", function(req, res) {
    res.json(nbServerTimer);
  });
  app.get("/api/nbUpdateTimer", function(req, res) {
    res.json(nbUpdateTimer);
  });

  // ---------------------------------------------------------------------------

  app.put("/api/nbServerTimer", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    if (nbServerTimer.length !== 0) {
      nbServerTimer.push(req.body);
      res.json(true);
    }
    else {
      waitListData.push(req.body);
      res.json(false);
    }
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    nbServerTimer.length = 0;
    waitListData.length = 0;

    res.json({ ok: true });
  });
};
