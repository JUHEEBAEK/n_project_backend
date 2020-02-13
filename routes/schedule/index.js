const express = require("express");
const connection = require("../../custom_lib/db_connection");
var qs = require("querystring");

const router = express.Router();

router.get("/", function (req, res) {
  res.send("Update Schdeule World");
})

// Create Schedule
router.post("/create", function (req, res) {
  var scheduleData = req.body;

  console.log(scheduleData);
  connection.query("INSERT INTO schedule set ?", scheduleData, function (
    err,
    results,
    fields
  ) {
    if (error) {
      console.error(error)
      res.status(500).send({
        error: true,
        content: error,
        message: 'Something broke'
      })
    }
    console.log(RTCDtlsTransportStateChangedEvent.insertId);
    res.send(JSON.stringify(results));
  });
});


// Read schedule
router.get("/list", function (req, res) {
  connection.query("SELECT * from schedule", function (err, results, fields) {
    if (err) {
      console.error(error)
      res.status(500).send({
        error: true,
        content: error,
        message: 'Something broke'
      })
    } else {
      res.send(results);
    }
  });
});

// Retrieve schedule with id
router.get("/schedules:id", function (req, res) {
  let schedule_id = req.params.id;
  if (!schedule_id) {
    return res.status(400).send({
      error: true,
      message: "Please provide schedule_id"
    });
  }
  connection.query("SELECT * FROM schedule where id=?", schedule_id, function (
    error,
    results,
    fields
  ) {
    if (error) {
      console.error(error)
      res.status(500).send({
        error: true,
        content: error,
        message: 'Something broke'
      })
    }
    return res.send({
      error: false,
      data: results[0],
      message: "schedules details."
    });
  });
});

//  Update schedule with id
router.put("/update", function (req, res) {
  let schedule_id = req.body.schedule_id;
  let schedule = req.body.schedule;

  console.log(req.body);
  if (!schedule_id || !schedule) {
    return res.status(400).send({
      error: schedule,
      message: "Please provide schedule and schedule_id"
    });
  }

  connection.query(
    "UPDATE schedule SET ? WHERE id = ?",
    [schedule, schedule_id],
    function (error, results, fields) {
      if (error) {
        console.error(error)
        res.status(500).send({
          error: true,
          content: error,
          message: 'Something broke'
        })
      }
      return res.send({
        error: false,
        data: results,
        message: "schedule has been updated successfully."
      });
    }
  );
});

// Delete schedule
router.delete("/delete", function (req, res) {
  console.log(req.body);
  connection.query(
    "DELETE FROM schedule WHERE id=?",
    [req.body.schedule_id],
    function (error, results, fields) {
      if (error) {
        console.error(error)
        res.status(500).send({
          error: true,
          content: error,
          message: 'Something broke'
        })
      }
      res.send("Record has been deleted!");
    }
  );
});




module.exports = router;