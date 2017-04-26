const settings = require("./settings");
var moment = require('moment');
moment().format();


var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    port : 5432
  }
});

const name = process.argv[2];

function dateFormatter(s) {
    return moment.parseZone(s).format('YYYY-MM-DD');
}

function printResult(err, result) {
  if (err) {
    return console.error("error running query", err);
  }
  console.log("Searching...");
 // console.log("Found "+ result.rows.length +" person(s) by the name "+name);
 // console.log(result);


  result.forEach(function (element) {
    console.log(element.first_name+" "+element.last_name+" born "+dateFormatter(element.birthdate));
  })
}

knex('famous_people').select().where('first_name', name).asCallback(printResult);
knex.destroy();