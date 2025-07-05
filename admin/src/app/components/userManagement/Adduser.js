import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

export default function Adduser() {

    const history = useHistory()

    const [Name, setName] = useState()
    const [Phone, setPhone] = useState()
    const [Email, setEmail] = useState()
    const [Password, setPassword] = useState()
    const [cPassword, setCPassword] = useState()
    const [WalletBalance, setWalletBalance] = useState()
    const [HoldBalance, setHoldBalance] = useState()
    const [RefCommision, setRefCommision] = useState()
    const [ReferralCode, setReferralCode] = useState()
    const [ReferralEarning, setReferralEarning] = useState()
    const [ReferralWallet, setReferralWallet] = useState()
    const [HolderName, setHolderName] = useState()
    const [UpiId, setUpiId] = useState()
    const [AccountNumber, setAccountNumber] = useState()
    const [IfscCode, setIfscCode] = useState()
    
    const beckendLocalApiUrl = process.env.REACT_APP_BACKEND_LOCAL_API;
    const beckendLiveApiUrl = process.env.REACT_APP_BACKEND_LIVE_API;
    const nodeMode = process.env.NODE_ENV;
    if (nodeMode === "development") {
        var baseUrl = beckendLocalApiUrl;
    } else {
        baseUrl = beckendLiveApiUrl;
    }

    const addUser1 = async (e) => {
        e.preventDefault()
        if (Password == cPassword) {
            axios.post(baseUrl+`register`, {
                Name,
                Phone,
                Email,
                Password,
                cPassword,
            }).then((res) => {
                history.push("/user/allusers")
            })
        } else {
            alert("Some thing wrong ! confirm password and Password didn't match !")
        }
    }

    const location = useLocation();
    const path = location.pathname.split("/")[3];

    const getPost = async () => {
        const access_token = localStorage.getItem("token")
        const headers = {
            Authorization: `Bearer ${access_token}`
        }
        const data = await axios.patch(baseUrl+`admin/edit/user/${path}`, {
            Name,
            Phone,
            Email,
            Wallet_balance: WalletBalance,
            hold_balance: HoldBalance,
            ref_Commision: RefCommision,
            referral_code: ReferralCode,
            referral_earning: ReferralEarning,
            referral_wallet: ReferralWallet,
            holder_name: HolderName,
            upi_id: UpiId,
            account_number: AccountNumber,
            ifsc_code: IfscCode,
        }, { headers })
            .then((res) => {
                console.log(res.data)
                setName(res.data.Name)
                setEmail(res.data.Email)
                setPhone(res.data.Phone)
                setWalletBalance(res.data.Wallet_balance)
                setHoldBalance(res.data.hold_balance)
                setRefCommision(res.data.ref_Commision)
                setReferralCode(res.data.referral_code)
                setReferralEarning(res.data.referral_earning)
                setReferralWallet(res.data.referral_wallet)
                setHolderName(res.data.holder_name)
                setUpiId(res.data.upi_id)
                setAccountNumber(res.data.account_number)
                setIfscCode(res.data.ifsc_code)
            })
        .catch((e) => alert("Add new user Here"))
    }

    useEffect(() => {
        getPost()
    }, [path])

    if (path == undefined) {
        return (
            <div>
                <h4 className='font-weight-bold my-3'>ADD NEW USER</h4>
                <form id="add_user_form" action="" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" name="name" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="mobile">Mobile</label>
                            <input type="text" className="form-control form-control" maxLength={10} id="mobile" name="mobile" placeholder="Mobile" onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="confirm_password">Confirm Password</label>
                            <input type="password" className="form-control" id="confirm_password" name="confirm_password" placeholder="Confirm Password" onChange={(e) => setCPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="verificationrequired" name="verificationrequired" defaultChecked />
                            <label className="form-check-label" htmlFor="verificationrequired">
                                OTP Verification required during first time login.
                            </label>
                        </div>
                    </div>
                    <button className="btn btn-success float-right" onClick={(e) => addUser1(e)} > Add User</button>
                </form>
            </div >
        )
    }
    else {
        return (
            <div>
                <h4 className='font-weight-bold my-3'>Update User</h4>
                <div id="add_user_form" >
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" name="name" placeholder="Name" onChange={(e) => setName(e.target.value)} value={Name || ''} />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="mobile">Mobile</label>
                            <input type="text" className="form-control form-control" maxLength={10} id="mobile" name="mobile" placeholder="Mobile" onChange={(e) => setPhone(e.target.value)} value={Phone || ''} />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={Email || ''} />
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="wallet_balance">Wallet Balance</label>
                            <input type="number" className="form-control" id="wallet_balance" name="wallet_balance" placeholder="Wallet Balance" onChange={(e) => setWalletBalance(e.target.value)} value={WalletBalance || ''} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="hold_balance">Hold Balance</label>
                            <input type="number" className="form-control" id="hold_balance" name="hold_balance" placeholder="Hold Balance" onChange={(e) => setHoldBalance(e.target.value)} value={HoldBalance || ''} />
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="ref_commission">Referral Commission</label>
                            <input type="number" className="form-control" id="ref_commission" name="ref_commission" placeholder="Referral Commission" onChange={(e) => setRefCommision(e.target.value)} value={RefCommision || ''} />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="referral_code">Referral Code</label>
                            <input type="text" className="form-control" id="referral_code" name="referral_code" placeholder="Referral Code" onChange={(e) => setReferralCode(e.target.value)} value={ReferralCode || ''} />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="referral_earning">Referral Earning</label>
                            <input type="number" className="form-control" id="referral_earning" name="referral_earning" placeholder="Referral Earning" onChange={(e) => setReferralEarning(e.target.value)} value={ReferralEarning || ''} />
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="referral_wallet">Referral Wallet</label>
                            <input type="number" className="form-control" id="referral_wallet" name="referral_wallet" placeholder="Referral Wallet" onChange={(e) => setReferralWallet(e.target.value)} value={ReferralWallet || ''} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="holder_name">Holder Name</label>
                            <input type="text" className="form-control" id="holder_name" name="holder_name" placeholder="Holder Name" onChange={(e) => setHolderName(e.target.value)} value={HolderName || ''} />
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="upi_id">UPI ID</label>
                            <input type="text" className="form-control" id="upi_id" name="upi_id" placeholder="UPI ID" onChange={(e) => setUpiId(e.target.value)} value={UpiId || ''} />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="account_number">Account Number</label>
                            <input type="text" className="form-control" id="account_number" name="account_number" placeholder="Account Number" onChange={(e) => setAccountNumber(e.target.value)} value={AccountNumber || ''} />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="ifsc_code">IFSC Code</label>
                            <input type="text" className="form-control" id="ifsc_code" name="ifsc_code" placeholder="IFSC Code" onChange={(e) => setIfscCode(e.target.value)} value={IfscCode || ''} />
                        </div>
                    </div>

                    <button className="btn btn-success float-right" onClick={(e) => getPost(e)} > Update User</button>
                </div>
            </div >
        )
    }
}