import { useState, useEffect } from "react";
import { AppBar, Grid, Tab, Tabs, Toolbar, Stack } from "@mui/material";
import LogoImg from "../assets/logo-dark.svg";
//Types
export type NavLink = {
  text: string;
  onClickHandler: () => void;
};

type PropTypes = { navLinks: NavLink[]; activeTab: number };
function Navbar({ navLinks, activeTab }: PropTypes) {
  //States
  const [tabValue, setTabValue] = useState(0);

  //Effects
  useEffect(() => {
    setTabValue(activeTab);
  }, [navLinks, activeTab]);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "rgb(3, 37, 65);",
        }}
      >
        <Toolbar>
          <Grid xs={8} item={true}>
            <Stack direction="row" justifyContent="flex-start">
              <a
                href="/movies"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingRight: "10px",
                }}
              >
                <img
                  src={LogoImg}
                  alt="logo"
                  style={{ width: "150px", margin: "0" }}
                />
              </a>
              <Tabs
                sx={{ placeContent: "flex-end" }}
                value={tabValue}
                indicatorColor="primary"
                onChange={(e, val) => setTabValue(val)}
              >
                {navLinks.map((link, index) => {
                  return (
                    <Tab
                      key={index}
                      label={link.text}
                      sx={{ color: "white" }}
                      onClick={link.onClickHandler}
                    />
                  );
                })}
              </Tabs>
            </Stack>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
