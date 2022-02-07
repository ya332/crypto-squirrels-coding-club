import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';

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
            <header>
                <h1>Crypto Squirrels Coding Club</h1>
                {currentUser
                    ? <button onClick={signOut}>Log out</button>
                    : <button onClick={signIn}>Log in</button>
                }
            </header>
            {currentUser
                ?    <p>Signed in and the current user account id is: { currentUser.accountId }</p>
                : <>
                    <p>
                        Go ahead and sign in to try it out!
                    </p>
                </>
            }

            <div class="jt-container">
                <div class="jt-image">
                    <img src="https://ipfs.infura.io/ipfs/QmfVkNR7qUjHxQWWu1kv6hR2xh9hLKJQigfaSXyWDYvqFX" width="500" height="600" alt="Crypto Coding Squirrels Club" />
                </div>
                <div class="jt-content">
                    <h1>Crypto Squirrels</h1>
                    <p>Become a Squirrel 🐿️ -&gt; Crack Big Tech interviews 🚀 (like you would crack a nut 🌰) Are you studying programming to get into Big Tech companies? Do you need a platform to do your mock interviews? Are you looking for people to offer mocks interview to you? Then, **you are in the right place!**</p>
                    <h2>How does the Club work?</h2>
                    <p>By purchasing one of the squirrel NFTs, you become a member of the club for life 🔥and get access to the THE BACKYARD (That's awesome, right!),
                        which is a place where you can hone your coding and programming interviewing skills.
                        THE BACKYARD offers a real-time collaborative coding editor with a support of over 10 programming languages as well as text messaging,
                        voice and video calling capabilities. Check out a THE BACKYARD in action:
                        <img src="https://bafybeiarccx2xym5yjpjy6wcbmyplzytzgv4uiej3uwpnwcfedq3zww4zi.ipfs.infura-ipfs.io/" target="_blank" />
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
    );
};

export default Landing;
