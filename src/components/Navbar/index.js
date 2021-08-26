import "./navbar.scss";
import { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import CompanyLogo from "../../shared-components/company-logo";
import { colors, Media } from "../../shared-components";
import Productlist from "./productlist"
import Fade from 'react-reveal/Fade'
import { BackServer } from "../../components/Services"


function Navbar() {
  const history = useHistory();
  const [{ wishlist, Userorders, users }, dispatch] = useStateValue();
  const [productlist, setProductlist] = useState(false)

  useEffect(() => {
    var wishlistdatafromlocalstorage = JSON.parse(
      localStorage.getItem("wishlist")
    );
    dispatch({
      type: "ADD_TO_WISHLIST",
      payload: wishlistdatafromlocalstorage,
    });

    var ordersdatafromlocalstorage = JSON.parse(localStorage.getItem("Orders"));
    dispatch({
      type: "SHOPNOW",
      payload: ordersdatafromlocalstorage,
    });



    
    var usersfromlocalstorage = JSON.parse(localStorage.getItem("users"));
    if (usersfromlocalstorage) {
      axios
        .post(
          `${BackServer}/data/getUserOrders/${usersfromlocalstorage._id}`
        )
        .then((res) => {
          dispatch({
            type: "SHOPNOW",
            payload: res.data.order,
          });
        });
    }


    
  }, []);

  const controlling = (route) => {
    history.push(`${route}`);
  };
  const signoutMethod = () => {
    localStorage.removeItem("users");

    dispatch({
      type: "SET_USER",
      payload: null,
    });

    history.push("/");
  };
  const onCloselist = (val) => {
    setProductlist(val)
  }
  return (
    <div>
      <NavbarWrapper>
        <CompanyLogo />
        <NabarMenus className="navbar__content">
          <MenuItem id="MontserratRegular" onClick={() => controlling("/")}>Home</MenuItem>
          <MenuItem id="MontserratRegular" onClick={() => setProductlist(true)}>Products</MenuItem>
          <MenuItem id="MontserratRegular"  onClick={() => controlling("/about")}>About Us</MenuItem>
          <MenuItem id="MontserratRegular" onClick={() => controlling("/contact")}>Contact Us</MenuItem>
          {users !== null && (
            <MenuItem onClick={() => controlling("/User_Orders")}>
              <div id="MontserratRegular" className="orders">
                Your Orders
              <ItemCounter>

                  {Userorders === null ? 0 : Userorders.length}
                </ItemCounter>
              </div>
            </MenuItem>
          )}
        </NabarMenus>
        <NavBarRight>
          <MenuItem id="MontserratRegular" onClick={() => history.push("/wishlist")}>
            Wishlist
          <ItemCounter>{wishlist === null ? 0 : wishlist.length}</ItemCounter>
          </MenuItem>
          <MenuItem>
            {users === null ? (
              <div id="MontserratRegular"
                onClick={() => history.push("/User_Login")}
                className="wishlist"
              >
                Sign In
              </div>
            ) : (
              <div id="MontserratRegular" onClick={signoutMethod} className="wishlist">
                Sign Out
              </div>
            )}
          </MenuItem>
        </NavBarRight>
      </NavbarWrapper>

      {productlist &&
        
          <Productlist onCloseList={onCloselist} />
      
      }

    </div>


  );
}
const NavbarWrapper = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 0.1px solid white;
  background: #9f7757;
  ${Media("xlscreens")} {
    height: 5.12vw;
  }
`;
const NabarMenus = styled.div`
  display: flex;
`;


const MenuItem = styled.div`
  font-size: 16px;
  font-family: "gilroysemibold";
  position: relative;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
  cursor: pointer;
  color:white;
  &::after {
    position: absolute;
    content: "";
    height: 5px;
    width: 100%;
    background-color: ${colors.secondaryColor};
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
    height: 5.12vw;
    padding: 0 1.46vw;
    &::after {
      height: 0.366vw;
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
const ItemCounter = styled.div`
  position: absolute;
  top: 20px;
  right: 6px;
  background-color: ${colors.mainColor};
  color: ${colors.primaryColor};
  font-size: 10px;
  height: 14px;
  width: 14px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${Media("xlscreens")} {
    top: 1.46vw;
    right: 0.43vw;
    font-size: 0.73vw;
    height: 1.02vw;
    width: 1.02vw;
    border-radius: 0.73vw;
  }
`;
export default Navbar;