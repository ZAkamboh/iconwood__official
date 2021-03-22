




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
import axios from 'axios'
import ClearIcon from '@material-ui/icons/Clear';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



const allorders = [
  { name: "zubair", email: "zubair@gmail.com", contactNum: "03312380673" },
  { name: "zubair", email: "zubair@gmail.com", contactNum: "03312380673" }

]

export default function Allorders() {
  const classes = useStyles();
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
    axios
      .get(`http://localhost:8080/data/getUserAllOrdersAdmin`)
      .then((res) => {
        dispatch({
          type: "ALLORDERS",
          payload: res.data.Allorder
        })
      })

  }, [userdataPopup])

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
      .post(`http://localhost:8080/data/deliveredOrders`, updateDataObject)
      .then((res) => {
        alert("successfully delivered")
        setuserdataPopup(false);
      })
  }
  return (
    <div>
      {userdataPopup &&
        <div className="userorderPopup">
          <div className="clearIcon">
            <ClearIcon onClick={() => setuserdataPopup(false)} />
          </div>
          <div >
            <img src={url} width="30%" height="30%" />
            <div >
              <p >Item:{title}</p>
              <p >
                <strong>Price:{rate}</strong>
              </p>
            </div>
            <div>
              <p>Tracking Id : </p>
              <p >{trackingid}</p>
              <p style={{ color: status === "delivered" ? "green" : "red" }}> Status : {status === "delivered" ? `Delivered Date ${deliveredDate}` : status }</p>
              {status !== "delivered" &&
                <span>Are you want to delivered? <button onClick={() => deliveredAction()}>Yes</button></span>
              }

            </div>

          </div>
        </div>
      }

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
              <TableRow onClick={() => allusersorderdata(order)} key={i} style={{ cursor: "pointer" }}>
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


















