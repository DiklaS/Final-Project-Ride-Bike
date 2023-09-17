import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";


const NavLinkComponent = ({ url, label, ...rest }) => {
  return (
    // <NavLink to={url} onClick={onClick} className={className}>
    <NavLink to={url} {...rest} style={{textDecoration:'none',  }}>
      {({ isActive }) => (
        <Typography
          sx={{
            my: 2,
            display: "block",
            p: 2,
            fontWeight: 600
          }}
          color={isActive ? "warning.light" : "text.primary"}
        >
          {label}
        </Typography>
      )}
    </NavLink>
  );
};

NavLinkComponent.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}; 

export default NavLinkComponent;
