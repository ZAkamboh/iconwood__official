// import React,{useEffect} from 'react'
// import './alladminorders.css'
// import { useLocation } from "react-router-dom";
// import { useStateValue } from '../../StateProvider'

// function Allorders(props) {
//     const location = useLocation();
//     const [{ allorders }, dispatch] = useStateValue()
// useEffect(()=>{

// },[])

//     return (
//         <div>

//             {allorders && allorders.map((item, i) => {
//                 return (
//                     <div >
//                         <img  src={item.url} />
//                         <div >
//                             <p >Item:{item.title}</p>
//                             <p >
//                                 <strong>Price:{item.rate}</strong>
//                             </p>
//                         </div>
//                         <div >
//                             <p>Tracking Id : </p>
//                             <p >{item.trackingid}</p>
//                             <p > Status : </p>
//                             <p style={{ color: "red" }}>{item.status}</p>
//                         </div>

//                     </div>
//                 )
//             })}


//         </div>
//     )

// }

// export default Allorders




import React,{useState} from 'react';
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



const allorders = [
    {name:"zubair",email:"zubair@gmail.com",contactNum:"03312380673"},
    {name:"zubair",email:"zubair@gmail.com",contactNum:"03312380673"}

]

export default function Allorders() {
  const classes = useStyles();
  const [{ allusers,allorders }, dispatch] = useStateValue()
  const [userdataPopup,setuserdataPopup]=useState(false)

const allusersdata = (data)=>{
// setuserdataPopup(true);
alert(JSON.stringify(data))
}


  return (
    <div>
       {/* <div className="userorderPopup">
               individually orders
      </div>  */}
   <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell><h3>Name</h3></TableCell>
            <TableCell align="right"><h3>Email</h3></TableCell>
            <TableCell align="right"><h3>Contact Number</h3></TableCell>
            <TableCell align="right"><h3>Orders</h3></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allusers && allusers.map((USERS,i) => (
            <TableRow onClick={()=>allusersdata(USERS)} key={i} style={{cursor:"pointer"}}>
              <TableCell component="th" scope="row">
                {USERS.name}
              </TableCell>
              <TableCell align="right">{USERS.email}</TableCell>
              <TableCell align="right">{USERS.contact}</TableCell>
              <TableCell align="right">3</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
 
  );
}


















