import React from 'react'
import "./contact.css"
import { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider'
import { Link, useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import CallIcon from '@material-ui/icons/Call';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

function Contact(props) {

    return (
        <div class="container-contact100">
            {/* <div class="contact100-map" id="google_map" data-map-x="40.722047" data-map-y="-73.986422" data-pin="assets/icons/map-marker.png" data-scrollwhell="0" data-draggable="1"></div> */}

            <div class="contact100-more">
                <CallIcon style={{ marginRight: "5%" }} />
			0331-2380673
		</div>

            <div class="contact100-more2" onClick={() => window.open('https://www.latlong.net/c/?lat=41.442600&long=-86.001270', '_blank')} >
                <CallIcon style={{ marginRight: "5%" }} />
			Direction

		     </div>

            <div class="wrap-contact100">
                <form class="contact100-form validate-form">
                    <span class="contact100-form-title">
                        Contact Us
				</span>

                   

                    <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                        <span class="label-input100">Email</span>
                        <input class="input100 inputClass" type="text" name="email" placeholder="Email addess..." />
                        <span class="focus-input100"></span>
                    </div>

                    <div class="wrap-input100">
                        <span class="label-input100">Phone</span>
                        <input class="input100 inputClass" type="text" name="phone" placeholder="Phone Number..." />
                        <span class="focus-input100"></span>
                    </div>

                    <div class="wrap-input100 validate-input" data-validate="Message is required">
                        <span class="label-input100">Message</span>
                        <textarea class="input100" name="message" placeholder="Questions/Comments..."></textarea>
                        <span class="focus-input100"></span>
                    </div>

                    <div class="container-contact100-form-btn">
                        <div class="wrap-contact100-form-btn">
                            <div class="contact100-form-bgbtn"></div>
                            <button class="contact100-form-btn">
                                Send
						</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}


export default GoogleApiWrapper({
    apiKey: ('AIzaSyCzJzNcQa4tTb03Z0cqnBbXr39wpVb34mE'),
})(Contact)