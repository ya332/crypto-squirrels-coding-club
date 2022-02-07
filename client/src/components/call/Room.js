import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import micmute from "../../assets/micmute.svg";
import micunmute from "../../assets/micunmute.svg";
import webcam from "../../assets/webcam.svg";
import webcamoff from "../../assets/webcamoff.svg";
import placeholder from "../../assets/placeholder_profile_picture.png";
import { useParams } from "react-router-dom";
import { useAuth } from "../../store/authContext";
import socket from "../../utils/socket";
import { event } from "../../utils/constants";
const Container = styled.div`
    min-width: 250px;
    position: absolute;
    right: 0px;
    bottom:50px;
`;
const Controls = styled.div`
  margin: 3px;
  padding: 5px;
  height: 27px;
  width: 98%;
  background-color: rgba(255, 226, 104, 0.1);
  margin-top: -8.5vh;
  filter: brightness(1);
  z-index: 1;
  border-radius: 6px;
`;

const ControlSmall = styled.div`
  margin: 3px;
  padding: 5px;
  height: 16px;
  width: 98%;
  margin-top: -6vh;
  filter: brightness(1);
  z-index: 1;
  border-radius: 6px;
  display: flex;
  justify-content: center;
`;

const ImgComponent = styled.img`
  cursor: pointer;
  height: 25px;
`;

const ImgComponentSmall = styled.img`
  height: 15px;
  text-align: left;
  opacity: 0.5;
`;

const StyledVideo = styled.video`
    width: 250px;
    right: 0px;
    bottom:50px;
    border-radius: 10px;
    overflow: hidden;
    border: 5px solid gray;
    margin-bottom:3vh;
`;

const Placeholder = styled.img`
    width: 250px;
    position: absolute;
    right: 0px;
    bottom:50px;
    border-radius: 10px;
    overflow: hidden;
    margin: 1px;
    border: 5px solid gray;
`;


const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", (stream) => {
            ref.current.srcObject = stream;
        });
    }, []);

    return <StyledVideo playsInline autoPlay ref={ref} />;
};

const Room = () => {
    const [peers, setPeers] = useState([]);
    const [audioFlag, setAudioFlag] = useState(true);
    const [videoFlag, setVideoFlag] = useState(true);
    const [userUpdate, setUserUpdate] = useState([]);
    const userVideo = useRef();
    const [user] = useAuth();
    const peersRef = useRef([]);
    const { roomId } = useParams();
    console.log("roomId inside Room.js", roomId)
    const videoConstraints = {
        minAspectRatio: 1.333,
        minFrameRate: 60,
        height: window.innerHeight / 1.8,
        width: window.innerWidth / 2,
    };
    useEffect(() => {
        createStream();
    }, []);


    useEffect(() => {
        return () => {

            window.addEventListener("beforeunload", function (e) {

                let confirmationMessage = "o/";

                (e || window.event).returnValue = confirmationMessage; //Gecko + IE

                console.log("logout !");
                return confirmationMessage; //Webkit, Safari, Chrome

            });
        }

    });


    function createStream() {
        navigator.mediaDevices
            .getUserMedia({ video: videoConstraints, audio: true })
            .then((stream) => {
                console.log("then")
                userVideo.current.srcObject = stream;
                socket.emit(event.READY_FOR_VIDEO_CALL, { roomId: roomId, username: user.username });
                socket.on("all users", (users) => {
                    console.log("all users", users)
                    const newPeers = [];
                    users.forEach((element) => {
                        console.log("element", element)
                        console.log('forEAch element.socketId', element.socketId)
                        const peer = createPeer(element.socketId, socket.id, stream);
                        peersRef.current.push({
                            peerID: element.socketId,
                            peer,
                        });
                        newPeers.push({
                            peerID: element.socketId,
                            peer,
                        });
                    });
                    console.log("newPeers", newPeers)
                    setPeers(newPeers);
                });
                socket.on("user joined", (payload) => {
                    console.log("==", payload)
                    const peer = addPeer(payload.signal, payload.callerID, stream);
                    peersRef.current.push({
                        peerID: payload.callerID,
                        peer,
                    });
                    const peerObj = {
                        peer,
                        peerID: payload.callerID,
                    };
                    setPeers((users) => [...users, peerObj]);
                });

                socket.on(event.DISCONNECTION, (id) => {
                    console.log("Room.js id", id)
                    console.log("peersRef.current", peersRef.current)
                    console.log("before disconnection", peers);
                    const peerObj = peersRef.current.find((p) => p.peerID === id);
                    if (peerObj) {
                        peerObj.peer.destroy();
                    }
                    const updatedPeers = peersRef.current.filter((p) => p.peerID !== id);
                    peersRef.current = updatedPeers;
                    setPeers(updatedPeers);
                    console.log("after disconnection", peers);
                });

                socket.on("receiving returned signal", (payload) => {
                    const item = peersRef.current.find((p) => p.peerID === payload.id);
                    item.peer.signal(payload.signal);
                });

                socket.on("change", (payload) => {
                    setUserUpdate(payload);
                });
            });
    }

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", (signal) => {
            socket.emit("sendingSignal", {
                userToSignal,
                callerID,
                signal,
            });
        });

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        peer.on("signal", (signal) => {
            socket.emit("returningSignal", { signal, callerID });
        });

        peer.signal(incomingSignal);

        return peer;
    }

    const handleVisibilityForVideo = () => {
        if (videoFlag) {
            return "block"
        } else {
            return "none"
        }
    }

    const handleVisibilityForPlaceholder = () => {
        if (videoFlag) {
            return "none"
        } else {
            return "block"
        }
    }
    return (
        <Container>
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            <Controls>
                <ImgComponent
                    src={videoFlag ? webcam : webcamoff}
                    onClick={() => {
                        if (userVideo.current.srcObject) {
                            userVideo.current.srcObject.getTracks().forEach(function (track) {
                                if (track.kind === "video") {
                                    if (track.enabled) {
                                        socket.emit("change", [...userUpdate, {
                                            id: socket.id,
                                            videoFlag: false,
                                            audioFlag,
                                        }]);
                                        track.enabled = false;
                                        setVideoFlag(false);
                                    } else {
                                        socket.emit("change", [...userUpdate, {
                                            id: socket.id,
                                            videoFlag: true,
                                            audioFlag,
                                        }]);
                                        track.enabled = true;
                                        setVideoFlag(true);
                                    }
                                }
                            });
                        }
                    }}
                />
                &nbsp;&nbsp;&nbsp;
                <ImgComponent
                    src={audioFlag ? micunmute : micmute}
                    onClick={() => {
                        if (userVideo.current.srcObject) {
                            userVideo.current.srcObject.getTracks().forEach(function (track) {
                                if (track.kind === "audio") {
                                    if (track.enabled) {
                                        socket.emit("change", [...userUpdate, {
                                            id: socket.id,
                                            videoFlag,
                                            audioFlag: false,
                                        }]);
                                        track.enabled = false;
                                        setAudioFlag(false);
                                    } else {
                                        socket.emit("change", [...userUpdate, {
                                            id: socket.id,
                                            videoFlag,
                                            audioFlag: true,
                                        }]);
                                        track.enabled = true;
                                        setAudioFlag(true);
                                    }
                                }
                            });
                        }
                    }}
                />
            </Controls>
            {peers.map((peer, index) => {
                console.log("Inside peers map", peer)
                let audioFlagTemp = true;
                let videoFlagTemp = true;
                if (userUpdate) {
                    userUpdate.forEach((entry) => {
                        if (peer && peer.peerID && peer.peerID === entry.id) {
                            audioFlagTemp = entry.audioFlag;
                            videoFlagTemp = entry.videoFlag;
                        }
                    });
                }
                return (
                    <div style={{ marginTop: "20px" }} key={peer.peerID} >
                        <Video peer={peer.peer} />
                        <ControlSmall>
                            <ImgComponentSmall src={videoFlagTemp ? webcam : webcamoff} />
                            &nbsp;&nbsp;&nbsp;
                            <ImgComponentSmall src={audioFlagTemp ? micunmute : micmute} />
                        </ControlSmall>
                    </div>
                );
            })}
        </Container>
    );
};

export default Room;