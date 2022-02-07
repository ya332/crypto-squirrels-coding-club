import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import './Landing.scss'

const SUGGESTED_DONATION = '0';
const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

const Landing = ({ contract, currentUser, nearConfig, wallet }) => {
    const [messages, setMessages] = useState([]);

    const signIn = () => {
        wallet.requestSignIn(
            { contractId: nearConfig.contractName, methodNames: [contract.addMessage.name] }, //contract requesting access
            'NEAR Guest Book', //optional name
            null, //optional URL to redirect to if the sign in was successful
            null //optional URL to redirect to if the sign in was NOT successful
        );
    };

    const signOut = () => {
        wallet.signOut();
        window.location.replace(window.location.origin + window.location.pathname);
    };

    return (
        <div>
            <div className="jumbotron">

                <div className="jt-container">
                    <div className="jt-image">
                        <img src="https://ipfs.infura.io/ipfs/QmfVkNR7qUjHxQWWu1kv6hR2xh9hLKJQigfaSXyWDYvqFX" width="150" height="200" alt="Crypto Coding Squirrels Club" />
                    </div>
                    <div className="jt-content">
                        <h1>Crypto Squirrels Coding Club</h1>
                        {currentUser
                            ? <button onClick={signOut}>Log out</button>
                            : <button onClick={signIn}>Log in</button>
                        }
                        {currentUser
                            ? <p>Signed in and the current user account id is: {currentUser.accountId}</p>
                            : <>
                                <p>
                                    Go ahead and sign in to try it out!
                                </p>
                            </>
                        }
                        <p>Become a Squirrel 🐿️ -&gt; Crack Big Tech interviews 🚀 (like you would crack a nut 🌰) Are you studying programming to get into Big Tech companies? Do you need a platform to do your mock interviews? Are you looking for people to offer mocks interview to you? Then, **you are in the right place!**</p>
                        <h2>How does the Club work?</h2>
                        <p>By purchasing one of the squirrel NFTs, you become a member of the club for life 🔥and get access to the THE BACKYARD (That's awesome, right!),
                            which is a place where you can hone your coding and programming interviewing skills.
                            THE BACKYARD offers a real-time collaborative coding editor with a support of over 10 programming languages as well as text messaging,
                            voice and video calling capabilities. Check out a THE BACKYARD in action:
                            {' '}
                            <img src="https://bafybeiarccx2xym5yjpjy6wcbmyplzytzgv4uiej3uwpnwcfedq3zww4zi.ipfs.infura-ipfs.io/" width="400" height="200" target="_blank" />
                            {' '}
                        </p>
                        Members use our Club to do the following:
                        <ol>
                            <li>- Do pair programming with other club members, </li>
                            <li>- Have mock coding interviews,</li>
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
                                    <h3>🚧 Submission to Near MetaBUILD Hackathon (In progress...)</h3>
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

        </div>
    );
};

export default Landing;
