





export async function verifyOwnership(userOwnedTokens){

    const mintstore = "https://mintbase-testnet.hasura.app/api/rest/stores/cryptosquirrelsclub.mintspace2.testnet"
    const response = await fetch(mintstore);
    // convert the data to json
    const data = await response.json();
    console.log("data.store[0].things", data.store[0].things, "userOwnedTokens",userOwnedTokens);
    let storeOwnedTokenIds = [];
    for (let idx in data.store[0].things){
        console.log(data.store[0].things[idx].tokens[0].id)
        storeOwnedTokenIds.push(data.store[0].things[idx].tokens[0].id)
    }
    console.log("storeOwnedTokenIds",storeOwnedTokenIds,"userOwnedTokens",userOwnedTokens )
    for (let idx in userOwnedTokens){
        console.log(userOwnedTokens[idx]['id'])
        if (storeOwnedTokenIds.includes(userOwnedTokens[idx]['id'])){
            return true;
        }
    }
    return false;
}
