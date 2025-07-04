import React, { useEffect, useState } from "react";
import axios from "axios";
import Gateway from "./Gateway";
import LinkForm from "./Addlink"

export const Sitesettings = () => {
  const [WebTitle, setWebTitle] = useState("");
  const [WebsiteName, setWebName] = useState("");
  // const [CompanyName, setCompanyName] = useState("");
  // const [CompanyAddress, setCompanyAddress] = useState("");
  // const [CompanyMobile, setCompanyMobile] = useState("");
  // const [CompanyEmail, setCompanyEmail] = useState("");
  // const [CompanyWebsite, setCompanyWebsite] = useState("");
  // const [homeMsg, setHomeMsg] = useState("");
  // const [depositMsg, setDepositMsg] = useState("");
  // const [withdrawMsg, setWithdrawMsg] = useState("");
  // const [gameMsg, setGameMsg] = useState("");
  // const [Logo, setLogo] = useState("");
  const [Note, setNote] = useState("");
  // const [SmallLogo, setSmallLogo] = useState("");
  // const [LandingImage1, setLandingImage1] = useState("");
  // const [LandingImage2, setLandingImage2] = useState("");
  // const [LandingImage3, setLandingImage3] = useState("");
  // const [LandingImage4, setLandingImage4] = useState("");
  // const [isLandingImage1, issetLandingImage1] = useState(true);
  // const [isLandingImage2, issetLandingImage2] = useState(true);
  // const [isLandingImage3, issetLandingImage3] = useState(true);
  // const [isLandingImage4, issetLandingImage4] = useState(true);
  // const [version, setVersion] = useState("");
  const [settingId, setSettingId] = useState("");
  
  // Social Media States (using your existing field names)
  const [whatsapp_link, setWhatsappLink] = useState("");
  const [facebook_link, setFacebookLink] = useState("");
  const [telegram_link, setTelegramLink] = useState("");
  
  // State for carousel images
  // const [CarouselImage1, setCarouselImage1] = useState("");
  // const [CarouselImage2, setCarouselImage2] = useState("");
  // const [CarouselImage3, setCarouselImage3] = useState("");

  const beckendLocalApiUrl = process.env.REACT_APP_BACKEND_LOCAL_API;
  const beckendLiveApiUrl = process.env.REACT_APP_BACKEND_LIVE_API;
  const nodeMode = process.env.NODE_ENV;
  const baseUrl = nodeMode === "development" ? beckendLocalApiUrl : beckendLiveApiUrl;

  useEffect(() => {
    // Fetch main settings
    axios.get(baseUrl + "settings/data", {}).then((res) => {
      console.log(res.data);
      setSettingId(res.data._id || '');
      setWebTitle(res.data.WebTitle);
      setWebName(res.data.WebsiteName);
      setNote(res.data.note);
    });

    // Fetch link settings
    axios.get(baseUrl + "link-settings/data", {}).then((res) => {
      console.log("Link settings:", res.data);
      setWhatsappLink(res.data.whatsapp_link || '');
      setFacebookLink(res.data.facebook_link || '');
      setTelegramLink(res.data.telegram_link || '');
    }).catch((err) => {
      console.log("Error fetching link settings:", err);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Submit main settings
    let formData = new FormData();
    formData.append("settingId", settingId);
    formData.append("WebTitle", WebTitle);
    formData.append("WebsiteName", WebsiteName);
    formData.append("note", Note);
    
    const response = await axios.post(baseUrl + "settings", formData);
    console.log(response.data.status);
    
    // Submit social media links
    const linkData = {
      whatsapp_link: whatsapp_link,
      facebook_link: facebook_link,
      telegram_link: telegram_link
    };
    
    const linkResponse = await axios.post(baseUrl + "add-link", linkData);
    console.log("Link response:", linkResponse.data);
    
    if (response.data.status === 'success' && linkResponse.data === true) {
      alert("Settings and social links submitted successfully");
    } else {
      alert("Settings submitted but there might be an issue with social links");
    }
  };

  

  // useEffect(() => {
  //   const Logo1 = document.getElementById("Logo");
  //   const Logo2 = document.getElementById("SmallLogo");
  //   const LandingImage1 = document.getElementById("LandingImage1");
  //   const LandingImage2 = document.getElementById("LandingImage2");
  //   const LandingImage3 = document.getElementById("LandingImage3");
  //   const LandingImage4 = document.getElementById("LandingImage4");

  //   Logo1.onchange = (e) => {
  //     const [file] = Logo1.files;
  //     setLogo(file);
  //   };
  //   Logo2.onchange = (e) => {
  //     const [file] = Logo2.files;
  //     setSmallLogo(file);
  //   };
  //   LandingImage1.onchange = (e) => {
  //     const [file] = LandingImage1.files;
  //     setLandingImage1(file);
  //   };
  //   LandingImage2.onchange = (e) => {
  //     const [file] = LandingImage2.files;
  //     setLandingImage2(file);
  //   };
  //   LandingImage3.onchange = (e) => {
  //     const [file] = LandingImage3.files;
  //     setLandingImage3(file);
  //   };
  //   LandingImage4.onchange = (e) => {
  //     const [file] = LandingImage4.files;
  //     setLandingImage4(file);
  //   };

  //   const Carousel1 = document.getElementById("CarouselImage1");
  //   const Carousel2 = document.getElementById("CarouselImage2");
  //   const Carousel3 = document.getElementById("CarouselImage3");

  //   Carousel1.onchange = (e) => {
  //     const [file] = Carousel1.files;
  //     setCarouselImage1(file);
  //   };
  //   Carousel2.onchange = (e) => {
  //     const [file] = Carousel2.files;
  //     setCarouselImage2(file);
  //   };
  //   Carousel3.onchange = (e) => {
  //     const [file] = Carousel3.files;
  //     setCarouselImage3(file);
  //   };
  // }, []);

  return (
    <>
      <h3 className="text-uppercase font-weight-bold my-3 text-white">Website Settings</h3>

      <h4 className="text-uppercase font-weight-bold my-3 text-light" >UI Settings</h4>
      <form
        onSubmit={handleSubmit}
        method="post"
        encType="multipart/form-data"
        style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}
      >
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="WebTitle">Website Title</label>
            <input
              className="form-control"
              type="text"
              value={WebTitle}
              onChange={(e) => setWebTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="WebsiteName">Website Name</label>
            <input
              className="form-control"
              type="text"
              value={WebsiteName}
              onChange={(e) => setWebName(e.target.value)}
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="Note">Note</label>
            <input
              className="form-control"
              type="text"
              value={Note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
        
        <h4 className="text-uppercase font-weight-bold my-3 text-light">Social Media Settings</h4>
        
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="facebook_link">Facebook URL</label>
            <input
              className="form-control"
              type="text"
              value={facebook_link}
              onChange={(e) => setFacebookLink(e.target.value)}
              placeholder="https://facebook.com/yourpage"
            />
          </div>
          
          <div className="form-group col-md-4">
            <label htmlFor="telegram_link">Telegram URL</label>
            <input
              className="form-control"
              type="text"
              value={telegram_link}
              onChange={(e) => setTelegramLink(e.target.value)}
              placeholder="https://t.me/yourgroup"
            />
          </div>
          
          <div className="form-group col-md-4">
            <label htmlFor="whatsapp_link">WhatsApp Link</label>
            <input
              className="form-control"
              type="text"
              value={whatsapp_link}
              onChange={(e) => setWhatsappLink(e.target.value)}
              placeholder="https://wa.me/1234567890"
            />
          </div>
        </div>
        
        {/* <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="WebsiteName">Commpany Name</label>
            <input
              className="form-control"
              type="text"
              value={CompanyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
        
          <div className="form-group col-md-4">
            <label htmlFor="WebsiteName">Commpany Address</label>
            <input
              className="form-control"
              type="text"
              value={CompanyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
            />
          </div>
        
          <div className="form-group col-md-4">
            <label htmlFor="WebsiteName">Commpany Mobile</label>
            <input
              className="form-control"
              type="text"
              value={CompanyMobile}
              onChange={(e) => setCompanyMobile(e.target.value)}
            />
          </div>
        
          <div className="form-group col-md-4">
            <label htmlFor="WebsiteEmail">Commpany Email</label>
            <input
              className="form-control"
              type="text"
              value={CompanyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
            />
          </div>
        
          <div className="form-group col-md-4">
            <label htmlFor="WebsiteWebsite">Commpany Website</label>
            <input
              className="form-control"
              type="text"
              value={CompanyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
            />
          </div>
          
           <div className="form-group col-md-4">
            <label htmlFor="WebsiteWebsite">Home Page Message</label>
            <input
              className="form-control"
              type="text"
              value={homeMsg}
              onChange={(e) => setHomeMsg(e.target.value)}
            />
          </div>
          
          <div className="form-group col-md-4">
            <label htmlFor="WebsiteWebsite">Deposit Page Message</label>
            <input
              className="form-control"
              type="text"
              value={depositMsg}
              onChange={(e) => setDepositMsg(e.target.value)}
            />
          </div>
          
          <div className="form-group col-md-4">
            <label htmlFor="WebsiteWebsite">Withdraw Page Message</label>
            <input
              className="form-control"
              type="text"
              value={withdrawMsg}
              onChange={(e) => setWithdrawMsg(e.target.value)}
            />
          </div>
          
          <div className="form-group col-md-4">
            <label htmlFor="WebsiteWebsite">Game Page Message</label>
            <input
              className="form-control"
              type="text"
              value={gameMsg}
              onChange={(e) => setGameMsg(e.target.value)}
            />
          </div>
          
        </div>

        <div className="form-row">
          <div className="form-group col-md-4">

            <label htmlFor="WebsiteName">Right Logo</label>
            <input className="form-control" type="file" name="Logo" id="Logo"  />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="WebsiteName">Left Logo</label>
            <input className="form-control" type="file" name="SmallLogo" id="SmallLogo"  />

          </div>

        </div>

        <div className="form-row">
          <div className="form-group col-md-4">

            <label htmlFor="WebsiteName">Game image (1) </label>
            <input className="form-control" type="file" name="LandingImage1" id="LandingImage1"  />
            <select className="form-control" name="" id="" value={isLandingImage1} onChange={(e) => issetLandingImage1(e.target.value)}>
              <option value="true">on</option>
              <option value="false">off</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="WebsiteName">Game image (2)</label>
            <input className="form-control" type="file" name="LandingImage2" id="LandingImage2"  />
            <select className="form-control" name="" id="" value={isLandingImage2} onChange={(e) => issetLandingImage2(e.target.value)}>
              <option value="true">on</option>
              <option value="false">off</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="WebsiteName">Game image (3)</label>
            <input className="form-control" type="file" name="LandingImage3" id="LandingImage3"  />
            <select className="form-control" name="" id="" value={isLandingImage3} onChange={(e) => issetLandingImage3(e.target.value)}>
              <option value="true">on</option>
              <option value="false">off</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="WebsiteName">Game image (2)</label>
            <input className="form-control" type="file" name="LandingImage4" id="LandingImage4"  />
            <select className="form-control" name="" id="" value={isLandingImage4} onChange={(e) => issetLandingImage4(e.target.value)}>
              <option value="true">on</option>
              <option value="false">off</option>
            </select>
          </div>

        </div>


        <div className="form-row">
          <div className="form-group col-md-4">

            <label htmlFor="WebsiteName">version</label>

            <input
              className="form-control"
              type="text"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            />
          </div>


        </div>
       
              <h4 className="text-uppercase font-weight-bold my-3 text-light">Carousel Images</h4>

        
        <div className="form-row">
    <div className="form-group col-md-4">
      <label htmlFor="CarouselImage1">Carousel Image 1</label>
      <input
        className="form-control"
        type="file"
        id="CarouselImage1"
        onChange={(e) => setCarouselImage1(e.target.files[0])}
      />
    </div>

    <div className="form-group col-md-4">
      <label htmlFor="CarouselImage2">Carousel Image 2</label>
      <input
        className="form-control"
        type="file"
        id="CarouselImage2"
        onChange={(e) => setCarouselImage2(e.target.files[0])}
      />
    </div>

    <div className="form-group col-md-4">
      <label htmlFor="CarouselImage3">Carousel Image 3</label>
      <input
        className="form-control"
        type="file"
        id="CarouselImage3"
        onChange={(e) => setCarouselImage3(e.target.files[0])}
      />
    </div>
  </div> */}

  <div className="form-row">
          <div className="form-group col-md-4">
            <button type="submit" className="btn btn-danger">submit</button>
          </div>
        </div>

      </form>
      
      {/* <Gateway />
      
      <LinkForm/> */}

      
    </>
  );
};