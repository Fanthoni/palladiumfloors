import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from '@mui/material';

function MenuBtn() {
  const menuOptions = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Catalog",
      path: "/catalog",
    },
    {
      label: "Contact",
      path: "/contact",
    },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MenuBtnWrapper>
      <IconButton
        onClick={handleClick}
        id="icon-button"
        style={{ padding: "2px 5px" }}
      >
        <MenuIcon sx={{ fontSize: "2rem" }} />
      </IconButton>
      <Menu
        id="menu-wrapper"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {menuOptions.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            <UnstyledLink
              to={option.path}
              style={{ textDecoration: "none", color: "black" }}
            >
              {option.label}
            </UnstyledLink>
          </MenuItem>
        ))}
      </Menu>
    </MenuBtnWrapper>
  );
}

const MenuBtnWrapper = styled.div`
  display: inline;
  background-color: #ebebeb;
  border-radius: 10px;
`;

const UnstyledLink = styled(Link)`
    text-decoration: none;
    color: black;
`;

export default MenuBtn;