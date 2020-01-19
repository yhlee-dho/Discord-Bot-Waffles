var nbTimer = require("../data/nbTimer");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  app.get("/api/:nbTimer", function(req, res) {
    res.json(nbTimer);
  });

  // ---------------------------------------------------------------------------

  app.put('/api/:nbTimer', function (req, res) {
    let newServerTime = req.nbTimer;
    let newUpdateTime = req.nbTimer;
    let newNbTime = req.nbTimer;

    nbTimer.serverTime = _.extend(newServerTime, req.body);
    nbTimer.updateTime = _.extend(newUpdateTime, req.body);
    nbTimer.nbTime = _.extend(newNbTime, req.body);

    nbTimer.save(function(err) {
    if (err) {
        return res.send('/:nbTimer', {
            errors: err.errors,
            serverTime: newServerTime,
            updateTime: newUpdateTime,
            nbTime: newNbTime
        });
    } else {
        res.jsonp(nbTimer);
    }


    // ------------------------------------------
//update note by id -- put -- findOneAndUpdate
  app.put("/api/:id", function (req, res) {
    
  }
    passport.authenticate('bearer', { session: false }),
    updateInputValidation, 
    (request, response, next) => {
        //three parameters: (1) what to find (2) what to update (3) show old vs new records
        NoteModel.findOneAndUpdate({ _id: request.params.id }, request.updateObject, {
            new: true
        })
            .then((results) => {
                if(!results) {
                    response
                        .status(404)
                        .send("note not found")
                }
                else {
                    response.json(results)
                }
            })
            .catch((error) => {
                console.log(error)
                response
                    .status(500)
                    .send("error occurred")
            })
});
  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    nbServerTimer.length = 0;
    nbUpdateTimer.length = 0;

    res.json({ ok: true });
  });
};
