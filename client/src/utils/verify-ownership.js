





export async function verifyOwnership(userOwnedTokens){

    const mintstore = "https://mintbase-testnet.hasura.app/api/rest/stores/cryptosquirrelsclub.mintspace2.testnet"
    const response = await fetch(mintstore);
    // convert the data to json
    const data = await response.json();
    let storeOwnedTokenIds = [];
    for (let idx in data.store[0].things){
        storeOwnedTokenIds.push(data.store[0].things[idx].tokens[0].id)
    }
    for (let idx in userOwnedTokens){
        if (storeOwnedTokenIds.includes(userOwnedTokens[idx]['id'])){
            return true;
        }
    }
    return false;
}
