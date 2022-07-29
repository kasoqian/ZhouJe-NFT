const fs = require("fs");
const path = require("path");

const beginTokenID = 10;
const baseURI =
  "https://raw.githubusercontent.com/W3T-Web3-Genius-Tools/sbt/main/src/metadata/images/";

const metaInfo = [
  {
    name: "七套房",
    attributes: { 房子: "七套" },
  },
];

const metaBase = {
  name: "Rookie–Badge of Navigators #0",
  description:
    "The brand new world of Web3 is just like an ocean, where the waves are overwhelming while the views are magnificent. Anyone who would like to take part in it is a worrier.  Welcome, Navigators!",
  image:
    "https://raw.githubusercontent.com/W3T-Web3-Genius-Tools/sbt/main/src/metadata/images/0.png",
  attributes: [],
};

let arr = new Array(10).fill({ name: "周" });

function main() {
  arr.forEach(async (item, index) => {
    let metadataOnce = {};
    let tokenID = index + beginTokenID;

    metadataOnce = {
      name: `${item.name} #${tokenID}`,
    };

    metadataOnce.image = `${baseURI}${tokenID}.jpg`;
    metadataOnce.description = "周劼的精彩人生";

    fs.writeFileSync(
      path.join(__dirname, `./metadata/json/${index + beginTokenID}.json`),
      JSON.stringify(metadataOnce, null, 2),
    );
  });
}

main();
