import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import Form from './components/Form';
import SignIn from './components/SignIn';
import Messages from './components/Messages';

const SUGGESTED_DONATION = '0';
const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

const App = ({ contract, currentUser, nearConfig, wallet }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // TODO: don't just fetch once; subscribe!
        contract.getMessages().then(setMessages);
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const { fieldset, message, donation } = e.target.elements;

        fieldset.disabled = true;

        // TODO: optimistically update page with new message,
        // update blockchain data in background
        // add uuid to each message, so we know which one is already known
        contract.addMessage(
            { text: message.value },
            BOATLOAD_OF_GAS,
            Big(donation.value || '0').times(10 ** 24).toFixed()
        ).then(() => {
            contract.getMessages().then(messages => {
                setMessages(messages);
                message.value = '';
                donation.value = SUGGESTED_DONATION;
                fieldset.disabled = false;
                message.focus();
            });
        });
    };

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
        <main>
            <header>
                <h1>Crypto Squirrels Coding Club</h1>
                {currentUser
                    ? <button onClick={signOut}>Log out</button>
                    : <button onClick={signIn}>Log in</button>
                }
            </header>
            {currentUser
                ? <Form onSubmit={onSubmit} currentUser={currentUser} />
                : <SignIn />
            }
            {!!currentUser && !!messages.length && <Messages messages={messages} />}
            <div class="jt-container">
                <div class="jt-image">
                    <img src="/static/media/squirrels.4f6b90d2.gif" alt="Gallery of Squirrels" />
                </div>
                <div class="jt-content">
                    <h1>Crypto Squirrels</h1>
                    <p>Crypto Squirrels is a collection of 10,000+ randomly generated NFTs. Crypto Squirrels are meant for buyers, creators, and developers who are completely new to the NFT ecosystem.</p>
                    <p>The community is built around education, collaboration, and opportunity. Learn about web3, explore its current use cases, discover new applications, and find members to collaborate on exciting projects with.</p>
                </div>
                <div class="about-container">
                    <h2>About the Squirrels</h2>
                    <div class="about-gallery">
                        <img src="/static/media/gallery-1.c57c0376.png" alt="Sample Squirrel" />
                        <img src="/static/media/gallery-2.9c4b5051.png" alt="Sample Squirrel" />
                        <img src="/static/media/gallery-3.a656b985.png" alt="Sample Squirrel" />
                        <p>The Crypto Squirrels are a set of artwork generated programmatically using over 100 traits (to see how, <a href="https://github.com/rounakbanik/generative-art-nft" target="_blank" rel="noreferrer">click here</a>).
                            The squirrels were designed to serve as the perfect gateway NFT purchase. Learn about traits, perceived rarity, signaling, and price movements without having to invest a fortune.</p>
                        <p>An NFT purchase also supports the Crypto Team as we continue to create tools, resources, and guides to help people onboard into web3. Finally, get access to an exclusive community, guilds, roadmap unlocks, and much more!</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

App.propTypes = {
    contract: PropTypes.shape({
        addMessage: PropTypes.func.isRequired,
        getMessages: PropTypes.func.isRequired
    }).isRequired,
    currentUser: PropTypes.shape({
        accountId: PropTypes.string.isRequired,
        balance: PropTypes.string.isRequired
    }),
    nearConfig: PropTypes.shape({
        contractName: PropTypes.string.isRequired
    }).isRequired,
    wallet: PropTypes.shape({
        requestSignIn: PropTypes.func.isRequired,
        signOut: PropTypes.func.isRequired
    }).isRequired
};

export default App;
