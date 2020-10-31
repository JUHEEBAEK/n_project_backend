const express = require("express");
const connection = require("../../custom_lib/db_connection");
var qs = require("querystring");

const router = express.Router();

router.get("/", function(req, res, next) {
  res.send("Update UnitTeamMember World");
});

// Create Member
router.post("/create", function(req, res, next) {
  var playerData = req.body;
  console.log("playerData", playerData);
  connection.query("INSERT INTO unitMember SET ?", playerData, function(
    err,
    results,
    fields
  ) {
    if (err) next(err);

    res.send(JSON.stringify(results));
  });
});

router.get("/list/:id", function(req, res, next) {
  let unit_team_id = req.params.id;
  if (!unit_team_id) {
    return res.status(400).send({
      err: true,
      message: "Please provide unit_team_id"
    });
  }
  connection.query("SELECT unit_team_id, member_id, name, uniform_number, nick_name, join_date \
                    FROM unitMember \
                    INNER JOIN member ON member.id = unitMember.member_id \
                    where unit_team_id = ?", unit_team_id, 
  function(
    err,
    results,
    fields
  ) {
    if (err) next(err);
    console.log("results", results);
    if (results.length == 0) {
      res.status(400).send({
        err:true, 
        message:"No Result Found"
      }) 
    }
    res.send(results);
  });
});

// Delete Member
router.delete("/delete", function(req, res, next) {
  connection.query(
    "DELETE FROM unitMember WHERE unit_team_id=?",
    [req.body.unit_team_id],
    function(err, results, fields) {
      if (err) next(err);
      console.log(results);
      res.send(results);
    }
  );
});

module.exports = router;
