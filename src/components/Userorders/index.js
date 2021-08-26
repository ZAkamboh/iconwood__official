import React from 'react'
import "./userorders.css"
import { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { BackServer } from "../Services"

import axios from 'axios'


function UserOrders() {
    const [{ Userorders,users }, dispatch] = useStateValue()


    useEffect(() => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0


    }, [])

    
    useEffect(() => {

        // var usersfromlocalstorage = JSON.parse(
        //     localStorage.getItem('users'),
        // )
        if (users) {

            axios
                .post(`${BackServer}/data/getUserOrders/${users._id}`)
                .then((res) => {
                    dispatch({
                        type: "SHOPNOW",
                        payload: res.data.order
                    })
                })
        }
    }, [Userorders])


    return (
     
        <div style={{display:"flex"}}>

            <div className="leftSide" style={{backgroundColor:"#eeede9", paddingTop: "10px", paddingBottom: "100px"}}>
                {Userorders && Userorders.map((item, i) => {
                    return (
                        // item.status === "Pending" &&
                        <div style={{ marginBottom: "20px",marginTop:"0px" }} class="card">
                            <div  class="title2">Purchase Reciept</div>
                            <div class="info">
                                <div class="row">
                                    <div class="col-7"> <span id="heading">Date</span><br /> <span id="details">{item.orderDate}</span> </div>
                                    <div class="col-5 pull-right"> <span id="heading">Tracking Id.</span><br /> <span id="details">{item.trackingid}</span> </div>
                                </div>

                                <div class="col-2"><img class="img-fluid" src={item.url} /></div>

                            </div>
                            <div class="pricing">
                                <div class="row">
                                    <div class="col-9"> <span id="name">{item.desc}</span> </div>
                                    <div class="col-3"> <span id="price">{item.rate}</span> </div>
                                </div>
                                <div class="row">
                                    <div class="col-9"> <span id="name">Status</span> </div>
                                    <div class="col-3"> <span id="price">{item.status}</span> </div>
                                </div>
                            </div>
                            <div class="total">
                                <div class="row">
                                    <div class="col-9"></div>
                                    <div class="col-3"><big>{item.rate}</big></div>
                                </div>
                            </div>
                            <div class="tracking">
                                <div  class="title2">Tracking Order</div>
                            </div>
                            <div class="progress-track">
                                <ul id="progressbar">
                                    <li class="step0 active " id="step1">Ordered</li>
                                    <li class="step0 active text-center" id="step2">Shipped</li>
                                    <li class="step0 active text-right" id="step3">On the way</li>
                                    <li id={item.status === "delivered" && "step4"} class="step0 text-right" id="step4">Delivered {item.status === "delivered" && item.deliveredDate}</li>
                                </ul>
                            </div>
                            <div class="footer">
                                <div class="row">
                                    <div class="col-2"><img class="img-fluid" src="https://i.imgur.com/YBWc55P.png" /></div>
                                    <div class="col-10">Want any help? Please &nbsp;<a href="https://iconwood.com.pk/contact"> contact us</a></div>
                                </div>
                            </div>
                        </div>

                    )
                })}

            </div>
         

        </div>


    )
}

export default UserOrders
