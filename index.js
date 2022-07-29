const fs = require("fs");
const path = require("path");

const beginTokenID = 10;
const baseURI =
  "https://raw.githubusercontent.com/W3T-Web3-Genius-Tools/sbt/main/src/metadata/images/";

const meatadatas = () => {
  return new Promise(async (res, rej) => {
    let data = await fs.readFileSync(
      path.join(__dirname, "./metadata.txt"),
      (e, d) => {},
    );

    data = data.toString();

    const result = data
      .split("\n")
      .map(v => v.split("\t"))
      .reduce((result, cur) => {
        let tmparr = {};
        tmparr["tokenId"] = cur[0];
        tmparr.name = `${cur[1]}  #${cur[0]}`;
        tmparr.description = "声援周劼，诚实无罪！";
        tmparr.image = `https://raw.githubusercontent.com/kasoqian/ZhouJe-NFT/main/metadata/images/${cur[0]}.jpg`;
        tmparr.attributes = cur[2].split("；").map(v => {
          const tmp = {};

          tmp["trait_type"] = v.split("：")[0];
          tmp["value"] = v.split("：")[1];
          return tmp;
        });

        result.push(tmparr);
        return result;
      }, []);

    res(result);
  });
};

(async () => {
  const data = await meatadatas();
  console.log(data);

  data.map(item => {
    fs.writeFileSync(
      path.join(__dirname, `./metadata/json/${item.tokenId}.json`),
      JSON.stringify(item, null, 2),
    );
  });
})();
