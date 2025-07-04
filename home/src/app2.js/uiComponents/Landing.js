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

  function handleGameClick(game) {
    history.push(`/HomePagegame/Ludogame`, { state: { game } });

  }


  return (
    <>


      <div className="leftContainer">

        <div className="main-area" style={{ paddingTop: "65px" }}>

          <div className="header_top_message">
            <span>Commission: 5% ◉ Referral: 2% For All Games No TDS,No GST</span>
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
                  {/* <div className="gameCard-title">
                    <span className="d-none text-dark d-block text-right">
                      ◉ Manual Ludo Classic
                    </span>
                  </div> */}
                  <div className="goverlay">
                    <div className="text">Comming Soon</div>
                  </div>
                </Link>
                {/*/Homepage/Ludo%20Classics%20Pro*/}
                <Link
                  className="gameCard-container"
                  // to='/yodhaContaxt'
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
                  {/* <div className="gameCard-title">
                    <span className="d-none text-dark d-block text-right">
                      ◉  Yodha Ludo
                    </span>
                  </div> */}
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
                  {/* <div className="gameCard-title">
                    <span className="d-none text-dark d-block text-right">
                      ◉ KhelBro Ludo
                    </span>
                  </div> */}
                  <div className="goverlay">
                    <div className="text">Comming Soon</div>
                  </div>
                </Link>
                {/*/Homepage/Ludo%20Classics%20Pro*/}
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
                  {/* <div className="gameCard-title">
                    <span className="d-none text-dark d-block text-right">
                      ◉  Ludo Classic
                    </span>
                  </div> */}
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

          {/* <section className="footer">
            <div className="footer-divider" />
            <div className="">
              <a
                className="px-3 py-4 d-flex align-items-center"
                href="#!"
                style={{ textDecoration: "none" }}
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
              >
                <picture className="icon">
                  <img
                    src="/Images/LandingPage_img/Header_profile.png"
                    width="56px"
                    height="56px"
                    alt="profile"
                    style={{ width: "56px", }}
                  />
                </picture>
                <span
                  style={{
                    color: "#050505",
                    fontSize: "1em",
                    fontWeight: 400,
                  }}
                  className={!open ? "d-block" : "d-none"}
                >
                  {" "}
                  Terms, Privacy, Support
                </span>

                {open ? (
                  <i
                    className="mdi mdi-chevron-up ml-auto"
                    style={{ fontSize: "1.7em", color: "rgb(103, 103, 103)" }}
                  ></i>
                ) : (
                  <i
                    style={{ fontSize: "1.7em", color: "rgb(103, 103, 103)" }}
                    className="mdi mdi-chevron-down ml-auto"
                  ></i>
                )}
              </a>
              <Collapse in={open}>
                <div id="example-collapse-text" className="px-3 overflow-hidden">
                  <div className="row footer-links">
                    <Link className="col-6" to="/term-condition">
                      Terms &amp; Condition
                    </Link>
                    <Link className="col-6" to="/PrivacyPolicy">
                      Privacy Policy
                    </Link>
                    <Link className="col-6" to="/RefundPolicy">
                      Refund/Cancellation Policy
                    </Link>
                    <Link className="col-6" to="/contact-us">
                      Contact Us
                    </Link>
                    <Link className="col-6" to="/responsible-gaming">
                      Responsible Gaming
                    </Link>
                  </div>
                </div>
              </Collapse>
              <hr></hr>

              <div className="footer-divider" style={{marginTop:"2rem"}}/>
              {/* <div className="px-3 py-4">
                <div className="footer-text-bold">About Us</div>
                <br />
                <div className="footer-text">
                  {WebSitesettings ? WebSitesettings.WebsiteName : "MaxwayInfotechLudo"} is a
                  real-money gaming product owned and operated by{" "}
                  {WebSitesettings ? WebSitesettings.CompanyName : " "} ("
                  {WebSitesettings ? WebSitesettings.WebsiteName : " "}" or "We"
                  or "Us" or "Our").
                </div>
                <br />
                <div className="footer-text-bold">
                  Our Business &amp; Products
                </div>
                <br />
                <div className="footer-text">
                  We are an HTML5 game-publishing company and our mission is to
                  make accessing games fast and easy by removing the friction of
                  app-installs.
                </div>
                <br />
                <div className="footer-text">
                  {WebSitesettings ? WebSitesettings.WebsiteName : " "} is a
                  skill-based real-money gaming platform accessible only for our
                  users in India. It is accessible on{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={WebSitesettings ? WebSitesettings.CompanyWebsite : " "}
                  >
                    {WebSitesettings ? WebSitesettings.CompanyWebsite : " "}
                  </a>
                  . On {WebSitesettings ? WebSitesettings.WebsiteName : " "},
                  users can compete for real cash in Tournaments and Battles. They
                  can encash their winnings via popular options such as Paytm
                  Wallet, Amazon Pay, Bank Transfer, Mobile Recharges etc.
                </div>
                <br />
                <div className="footer-text-bold">Our Games</div>
                <br />
                <div className="footer-text">
                  {WebSitesettings ? WebSitesettings.WebsiteName : " "} has a
                  wide-variety of high-quality, premium HTML5 games. Our games are
                  especially compressed and optimised to work on low-end devices,
                  uncommon browsers, and patchy internet speeds.
                </div>
                <br />
                <div className="footer-text">
                  We have games across several popular categories: Arcade, Action,
                  Adventure, Sports &amp; Racing, Strategy, Puzzle &amp; Logic. We
                  also have a strong portfolio of multiplayer games such as Ludo,
                  Chess, 8 Ball Pool, Carrom, Tic Tac Toe, Archery, Quiz, Chinese
                  Checkers and more! Some of our popular titles are: Escape Run,
                  Bubble Wipeout, Tower Twist, Cricket , Ludo With Friends. If you
                  have any suggestions around new games that we should add or if
                  you are a game developer yourself and want to work with us,
                  don't hesitate to drop in a line at{" "}

                  !
                </div>
              </div> 
            </div>
          </section> */}
          {/* <div className="downloadButton">
            <Downloadbutton />
          </div> */}
        </div>
      </div>
      {/* // <div className='rightContainer'>
            //     <Rightcontainer/>
            // </div> */}
    </>
  );
}
