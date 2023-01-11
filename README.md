# Everychain

Everychain is a social onboarding platform for blockchain educators,communities,bootcamps and content creators.

![openpoll](https://firebasestorage.googleapis.com/v0/b/scapula-57ce3.appspot.com/o/screenshots%2FScreen%20Shot%202023-01-10%20at%2010.53.17%20AM.png?alt=media&token=c6f41b19-9a42-4219-8700-1bd0fdf73174)


## Table of contents

1. Project description
1. Technologies
1. Dapp Architecture and features
1. Details on implementation of hackathon challanges 


### Dapp architecture /Features

Our dapp include the following features;

1. Ethereum naming service integration - ENS service
2. Direct video messenger or chats -XMTP pr0tocol and Livepeer player
3. Video streaming -Livepeer,Arweave and Bundlr
4. Livestreaming - Livepeer and Huddle sdk
5. Community chat rooms or group messaging( Discord clone) - Streamr protocol
6. Video conferencing - Huddle sdk
7. NFT gated access -NFTport API
8. Notification messaging - Push protcol
9. Lens protocol integration -Lens protocol

### Details on implementation of hackathon challanges 


###   Integration of ENS service

The Ethereum Name Service (ENS) is a distributed, open, and extensible naming system based on the Ethereum blockchain.

We were able to integrate ENS into in our dapp using the Ethers js library to resolve ENS names and avaters.

Source code:
 1. [Connect wallet file](https://github.com/scapula07/everychain-nvb/blob/master/src/components/ConnectWallet/index.js)




````js
 
             import { ethers } from 'ethers'
         
                const connectWallet=async()=>{
                 
                try{
           
                    const provider = new ethers.providers.Web3Provider(window.ethereum)
          
                    await provider.send("eth_requestAccounts", []);
                    
                     const newsigner = provider.getSigner()
                    
                   
                   const account= await newsigner .getAddress()
                 
                     if(chainId ==="0x13881"){
                       setAccount( account)
                   }else if(chainId ==="0x89"){
                    setAccount( account)
                   }
                   else{

                    const resolvedENSname= await provider?.lookupAddress(account);
                   
                    const resolvedENSAvater= await provider?.getAvatar(resolvedENSname ) 
                    
                    setENSName(resolvedENSname)
                    setENSAvater(resolvedENSAvater)
                    setAccount( account)
             
                   }
                 
                  
                   

                   }catch(error){
                     if(error.code === 4001) {
                        // EIP-1193 userRejectedRequest error
                        // If this happens, the user rejected the connection request.
                       //  console.log('metamask did not connect');
                      } else {
                        console.error(error);
                     }
                 }
             }




````

![openpoll](https://firebasestorage.googleapis.com/v0/b/scapula-57ce3.appspot.com/o/newshot%2FScreen%20Shot%202023-01-10%20at%2011.08.48%20AM.jpeg?alt=media&token=515e833e-03fa-448a-b179-3be1104b6d38)






###   Direct video messenger or chats -XMTP pr0tocol and Livepeer player

  XMTP (Extensible Message Transport Protocol) is an open protocol, network, and standards for secure, private web3 messaging.
  
  Source code:
  1. [Messenger folder](https://github.com/scapula07/everychain-nvb/tree/master/src/pages/Messenger)
  2. [Chats folder](https://github.com/scapula07/everychain-nvb/tree/master/src/components/Chats)

  ````js
  
          import { Client,NumberCodec,MediaCodec } from '@xmtp/xmtp-js'
          import { Wallet } from 'ethers'
          import { ethers } from 'ethers'
          import {LivepeerConfig, createReactClient,studioProvider} from '@livepeer/react';


          useEffect(()=>{

              const initClient=async()=>{

                  const provider = new ethers.providers.Web3Provider(window.ethereum)
                  await provider.send("eth_requestAccounts", []);

                  const newsigner = provider.getSigner()
                  const xmtp = await Client.create(newsigner )
                  console.log( xmtp,"xxxxx")
                  setClient( xmtp )
              }
              initClient()
            },[])

          
         const createConvservation=async()=>{
              try{
                const newConversation = await xtmpClient.conversations.newConversation(
                    newAddr
                   )
                   setCurrentChat(newConversation)

              }catch(e){
                console.log(e)
                toast(e.message)
              }

                setnewAddr("")
               setTrigger(false)
              }
              
         const sendMessage=async()=>{
             try{
              const res=await currentChat.send(msg)
              setMessages([...messages,{content:msg}])
               }catch(e){
              console.log(e)
               }

            }
            
            
                const startFunction=()=> {

                        const constraints = { "video": { width: { max: 320 } }, "audio" : true };

                          navigator.mediaDevices.getUserMedia(constraints)
                            .then(gotMedia)
                            .catch(e => { console.error('getUserMedia() failed: ' + e); });
                      }

              function download() {
                theRecorder.stop();
                theStream.getTracks().forEach(track => { track?.stop(); });

                var blob = new Blob(recordedChunks, {type: "video/webm"});
                const file=new File([blob],"videomsg.json")
                setVideo(file )
                createAsset?.();

            

              }

               const {
                mutate: createAsset,
                data: asset,
                status,
                progress,
                error,
              } = useCreateAsset(
                video
                  ? {
                      sources: [{ name: video.name, file: video }] 
                    }
                  : null,
              );

  
  
  ````

The video messaging was implemented by uploading recorded webcam streams from the user to livepeer studio using the livepeer.js sdk. The Assest ID  is then passed or sent to the recipient address as string. 
The video is played using the Livepeer player and assest ID .



![openpoll](https://firebasestorage.googleapis.com/v0/b/scapula-57ce3.appspot.com/o/screenshots%2FScreen%20Shot%202023-01-10%20at%2011.03.02%20AM.png?alt=media&token=26db1974-7f00-4e75-8abd-74ced3acbac1)

![openpoll](https://firebasestorage.googleapis.com/v0/b/scapula-57ce3.appspot.com/o/screenshots%2FScreen%20Shot%202023-01-10%20at%2011.05.26%20AM.png?alt=media&token=be8e0d01-c910-48fb-acd3-ab5a216ed693)

![openpoll](https://firebasestorage.googleapis.com/v0/b/scapula-57ce3.appspot.com/o/screenshots%2FScreen%20Shot%202023-01-10%20at%2011.07.26%20AM.png?alt=media&token=56db46d3-5664-447c-8e0b-016d820b1c2c)


####   Video streaming -Livepeer,Arweave and Bundlr

Video contents(blockchain related) can be streamed from Everychain after uploads .Content creators are incentivised by the platform for each uploads.
This will provide more free learning courses or videos on Everychain.

Source code:
   1. [Uploader file](https://github.com/scapula07/everychain-nvb/blob/master/src/pages/Uploads/uploader.js)
   2. [Video streaming file](https://github.com/scapula07/everychain-nvb/blob/master/src/pages/Home/streamVideoList.js)

`````js
     import { Player, useAssetMetrics, useCreateAsset } from '@livepeer/react';
     import { parseArweaveTxId} from 'livepeer/media';
     import { providers } from "ethers";
     import { WebBundlr } from "@bundlr-network/client";
     
     const fileReaderStream = require('filereader-stream')
     
     
     const [video, setVideo] = useState()
     
        const {
        mutate: createAsset,
        data: asset,
        status,
        progress,
        error,
      } = useCreateAsset(
        video
          ? {
              sources: [{ name: video.name, file: video }] 
            }
          : null,
      );

      const { data: metrics } = useAssetMetrics({
        assetId: asset?.[0].id,
        refetchInterval: 30000,
      });
      
      
      
          const uploadToArweave=async()=>{

            try{
                const provider = new providers.Web3Provider(window.ethereum);
                await provider._ready();
        
                const bundlr = new WebBundlr("https://devnet.bundlr.network", "matic", provider,
                {
                  providerUrl: "https://polygon-mumbai.g.alchemy.com/v2/5-PAZiyQpRy1ouUxhD2vW3_KjGwxPRWi",
              }
                );
                await bundlr.ready();
        
                const price = await bundlr.getPrice(video?.size);
           
                const funded= await bundlr.fund(price);
                var readStream = fileReaderStream(video, [])
              
               const { id } = await bundlr.upload(readStream );
              
                console.log(`Data uploaded ==> https://arweave.net/${id}`);
                  

                  
            }
            catch(e){
                console.log(e)
                toast(e.message)
            }
        
          }
          
              const idParsed =  parseArweaveTxId(vid.videoUrl)
              
                < Player 
                     src={idParsed.url}
                  />


`````


![openpoll](https://firebasestorage.googleapis.com/v0/b/scapula-57ce3.appspot.com/o/screenshots%2FScreen%20Shot%202023-01-10%20at%2010.56.34%20AM.png?alt=media&token=8c367cbc-6737-435e-8199-a2543971595f)

![openpoll](https://firebasestorage.googleapis.com/v0/b/scapula-57ce3.appspot.com/o/screenshots%2FScreen%20Shot%202023-01-10%20at%2011.00.14%20AM.png?alt=media&token=e10430b3-400a-4947-aa4d-f9b269e9bc93)

![openpoll](https://firebasestorage.googleapis.com/v0/b/scapula-57ce3.appspot.com/o/screenshots%2FScreen%20Shot%202023-01-10%20at%2011.01.11%20AM.png?alt=media&token=22b3315f-c70e-4586-9b5e-e2fdda9e2c60)


#### Livestreaming - Livepeer,OBS and Huddle sdk

Live videos or contents can be streamed on Everychain.
The Livestreaming can be done either using OBS with livepeer or huddle sdk with livepeer.

Source code: 
 [Livestream studio file](https://github.com/scapula07/everychain-nvb/blob/master/src/pages/LivestreamsStudio/videoStream.js)
 
 ````js
    import { Player ,ThemeConfig,} from '@livepeer/react';
    import { getHuddleClient } from '@huddle01/huddle01-client';
    export const huddleClient = getHuddleClient('fc15c10a21e40bcae23007ac07ea715a763844fbf07ae5df9c287d5cdeb9fdbf');
    
     const [streamName, setStreamName] = useState('');
       const {
         mutate: createStream,
         data: stream,
         status,
       } = useCreateStream({ name: streamName });
    
     const createLivestream=async()=>{
        createStream?.();
        await sleep(5000) 
       console.log(stream?.playbackId)
      }
      
      const createHuddleLiveStream=async ()=>{
           try{
            const streamHuddle=await huddleClient.startLiveStreaming({
              platform: 'livepeer',
              streamObj: {
                streamLink: "rtmp://rtmp.livepeer.com/live",
                streamKey: stream.streamKey,
                streamName: stream.name
              }
              });
            console.log(streamHuddle)
             }catch(e){
             console.log(e)
           }


          }
 
 ````
 
 ![openpoll](https://firebasestorage.googleapis.com/v0/b/scapula-57ce3.appspot.com/o/screenshots%2FScreen%20Shot%202023-01-10%20at%201.19.20%20PM.png?alt=media&token=f9210aa5-1ce9-45b4-90fe-7975be5d4fac)

![openpoll](https://firebasestorage.googleapis.com/v0/b/scapula-57ce3.appspot.com/o/screenshots%2FScreen%20Shot%202023-01-10%20at%201.33.19%20PM.png?alt=media&token=62d8a473-181c-4872-93b5-e3cbfa2a0bea)

![openpoll](https://firebasestorage.googleapis.com/v0/b/scapula-57ce3.appspot.com/o/screenshots%2FScreen%20Shot%202023-01-10%20at%201.33.33%20PM.png?alt=media&token=17009896-0f6f-44a8-98ca-e384d77b0064)

![openpoll](https://firebasestorage.googleapis.com/v0/b/scapula-57ce3.appspot.com/o/screenshots%2FScreen%20Shot%202023-01-10%20at%201.37.42%20PM.png?alt=media&token=b2f2ffe6-6d20-4aa5-924c-a2c28c2e09ad)

###  Video conferencing - Huddle sdk

Huddle sdk is use to implement the video conferencing feature in our community chat rooms.

Source Code
   1.  [Livestream studio file](https://github.com/scapula07/everychain-nvb/tree/master/src/pages/Communities/VideoConference)

````js

      import { getHuddleClient } from '@huddle01/huddle01-client'; 
      const huddleClient = getHuddleClient('fc15c10a21e40bcae23007ac07ea715a763844fbf07ae5df9c287d5cdeb9fdbf');

      const peersKeys = useHuddleStore((state) => Object.keys(state.peers));
      const lobbyPeers = useHuddleStore((state) => state.lobbyPeers);

       const handleJoin = async () => {
          try {
            await huddleClient.join("dev", {
              address: account,
              wallet: "",
              ens: ensName,
            });

            console.log("joined");
          } catch (error) {
            console.log({ error });
          }
        };


        const stream = useHuddleStore((state) => state.stream);
        const isCamPaused = useHuddleStore((state) => state.isCamPaused);

        const videoRef = useRef(null);

        useEffect(() => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          console.log({ stream });
        }, [stream]);

        <video
            className="w-full"
            ref={videoRef}
            autoPlay
            muted
            playsInline
        ></video>


          const peerCamTrack = useHuddleStore(
      useCallback(
        (state) => state.peers[peerIdAtIndex]?.consumers?.cam,
        [peerIdAtIndex]
      )
    )?.track;

    const peerMicTrack = useHuddleStore(
      useCallback(
        (state) => state.peers[peerIdAtIndex]?.consumers?.mic,
        [peerIdAtIndex]
      )
    )?.track;

    const getStream = (_track) => {
      const stream = new MediaStream();
      stream.addTrack(_track);
      return stream;
    };

    useEffect(() => {
      const videoObj = videoRef.current;

      if (videoObj && peerCamTrack) {
        videoObj.load();
        videoObj.srcObject = getStream(peerCamTrack);
        videoObj.play().catch((err) => {
          console.log({
            message: "Error playing video",
            meta: {
              err,
            },
          });
        });
      }

      return () => {
        if (videoObj) {
          videoObj?.pause();
          videoObj.srcObject = null;
        }
      };
    }, [peerCamTrack]);

    useEffect(() => {
      if (peerMicTrack && audioRef.current) {
        audioRef.current.srcObject = getStream(peerMicTrack);
      }
    }, [peerMicTrack]);


````


 
![openpoll](https://firebasestorage.googleapis.com/v0/b/scapula-57ce3.appspot.com/o/screenshots%2FScreen%20Shot%202023-01-10%20at%2011.13.33%20AM.png?alt=media&token=7f2394e1-0ba4-431b-8755-b1e4c95bf0d4)

![openpoll](https://firebasestorage.googleapis.com/v0/b/scapula-57ce3.appspot.com/o/screenshots%2FScreen%20Shot%202023-01-10%20at%2011.14.22%20AM.png?alt=media&token=ba3ac336-01dd-4e0a-b31d-349d15f0e62a)

![openpoll](https://firebasestorage.googleapis.com/v0/b/scapula-57ce3.appspot.com/o/screenshots%2FScreen%20Shot%202023-01-10%20at%2011.14.37%20AM.png?alt=media&token=7036a0df-d612-4973-86e4-d662557a8574)



###  NFT gated access -NFTport API

For a user to gain access to a community chat room,  he/she must be in possesion or a owner of the everychain Access NFT(ANFT).
The NFTport API is use to mint the access NFT token to each user .The API is also used top check for ownership or possession of the ANFT.

Source code:
1.   [roomAccess file](https://github.com/scapula07/everychain-nvb/blob/master/src/pages/Communities/roomAccess.js)
2.   [room file](https://github.com/scapula07/everychain-nvb/blob/master/src/pages/Communities/Room.js)


````js. 

          
             const mintNft=async()=>{
              toast("Minting NFT")
              const options = {
                method: 'POST',
                headers: {
                  accept: 'application/json',
                  'content-type': 'application/json',
                  Authorization: '5ac96cad-d645-41cc-880f-1e85c554dd4a'
                },
                body: JSON.stringify({
                  chain: 'goerli',
                  contract_address: '0xbb01D6DA9D221609D102f413e5A444888798075c',
                  metadata_uri: avater? avater :"https://i.redd.it/4iyd1x1xha681.jpg",
                  mint_to_address:  account
                })
              };

              fetch('https://api.nftport.xyz/v0/mints/customizable', options)
                .then(response => response.json())
                .then(response => {
                  toast("NFT minted")
                    setAccess(true)
                    console.log(response)

                })
                .catch(err => console.error(err));

            }







              useEffect(()=>{

             const checkForAccess=async()=>{
                 const options = {
                  method: 'GET',
                 headers: {
                 accept: 'application/json',
                 Authorization: '5ac96cad-d645-41cc-880f-1e85c554dd4a'
                 }
               };

        fetch(`https://api.nftport.xyz/v0/accounts/${account}?            chain=goerli&page_size=50&include=default&include=metadata&contract_address=0xbb01D6DA9D221609D102f413e5A444888798075c`, options)
                .then(response => response.json())
                .then(response => {

                  console.log(response,"response")
                  if(response.total >0 ){
                    setAccess(true)
                  }else{
                    setCurrentRoom("access")
                  }


                })
                .catch(err => console.error(err));

            }


             checkForAccess()
       },[])




````


![openpoll](https://firebasestorage.googleapis.com/v0/b/scapula-57ce3.appspot.com/o/newshot%2FScreen%20Shot%202023-01-10%20at%2011.10.36%20AM.png?alt=media&token=6bd00c63-104d-4fe2-b54f-e00ed50a20fb)

![openpoll](https://firebasestorage.googleapis.com/v0/b/scapula-57ce3.appspot.com/o/newshot%2FScreen%20Shot%202023-01-10%20at%2011.13.05%20AM.png?alt=media&token=0a8f013c-0192-44c4-b226-6bf1affd56b4)





### Notification messaging - Push protcol







