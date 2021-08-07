const fs = require("fs");
const fetch = require("node-fetch");

const main = async () => {
  // Read JSON file that contains the data
  const data = await fetch(
    "https://firms.modaps.eosdis.nasa.gov/data/active_fire/modis-c6.1/kml/MODIS_C6_1_Europe_24h.kml"
  )
    .then(res => res.text())
    .then(body => body);
  // console.log(data);
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

  fs.writeFile("fires.json", JSON.stringify(result), function(err) {
    if (err) {
      console.log(err);
    }
  });
};

main();
