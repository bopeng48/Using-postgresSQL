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

const firstName = process.argv[2];
const lastName = process.argv[3];
const DOB = process.argv[4];

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
console.log(typeof firstName);
console.log(lastName);
console.log(DOB);

knex.insert({
  first_name: firstName,
  last_name: lastName,
  birthdate: DOB
})
.into('famous_people').
then((result) => {
  console.log("works");
});

knex('famous_people').select().asCallback(printResult);
knex.destroy();