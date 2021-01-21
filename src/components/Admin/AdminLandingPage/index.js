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
import { auth, storage,db, database } from '../../../database'
import { Link, useHistory } from 'react-router-dom'
import  { useStateValue } from "../../StateProvider"

function Adminlandingpage() {
  const [{section4Items}, dispatch] = useStateValue();

  const history = useHistory()
  const [expand1Icon, setexpand1Icon] = useState(false)
  const [title, settitle] = useState('')
  const [desc, setdesc] = useState('')
  const [rate, setrate] = useState('')
  const [file, setfile] = useState(null)
  const [progress, setprogress] = useState('')
  const [imageUrl, setimageUrl] = useState('')

  const [value, setvalue] = useState(0)

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log('THE USER IS >>> ', authUser)

      if (!authUser) {
        // the user just logged in / the user was logged in
        history.push('/Admin')
      } else {
        // the user is logged out
      }
    })
  }, [])

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

  const _handleClick =()=>{
    var data = {
        title: title,
        desc: desc,
        rate:rate,
        url: imageUrl,
        wishlist:false,
        viewproduct:false
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

    history.replace('/')

        })
        .catch(error => {
          alert(error)
        });
      }

  }
  return (
    <div>
      <ExpansionPanel
        expanded={expand1Icon}
        style={{
          boxShadow: 'none',
          backgroundColor: '#56574f',
          width: '100%',
        }}
        onClick={() => {
          if (expand1Icon === true) {
            setexpand1Icon(false)
          } else {
            setexpand1Icon(true)
          }
        }}
      >
        <ExpansionPanelSummary
          expandIcon={
            expand1Icon ? (
              <RemoveIcon
                style={{
                  fontSize: 15,
                  color: '#000000',
                  color: '#ffffff',
                  width: '22px',
                  marginRight: '-53px',
                }}
              />
            ) : (
              <AddIcon
                style={{
                  fontSize: 15,
                  color: '#ffffff',
                  width: '22px',
                  marginRight: '18px',
                }}
              />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <ListItemText>
            <span
              style={{
                fontWeight: 'bold',
                fontSize: '13px',
                color: '#ffffff',
                paddingLeft: '16px',
              }}
            >
              SECTIONS
            </span>
          </ListItemText>
        </ExpansionPanelSummary>

        <List>
          <ListItem
            button
            style={{
              height: 33,
              cursor: 'pointer',
              fontSize: '10px',
            }}
          >
            <ListItemText onClick={() => setvalue(1)}>
              <span
                className="fontstyle2"
                style={{
                  fontSize: '11px',
                  paddingLeft: '16px',
                  color: '#ffffff',
                }}
              >
                SECTION 1
              </span>
            </ListItemText>

            <ListItemIcon>
              <ArrowForwardIosIcon
                style={{
                  marginLeft: '24px',
                  height: '16px',
                  width: '16px',
                  color: '#ffffff',
                }}
              />
            </ListItemIcon>
          </ListItem>
        </List>

        <List>
          <ListItem
            button
            style={{
              height: 33,
              cursor: 'pointer',
              fontSize: '10px',
            }}
          >
            <ListItemText onClick={() => setvalue(2)}>
              <span
                className="fontstyle2"
                style={{
                  fontSize: '11px',
                  paddingLeft: '16px',
                  color: '#ffffff',
                }}
              >
                SECTION 2
              </span>
            </ListItemText>

            <ListItemIcon>
              <ArrowForwardIosIcon
                style={{
                  marginLeft: '24px',
                  height: '16px',
                  width: '16px',
                  color: '#ffffff',
                }}
              />
            </ListItemIcon>
          </ListItem>
        </List>

        <List>
          <ListItem
            button
            style={{
              height: 33,
              cursor: 'pointer',
              fontSize: '10px',
            }}
          >
            <ListItemText onClick={() => setvalue(3)}>
              <span
                className="fontstyle2"
                style={{
                  fontSize: '11px',
                  paddingLeft: '16px',
                  color: '#ffffff',
                }}
              >
                SECTION 3
              </span>
            </ListItemText>

            <ListItemIcon>
              <ArrowForwardIosIcon
                style={{
                  marginLeft: '24px',
                  height: '16px',
                  width: '16px',
                  color: '#ffffff',
                }}
              />
            </ListItemIcon>
          </ListItem>
        </List>

        <List>
          <ListItem
            button
            style={{
              height: 33,
              cursor: 'pointer',
              fontSize: '10px',
            }}
          >
            <ListItemText onClick={() => setvalue(4)}>
              <span
                className="fontstyle2"
                style={{
                  fontSize: '11px',
                  paddingLeft: '16px',
                  color: '#ffffff',
                }}
              >
                SECTION 4
              </span>
            </ListItemText>

            <ListItemIcon>
              <ArrowForwardIosIcon
                style={{
                  marginLeft: '24px',
                  height: '16px',
                  width: '16px',
                  color: '#ffffff',
                }}
              />
            </ListItemIcon>
          </ListItem>
        </List>

        <List>
          <ListItem
            button
            style={{
              height: 33,
              cursor: 'pointer',
              fontSize: '10px',
            }}
          >
            <ListItemText onClick={() => setvalue(5)}>
              <span
                className="fontstyle2"
                style={{
                  fontSize: '11px',
                  paddingLeft: '16px',
                  color: '#ffffff',
                }}
              >
                SECTION 5
              </span>
            </ListItemText>

            <ListItemIcon>
              <ArrowForwardIosIcon
                style={{
                  marginLeft: '24px',
                  height: '16px',
                  width: '16px',
                  color: '#ffffff',
                }}
              />
            </ListItemIcon>
          </ListItem>
        </List>
      </ExpansionPanel>

      <div>
        {value === 4 && (
          <div className="section4__main">
            <div className="Section4__container">
              <h1>Section 4</h1>

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

                <h5>Upload Image</h5>
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

                <button onClick={_handleClick}  className="login__signInButton">
                  SUBMIT
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Adminlandingpage
