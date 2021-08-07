const { parentPort } = require("worker_threads");
const fs = require("fs");
const Cabin = require("cabin");
const fetch = require("node-fetch");
const { Signale } = require("signale");
const crg = require("country-reverse-geocoding").country_reverse_geocoding();

const cabin = new Cabin({
  axe: {
    logger: new Signale()
  }
});
let isCancelled = false;
if (parentPort) {
  parentPort.once("message", message => {
    if (message === "cancel") isCancelled = true;
  });
}
(async () => {
  // Read JSON file that contains the data
  const data = await fetch(
    "https://firms.modaps.eosdis.nasa.gov/data/active_fire/modis-c6.1/kml/MODIS_C6_1_Europe_24h.kml"
  )
    .then(res => res.text())
    .then(body => body);

  const reg = /(?<=\<coordinates\>)(.*\n?)(?=<\/coordinates\>)/;
  let jso = data.split("<Placemark>");
  jso.shift();
  let result = jso.map(i => {
    return {
      lng: Number(
        i
          .match(reg)[0]
          .split(",")[0]
          .trim()
      ),
      lat: Number(
        i
          .match(reg)[0]
          .split(",")[1]
          .trim()
      )
    };
  });

  result = result.filter(
    e =>
      crg.get_country(e.lat, e.lng) &&
      crg.get_country(e.lat, e.lng).name === "Greece"
  );

  fs.writeFile("fires.json", JSON.stringify(result), function(err) {
    if (err) {
      console.log(err);
    }
  });
  if (parentPort) parentPort.postMessage("done");
  else process.exit(0);
})();
