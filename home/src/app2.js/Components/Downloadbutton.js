import React, { useEffect, Profiler, useState } from 'react'
// import ReactPWAInstallProvider, { useReactPWAInstall } from "react-pwa-install";
import "./Component-css/Downloadbutton.css?v=0.1"
// let deferredPrompt; 
const Downloadbutton = () => {
     const [supportsPWA, setSupportsPWA] = useState(true);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const onClick = evt => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }
 

  return (
  
<div
  className="my-stickey-footer"
  style={{
    width: "100%",
    maxWidth: 480,
    backgroundColor: "#000000"
  }}
>
  <div className="text-center" style={{ zoom: "0.8", margin: "1rem 1rem" , marginLeft:"1.5rem" }}>
    <button onClick={onClick} className=" btn-sm " style={{ background:"black" ,border:"0.5px solid #29C6CC", borderRadius:"10px", color:"#29C6CC" }}>
      {/* <img
        src="https://skilltox.com/images/icons/download.png"
        alt=""
        style={{ marginRight: 10 , color:"white"}}
        width="15px"
        
      /> */}
      APP
      {/* <img
        src="https://hiplay.in/Images/dowloadIcon.png"
        alt=""
        style={{ marginLeft: 10 }}
        width="13px"
      /> */}
    </button>
   
  </div>
</div>
   
    
    
  )
}

export default Downloadbutton