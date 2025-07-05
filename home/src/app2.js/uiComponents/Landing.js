import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Link,
  //    NavLink, useHistory, useLocation
} from "react-router-dom";
//import Swal from "sweetalert2";
import "../css/landing.css";
import { Collapse } from "react-bootstrap";
//import Rightcontainer from "../Components/Rightcontainer";
import Downloadbutton from "../Components/Downloadbutton";
import Header from "../Components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useHistory } from "react-router-dom";
import BottomNav from "../Components/BottomNav";


export default function Landing() {
  const history = useHistory();
  const beckendLocalApiUrl = process.env.REACT_APP_BACKEND_LOCAL_API;
  const beckendLiveApiUrl = process.env.REACT_APP_BACKEND_LIVE_API;
  const nodeMode = process.env.NODE_ENV;
  var baseUrl;
  if (nodeMode === "development") {
    baseUrl = beckendLocalApiUrl;
  } else {
    baseUrl = beckendLiveApiUrl;
  }
  const [clink, setClink] = useState("#")
  const [clink1, setClink1] = useState("#")
  const [clink2, setClink2] = useState("#")

  const [open, setOpen] = useState(false);
  const [userAllData, setUserAllData] = useState();
  const [WebSitesettings, setWebsiteSettings] = useState("");
  const [showDownloadPopup, setShowDownloadPopup] = useState(true);

  // PWA Download states
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  const fetchData = async () => {
    const response = await fetch(baseUrl + "settings/data");
    const data = await response.json();
    return setWebsiteSettings(data);
  };

  const role = async () => {
    const access_token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    await axios
      .get(baseUrl + `me`, { headers })
      .then((res) => {
        setUserAllData(res.data);
      })
      .catch((e) => {
        if (e.response?.status == 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("token");
          //window.location.href = "/login";
          //window.location.reload()
          //history.push("/login")
        }
      });
  };

  useEffect(() => {
    let access_token = localStorage.getItem("token");
    access_token = localStorage.getItem("token");
    if (!access_token) {
      //window.location.reload()
    }
    role();
    fetchData();
  }, []);

  useEffect(() => {
    const setLink = async () => {
      const data = await axios.get(baseUrl + `get-link`)
      console.log(data);
      setClink(data.data.carousel_link)
      setClink1(data.data.carousel_link_1)
      setClink2(data.data.carousel_link_2)
    }
    setLink()
  }, [])

  // PWA Download setup
  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      console.log("PWA install prompt available");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  function handleGameClick(game) {
    history.push(`/HomePagegame/Ludogame`, { state: { game } });
  }

  const handleDownloadClick = (evt) => {
    evt.preventDefault();
    console.log("Download clicked");
    
    // Check if PWA installation is supported
    if (!promptInstall) {
      // Fallback: redirect to app store or show manual installation instructions
      if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
        // iOS users - show instructions for adding to home screen
        alert('To install this app:\n1. Tap the Share button\n2. Select "Add to Home Screen"');
      } else if (navigator.userAgent.includes('Android')) {
        // Android users - try to open app store or show instructions
        alert('To install this app:\n1. Tap the menu button (⋮)\n2. Select "Add to Home Screen" or "Install App"');
      } else {
        // Desktop users
        alert('To install this app:\n1. Click the install icon in your browser\'s address bar\n2. Or use Ctrl+Shift+A (Chrome) / Cmd+Shift+A (Mac)');
      }
      return;
    }
    
    // Trigger PWA installation
    promptInstall.prompt();
    
    // Wait for the user to respond to the prompt
    promptInstall.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setShowDownloadPopup(false); // Hide popup after successful install
      } else {
        console.log('User dismissed the install prompt');
      }
      setPromptInstall(null);
    });
  };

  const closeDownloadPopup = () => {
    setShowDownloadPopup(false);
  };

  return (
    <>
      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 4px 20px rgba(41, 198, 204, 0.3);
          }
          50% {
            box-shadow: 0 4px 20px rgba(41, 198, 204, 0.6);
          }
          100% {
            box-shadow: 0 4px 20px rgba(41, 198, 204, 0.3);
          }
        }
        
        .download-popup:hover .close-btn {
          opacity: 1 !important;
        }
      `}</style>

      <div className="leftContainer">
        <div className="main-area" style={{ paddingTop: "65px" }}>
          <div className="header_top_message">
            <span>Commission: 3% ◉ Referral: 2% For All Games No TDS,No GST</span>
          </div>

          {/* <div className="carousel-container" style={{ paddingTop: '35px', margin: "10px" }}>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
              </ol>

              <div className="carousel-inner">
                <div className="carousel-item active">
                  <a href={clink} target="_blank" rel="noopener noreferrer">
                    <img
                      className="d-block w-100"
                      src={baseUrl + WebSitesettings.CarouselImage1}
                      alt="First slide"
                    />
                  </a>
                  <div className="carousel-caption d-none d-md-block"></div>
                </div>

                <div className="carousel-item">
                  <a href={clink1} target="_blank" rel="noopener noreferrer">
                    <img
                      className="d-block w-100"
                      src={baseUrl + WebSitesettings.CarouselImage2}
                      alt="Second slide"
                    />
                  </a>
                  <div className="carousel-caption d-none d-md-block"></div>
                </div>

                <div className="carousel-item">
                  <a href={clink2} target="_blank" rel="noopener noreferrer">
                    <img
                      className="d-block w-100"
                      src={baseUrl + WebSitesettings.CarouselImage3}
                      alt="Third slide"
                    />
                  </a>
                  <div className="carousel-caption d-none d-md-block"></div>
                </div>
              </div>

              <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div> */}
          

          <div className="note-box">
            {WebSitesettings?.note || (
              <>
                <span role="img" aria-label="note">🚫 Note 🚫 👉</span>
                Please जिस टाइम में जो UPI & Account number लगेंगे उसी पर पेमेंट करें अन्यथा डिपॉजिट ऐड नहीं होगा। withdrawal की कोई समस्या नहीं है।
                <span role="img" aria-label="note">🚫 Note 👉</span>
                Refer की समस्या का समाधान हो चुका है आगे से कोई Problem नहीं आएगी Thankyou 🙏🙏🥰
              </>
            )}
          </div>
          {/* KYC Verification Banner */}
          {userAllData?.verified === "unverified" && (
            <div style={{
              backgroundColor: '#ffe6e6',
              border: '2px solid #ff4444',
              borderRadius: '8px',
              padding: '15px',
              margin: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(255, 68, 68, 0.2)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <div style={{
                  color: '#ff4444',
                  fontSize: '20px'
                }}>
                  ⚠️
                </div>
                <span style={{
                  color: '#d32f2f',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  Please Complete Your KYC
                </span>
              </div>
              <Link 
                to="/kyc2"
                style={{
                  backgroundColor: '#ff4444',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#d32f2f';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#ff4444';
                }}
              >
                Verify Now
              </Link>
            </div>
          )}

          <section className="games-section p-3">
            <div className="d-flex align-items-center games-section-title">
              Our Games
            </div>
            <div className="games-section-headline mt-2 mb-1">
              <picture>
                <img
                  height="16px"
                  width="16px"
                  src="https://khelbro.com/images/global-purple-battleIcon.png"
                  alt=""
                />
              </picture>
              &nbsp;is for Battles and &nbsp;
              <picture>
                <img
                  height="16px"
                  width="16px"
                  src="https://khelbro.com/images/global-blue-tournamentIcon.png"
                  alt=""
                />
              </picture>{" "}
              &nbsp; is for Tournaments.
              <span>Know more here.</span> <hr></hr>
              <div className="games-window ">
                <Link
                  className="gameCard-container"
                  to={`/Homepage/Ludo%20Classics%20Lite`}
                >
                  <span className="d-none blink  d-block text-right" style={{color:"white"}}>
                    ◉ LIVE Min.50 Max.50k
                  </span>
                  <picture className="gameCard-image">
                    <img
                      width="100%"
                      src={
                        process.env.PUBLIC_URL +
                        "/Images/LandingPage_img/manualGame.jpg"
                      }
                      alt=""
                    />
                  </picture>
                  <div className="goverlay">
                    <div className="text">Comming Soon</div>
                  </div>
                </Link>
                <Link
                  className="gameCard-container"
                  to={`/Homepage/Ludo%20Classics%20Pro`}
                >
                  <span className="d-none blink  d-block text-right" style={{color:"white"}}>
                    ◉ Live
                  </span>
                  <picture className="gameCard-image">
                    <img
                      width="100%"
                      src={
                        process.env.PUBLIC_URL +
                        "/Images/LandingPage_img/2.png"
                      }
                      alt=""
                    />
                  </picture>
                  <div className="goverlay">
                    <div className="text">Comming Soon</div>
                  </div>
                </Link>

                <Link
                  className="gameCard-container"
                  onClick={() => { handleGameClick('Owner') }}
                >
                  <span className="d-none blink  d-block text-right" style={{color:"white"}}>
                    ◉ Live
                  </span>
                  <picture className="gameCard-image">
                    <img
                      width="100%"
                      src={
                        process.env.PUBLIC_URL +
                        "/Images/LandingPage_img/3.png"
                      }
                      alt=""
                    />
                  </picture>
                  <div className="goverlay">
                    <div className="text">Comming Soon</div>
                  </div>
                </Link>
                <Link
                  className="gameCard-container"
                  onClick={() => {
                    window.open('https://wa.me/916263925602?text=Hi%20I%20need%20support', '_blank');
                  }}
                >
                  <span className="d-none blink  d-block text-right" style={{color:"white"}}>
                    ◉ Live
                  </span>
                  <picture className="gameCard-image">
                    <img
                      width="100%"
                      src={
                        process.env.PUBLIC_URL +
                        "/Images/LandingPage_img/4.png"
                      }
                      alt=""
                    />
                  </picture>
                  <div className="goverlay">
                    <div className="text">Comming Soon</div>
                  </div>
                </Link>
              </div>
            </div>
            <hr></hr>
          </section>
          <br /><br />
          <br /><br />
          <br /><br />
        </div>
      </div>

      {/* Circular Download Popup */}
      {showDownloadPopup && (
        <div 
          className="download-popup"
          style={{
            position: 'fixed',
            bottom: '50px',
            right: '20px',
            backgroundColor: '#1a1a1a',
            border: '2px solid #29C6CC',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(41, 198, 204, 0.3)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            animation: 'pulse 2s infinite'
          }}
          onClick={handleDownloadClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 25px rgba(41, 198, 204, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(41, 198, 204, 0.3)';
          }}
          title="Download Our App"
        >
          {/* Download Icon */}
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#29C6CC" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7,10 12,15 17,10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>

          {/* Close button - appears on hover */}
          <button
            className="close-btn"
            onClick={(e) => {
              e.stopPropagation();
              closeDownloadPopup();
            }}
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              background: '#29C6CC',
              border: 'none',
              borderRadius: '50%',
              color: '#000',
              fontSize: '12px',
              cursor: 'pointer',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              opacity: '0',
              transition: 'opacity 0.3s ease'
            }}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}