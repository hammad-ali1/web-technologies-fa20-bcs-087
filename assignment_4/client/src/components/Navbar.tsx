import { useState, useEffect } from "react";
import { AppBar, Grid, Tab, Tabs, Toolbar, Stack } from "@mui/material";

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
