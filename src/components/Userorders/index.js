import React from 'react'
import "./userorders.css"
import { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider'
import { Link, useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'


function UserOrders() {
    const [{ Userorders }, dispatch] = useStateValue()
    useEffect(() => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
       
    
      }, [])

useEffect(()=>{
  
    var usersfromlocalstorage = JSON.parse(
        localStorage.getItem('users'),
      )
      if (usersfromlocalstorage) {
  
        axios
          .post(`http://localhost:8080/data/getUserOrders/${usersfromlocalstorage._id}`)
          .then((res) => {
            dispatch({
              type: "SHOPNOW",
              payload: res.data.order
            })
          })
  
  
  
  
      }
},[Userorders])
    return (
        <div className="checkoutProduct">
                  <div className="leftSide">
            <h3 className="status2" style={{color:"green"}}>Delivered Orders</h3>

                {Userorders && Userorders.map((item, i) => {

                    return (
                        item.status === "delivered" &&

                        <div className="checkoutProduct__info">

                            <img className="checkoutProduct__image" src={item.url} />
                              
                              <div className="bothPara">
                            <p >Item : {item.title}</p>
                            <p >
                            Price : {item.rate}
                            </p>
                            <p>Order Date : {item.orderDate}</p>

                            </div>

                            
                            <div className="bothPara">
                                <p>Tracking Id : </p>
                            <p>{item.trackingid}</p>
                            <p>Status : </p>
                            <p  style={{color:"green"}}>{item.status}</p>
                            </div>
                         


                        </div>
                    )
                })}

            </div>
            <div className="leftSide">
            <h3 className="status1">Pending Orders</h3>

                {Userorders && Userorders.map((item, i) => {
                    return (
                        item.status === "Pending" &&

                        <div className="checkoutProduct__info">
                            <img className="checkoutProduct__image" src={item.url} />
                            <div className="bothPara">
                            <p >Item : {item.title}</p>
                            <p >
                            Price : {item.rate}
                            </p>
                            <p>Order Date : {item.orderDate}</p>

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
      


            <div className="rightBanner">

            </div>
        </div>
    )
}

export default UserOrders
