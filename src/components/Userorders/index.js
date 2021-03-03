import React from 'react'
import "./userorders.css"
import { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider'
import { Link, useHistory, useLocation } from 'react-router-dom'


function UserOrders() {
    const [{ Userorders }, dispatch] = useStateValue()

useEffect(()=>{
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
},[])
    return (
        <div className="checkoutProduct">
            <div className="leftSide">
            <h3 className="status1">Pending Orders</h3>

                {Userorders && Userorders.map((item, i) => {
                    return (
                        <div className="checkoutProduct__info">
                            <img className="checkoutProduct__image" src={item.url} />
                            <div className="bothPara">
                            <p  className="checkoutProduct__title">Item:{item.title}</p>
                            <p  className="checkoutProduct__price">
                                <strong>Price:{item.rate}</strong>
                            </p>
                            </div>
                            <div className="bothPara">
                                <p>Tracking Id : </p>
                            <p >{item.trackingid}</p>
                            <p > Status : </p>
                            <p style={{color:"red"}}>{item.status}</p>
                            </div>

                        </div>
                    )
                })}

            </div>
            <div className="leftSide">
            <h3 className="status2" style={{color:"green"}}>Delivered Orders</h3>

                {Userorders && Userorders.map((item, i) => {
                    return (
                        <div className="checkoutProduct__info">

                            <img className="checkoutProduct__image" src={item.url} />
                              <div className="bothPara">
                            <p className="checkoutProduct__title">Item:{item.title}</p>
                            <p className="checkoutProduct__price">
                                <strong>Price:{item.rate}</strong>
                            </p>
                            </div>
                            <div className="bothPara">
                                <p>Tracking Id : </p>
                            <p>{item.trackingid}</p>
                            <p>Status : </p>
                            <p  style={{color:"green"}}>Delivered</p>
                            </div>
                         


                        </div>
                    )
                })}

            </div>


            <div className="rightBanner">

            </div>
        </div>
    )
}

export default UserOrders
