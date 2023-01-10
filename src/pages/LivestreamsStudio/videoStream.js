import React,{useState} from 'react'
import {MdOutlineAdd,MdOutlineZoomOutMap} from "react-icons/md"
import {RxCopy} from "react-icons/rx"
import {RiArrowDropDownLine} from "react-icons/ri"
import {CiCircleInfo,CiMicrophoneOn,CiVideoOn} from "react-icons/ci"
import {AiOutlineDesktop} from "react-icons/ai"
import StreamModal from './streamModal'
import {AiOutlineCloseCircle } from "react-icons/ai"
import { Player ,ThemeConfig,} from '@livepeer/react';
import { collection, setDoc,doc,getDoc,addDoc} from  'firebase/firestore'
import { db } from '../../firebase';
import { AccountState,EnsNameState } from '../../recoil/globalState'
import { useRecoilValue } from 'recoil'
import toast, { Toast } from 'react-hot-toast'
import { huddleClient } from '../../huddleutil'

 function HostScreen() {
  return (
    <div className='bg-purple-800 flex justify-center items-center border-1 h-1/4 rounded-md '>
  bbb

    </div>
  )
 }


 function StreamPlayer({stream}) {
    return (
      <div className='w-full h-full'>
       
        {stream?.playbackId && (
         <Player
            title={stream?.name}
            playbackId={stream?.playbackId}
            autoPlay
            muted
           
        />
         )}
 
  
      </div>
    )
   }
  



export default function VideoStream({streamName, setStreamName,createStream, status, stream,attendees}) {
    const [trigger,setTrigger] =useState(false)
    const [thumbnail,setThumbnail] =useState("")
    const account =useRecoilValue(AccountState)
    const ensName =useRecoilValue(EnsNameState )
    
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    
    toast("Creating livestream")


    const createLivestream=async()=>{
      createStream?.();
      await sleep(5000) 
      console.log(stream?.playbackId)
      const docRef = await addDoc(collection(db, "livestreams"), {
        streamName:streamName,
        playbackId:stream?.playbackId,
        streamer: ensName,
        account:account,
        thumbnail,
        date:Number(Date.now()),

       });
       console.log(docRef )

       setTrigger(false)
       setThumbnail("")
       setStreamName("")
    }
    
        const createHuddleLiveStream=async ()=>{
         
             huddleClient.startLiveStreaming({
            platform: 'livepeer',
            streamObj: {
              streamLink: "rtmp://rtmp.livepeer.com/live",
              streamKey: stream.streamKey,
              streamName: stream.name
            }
             })
        }
  return ( 
    <>
    <div>
        <div className='flex justify-between items-center bg-purple-700 px-2 py-1'>
           {/* <MdOutlineAdd className='text-white text-sm'/>   */}
           <h5 onClick={()=>setTrigger(true)} className='text-xs font-bold bg-rose-900 px-2 rounded-full py-0.5'> Go live</h5>
           <main className='flex space-x-4'>
              <h5 className='flex items-center space-x-2'>
                <RxCopy  className='text-xs'/>
                <span className='text-xs'>ID:{"956788"}</span>
              </h5>
              <h5 className='flex space-x-2'>
                <MdOutlineZoomOutMap  className='text-xs'/>
                <RiArrowDropDownLine className='text-xs' />
              </h5>
           
           </main>
        </div>

        <div className='bg-purple-900 h-96 flex w-full space-x-2 px-2 py-2'>
             <div className='w-1/4 overflow-y-scroll h-full'>
                <div className='flex flex-col space-y-2  w-full comm-h'>
                    {attendees.map(()=>
                      <HostScreen />
                    )}
                
                </div>
              

             </div>
             <div className='w-3/4'>
                 <StreamPlayer stream={stream}/>
             </div>


        </div>

        <div className='bg-purple-900 flex items-center justify-between  px-4 mt-8 py-4'>
            <h5>{"Samuel Mike"}</h5>
            <main className='flex items-center space-x-4 '>
               <h5 className='bg-green-600 rounded-full p-1'><CiMicrophoneOn className='text-lg' /></h5> 
               <h5  className='bg-green-600 rounded-full p-1'> <CiVideoOn className='text-lg' /></h5>
                <h5  className='bg-green-600 rounded-full p-1'>< AiOutlineDesktop  className='text-lg'/></h5>
            </main>

        </div>

    </div>
   < StreamModal trigger={trigger} cname="h-2/5 w-2/5 shadow rounded-lg py-4 px-8">
       <main className='flex justify-between border-b pb-4'>
          <h5 className='text-xl font-thin'>Creating a stream</h5>
           <button onClick={()=>setTrigger(false)}><AiOutlineCloseCircle className="text-md font-thin" /></button>
         </main>
         
         <div className='flex flex-col items-center w-full justify-center h-full space-y-4'>
             <input 
                type="text"
                placeholder="Stream name"
                className='w-full bg-purple-900 border px-4 py-1 text-sm text-white  outline-none'
                name='streamName'
                value={streamName}
                onChange={(e) => setStreamName(e.target.value)}
             />

               <input 
                type="text"
                placeholder="Thumbnail url"
                className='w-full bg-purple-900 border px-4 py-1 text-sm text-white  outline-none'
                name='thumbnail'
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
             /> 

             <button className='bg-purple-700 w-full py-1'
                onClick={createLivestream}
                  disabled={ status === 'loading' || !createStream}
             >Create stream</button>
         </div>
   </StreamModal>
    </>
  )
}
