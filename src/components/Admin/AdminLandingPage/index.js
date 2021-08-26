import React, { useEffect, useState } from 'react'
import './adminlandingpage.css'
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
function Adminlandingpage() {
  const [{ LandingBanners, section2Items,section3Items, section4Items, section5Items }, dispatch] = useStateValue();
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
    database.ref(`landingbanners`).once('value', (snap) => {
      var fetchData1 = snap.val()
      for (let keys in fetchData1) {
        values1.push({ ...fetchData1[keys], key: keys })
      }

      dispatch({
        type: 'Landing_bannners_DATA',
        payload: values1,
      })
    })






    var values2 = []
    database.ref(`Section2Data`).once('value', (snap) => {
      var fetchData2 = snap.val()
      for (let keys in fetchData2) {
        values2.push({ ...fetchData2[keys], key: keys })
      }

      dispatch({
        type: 'SECTION2_DATA',
        payload: values2,
      })
    })


    var values3 = []
    database.ref(`Section3Data`).once('value', (snap) => {
      var fetchData3 = snap.val()
      for (let keys in fetchData3) {
        values3.push({ ...fetchData3[keys], key: keys })
      }

      dispatch({
        type: 'SECTION3_DATA',
        payload: values3,
      })
    })


    var values4 = []
    database.ref(`Section4Data`).once('value', (snap) => {
      var fetchData4 = snap.val()
      for (let keys in fetchData4) {
        values4.push({ ...fetchData4[keys], key: keys })
      }

      dispatch({
        type: 'SECTION4_DATA',
        payload: values4,
      })
    })



    var values5 = []
    database.ref(`Section5Data`).once('value', (snap) => {
      var fetchData5 = snap.val()
      for (let keys in fetchData5) {
        values5.push({ ...fetchData5[keys], key: keys })
      }

      dispatch({
        type: 'SECTION5_DATA',
        payload: values5,
      })
    })





  }, [])



const deleteAction = (sections,key,index) => {

  if(sections === "landingbanners"){

    var datasection1=LandingBanners
    var newdatasection1=datasection1.filter((item,i) =>i!== index )
    dispatch({
      type: 'Landing_bannners_DATA',
      payload: newdatasection1,
    })
  
    database
    .ref(`landingbanners/${key}`)
    .remove()
    .then(() => {
      alert("successfully delete")
 
    }).catch((error)=>{
             alert(error)
    });

  }



   else if(sections === "sectiontwo"){

    var datasection2=section2Items
    var newdatasection2=datasection2.filter((item,i2) =>item.key !== key )
    dispatch({
      type: 'SECTION2_DATA',
      payload: newdatasection2,
    })
  
    database
    .ref(`Section2Data/${key}`)
    .remove()
    .then(() => {
      alert("successfully delete")
 
    }).catch((error)=>{
             alert(error)
    });

  }

  else if(sections === "sectionthree"){

    var datasection3=section3Items
    var newdatasection3=datasection3.filter((item,i2) =>item.key !== key )
    dispatch({
      type: 'SECTION3_DATA',
      payload: newdatasection3,
    })
  
    database
    .ref(`Section3Data/${key}`)
    .remove()
    .then(() => {
      alert("successfully delete")
 
    }).catch((error)=>{
             alert(error)
    });

  }

  

  else if(sections === "sectionfour"){
    var datasection4=section4Items
    var newdatasection4=datasection4.filter((item,i4) => item.key !== key )
    dispatch({
      type: 'SECTION4_DATA',
      payload: newdatasection4,
    })
  
    database
    .ref(`Section4Data/${key}`)
    .remove()
    .then(() => {
      alert("successfully delete")
 
    }).catch((error)=>{
             alert(error)
    });
    
  }



  else if(sections === "sectionfive"){
    var datasection5=section5Items
    var newdatasection5=datasection5.filter((item,i4) => item.key !== key )
    dispatch({
      type: 'SECTION5_DATA',
      payload: newdatasection5,
    })
  
    database
    .ref(`Section5Data/${key}`)
    .remove()
    .then(() => {
      alert("successfully delete")
 
    }).catch((error)=>{
             alert(error)
    });
    
  }







  else{
    alert(" no section ")
  }
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

  const _handleClick_Landingbanners = () => {
    var landingbannersData = {
      title: title,
      url: imageUrl,
      section: section,

    }
    database
      .ref(`landingbanners`)
      .push(landingbannersData)
      .then(response => {
        alert("successfully upload section Banners post")


        settitle('')
        setimageUrl('')

        var values1 = []
        database.ref(`landingbanners`).once('value', (snap) => {
          var fetchData = snap.val()
          for (let keys in fetchData) {
            values1.push({ ...fetchData[keys], key: keys })
          }
          // setsection4Data([section4Data, ...values1])

          dispatch({
            type: "Landing_bannners_DATA",
            payload: values1,
          })

        })

        history.replace('/Landingpage')

      })
      .catch(error => {
        alert(error)
      });

  }

  const _handleClick_section2 = () => {
    var dataSEction2 = {
      title: title,
      url: imageUrl,
      section: section,

    }
    database
      .ref(`Section2Data`)
      .push(dataSEction2)
      .then(response => {
        alert("successfully upload section 2 post")


        settitle('')
        setimageUrl('')

        var values2 = []
        database.ref(`Section2Data`).once('value', (snap) => {
          var fetchData = snap.val()
          for (let keys in fetchData) {
            values2.push({ ...fetchData[keys], key: keys })
          }
          // setsection4Data([section4Data, ...values2])

          dispatch({
            type: "SECTION2_DATA",
            payload: values2,
          })

        })

        history.replace('/Landingpage')

      })
      .catch(error => {
        alert(error)
      });

  }

 





  const _handleClick = () => {
    var data = {
      title: title,
    
      url: imageUrl,
      section: section,
    }
    if (data.title === "") {
      alert("title field is required")
    }
  
    else if (data.url === "") {
      alert("please upload any picture")
    }
    else {

      database
        .ref(`Section4Data`)
        .push(data)
        .then(response => {
          alert("successfully upload section 4 post")


          settitle('')
          setdesc('')
          setrate('')
          setimageUrl('')

          var values = []
          database.ref(`Section4Data`).once('value', (snap) => {
            var fetchData = snap.val()
            for (let keys in fetchData) {
              values.push({ ...fetchData[keys], key: keys })
            }
            // setsection4Data([section4Data, ...values])

            dispatch({
              type: "SECTION4_DATA",
              payload: values,
            })

          })

          history.replace('/Landingpage')

        })
        .catch(error => {
          alert(error)
        });
    }

  }



  const _handleClick_section5 = () => {
    var dataSEction5 = {
      title: title,
      url: imageUrl,
      section: section,

    }
    database
      .ref(`Section5Data`)
      .push(dataSEction5)
      .then(response => {
        alert("successfully upload section 5 post")


        settitle('')
        setimageUrl('')

        var values5 = []
        database.ref(`Section5Data`).once('value', (snap) => {
          var fetchData = snap.val()
          for (let keys in fetchData) {
            values5.push({ ...fetchData[keys], key: keys })
          }
          // setsection4Data([section4Data, ...values5])

          dispatch({
            type: "SECTION5_DATA",
            payload: values5,
          })

        })

        history.replace('/Landingpage')

      })
      .catch(error => {
        alert(error)
      });

  }













  return (


    <div>
      <div className="section4__main">
        <select onChange={(event) => setsection(event.target.value)} className="selectlist">
          <option>Select Section</option>
          <option>Landing page Banners</option>
          <option>SECTION 2</option>
          <option>SECTION 4</option>
          <option>SECTION 5</option>
        </select>



        {section === 'Landing page Banners' &&
          <div className="Section4__container">

            <p>{section}</p>

            <h5>Title</h5>
            <input value={title} type="text" onChange={(e) => settitle(e.target.value)} />


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

            <button onClick={_handleClick_Landingbanners} className="login__signInButton">
              SUBMIT
               </button>
          </div>

        }

        {section === 'SECTION 2' &&
          <div className="Section4__container">

            <p>{section}</p>

            <h5>Title</h5>
            <input value={title} type="text" onChange={(e) => settitle(e.target.value)} />


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

            <button onClick={_handleClick_section2} className="login__signInButton">
              SUBMIT
               </button>
          </div>

        }







        


        {section === 'SECTION 4' &&
          <div className="Section4__container">

            <p>{section}</p>

            <h5>Title</h5>
            <input value={title} type="text" onChange={(e) => settitle(e.target.value)} />



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

        }



{section === 'SECTION 5' &&
          <div className="Section4__container">

            <p>{section}</p>

            <h5>Title</h5>
            <input value={title} type="text" onChange={(e) => settitle(e.target.value)} />


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

            <button onClick={_handleClick_section5} className="login__signInButton">
              SUBMIT
               </button>
          </div>

        }
{section === 'Landing page Banners' &&

        <TableContainer style={{ marginTop: "5%" }} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell align="right">Title</TableCell>
              
                <TableCell align="center">Product</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {LandingBanners && LandingBanners.map((item, i) => (
                <TableRow key={i} style={{ cursor: "pointer" }}>

                  <TableCell align="right">
                    {item.title}
                  </TableCell>
               
                  <TableCell align="center" ><img width="20%" src={item.url} /></TableCell>
                  <Button onClick={()=>deleteAction('landingbanners',item.key,i)} style={{ marginTop: "10%" }} variant="contained" color="secondary">
                    Delete
                     </Button>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
}

{section === 'SECTION 2' &&

        <TableContainer style={{ marginTop: "5%" }} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell align="right">Title</TableCell>
           
                <TableCell align="center">Product</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {section2Items && section2Items.map((item, i) => (
                <TableRow key={i} style={{ cursor: "pointer" }}>

                  <TableCell align="right">
                    {item.title}
                  </TableCell>
       
                  <TableCell align="center" ><img width="20%" src={item.url} /></TableCell>
                  <Button onClick={()=>deleteAction('sectiontwo',item.key)} style={{ marginTop: "10%" }} variant="contained" color="secondary">
                    Delete
                     </Button>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
}






{section === 'SECTION 3' &&

        <TableContainer style={{ marginTop: "5%" }} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell align="right">Title</TableCell>
           
                <TableCell align="center">Product</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {section3Items && section3Items.map((item, i) => (
                <TableRow key={i} style={{ cursor: "pointer" }}>

                  <TableCell align="right">
                    {item.title}
                  </TableCell>
       
                  <TableCell align="center" ><img width="20%" src={item.url} /></TableCell>
                  <Button onClick={()=>deleteAction('sectionthree',item.key)} style={{ marginTop: "10%" }} variant="contained" color="secondary">
                    Delete
                     </Button>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
}
















{section === 'SECTION 4' &&

        <TableContainer style={{ marginTop: "5%" }} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell align="right">Title</TableCell>
         
                <TableCell align="center">Product</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {section4Items && section4Items.map((item, i) => (
                <TableRow key={i} style={{ cursor: "pointer" }}>

                  <TableCell align="right">
                    {item.title}
                  </TableCell>
               
                  <TableCell align="center" ><img width="20%" src={item.url} /></TableCell>
                  <Button onClick={()=>deleteAction('sectionfour',item.key)} style={{ marginTop: "10%" }} variant="contained" color="secondary">
                    Delete
                     </Button>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
}


{section === 'SECTION 5' &&

        <TableContainer style={{ marginTop: "5%" }} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell align="right">Title</TableCell>
           
                <TableCell align="center">Product</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {section5Items && section5Items.map((item, i) => (
                <TableRow key={i} style={{ cursor: "pointer" }}>

                  <TableCell align="right">
                    {item.title}
                  </TableCell>
       
                  <TableCell align="center" ><img width="20%" src={item.url} /></TableCell>
                  <Button onClick={()=>deleteAction('sectionfive',item.key)} style={{ marginTop: "10%" }} variant="contained" color="secondary">
                    Delete
                     </Button>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
}










      </div>
    </div>
  )
}

export default Adminlandingpage
