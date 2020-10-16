
const fs = require("fs");


const chansFromJson = JSON.parse(
  fs.readFileSync(__dirname + "/2020_10_15_8_19_14_log.json", "utf-8")
);
var tmpchans = new Array();
chanlen = Object.keys(chansFromJson).length

for (let i = 0; i < chanlen; i++) {

  data = {
    ChanId: chansFromJson[i].chanId,
    link: chansFromJson[i].chanId,
    img: chansFromJson[i].chanId,
    replies: chansFromJson[i].chanId,
    imgReplies: chansFromJson[i].chanId,
    title: chansFromJson[i].chanId,
    op: chansFromJson[i].chanId,
    unique_ips: chansFromJson[i].thread[0].unique_ips
  } 
  var threadlen = Object.keys(chansFromJson[i].thread).length
  // "no", "now", "name", "com", "time", "resto", "trip"
  if (threadlen>1) {
    for (let j = 1; j < threadlen; j++)
      {
        threaddata = {
          no: chansFromJson[i].thread[j].no,
          now: chansFromJson[i].thread[j].now,
          name: chansFromJson[i].thread[j].name,
          com: chansFromJson[i].thread[j].com,
          time: chansFromJson[i].thread[j].time,
          resto: chansFromJson[i].thread[j].resto,
          trip: chansFromJson[i].thread[j].trip
        }
        tmpchans.push(threaddata)
      }
  }
  
  // tmpchans.push(data);
  
}
console.log(tmpchans)
chanlen = Object.keys(tmpchans).length
// for (let i =0;  i <chanlen ; i++){
//   console.log(tmpchans[i].unique_ips)

// }

// console.log(chanlen)

// a = jso