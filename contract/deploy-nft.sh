NFT_CONTRACT_ID=nft-example2.nearorca.testnet # change this if necessary
MAIN_ACCOUNT=nearorca.testnet

near login
# Create subaccount to hold NFTs
near create-account nft-example2.nearorca.testnet --masterAccount nearorca.testnet --initialBalance 10
# Deploy Your Contract to Subaccount
near deploy --accountId $NFT_CONTRACT_ID --wasmFile out/main.wasm
# Initialize Your Contract
near call $NFT_CONTRACT_ID new_default_meta '{"owner_id": "'$NFT_CONTRACT_ID'"}' --accountId $NFT_CONTRACT_ID
echo $NFT_CONTRACT_ID
echo $MAIN_ACCOUNT
near call $NFT_CONTRACT_ID nft_mint '{"token_id": "00", "metadata": {"title": "Coding Squirrel 00", "description": "Coding Squirrel 00", "media": "https://ipfs.infura.io/ipfs/QmfVkNR7qUjHxQWWu1kv6hR2xh9hLKJQigfaSXyWDYvqFX"}, "receiver_id": "'$MAIN_ACCOUNT'"}' --accountId $MAIN_ACCOUNT --amount 0.1
near call $NFT_CONTRACT_ID nft_mint '{"token_id": "01", "metadata": {"title": "Coding Squirrel 01", "description": "Coding Squirrel 01", "media": "https://ipfs.infura.io/ipfs/QmYXXQn9CqJxgNk5Qwngi5t3RRuQtT9qe5aAJ2jHVHHBKe"}, "receiver_id": "'$MAIN_ACCOUNT'"}' --accountId $MAIN_ACCOUNT --amount 0.1
near call $NFT_CONTRACT_ID nft_mint '{"token_id": "02", "metadata": {"title": "Coding Squirrel 02", "description": "Coding Squirrel 02", "media": "https://ipfs.infura.io/ipfs/QmZPkkugn6615HCoJ9qsk1knTuTcyuznAZTFJuQhPHMe6F"}, "receiver_id": "'$MAIN_ACCOUNT'"}' --accountId $MAIN_ACCOUNT --amount 0.1
near call $NFT_CONTRACT_ID nft_mint '{"token_id": "03", "metadata": {"title": "Coding Squirrel 03", "description": "Coding Squirrel 03", "media": "https://ipfs.infura.io/ipfs/QmP1HtivqjDaRdZC2wWa24AqNDboVoeV4cnWHP6CLfyajz"}, "receiver_id": "'$MAIN_ACCOUNT'"}' --accountId $MAIN_ACCOUNT --amount 0.1
near call $NFT_CONTRACT_ID nft_mint '{"token_id": "04", "metadata": {"title": "Coding Squirrel 04", "description": "Coding Squirrel 04", "media": "https://ipfs.infura.io/ipfs/QmVR7hosBX71j5REFeqPMVSXzmdFj1iMYoFakHSB1wmHec"}, "receiver_id": "'$MAIN_ACCOUNT'"}' --accountId $MAIN_ACCOUNT --amount 0.1
near call $NFT_CONTRACT_ID nft_mint '{"token_id": "05", "metadata": {"title": "Coding Squirrel 05", "description": "Coding Squirrel 05", "media": "https://ipfs.infura.io/ipfs/QmPDthG2VMjqqX1G8AjT8Wgc9Wwy61wDbw72ZVDkPGDAr4"}, "receiver_id": "'$MAIN_ACCOUNT'"}' --accountId $MAIN_ACCOUNT --amount 0.1
near call $NFT_CONTRACT_ID nft_mint '{"token_id": "06", "metadata": {"title": "Coding Squirrel 06", "description": "Coding Squirrel 06", "media": "https://ipfs.infura.io/ipfs/QmYMLCfuxP6YP9y7noDAJV3KzVJjmsTyqmh57uT8XRKczy"}, "receiver_id": "'$MAIN_ACCOUNT'"}' --accountId $MAIN_ACCOUNT --amount 0.1
near call $NFT_CONTRACT_ID nft_mint '{"token_id": "07", "metadata": {"title": "Coding Squirrel 07", "description": "Coding Squirrel 07", "media": "https://ipfs.infura.io/ipfs/QmNofJBHX8LpBjnB35FKkfEJkMHebSNkeRiHUSJX8TFzwt"}, "receiver_id": "'$MAIN_ACCOUNT'"}' --accountId $MAIN_ACCOUNT --amount 0.1
near call $NFT_CONTRACT_ID nft_mint '{"token_id": "08", "metadata": {"title": "Coding Squirrel 08", "description": "Coding Squirrel 08", "media": "https://ipfs.infura.io/ipfs/QmVjegJaQQG74KWymH6AUiTCUXdLX7KJ2rr2WRPaLdCUYV"}, "receiver_id": "'$MAIN_ACCOUNT'"}' --accountId $MAIN_ACCOUNT --amount 0.1
near call $NFT_CONTRACT_ID nft_mint '{"token_id": "09", "metadata": {"title": "Coding Squirrel 09", "description": "Coding Squirrel 09", "media": "https://ipfs.infura.io/ipfs/QmdSDGpGDx6MDSDKxfWkhTUSnbjn2JQWoKDTxc4uaBCH8M"}, "receiver_id": "'$MAIN_ACCOUNT'"}' --accountId $MAIN_ACCOUNT --amount 0.1
near call $NFT_CONTRACT_ID nft_mint '{"token_id": "10", "metadata": {"title": "Coding Squirrel 10", "description": "Coding Squirrel 10", "media": "https://ipfs.infura.io/ipfs/QmecgNwZXJdWhnkxhjKQePqF42gHVoAcUhEWJs7Y5yNY7T"}, "receiver_id": "'$MAIN_ACCOUNT'"}' --accountId $MAIN_ACCOUNT --amount 0.1
