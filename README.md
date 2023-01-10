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

####   Direct video messenger or chats -XMTP pr0tocol and Livepeer player

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


Livestreaming - Livepeer and Huddle sdk



