import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";
import { Room } from "./Room";

export const Landing = () => {
    const [name, setName] = useState("");
    const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null);
    const [localVideoTrack, setlocalVideoTrack] = useState<MediaStreamTrack | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [joined, setJoined] = useState(false);

    const getCam = async () => {
        const stream = await window.navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
        // MediaStream
        const audioTrack = stream.getAudioTracks()[0]
        const videoTrack = stream.getVideoTracks()[0]
        setLocalAudioTrack(audioTrack);
        setlocalVideoTrack(videoTrack);
        if (!videoRef.current) {
            return;
        }
        videoRef.current.srcObject = new MediaStream([videoTrack])
        videoRef.current.play();
        // MediaStream
    }

    useEffect(() => {
        if (videoRef && videoRef.current) {
            getCam()
        }
    }, [videoRef]);

    if (!joined) {
            
    // return <div>
    //         <video autoPlay ref={videoRef}></video>
    //         <input type="text" onChange={(e) => {
    //             setName(e.target.value);
    //         }}>
    //         </input>
    //         <button onClick={() => {
    //             setJoined(true);
    //         }}>Join</button>
    //     </div>
    // }

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Navbar */}
            <header className="flex items-center justify-between px-4 py-2 bg-white shadow border-b border-black/20">
                <h1 className="text-2xl font-bold text-gray-800">Omegle</h1>
                <div className="text-sm text-gray-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="h-5 w-5 mr-1 inline-block"
                    >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <span>Online: 1234</span>
                </div>
            </header>
            {/* Main */}
            <main className="flex-1 gap-1 overflow-auto p-4 bg-white flex justify-center">
                {/* Video Section */}
                <div className="flex flex-col space-y-4 w-1/2">
                    <video autoPlay  ref={videoRef} className="overflow-hidden shadow-lg w-full mx-auto p-4 h-full border-2 border-gray-300 rounded-md bg-black"></video>
                    <input placeholder = "Enter your name" type="text" onChange={(e) => {
                        setName(e.target.value);
                    }}>
                    </input>
                    <button className="bg-blue" onClick={() => {
                        setJoined(true);
                    }}>Join</button>
                </div>
                
            </main>
        </div>
    )
    
    }
    return <Room name={name} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack} />
}