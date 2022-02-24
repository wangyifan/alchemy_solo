const axios = require("axios");

function GetNFTStatus() {
    var r = Math.floor(Math.random() * 10);
    // 10% chance each for 0, 2, 3
    if (r == 0 || r == 2 || r == 3) {
        return r;
    }

    // 70% chance of return 1
    return 1;
}

async function GetApes(contract, apes_limit) {
    var apes = [];
    var apes_status = [];
    var url, token_id;
    for(var i=0;i<apes_limit;i++) {
        token_id = i;
        url = `https://api.opensea.io/api/v1/asset/${contract}/${token_id}/`;
        try {
            const response = await axios.get(url, {
                headers: {
                    'X-API-KEY': ""
                }
            });
            console.log(url);
            apes.push(
                {
                    'contract': response.data.asset_contract.address,
                    'id': token_id,
                    'symbol': response.data.asset_contract.symbol,
                    'collection': response.data.collection.name,
                    'description': response.data.asset_contract.description,
                    'owner': response.data.owner.address,
                    'minter': response.data.creator.address,
                    'metadata_url': response.data.token_metadata,
                    'image_url': response.data.image_url
                }
            );
            apes_status.push(
                {
                    'contract': response.data.asset_contract.address,
                    'id': token_id,
                    'status': GetNFTStatus()
                }
            );
        } catch(error) {
            console.log(error + " | " + url);
        }
    }

    console.log(apes);
    console.log(apes_status);
    return [apes, apes_status];
}


async function main() {
    var apes_limit = 50;
    var bayc_contract = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
    var mayc_contract = "0x60e4d786628fea6478f785a6d7e704777c86a7c6";

    var [bayc_apes, bayc_status] = await GetApes(bayc_contract, apes_limit);
    var [mayc_apes, mayc_status] = await GetApes(mayc_contract, apes_limit);

    const result = {
        nfts: bayc_apes.concat(mayc_apes),
        status: bayc_status.concat(mayc_status)
    };

    console.log(JSON.stringify(result));
};

main();

