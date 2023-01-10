# Everychain

Everychain is a social onboarding platform for blockchain educators,communities,bootcamps and content creators.

![openpoll](https://firebasestorage.googleapis.com/v0/b/scapula-57ce3.appspot.com/o/screenshots%2FScreen%20Shot%202023-01-10%20at%2010.53.17%20AM.png?alt=media&token=88bdd4c8-0bd6-4d70-b120-afa1400257a5)


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

The video messaging was implemented by uploading recorded webcam streams from the user to livepeer studio using the livepeer.js sdk. The Assest ID  is then passed or sent to the recipient address as string. 
The video is played using the Livepeer player and assest ID .



![openpoll](https://firebasestorage.googleapis.com/v0/b/scapula-57ce3.appspot.com/o/screenshots%2FScreen%20Shot%202023-01-10%20at%2011.03.02%20AM.png?alt=media&token=26db1974-7f00-4e75-8abd-74ced3acbac1)

![openpoll](https://firebasestorage.googleapis.com/v0/b/scapula-57ce3.appspot.com/o/screenshots%2FScreen%20Shot%202023-01-10%20at%2011.05.26%20AM.png?alt=media&token=be8e0d01-c910-48fb-acd3-ab5a216ed693)

![openpoll](https://firebasestorage.googleapis.com/v0/b/scapula-57ce3.appspot.com/o/screenshots%2FScreen%20Shot%202023-01-10%20at%2011.07.26%20AM.png?alt=media&token=56db46d3-5664-447c-8e0b-016d820b1c2c)
