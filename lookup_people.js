const pg = require("pg");
const settings = require("./settings"); // settings.json
var moment = require('moment');
moment().format();

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});


const name = process.argv[2];

function dateFormatter(s) {
    return moment.parseZone(s).format('YYYY-MM-DD');
}

function printResult(err, result) {
  if (err) {
    return console.error("error running query", err);
  }
  result.rows.forEach(function (element) {
    console.log(element.first_name+" "+element.last_name+" born "+dateFormatter(element.birthdate));
  })
  //console.log(result.rows[0].first_name+" "+result.rows[0].last_name+" born "+dateFormatter(result.rows[0].birthdate));
  client.end();
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT first_name,last_name, birthdate from famous_people where first_name = $1",[name], printResult);
});
