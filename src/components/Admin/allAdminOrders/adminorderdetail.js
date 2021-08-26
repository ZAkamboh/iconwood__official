import React from 'react'
import { useEffect, useState } from 'react'
import { useStateValue } from '../../StateProvider'
import { Link, useHistory, useLocation } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import { BackServer } from "../../Services"

import axios from 'axios'


function AllordersDetail(props) {
    const [{ Userorders }, dispatch] = useStateValue()
    const [url, seturl] = useState('')
    const [title, settitle] = useState('')
    const [rate, setrate] = useState('')
    const [desc, setdesc] = useState('')
    const [trackingid, settrackingid] = useState('')
    const [status, setstatus] = useState('')
    const [postid, setpostid] = useState('')
    const [deliveredDate, setdeliveredDate] = useState('')
    const [orderDate, setorderDate] = useState('')
    const [processing, setProcessing] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const location = useLocation()
    const history = useHistory()

    useEffect(() => {
        var ADMIN = JSON.parse(localStorage.getItem('ADMIN'))
        if (!ADMIN) {
            history.push('/Admin')
        }
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0


    }, [])


    useEffect(() => {

        var detaildata = location.state.order

        settitle(detaildata.title)
        seturl(detaildata.url)
        setrate(detaildata.rate)
        settrackingid(detaildata.trackingid)
        setstatus(detaildata.status)
        setpostid(detaildata._id)
        setdeliveredDate(detaildata.deliveredDate)
        setorderDate(detaildata.orderDate)



    }, [])

    const deliveredAction = () => {
        setProcessing(true)

        var updateDataObject = {
            title: title,
            url: url,
            rate: rate,
            trackingid: trackingid,
            status: 'delivered',
            postid: postid,
            deliveredDate: new Date().toLocaleDateString('de-DE'),

        }
        axios
            .post(`${BackServer}/data/deliveredOrders`, updateDataObject)
            .then((res) => {
                setProcessing(false)
                alert("successfully delivered")
                history.push('/allOrders')
            })
    }






    return (

        <div style={{ display: "flex" }}>

            <div className="leftSide" style={{ backgroundColor: "#eeede9", paddingTop: "10px", paddingBottom: "100px" }}>

                <div style={{ marginBottom: "20px", marginTop: "0px" }} class="card">
                    <div class="title2">Order Detail</div>
                    <div class="info">
                        <div class="row">
                            <div class="col-7"> <span id="heading">Date</span><br /> <span id="details">{orderDate}</span> </div>
                            <div class="col-5 pull-right"> <span id="heading">Tracking Id.</span><br /> <span id="details">{trackingid}</span> </div>
                        </div>

                        <div class="col-2"><img class="img-fluid" src={url} /></div>

                    </div>
                    <div class="pricing">
                        <div class="row">
                            <div class="col-9"> <span id="name">Item</span> </div>
                            <div class="col-3"> <span id="price">{title}</span> </div>
                        </div>
                        <div class="row">
                            <div class="col-9"> <span id="name">Status</span> </div>
                            <div class="col-3"> <span id="price">{status}</span> </div>
                        </div>
                    </div>
                    <div class="total">
                        <div class="row">
                            <div class="col-9">Rate</div>
                            <div class="col-3"><big>{rate}</big></div>
                        </div>
                    </div>
                    <div style={{ padding: "50px" }}>
                        <p style={{ color: status === "delivered" ? "green" : "red" }}> Status : {status === "delivered" ? `Delivered Date ${deliveredDate}` : status}</p>
                        {status !== "delivered" &&
                            <span>Are you want to delivered? <button style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "red", color: "white", padding: "8px", borderRadius: "8px" }} onClick={() => deliveredAction()} disabled={processing && disabled} >


                                {!processing ?

                                    <span>

                                        Yes
                                  </span>

                                    :

                                    <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>      <ClipLoader color={"green"}
                                    />
                                    </span>


                                }




                            </button></span>
                        }
                    </div>


                </div>



            </div>


        </div>


    )
}

export default AllordersDetail
