import { useEffect, useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

import Logo from "../../images/Logo.png";
import { isUserVerified } from "../../functions";

const NavBar = () => {
  const [isVerified, setIsVerified] = useState(false);

  const pages = ["Rent", "Add Listing"];
  const pageToRoute = {
    Rent: "/catalogue",
    "Add Listing": isVerified ? "/addProperty" : "/verify",
  };

  useEffect(() => {
    const userStatus = async () => {
      const verified = await isUserVerified();
      setIsVerified(verified);
    };
    userStatus();
  }, []);

  return (
    <AppBar
      style={{
        backgroundColor: "#1e1e1e",
        height: "100%",
      }}
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              backgroundColor: "#1e1e1e",
            }}
          ></Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            <Link
              to={"/landing"}
              style={{ display: "flex", alignItems: "center" }}
            >
              <img className="w-12 color-[#e0fbfc]" src={Logo} alt="" />
              <h1 className="text-3xl font-bold mr-5">
                <span className="text-[#ee6c4d]">Home</span>
                <span className="text-[#3d5a80]">Ledger</span>
              </h1>
            </Link>
            {pages.map((page) => (
              <Link key={page} to={pageToRoute[page]}>
                <Button
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    fontWeight: "bold",
                  }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile">
              <IconButton sx={{ p: 0, position: "relative" }}>
                <AccountCircle
                  style={{ fontSize: 55, marginTop: 10 }}
                  color="warning"
                />
                {isVerified === true ? (
                  <OfflinePinIcon
                    color="success"
                    style={{ position: "absolute", bottom: 0, right: 0 }}
                  />
                ) : (
                  <CancelIcon
                    color="error"
                    style={{ position: "absolute", bottom: 0, right: 0 }}
                  />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
