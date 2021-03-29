import React, { useEffect, useState } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import LinearProgress from '@material-ui/core/LinearProgress';
import { auth, storage, db, database } from '../../../database'
import { Link, useHistory } from 'react-router-dom'
import { useStateValue } from "../../StateProvider"
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function AdminBeds() {
  const [{ bedsData, }, dispatch] = useStateValue();
  const classes = useStyles();

  const history = useHistory()
  const [expand1Icon, setexpand1Icon] = useState(false)
  const [title, settitle] = useState('')
  const [desc, setdesc] = useState('')
  const [rate, setrate] = useState('')
  const [file, setfile] = useState(null)
  const [progress, setprogress] = useState('')
  const [imageUrl, setimageUrl] = useState('')
  const [section, setsection] = useState('')
 const [image1,setimage1] = useState('')
 const [image2,setimage2] = useState('')
 const [image3,setimage3] = useState('')


  const [value, setvalue] = useState(0)

  useEffect(() => {

    var ADMIN = JSON.parse(localStorage.getItem('ADMIN'))
    if (!ADMIN) {
      history.push('/Admin')
    }



    var values1 = []
    database.ref(`beds`).once('value', (snap) => {
      var fetchData1 = snap.val()
      for (let keys in fetchData1) {
        values1.push({ ...fetchData1[keys], key: keys })
      }



      dispatch({
        type: 'BEDS',
        payload: values1,
      })
    })


  }, [bedsData])



const deleteAction = (key) => {

    var adminBeds=bedsData
    var newadminBeds=adminBeds.filter((item,i) => item.key !== key )
    dispatch({
      type: 'BEDS',
      payload: newadminBeds,
    })
  
    database
    .ref(`beds/${key}`)
    .remove()
    .then(() => {
      alert("successfully delete")
 
    }).catch((error)=>{
             alert(error)
    });

}



  const upload = () => {

    const uploadTask = storage.ref(`images/${file.name}`).put(file)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        var uploadprogress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        )
        setprogress(uploadprogress)
      },
      (error) => {
        console.log(error)
      },

      () => {
        storage
          .ref('images')
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            alert("Successfully upload")
            setimageUrl(url)
          })
      },
    )
  }

 

 





  const _handleClick = () => {
    var data = {
      title: title,
      desc: desc,
      rate: rate,
      url: imageUrl,
      wishlist: false,
    }
    if (data.title === "") {
      alert("title field is required")
    }
    else if (data.desc === "") {
      alert("desc field is required")
    }
    else if (data.rate === "") {
      alert("Rate field is required")
    }
    else if (data.url === "") {
      alert("please upload any picture")
    }
    else {

      database
        .ref(`beds`)
        .push(data)
        .then(response => {
          alert("successfully upload Bed post")


          settitle('')
          setdesc('')
          setrate('')
          setimageUrl('')

          var values = []
          database.ref(`beds`).once('value', (snap) => {
            var fetchData = snap.val()
            for (let keys in fetchData) {
              values.push({ ...fetchData[keys], key: keys })
            }
            // setsection4Data([section4Data, ...values])

            dispatch({
              type: "BEDS",
              payload: values,
            })

          })

          history.replace('/AdminHome')

        })
        .catch(error => {
          alert(error)
        });
    }

  }
  return (


    <div>
      <div className="section4__main">

          <div className="Section4__container">

            <p>Upload Beds</p>

            <h5>Title</h5>
            <input value={title} type="text" onChange={(e) => settitle(e.target.value)} />


            <h5>Description</h5>
            <input value={desc} type="text" onChange={(e) => setdesc(e.target.value)} />

            <h5>Rate</h5>
            <input
              value={rate}
              type="number"
              onChange={(e) => setrate(e.target.value)}
            />

            <h5>Upload Image </h5>
            <input
              type="file"
              onChange={(e) => setfile(e.target.files[0])}
            />

            <button
              onClick={upload}
              className="btn btn-success mx-auto"
            >
              upload image
               </button>
            <div style={{ marginTop: 20 }}>
              <LinearProgress variant="determinate" value={progress} color="secondary" />
            </div>

            <button onClick={_handleClick} className="login__signInButton">
              SUBMIT
               </button>
          </div>






        <TableContainer style={{ marginTop: "5%" }} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
          <TableHead>
              <TableRow >
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Rate</TableCell>
                <TableCell align="right">Desc</TableCell>
                <TableCell align="center">Product</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {bedsData && bedsData.map((item, i) => (
                  <TableRow key={i} style={{ cursor: "pointer" }}>

                  <TableCell align="right">
                    {item.title}
                  </TableCell>
                  <TableCell align="right">{item.rate}</TableCell>
                  <TableCell align="right">{item.desc}</TableCell>
                  <TableCell align="center" ><img width="20%" src={item.url} /></TableCell>
                  <Button onClick={()=>deleteAction(item.key)} style={{ marginTop: "10%" }} variant="contained" color="secondary">
                    Delete
                     </Button>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>



      </div>
    </div>
  )
}

export default AdminBeds
