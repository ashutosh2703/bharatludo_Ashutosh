import React, { useState } from 'react'
// import '../components/common.css'
// import contest from '/Images/yodhaContaxt/contests.png'
import { Link } from 'react-router-dom';
// import maintenance from '/Images/yodhaContaxt/maintenance.webp'
export const Yodhacontaxt = () => {
    const [activeTab, setActiveTab] = useState("contests");
    const handleClick= (tab)=>{
        setActiveTab(tab);
    };
 
  return (
    <>
    <div className="leftContainer" style={{ minHeight: "100vh" }}>
   <div style={{backgroundColor:'rgb(232, 244, 253)',height:'auto',width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',padding:'3px 0px 16px'}}>
     <div style={{width:'9%',height:'auto'}}>
          <p style={{color:'rgb(33, 150, 243)',border:'2px solid rgb(33, 150, 243)',borderRadius: '50px',width:'16px',height:'16px',display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'bold',fontSize:'11px'}}>i</p>
     </div>
     <div style={{width:'80%',height:'auto'}}>
          <p style={{color:'#2c2c2c',fontSize:'12px',fontWeight:'500',marginBottom:'0px',lineHeight:'17px',fontFamily:'Roboto'}}>Update <span style={{fontWeight:'bold'}}>Chrome Browser</span>  from play store or app store, if your game not starting.</p>
     </div>
   </div>
   <div style={{height:'auto',width:'100%',padding:'18px 0px 9px',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
      <div style={{height:'auto',width:'38%',color:'#2c2c2c',fontWeight:'bold',fontFamily:'Roboto',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
           <img src={'/Images/yodhaContaxt/contests.png'} alt='' style={{width:'14%',height:'auto',marginRight:'10px'}}/> Contests
      </div>
      <div style={{height:'auto',width:'35%',fontFamily:'Roboto',color:'#959595',fontSize:'13px',fontWeight:'700',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
      <Link to='/rules' style={{display:'flex',justifyContent:'center',alignItems:'baseline',textDecoration:'none',color:'#959595'}}>    RULES <p style={{color:'#959595',border:'2px solid #959595',borderRadius: '50px',width:'16px',height:'16px',display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'bold',fontSize:'11px',marginLeft:'10px'}}>i</p></Link> 
      </div>
   </div>
   <div style={{height:'auto',backgroundColor:'#f5f5f5',boxShadow:'0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',display:'flex',flexDirection:'row',justifyContent:'space-between,align-items: center'}}>
     <div  style={{width:'50%',height:'auto',display:'flex',justifyContent:'center',alignItems:'center',borderBottom: activeTab === 'contests' ? '2px solid #3f51b5' : 'none'}} onClick={()=> handleClick('contests')}>
          <p style={{fontWeight:'500',color: activeTab === 'contests' ? '#3f51b5' : 'rgb(0 0 0 / 54%)',fontSize:'15px'}}>CONTESTS</p> 
     </div>
     <div style={{width:'50%',height:'auto',display:'flex',justifyContent:'center',alignItems:'center',borderBottom: activeTab === 'mycontests' ? '2px solid #3f51b5' : 'none'}}onClick={()=>handleClick('mycontests')}>
          <p style={{fontWeight:'500',color: activeTab === 'mycontests' ? '#3f51b5' :'rgb(0 0 0 / 54%)',fontSize:'15px'}}>MY CONTESTS</p> 
     </div>
   </div>
   <div>
    {activeTab === 'contests' && (
         <>
            {/* Free Contest */}
            <div style={{height:'auto',padding:'30px 23px 17px'}}>
                <div style={{width:'100%',height:'auto'}}>
                 <h5 style={{color:'#212529',fontFamily:'Roboto',fontSize: '18px',marginTop:'0%', marginBottom:'6px'}}>Free Contest</h5>
                 <div style={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, .2), 0 6px 20px 0 rgba(0, 0, 0, .19',borderRadius: '10px',backgroundColor:'white',height: 'auto',padding:'0px 0px 11px'}}>
                      <div style={{background:'linear-gradient(35deg,#696edb,#97a9db 50%,#796ede)',height:'auto',width:'100%',borderTopLeftRadius:'10px',borderTopRightRadius:'10px',padding:'6px 0px 5px'}}>
                          <p style={{width: '14px',height:'14px',border:'1px solid #fff',borderRadius:'50%',fontSize:'9px',fontWeight:'700',textAlign:'center',marginBottom:'0%',color:'white',padding:'2px 2px 0px 2px',marginTop:'0%',marginLeft:'9px'}}>
                            S
                          </p>
                      </div> 
                      <div style={{height:'7vh',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <div style={{width:'29%',height:'auto',fontFamily:'Roboto',color:'#212529',fontWeight:'700',fontSize:'15px',display:'flex',justifyContent:'center'}}>
                                WIN ₹ 50
                            </div>
                            <div style={{width:'35%',height:'auto',display:'flex',justifyContent:'center',alignItems:'center'}}>
                               <Link to='/amountclick' style={{textDecoration:'none'}}>
                                <p style={{backgroundColor:'#6980a6',height:'auto',boxShadow:'0 2px 4px 0 rgba(0,0,0,.2),0 3px 10px 0 rgba(0,0,0,.19)',borderRadius:'15px',width: '70px',color:'white',fontWeight:'700',fontSize:'13px',display:'flex',justifyContent:'center',alignItems:'center',padding:'7px'}}>₹0</p>
                                </Link> 
                            </div>
                      </div>
                      <div style={{padding:'0px 14px'}}>
                           <input type="range" class="form-range" id="customRange1" value="60" style={{width:'100%',height: '1vh'}}/>
                           <div style={{height: 'auto',width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                <div style={{height:'2vh',width:'40%',color: '#212529',fontSize:'12px',fontWeight:'500',fontStyle:'Roboto'}}>
                                     43 / 120 Entries
                                </div>
                                <div style={{height:'2vh',width:'43%',color: '#212529',fontSize:'12px',fontWeight:'500',fontStyle:'Roboto'}}>
                                     max 1 entries /per user 
                                </div>
                           </div>
                      </div>
                  </div>
                </div>
            </div>
            <div style={{backgroundColor:'rgb(224, 224, 224)',height:'10px'}}>
            </div>
            {/* Mega Contest */}
            <div style={{height:'auto',padding:'30px 23px 17px'}}>
                <div style={{width:'100%',height:'auto'}}>
                 <h5 style={{color:'#212529',fontFamily:'Roboto',fontSize: '18px',marginTop:'0%', marginBottom:'6px'}}>Mega Contest 😍😍</h5>
                 <div style={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, .2), 0 6px 20px 0 rgba(0, 0, 0, .19',borderRadius: '10px',backgroundColor:'white',height: 'auto',padding:'0px 0px 11px'}}>
                      <div style={{background:'linear-gradient(35deg,#696edb,#97a9db 50%,#796ede)',height:'auto',width:'100%',borderTopLeftRadius:'10px',borderTopRightRadius:'10px',padding:'6px 0px 5px'}}>
                          <p style={{width: '14px',height:'14px',border:'1px solid #fff',borderRadius:'50%',fontSize:'9px',fontWeight:'700',textAlign:'center',marginBottom:'0%',color:'white',padding:'2px 2px 0px 2px',marginTop:'0%',marginLeft:'9px'}}>
                            M
                          </p>
                      </div> 
                      <div style={{height:'7vh',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <div style={{width:'29%',height:'auto',fontFamily:'Roboto',color:'#212529',fontWeight:'700',fontSize:'15px',display:'flex',justifyContent:'center'}}>
                                WIN ₹ 1000
                            </div>
                            <div style={{width:'35%',height:'auto',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <p style={{backgroundColor:'#6980a6',height:'auto',boxShadow:'0 2px 4px 0 rgba(0,0,0,.2),0 3px 10px 0 rgba(0,0,0,.19)',borderRadius:'15px',width: '70px',color:'white',fontWeight:'700',fontSize:'13px',display:'flex',justifyContent:'center',alignItems:'center',padding:'7px'}}>₹10</p>
                            </div>
                      </div>
                      <div style={{padding:'0px 14px'}}>
                           <input type="range" class="form-range" id="customRange1" value="32" style={{width:'100%',height: '1vh'}}/>
                           <div style={{height: 'auto',width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                <div style={{height:'2vh',width:'40%',color: '#212529',fontSize:'12px',fontWeight:'500',fontStyle:'Roboto'}}>
                                     60 / 120 Entries
                                </div>
                                <div style={{height:'2vh',width:'43%',color: '#212529',fontSize:'12px',fontWeight:'500',fontStyle:'Roboto'}}>
                                     max 2 entries / per user 
                                </div>
                           </div>
                      </div>
                  </div>
                </div>
            </div>
            <div style={{backgroundColor:'rgb(224, 224, 224)',height:'10px'}}>
            </div>
            {/* Trending Now */}
            <div style={{height:'auto',padding:'30px 23px 17px'}}>
                 <div style={{width:'100%',height:'auto'}}>
                     <h5 style={{color:'#212529',fontFamily:'Roboto',fontSize: '18px',marginTop:'0%', marginBottom:'6px'}}>Trending Now</h5>
                     <div style={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, .2), 0 6px 20px 0 rgba(0, 0, 0, .19',borderRadius: '10px',backgroundColor:'white',height: 'auto',padding:'0px 0px 11px'}}>
                      <div style={{background:'linear-gradient(35deg,#696edb,#97a9db 50%,#796ede)',height:'auto',width:'100%',borderTopLeftRadius:'10px',borderTopRightRadius:'10px',padding:'6px 0px 5px'}}>
                          <p style={{width: '14px',height:'14px',border:'1px solid #fff',borderRadius:'50%',fontSize:'9px',fontWeight:'700',textAlign:'center',marginBottom:'0%',color:'white',padding:'2px 2px 0px 2px',marginTop:'0%',marginLeft:'9px'}}>
                            M
                          </p>
                      </div> 
                      <div style={{height:'7vh',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <div style={{width:'29%',height:'auto',fontFamily:'Roboto',color:'#212529',fontWeight:'700',fontSize:'15px',display:'flex',justifyContent:'center'}}>
                                WIN ₹ 100
                            </div>
                            <div style={{width:'35%',height:'auto',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <p style={{backgroundColor:'#6980a6',height:'auto',boxShadow:'0 2px 4px 0 rgba(0,0,0,.2),0 3px 10px 0 rgba(0,0,0,.19)',borderRadius:'15px',width: '70px',color:'white',fontWeight:'700',fontSize:'13px',display:'flex',justifyContent:'center',alignItems:'center',padding:'7px'}}>₹10</p>
                            </div>
                      </div>
                      <div style={{padding:'0px 14px'}}>
                           <input type="range" class="form-range" id="customRange1" value="32" style={{width:'100%',height: '1vh'}}/>
                           <div style={{height: 'auto',width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                <div style={{height:'2vh',width:'40%',color: '#212529',fontSize:'12px',fontWeight:'500',fontStyle:'Roboto'}}>
                                     7 / 12 Entries
                                </div>
                                <div style={{height:'2vh',width:'43%',color: '#212529',fontSize:'12px',fontWeight:'500',fontStyle:'Roboto'}}>
                                     max 2 entries / per user 
                                </div>
                           </div>
                      </div>
                     </div>
                     <div style={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, .2), 0 6px 20px 0 rgba(0, 0, 0, .19',borderRadius: '10px',backgroundColor:'white',height: 'auto',padding:'0px 0px 11px',marginTop:'10px'}}>
                      <div style={{background:'linear-gradient(35deg,#696edb,#97a9db 50%,#796ede)',height:'auto',width:'100%',borderTopLeftRadius:'10px',borderTopRightRadius:'10px',padding:'6px 0px 5px'}}>
                          <p style={{width: '14px',height:'14px',border:'1px solid #fff',borderRadius:'50%',fontSize:'9px',fontWeight:'700',textAlign:'center',marginBottom:'0%',color:'white',padding:'2px 2px 0px 2px',marginTop:'0%',marginLeft:'9px'}}>
                            M
                          </p>
                      </div> 
                      <div style={{height:'7vh',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <div style={{width:'29%',height:'auto',fontFamily:'Roboto',color:'#212529',fontWeight:'700',fontSize:'15px',display:'flex',justifyContent:'center'}}>
                                WIN ₹ 500
                            </div>
                            <div style={{width:'35%',height:'auto',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <p style={{backgroundColor:'#6980a6',height:'auto',boxShadow:'0 2px 4px 0 rgba(0,0,0,.2),0 3px 10px 0 rgba(0,0,0,.19)',borderRadius:'15px',width: '70px',color:'white',fontWeight:'700',fontSize:'13px',display:'flex',justifyContent:'center',alignItems:'center',padding:'7px'}}>₹50</p>
                            </div>
                      </div>
                      <div style={{padding:'0px 14px'}}>
                           <input type="range" class="form-range" id="customRange1" value="32" style={{width:'100%',height: '1vh'}}/>
                           <div style={{height: 'auto',width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                <div style={{height:'2vh',width:'40%',color: '#212529',fontSize:'12px',fontWeight:'500',fontStyle:'Roboto'}}>
                                    3 / 12 Entries
                                </div>
                                <div style={{height:'2vh',width:'43%',color: '#212529',fontSize:'12px',fontWeight:'500',fontStyle:'Roboto'}}>
                                     max 2 entries / per user 
                                </div>
                           </div>
                      </div>
                     </div>
                     <div style={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, .2), 0 6px 20px 0 rgba(0, 0, 0, .19',borderRadius: '10px',backgroundColor:'white',height: 'auto',padding:'0px 0px 11px',marginTop:'10px'}}>
                      <div style={{background:'linear-gradient(35deg,#696edb,#97a9db 50%,#796ede)',height:'auto',width:'100%',borderTopLeftRadius:'10px',borderTopRightRadius:'10px',padding:'6px 0px 5px'}}>
                          <p style={{width: '14px',height:'14px',border:'1px solid #fff',borderRadius:'50%',fontSize:'9px',fontWeight:'700',textAlign:'center',marginBottom:'0%',color:'white',padding:'2px 2px 0px 2px',marginTop:'0%',marginLeft:'9px'}}>
                            M
                          </p>
                      </div> 
                      <div style={{height:'7vh',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <div style={{width:'29%',height:'auto',fontFamily:'Roboto',color:'#212529',fontWeight:'700',fontSize:'15px',display:'flex',justifyContent:'center'}}>
                                WIN ₹ 1000
                            </div>
                            <div style={{width:'35%',height:'auto',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <p style={{backgroundColor:'#6980a6',height:'auto',boxShadow:'0 2px 4px 0 rgba(0,0,0,.2),0 3px 10px 0 rgba(0,0,0,.19)',borderRadius:'15px',width: '70px',color:'white',fontWeight:'700',fontSize:'13px',display:'flex',justifyContent:'center',alignItems:'center',padding:'7px'}}>₹100</p>
                            </div>
                      </div>
                      <div style={{padding:'0px 14px'}}>
                           <input type="range" class="form-range" id="customRange1" value="32" style={{width:'100%',height: '1vh'}}/>
                           <div style={{height: 'auto',width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                <div style={{height:'2vh',width:'40%',color: '#212529',fontSize:'12px',fontWeight:'500',fontStyle:'Roboto'}}>
                                    3 / 12 Entries
                                </div>
                                <div style={{height:'2vh',width:'43%',color: '#212529',fontSize:'12px',fontWeight:'500',fontStyle:'Roboto'}}>
                                     max 2 entries / per user 
                                </div>
                           </div>
                      </div>
                     </div>
                 </div>
            </div>
            <div style={{backgroundColor:'rgb(224, 224, 224)',height:'10px'}}>
            </div>
             {/* Winner Takes All */}
             <div style={{height:'auto',padding:'30px 23px 17px'}}>
                 <div style={{width:'100%',height:'auto'}}>
                     <h5 style={{color:'#212529',fontFamily:'Roboto',fontSize: '18px',marginTop:'0%', marginBottom:'6px'}}>Winner Takes All!</h5>
                     <div style={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, .2), 0 6px 20px 0 rgba(0, 0, 0, .19',borderRadius: '10px',backgroundColor:'white',height: 'auto',padding:'0px 0px 11px'}}>
                      <div style={{background:'linear-gradient(35deg,#696edb,#97a9db 50%,#796ede)',height:'auto',width:'100%',borderTopLeftRadius:'10px',borderTopRightRadius:'10px',padding:'6px 0px 5px'}}>
                          <p style={{width: '14px',height:'14px',border:'1px solid #fff',borderRadius:'50%',fontSize:'9px',fontWeight:'700',textAlign:'center',marginBottom:'0%',color:'white',padding:'2px 2px 0px 2px',marginTop:'0%',marginLeft:'9px'}}>
                            S
                          </p>
                      </div> 
                      <div style={{height:'7vh',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <div style={{width:'29%',height:'auto',fontFamily:'Roboto',color:'#212529',fontWeight:'700',fontSize:'15px',display:'flex',justifyContent:'center'}}>
                                WIN ₹ 150
                            </div>
                            <div style={{width:'35%',height:'auto',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <p style={{backgroundColor:'#6980a6',height:'auto',boxShadow:'0 2px 4px 0 rgba(0,0,0,.2),0 3px 10px 0 rgba(0,0,0,.19)',borderRadius:'15px',width: '70px',color:'white',fontWeight:'700',fontSize:'13px',display:'flex',justifyContent:'center',alignItems:'center',padding:'7px'}}>₹50</p>
                            </div>
                      </div>
                      <div style={{padding:'0px 14px'}}>
                           <input type="range" class="form-range" id="customRange1" value="32" style={{width:'100%',height: '1vh'}}/>
                           <div style={{height: 'auto',width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                <div style={{height:'2vh',width:'40%',color: '#212529',fontSize:'12px',fontWeight:'500',fontStyle:'Roboto'}}>
                                     0 / 4 Entries
                                </div>
                                <div style={{height:'2vh',width:'43%',color: '#212529',fontSize:'12px',fontWeight:'500',fontStyle:'Roboto'}}>
                                     max 1 entries / per user 
                                </div>
                           </div>
                      </div>
                     </div>
                     <div style={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, .2), 0 6px 20px 0 rgba(0, 0, 0, .19',borderRadius: '10px',backgroundColor:'white',height: 'auto',padding:'0px 0px 11px',marginTop:'10px'}}>
                      <div style={{background:'linear-gradient(35deg,#696edb,#97a9db 50%,#796ede)',height:'auto',width:'100%',borderTopLeftRadius:'10px',borderTopRightRadius:'10px',padding:'6px 0px 5px'}}>
                          <p style={{width: '14px',height:'14px',border:'1px solid #fff',borderRadius:'50%',fontSize:'9px',fontWeight:'700',textAlign:'center',marginBottom:'0%',color:'white',padding:'2px 2px 0px 2px',marginTop:'0%',marginLeft:'9px'}}>
                            S
                          </p>
                      </div> 
                      <div style={{height:'7vh',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <div style={{width:'29%',height:'auto',fontFamily:'Roboto',color:'#212529',fontWeight:'700',fontSize:'15px',display:'flex',justifyContent:'center'}}>
                                WIN ₹ 300
                            </div>
                            <div style={{width:'35%',height:'auto',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <p style={{backgroundColor:'#6980a6',height:'auto',boxShadow:'0 2px 4px 0 rgba(0,0,0,.2),0 3px 10px 0 rgba(0,0,0,.19)',borderRadius:'15px',width: '70px',color:'white',fontWeight:'700',fontSize:'13px',display:'flex',justifyContent:'center',alignItems:'center',padding:'7px'}}>₹100</p>
                            </div>
                      </div>
                      <div style={{padding:'0px 14px'}}>
                           <input type="range" class="form-range" id="customRange1" value="32" style={{width:'100%',height: '1vh'}}/>
                           <div style={{height: 'auto',width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                <div style={{height:'2vh',width:'40%',color: '#212529',fontSize:'12px',fontWeight:'500',fontStyle:'Roboto'}}>
                                    0 / 4 Entries
                                </div>
                                <div style={{height:'2vh',width:'43%',color: '#212529',fontSize:'12px',fontWeight:'500',fontStyle:'Roboto'}}>
                                     max 1 entries / per user 
                                </div>
                           </div>
                      </div>
                     </div>
                     <div style={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, .2), 0 6px 20px 0 rgba(0, 0, 0, .19',borderRadius: '10px',backgroundColor:'white',height: 'auto',padding:'0px 0px 11px',marginTop:'10px'}}>
                      <div style={{background:'linear-gradient(35deg,#696edb,#97a9db 50%,#796ede)',height:'auto',width:'100%',borderTopLeftRadius:'10px',borderTopRightRadius:'10px',padding:'6px 0px 5px'}}>
                          <p style={{width: '14px',height:'14px',border:'1px solid #fff',borderRadius:'50%',fontSize:'9px',fontWeight:'700',textAlign:'center',marginBottom:'0%',color:'white',padding:'2px 2px 0px 2px',marginTop:'0%',marginLeft:'9px'}}>
                            S
                          </p>
                      </div> 
                      <div style={{height:'7vh',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <div style={{width:'29%',height:'auto',fontFamily:'Roboto',color:'#212529',fontWeight:'700',fontSize:'15px',display:'flex',justifyContent:'center'}}>
                                WIN ₹ 1000
                            </div>
                            <div style={{width:'35%',height:'auto',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <p style={{backgroundColor:'#6980a6',height:'auto',boxShadow:'0 2px 4px 0 rgba(0,0,0,.2),0 3px 10px 0 rgba(0,0,0,.19)',borderRadius:'15px',width: '70px',color:'white',fontWeight:'700',fontSize:'13px',display:'flex',justifyContent:'center',alignItems:'center',padding:'7px'}}>₹300</p>
                            </div>
                      </div>
                      <div style={{padding:'0px 14px'}}>
                           <input type="range" class="form-range" id="customRange1" value="32" style={{width:'100%',height: '1vh'}}/>
                           <div style={{height: 'auto',width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                <div style={{height:'2vh',width:'40%',color: '#212529',fontSize:'12px',fontWeight:'500',fontStyle:'Roboto'}}>
                                    3 / 4 Entries
                                </div>
                                <div style={{height:'2vh',width:'43%',color: '#212529',fontSize:'12px',fontWeight:'500',fontStyle:'Roboto'}}>
                                     max 1 entries / per user 
                                </div>
                           </div>
                      </div>
                     </div>
                 </div>
            </div>
            <div style={{backgroundColor:'rgb(224, 224, 224)',height:'10px'}}>
            </div>
        </>
    )}
    {activeTab === 'mycontests' && (
       <div style={{height:'auto',padding:'28px 50px',display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
            <img src='/Images/yodhaContaxt/maintenance.webp' alt='' style={{width:'90%',height:'auto'}}/>
            <p style={{color:'#2c2c2c',fontWeight:'700',marginTop:'0%',marginBottom:'3px'}}>GAME IS IN MAINTENANCE!</p> 
            <p style={{color:'#959595',fontWeight:'400',marginTop:'0%',fontSize:'12px',marginBottom:'2px'}}>Please stay connected, it will get resolved within 15 </p> 
            <p style={{color:'#959595',fontWeight:'400',marginTop:'0%',fontSize:'12px'}}>
            minutes!
            </p>   
       </div>
    )}
   </div>
   </div>
   </>
  )
}
