// const SiteSettings = require("../Model/settings");
// const express = require("express");
// const router = express.Router()
// const mongoose = require("mongoose");
// const multer = require("multer")
// const sharp = require("sharp")
// const fs = require("fs")
// const path = require("path");
// const { findById, findOne } = require("../Model/settings");
// const { send } = require("process");

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "public/icon")
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//         cb(null, uniqueSuffix + path.extname(file.originalname));
//     }
// })

// const fileFilter = (req, file, cd) => {
//     if (
//         (file.mimetype === "image/jpg",
//             file.mimetype === "image/jpeg",
//             file.mimetype === "image/png")
//     ) {
//         cd(null, true);
//     } else {
//         cd(null, false);
//     }
// };

// const upload = multer({
//     storage: storage,
//     limits: {
//         fieldSize: 100000000
//     }
// })


// router.post("/settings", upload.fields([
//     { name: 'Logo', maxCount: 1 }, 
//     { name: 'SmallLogo', maxCount: 1 }, 
//     { name: 'LandingImage1', maxCount: 1 }, 
//     { name: 'LandingImage2', maxCount: 1 },
//     { name: 'LandingImage3', maxCount: 1 },
//     { name: 'LandingImage4', maxCount: 1 }
//     ]), async (req, res) => {
//     //console.log();


//     try {
//         if (req.body.settingId) {
//             const updatesetting = await SiteSettings.findById(req.body.settingId);
//             updatesetting.WebTitle = req.body.WebTitle
//             updatesetting.WebsiteName = req.body.WebsiteName
//             updatesetting.CompanyName = req.body.CompanyName
//             updatesetting.CompanyAddress = req.body.CompanyAddress
//             updatesetting.CompanyMobile = req.body.CompanyMobile
//             updatesetting.CompanyEmail = req.body.CompanyEmail
//             updatesetting.CompanyWebsite = req.body.CompanyWebsite
            
//             updatesetting.homeMsg = req.body.homeMsg
//             updatesetting.gameMsg = req.body.gameMsg
//             updatesetting.withdrawMsg = req.body.withdrawMsg
//             updatesetting.depositMsg = req.body.depositMsg

//             if(typeof req.files.Logo !== 'undefined'){

//                 fs.access("./public/icon", (error) => {
//                     if (error) {
//                       fs.mkdirSync("./public/icon");
//                     }
//                   });
//                   const { buffer, originalname } = req.files.Logo[0];
//                   const uniqueSuffix = Date.now() + "-1-" + Math.round(Math.random() * 1e9);
                       
//                   const ref = `${uniqueSuffix}.webp`;
//                   //console.log(buffer);
//                   await sharp(buffer)
//                     .webp({ quality: 20 })
//                     .toFile("./public/icon/" + ref);

//                 updatesetting.Logo = "public/icon/" + ref //req.files.Logo[0].path
//             }
//             if(typeof req.files.SmallLogo !== 'undefined'){
//                 fs.access("./public/icon", (error) => {
//                     if (error) {
//                       fs.mkdirSync("./public/icon");
//                     }
//                   });
//                   const { buffer, originalname } = req.files.SmallLogo[0];
//                   const uniqueSuffix2 = Date.now() + "-2-" + Math.round(Math.random() * 1e9);
                       
//                   const ref2 = `${uniqueSuffix2}.webp`;
//                   //console.log(buffer);
//                   await sharp(buffer)
//                     .webp({ quality: 20 })
//                     .toFile("./public/icon/" + ref2);
//                 updatesetting.SmallLogo = "public/icon/" + ref2 //req.files.SmallLogo[0].path
//             }
//             if(typeof req.files.LandingImage1 !== 'undefined'){
//                 fs.access("./public/icon", (error) => {
//                     if (error) {
//                       fs.mkdirSync("./public/icon");
//                     }
//                   });
//                   const { buffer, originalname } = req.files.LandingImage1[0];
//                   const uniqueSuffix3 = Date.now() + "-3-" + Math.round(Math.random() * 1e9);
                       
//                   const ref3 = `${uniqueSuffix3}.webp`;
//                   //console.log(buffer);
//                   await sharp(buffer)
//                     .webp({ quality: 20 })
//                     .toFile("./public/icon/" + ref3);
//                 updatesetting.LandingImage1 = "public/icon/" + ref3
//             }
//             if(typeof req.files.LandingImage2 !== 'undefined'){
//                 fs.access("./public/icon", (error) => {
//                     if (error) {
//                       fs.mkdirSync("./public/icon");
//                     }
//                   });
//                   const { buffer, originalname } = req.files.LandingImage2[0];
//                   const uniqueSuffix4 = Date.now() + "-4-" + Math.round(Math.random() * 1e9);
                       
//                   const ref4 = `${uniqueSuffix4}.webp`;
//                   //console.log(buffer);
//                   await sharp(buffer)
//                     .webp({ quality: 20 })
//                     .toFile("./public/icon/" + ref4);
//                 updatesetting.LandingImage2 = "public/icon/" + ref4
//             }
//             if(typeof req.files.LandingImage3 !== 'undefined'){
//                 fs.access("./public/icon", (error) => {
//                     if (error) {
//                       fs.mkdirSync("./public/icon");
//                     }
//                   });
//                   const { buffer, originalname } = req.files.LandingImage3[0];
//                   const uniqueSuffix5 = Date.now() + "-5-" + Math.round(Math.random() * 1e9);
                       
//                   const ref5 = `${uniqueSuffix5}.webp`;
//                   //console.log(buffer);
//                   await sharp(buffer)
//                     .webp({ quality: 20 })
//                     .toFile("./public/icon/" + ref5);
//                 updatesetting.LandingImage3 = "public/icon/" + ref5

//                 //updatesetting.LandingImage3 = req.files.LandingImage3[0].path
//             }
//             if(typeof req.files.LandingImage4 !== 'undefined'){
//                 fs.access("./public/icon", (error) => {
//                     if (error) {
//                       fs.mkdirSync("./public/icon");
//                     }
//                   });
//                   const { buffer, originalname } = req.files.LandingImage4[0];
//                   const uniqueSuffix6 = Date.now() + "-6-" + Math.round(Math.random() * 1e9);
                       
//                   const ref6 = `${uniqueSuffix6}.webp`;
//                   //console.log(buffer);
//                   await sharp(buffer)
//                     .webp({ quality: 20 })
//                     .toFile("./public/icon/" + ref6);
//                 updatesetting.LandingImage4 = "public/icon/" + ref6

//                 //updatesetting.LandingImage4 = req.files.LandingImage4[0].path
//             }

//             updatesetting.isLandingImage1 = req.body.isLandingImage1
//             updatesetting.isLandingImage2 = req.body.isLandingImage2
//             updatesetting.isLandingImage3 = req.body.isLandingImage3
//             updatesetting.isLandingImage4 = req.body.isLandingImage4
//             updatesetting.version = req.body.version
//             updatesetting.save();
//             res.send({status:'success', data:updatesetting});
//         }
//         else {
//             let mLogo;
//             let SmallLogo;
//             let LandingImage1;
//             let LandingImage2;
//             let LandingImage3;
//             let LandingImage4;
//             if(typeof req.files.Logo !== 'undefined'){
//                 mLogo = req.files.Logo[0].path
//             }
//             if(typeof req.files.SmallLogo !== 'undefined'){
//                 SmallLogo = req.files.SmallLogo[0].path
//             }
//             if(typeof req.files.LandingImage1 !== 'undefined'){
//                 LandingImage1 = req.files.LandingImage1[0].path
//             }
//             if(typeof req.files.LandingImage2 !== 'undefined'){
//                 LandingImage2 = req.files.LandingImage2[0].path
//             }
//             if(typeof req.files.LandingImage3 !== 'undefined'){
//                 LandingImage3 = req.files.LandingImage3[0].path
//             }
//             if(typeof req.files.LandingImage4 !== 'undefined'){
//                 LandingImage4 = req.files.LandingImage4[0].path
//             }

//             const data = new SiteSettings({
//                 WebTitle: req.body.WebTitle,
//                 WebsiteName: req.body.WebsiteName,
//                 CompanyName: req.body.CompanyName,
//                 CompanyAddress: req.body.CompanyAddress,
//                 CompanyMobile: req.body.CompanyMobile,
                
//                 homeMsg : req.body.homeMsg,
//                 gameMsg : req.body.gameMsg,
//                 withdrawMsg : req.body.withdrawMsg,
//                 depositMsg : req.body.depositMsg,
                
//                 Logo: mLogo,
//                 SmallLogo: SmallLogo,
//                 LandingImage1: LandingImage1,
//                 LandingImage2: LandingImage2,
//                 LandingImage3: LandingImage3,
//                 LandingImage4: LandingImage4,
                
//                 isLandingImage1: req.body.isLandingImage1,
//                 isLandingImage2: req.body.isLandingImage2,
//                 isLandingImage3: req.body.isLandingImage3,
//                 isLandingImage4: req.body.isLandingImage4,
//                 version: req.body.version
//             }); 
            
//             const val = await data.save();
//             //console.log("Settings are being updated", val);
//             res.send({status:'success', data:val});
//         }
//     } catch (err) {
//         console.log(err);
//         res.send({status:'failed', data:err});
//     }

// })

const SiteSettings = require("../Model/settings");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Multer storage setup for handling file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Endpoint for updating or creating site settings
router.post("/settings", upload.fields([
    { name: 'Logo', maxCount: 1 }, 
    { name: 'SmallLogo', maxCount: 1 }, 
    { name: 'LandingImage1', maxCount: 1 }, 
    { name: 'LandingImage2', maxCount: 1 },
    { name: 'LandingImage3', maxCount: 1 },
    { name: 'LandingImage4', maxCount: 1 },
    { name: 'CarouselImage1', maxCount: 1 },
    { name: 'CarouselImage2', maxCount: 1 },
    { name: 'CarouselImage3', maxCount: 1 }
]), async (req, res) => {
    try {
        let settingId = req.body.settingId;
        let updatesetting;

        // Check if settingId exists, update existing settings if true
        if (settingId) {
            updatesetting = await SiteSettings.findById(settingId);
        } else {
            // Create new setting if settingId not provided
            updatesetting = new SiteSettings();
        }

        // Update fields based on request body
        updatesetting.WebTitle = req.body.WebTitle;
        updatesetting.WebsiteName = req.body.WebsiteName;
        updatesetting.CompanyName = req.body.CompanyName;
        updatesetting.CompanyAddress = req.body.CompanyAddress;
        updatesetting.CompanyMobile = req.body.CompanyMobile;
        updatesetting.CompanyEmail = req.body.CompanyEmail;
        updatesetting.CompanyWebsite = req.body.CompanyWebsite;
        updatesetting.homeMsg = req.body.homeMsg;
        updatesetting.note = req.body.note;
        updatesetting.gameMsg = req.body.gameMsg;
        updatesetting.withdrawMsg = req.body.withdrawMsg;
        updatesetting.depositMsg = req.body.depositMsg;
        updatesetting.isLandingImage1 = req.body.isLandingImage1;
        updatesetting.isLandingImage2 = req.body.isLandingImage2;
        updatesetting.isLandingImage3 = req.body.isLandingImage3;
        updatesetting.isLandingImage4 = req.body.isLandingImage4;
        updatesetting.version = req.body.version;

        // Function to handle file upload and update for each image
        const handleImageUpload = async (fieldName, targetField) => {
            if (req.files[fieldName]) {
                const file = req.files[fieldName][0];
                const { buffer, originalname } = file;
                const filename = `${Date.now()}-${originalname}`;

                // Example: Resize and convert to webp format
                await sharp(buffer)
                    .resize({ width: 800 })
                    .webp({ quality: 80 })
                    .toFile(`./public/${filename}`);

                updatesetting[targetField] = `public/${filename}`;
            }
        };

        // Handle upload for each image
        await handleImageUpload('Logo', 'Logo');
        await handleImageUpload('SmallLogo', 'SmallLogo');
        await handleImageUpload('LandingImage1', 'LandingImage1');
        await handleImageUpload('LandingImage2', 'LandingImage2');
        await handleImageUpload('LandingImage3', 'LandingImage3');
        await handleImageUpload('LandingImage4', 'LandingImage4');
        await handleImageUpload('CarouselImage1', 'CarouselImage1');
        await handleImageUpload('CarouselImage2', 'CarouselImage2');
        await handleImageUpload('CarouselImage3', 'CarouselImage3');

        // Save updated or new settings to database
        const savedSetting = await updatesetting.save();

        res.status(200).send({ status: 'success', data: savedSetting });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: 'error', error: err.message });
    }
});


router.get('/settings/data', async (req, res) => {
    try {
        const user = await SiteSettings.findOne()
        res.send(user)
    } catch (e) {
        res.status(404).send()
    }
})



module.exports = router;