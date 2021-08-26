




import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useStateValue } from '../../StateProvider'
import Paper from '@material-ui/core/Paper';
import './alladminorders.css'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { BackServer } from "../../Services"

import axios from 'axios'
import ClearIcon from '@material-ui/icons/Clear';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



const allorders2 = [
  { username: "zubair", useremail: "zubair@gmail.com", contactNum: "03312380673",status:1 },
  { username: "zubair", useremail: "zubair@gmail.com", contactNum: "03312380673",status:2 }

]

export default function Allorders() {
  const classes = useStyles();
  const history = useHistory()

  const [{ allusers, allorders }, dispatch] = useStateValue()
  const [userdataPopup, setuserdataPopup] = useState(false)
  const [url, seturl] = useState('')
  const [title, settitle] = useState('')
  const [rate, setrate] = useState('')
  const [desc, setdesc] = useState('')
  const [trackingid, settrackingid] = useState('')
  const [status, setstatus] = useState('')
  const [postid, setpostid] = useState('')
  const [deliveredDate, setdeliveredDate] = useState('')




  useEffect(() => {

    var ADMIN = JSON.parse(localStorage.getItem('ADMIN'))
    if (!ADMIN) {
      history.push('/Admin')
    }
    axios
      .get(`${BackServer}/data/getUserAllOrdersAdmin`)
      .then((res) => {

       var allorders= res.data.Allorder.sort((a, b) => a - b).reverse()
        dispatch({
          type: "ALLORDERS",
          payload: allorders
        })
      })

  }, [])

  const allusersorderdata = (data) => {
    setuserdataPopup(true);
    settitle(data.title)
    seturl(data.url)
    setrate(data.rate)
    settrackingid(data.trackingid)
    setstatus(data.status)
    setpostid(data._id)
    setdeliveredDate(data.deliveredDate)

  }

  const deliveredAction = () => {
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
        alert("successfully delivered")
        setuserdataPopup(false);
      })
  }
  return (
    <div>
    

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell>Name</TableCell>
              <TableCell align="right">Order Date</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Contact</TableCell>
              <TableCell align="right">Tracking Id</TableCell>
              <TableCell align="right">Status</TableCell>


            </TableRow>
          </TableHead>
          <TableBody>
            {allorders && allorders.map((order, i) => (
              <TableRow onClick={() => history.push("/allOrdersdetail", { order: order })} key={i} style={{ cursor: "pointer" }}>
                <TableCell component="th" scope="row">
                  {order.username}
                </TableCell>
                <TableCell align="right">{order.orderDate}</TableCell>

                <TableCell align="right">{order.useremail}</TableCell>
                <TableCell align="right">{order.usercontact}</TableCell>
                <TableCell align="right">{order.trackingid}</TableCell>
                <TableCell style={{ color: order.status === "delivered" ? "green" : "red" }} align="right"><h3>{order.status}</h3>{order.status === "delivered" && <p>Delivered Date : {order.deliveredDate}</p>}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
}


















