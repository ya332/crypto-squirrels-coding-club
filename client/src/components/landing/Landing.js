import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './Landing.scss'
import mainLogo from '../../assets/main-logo.png';
import squirrelImage from '../../assets/landing-page.png';
import { useWallet } from '../../store/walletContext';
import { persist } from '../../utils/api/auth';
import { useAuth } from '../../store/authContext';
import { verifyOwnership } from '../../utils/verify-ownership';

const Landing = () => {
    const [user, setUser] = useAuth()
    const history = useHistory();
    const [ownedTokenCount, setOwnedTokenCount] = useState(0);
    const [ownedTokens, setOwnedTokens] = useState([]);
    const { wallet, isConnected, details } = useWallet();
    const [isMember, setIsMember] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://mintbase-testnet.hasura.app/api/rest/accounts/${details.accountId}`);
            // convert the data to json
            const data = await response.json();
            setOwnedTokenCount(data.token.length);
            setOwnedTokens(data.token);
            let isCurrentUserClubMember = await verifyOwnership(data.token);
            console.log("isCurrentUserClubMember", isCurrentUserClubMember)
            setIsMember(isCurrentUserClubMember);
            localStorage.setItem('isMember', isCurrentUserClubMember);
        }

        const handleUserAuth = async () => {

            // We rely on wallet integration to login/logout. 
            // However, creating a task, viewing a task etc stil relies on old username/password. 
            // So, once we get accountId after wallet integration, we immediately signup and login the user 
            // be backwards compatible with the previous endpoints.


            let data = {
                firstName: details.accountId,
                lastName: details.accountId,
                username: details.accountId,
                email: "no-reply@crypto-squirrels-coding-club.herokuapp.com",
                password: details.accountId
            }

            try {
                let savedAndPersistedUser = await persist(data)
                setUser(savedAndPersistedUser);
                localStorage.setItem('user', JSON.stringify(savedAndPersistedUser))

            }
            catch (e) { console.log("Error during signin up user", e) };

        }
        if (details) fetchData().then(() => { handleUserAuth().catch((err) => console.log(err)); }).catch((err) => console.log(err));

    }, [details, isMember])


    const onConnectButtonClick = () => {
        if (isConnected) {
            wallet?.disconnect()
            window.location.reload()
        }
        else {
            wallet?.connect({ requestSignIn: true })
        }
    }


    const handleBackyardButtonClick = () => {
        if (isMember) {
            history.push("/thebackyard");
        }
        else {
            alert("Only NFT holding members are allowed in THE BACKYARD. Please make a purchase from our Mintbase store(https://testnet.mintbase.io/store/cryptosquirrelsclub.mintspace2.testnet/) and then come here and connect your wallet")
        }
    }

    return (
        <>
            <div className='root-div'>
                <header>
                    <div className='main-logo'><a href="https://crypto-squirrels-coding-club.herokuapp.com" target="_blank" rel="noreferrer"><img src={mainLogo} alt="Main Logo for Crypto Squirrels Coding Club" /></a></div>
                    <nav className='nav-links'>
                        <div><button onClick={handleBackyardButtonClick}>THE BACKYARD</button></div>
                        <div><a href='https://testnet.mintbase.io/store/cryptosquirrelsclub.mintspace2.testnet' target="_blank" rel="noreferrer"><button>Our Mintbase Store</button></a></div>
                        <div>
                            <a href="https://t.me/CryptoSquirrelsCodingClub" target="_blank" rel="noreferrer">
                                <button style={{ backgroundColor: "white" }}>
                                    <img height="20px" alt="Telegram icon" src="https://cdn-icons-png.flaticon.com/512/906/906377.png" />
                                </button>
                            </a>
                        </div>
                        <div className='button-container'>
                            <button className="auth-button" onClick={onConnectButtonClick}> {isConnected ? 'Disconnect' : 'Connect'}</button>

                        </div>
                    </nav>
                </header>
                <div className="jumbotron">
                    <div className="jt-container">
                        <div className="jt-image">
                            <div className='image-container'>
                                <img src={squirrelImage} width="150" height="200" alt="Crypto Coding Squirrels Club" />
                            </div>
                        </div>
                        <div className="jt-content">
                            <h1>Crypto Squirrels Coding Club</h1>
                            <h2>Login via Connecting Your NEAR Wallet</h2>
                            <div className='button-container'>
                                <button className="auth-button" onClick={
                                    isConnected
                                        ? () => {
                                            wallet?.disconnect()
                                            window.location.reload()
                                        }
                                        : () => {
                                            wallet?.connect({ requestSignIn: true })
                                        }
                                }> {isConnected ? 'Disconnect' : 'Connect'}</button>
                                {isConnected
                                    ? <><p>Signed in and the current user account id is: {details.accountId}.</p>
                                        {ownedTokens.length > 0 && <p> You own {ownedTokenCount} token(s). Your tokens are {JSON.stringify(ownedTokens)}</p>}
                                    </>
                                    : <>
                                        <p>
                                            Go ahead and sign in to try it out!
                                        </p>
                                    </>
                                }
                            </div>
                            <h2>What is Crypto Squirrels Coding Club?</h2>
                            <p>Become a Squirrel 🐿️ -&gt; Crack Big Tech interviews 🚀 (like you would crack a nut 🌰) Are you studying programming to get into Big Tech companies? Do you need a platform to do your mock interviews? Are you looking for people to offer mocks interview to you? Then, <b>you are in the right place! We combined the state-of-art NEAR blockchain layer with a coding mock interview solution to create an exclusive community. We are like Bored Ape Yacht Club but our members get access to our club's collaborative coding editor and use it do do mock coding interviews and get better at tech interviews.</b></p>
                            <h2> How to be a member?</h2>
                            <p>All Club NFTs are on the NEAR testnet blockchain. Buying will require NEAR tokens, but testnet doesn't have real funds and you start with 200 Ⓝ to play around! More info <a href="https://docs.near.org/docs/develop/basics/create-account#creating-a-testnet-account" target="_blank" rel="noreferrer">here</a></p>
                            <ol>
                                <li>Create a NEAR wallet on testnet blockchain <a href="https://wallet.testnet.near.org/create" target="_blank" rel="noreferrer">https://wallet.testnet.near.org/create</a> </li>
                                <li>Go to our Mintbase store <a href="https://testnet.mintbase.io/store/cryptosquirrelsclub.mintspace2.testnet" >https://testnet.mintbase.io/store/cryptosquirrelsclub.mintspace2.testnet</a> and buy one of our club NFTs. </li>
                                <li>Only 11 NFTs are minted so far, but more will come and you will see availability such as "3/10 Available" when there are cards available to purchase </li>
                                <li>Come back to this <a href='https://crypto-squirrels-coding-club.herokuapp.com/' target="_blank" rel="noreferrer">site</a> and connect your account by clicking "Connect"</li>
                                <li>Site will tell you tokens you own. If the unique token id of your token matches one of NFTs in our squirrel collection, you can click on the "THE BACKYARD' button to go inside.</li>
                                <li>Some users bought wrong token and tried to get in. You need to buy one of the NFTs minted via this smart contract: <a href='https://explorer.testnet.near.org/accounts/cryptosquirrelsclub.mintspace2.testnet' target="_blank" rel="noreferrer">https://explorer.testnet.near.org/accounts/cryptosquirrelsclub.mintspace2.testnet.</a> In other words, your token_id needs to appear in one of the ids here: <a href='https://mintbase-testnet.hasura.app/api/rest/stores/cryptosquirrelsclub.mintspace2.testnet' target="_blank" rel="noreferrer">https://mintbase-testnet.hasura.app/api/rest/stores/cryptosquirrelsclub.mintspace2.testnet</a></li>
                            </ol>
                            <h2>How does the Club work?</h2>
                            <p>By purchasing one of the squirrel NFTs, you become a member of the club for life 🔥and get access to the THE BACKYARD (That's awesome, right!),
                                which is a place where you can hone your coding and programming interviewing skills.
                                THE BACKYARD offers a real-time collaborative coding editor with a support of over 10 programming languages as well as text messaging,
                                voice and video calling capabilities. Check out THE BACKYARD in action:</p>
                            <div className='image-container'>
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/Cb98yLkyink" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                            <p>
                                Members use our Club to do the following:
                            </p>
                            <ol>
                                <li>- Do pair programming with other club members, </li>
                                <li>- Have mock coding interviews with other club members,</li>
                                <li>- Have access to a real-time collaborative coding IDE with a support of over 10 programming languages as well as message, voice and video chat capabilities</li>
                                <li>- Get access to a community of programmers, learners, developers, engineers and crypto enthusiasts.</li>
                                <li>- and much more...</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <section className="roadmap" id="roadmap">
                    <div className="mbr-container">
                        <h2>Roadmap</h2>
                        <div className="benefits">
                            <div className="b-col-1">
                                <div className="ben">
                                    <div className="milestone">
                                        <h3>0%</h3>
                                    </div>
                                    <div className="goal">
                                        <h3>✔ Create Crypto Squirrels Edition</h3>
                                        <div>
                                            <p>We launch Coding Club NFT Edition. Each NFT is transfered to main account on NEAR and ready to be sold</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="ben">
                                    <div className="milestone">
                                        <h3>25%</h3>
                                    </div>
                                    <div className="goal">
                                        <h3>✔ Launch of Telegram Channel (t.me/CryptoSquirrelsCodingClub)</h3>
                                        <div>
                                            <p>We launch the Crypto Squirrels Telegram Channel. We recruit, market and promote the channel as well as the Club and its various benefits on social media.</p>
                                            <p> We invite enveryone to join the Telegram channel as non-members can also join the channel.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="ben">
                                    <div className="milestone">
                                        <h3>50%</h3>
                                    </div>
                                    <div className="goal">
                                        <h3>✔ Finish developing THE BACKYARD</h3>
                                        <div>
                                            <p>The BACKYARD is workspace in our platform that offers real-time collaborative code editor with a support of 16 languages as well as message, voice, and video call capabilities. </p>
                                            <p> We finish the development efforts and launch the BACKYARD ready to be used by the members </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="ben">
                                    <div className="milestone">
                                        <h3>60%</h3>
                                    </div>
                                    <div className="goal">
                                        <h3>✔ Submission to Near MetaBUILD Hackathon </h3>
                                        <div>
                                            <p>We enter the Near MetaBUILD Hackathon to compete to win prizes so that we can support growing our community</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="ben">
                                    <div className="milestone">
                                        <h3>75% to 100% (In progress...)</h3>
                                    </div>
                                    <div className="goal">
                                        <h3>🚧 Extend the Club NFT Edition (In progress...)</h3>
                                        <div>
                                            <p>We extend the club by issuing new customized NFTs so that depending on the NFT you own,
                                                members get different benefits such as more language support, access to a debugger. </p>
                                            <p> We also add a referral bonus so that if your referral purchases an NFT and become a member, inviter get a certain commission.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="details" id="more-details">
                    <div className="mbr-container">
                        <h2>More Details</h2>
                        <p>Smart Contract Address: <a href="https://explorer.testnet.near.org/accounts/cryptosquirrelscodingclub.testnet" target="_blank" rel="noreferrer">https://explorer.testnet.near.org/accounts/cryptosquirrelscodingclub.testnet</a></p>
                        <p>Smart contract is <a href='https://explorer.testnet.near.org/transactions/DrYvK2Ma2tr6hqpzpkweRiJ8hgVKSRFzxr3ZBGSZq1T2' target="_blank" rel="noreferrer">created on Near protocol</a>  and the NFTs are minted on testnet protocol </p>
                        <p>Mintbase.io store link: <a href="https://testnet.mintbase.io/store/cryptosquirrelsclub.mintspace2.testnet/" target="_blank" rel="noreferrer">https://testnet.mintbase.io/store/squirrelcodingclub.mintspace2.testnet/</a></p>
                    </div>
                </section>

            </div>
            <p className='footer'>Copyright © CryptoSquirrelsCodingClub - {new Date().getFullYear()}</p>
        </>
    );
};

export default Landing;
