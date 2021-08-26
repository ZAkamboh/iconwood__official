import React,{useEffect,useState} from 'react'
import "./contact.css"
import { useStateValue } from '../StateProvider'
import { Link, useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import CallIcon from '@material-ui/icons/Call';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { auth, database } from '../../database'
import DirectionsIcon from '@material-ui/icons/Directions';

import logo from "../../assets/icons/logo.png"



function Contact(props) {
    useEffect(() => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
       
    
      }, [])
const [email,setemail] = useState('')
const [phone,setphone] = useState('')
const [message,setmessage] = useState('')

const submit =()=>{
    var data={
        email:email,
        phone:phone,
        message:message
    }
  if(data.email === ""){
            alert("Enter Email")
  }
  else if(data.phone === ""){
    alert("Enter Phone Number")

  }

  else if(data.message === ""){
    alert("Enter Message")

  }
else{
    database
    .ref(`contact`)
    .push(data)
    .then(response => {


      setemail('')
      setphone('')
      setmessage('')

      alert("Thanku for your contact we will respond as soon as possible")


    })


    .catch(error => {
      alert(error)
    });
}
  
         
}
    return (
        <div style={{backgroundColor:"#9f7757"}} class="container-contact100">
            {/* <div class="contact100-map" id="google_map" data-map-x="40.722047" data-map-y="-73.986422" data-pin="assets/icons/map-marker.png" data-scrollwhell="0" data-draggable="1"></div> */}

       
            <div class="contact100-more">

                <CallIcon style={{ marginRight: "5%" }} />
		  	0331-2380673
		</div>

            <div class="contact100-more2" onClick={() => window.open('https://goo.gl/maps/kWMdRfwtdG7wwaqAA', '_blank')} >
                <DirectionsIcon style={{ marginRight: "5%" }} />
			Direction

		     </div>

            <div class="wrap-contact100">
                <div class="contact100-form validate-form">

                    
                    <span id="MontserratSemiBold" style={{color:"#9f7757"}} class="contact100-form-title">
                        Contact Us
				    </span>

                   

                    <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                        <span class="label-input100">Email</span>
                        <input value={email}  onChange={(e)=>setemail(e.target.value)} class="input100 inputClass" type="text" name="email" placeholder="Email addess..." />
                        <span class="focus-input100"></span>
                    </div>

                    <div class="wrap-input100">
                        <span class="label-input100">Phone</span>
                        <input value={phone}  onChange={(e)=>setphone(e.target.value)} class="input100 inputClass" type="text" name="phone" placeholder="Phone Number..." />
                        <span class="focus-input100"></span>
                    </div>

                    <div class="wrap-input100 validate-input" data-validate="Message is required">
                        <span class="label-input100">Message</span>
                        <textarea value={message}   onChange={(e)=>setmessage(e.target.value)} class="input100" name="message" placeholder="Questions/Comments..."></textarea>
                        <span class="focus-input100"></span>
                    </div>

                    <div class="container-contact100-form-btn">
                        <div class="wrap-contact100-form-btn">
                            <div class="contact100-form-bgbtn"></div>
                            <button onClick={submit} class="contact100-form-btn">
                                Send
						</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default GoogleApiWrapper({
    apiKey: ('AIzaSyCzJzNcQa4tTb03Z0cqnBbXr39wpVb34mE'),
})(Contact)