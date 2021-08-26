import "./navbar.scss";
import { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import CompanyLogo from "../../shared-components/company-logo";
import { colors, Media } from "../../shared-components";
import CloseIcon from '@material-ui/icons/Close';
import Fade from 'react-reveal/Fade'

function Productlist(props) {
    const history = useHistory();
    const [{ wishlist, Userorders, users }, dispatch] = useStateValue();
    const [productlist, setProductlist] = useState(false)

    useEffect(() => {

        setTimeout(() => {
            props.onCloseList(false)
      
          }, 20000)
    }, []);


    return (
            <ProductListWrapper style={{height:"5vh"}}>
                <MenuItem id="MontserratRegular" onClick={() => history.push('/beds')}>Beds</MenuItem>
                <MenuItem id="MontserratRegular" onClick={() => history.push('/chairs')} >Chairs</MenuItem>
                <MenuItem id="MontserratRegular" onClick={() => history.push('/sofas')}>Sofas</MenuItem>
                <MenuItem id="MontserratRegular" onClick={() => history.push('/dinnings')} >Dinning</MenuItem>
                <MenuItem id="MontserratRegular" onClick={() => history.push('/centerTables')}>Tables</MenuItem>
                <MenuItem id="MontserratRegular" onClick={() => history.push('/swings')} >Swings</MenuItem>
                <NavBarRight>
                    <CloseIcon style={{ fontSize: "30px", color: "white" }} onClick={() => props.onCloseList(false)} />
                </NavBarRight>
            </ProductListWrapper>

    );
}
const ProductListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
  width: 100%;
   background: #9f7757;
  ${Media("xlscreens")} {
    height: 5.12vw;
  }
`;

const MenuItem = styled.div`
  font-size: 16px;
  font-family: "gilroysemibold";
  position: relative;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
  cursor: pointer;
  color:white;
  &::after {
    position: absolute;
    content: "";
    height: 0px;
    width: 100%;
    background-color: white;
    bottom: 1px;
    width: 0px;
    transition: all 0.3s ease;
  }
  &:hover {
    &::after {
      width: 100%;
    }
  }
  ${Media("xlscreens")} {
    font-size: 1.17vw;
    height: 3vw;
    padding: 0 1.46vw;
    &::after {
      height: 0.166vw;
    }
  }
`;

const NavBarRight = styled.div`
  display: flex;
  position: absolute;
  right: 10px;
  ${Media("xlscreens")} {
    right: 0.73vw;
  }
`;

export default Productlist;