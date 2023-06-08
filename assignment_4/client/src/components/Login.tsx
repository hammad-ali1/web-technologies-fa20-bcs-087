import {
  Box,
  Typography,
  Stack,
  InputAdornment,
  TextField,
  FormControl,
  FormHelperText,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AccountCircle, LockRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import SignUpImage from "../assets/signup.jpg";
import api from "../api/api";
type loginForm = {
  username: string;
  password: string;
};
function Login({
  setActiveTab,
}: {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange =
    (prop: keyof loginForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setLoginForm({ ...loginForm, [prop]: event.target.value });
    };

  const handleFormSubmit = () => {
    api.login(loginForm.username, loginForm.password).then((res) => {
      setActiveTab(0);
      navigate("/admin", { replace: true });
    });
  };
  useEffect(() => {
    setActiveTab(1);
  }, [setActiveTab]);
  return (
    <Stack direction="row" padding="10px">
      <Box flex={0.5}>
        <img
          src={SignUpImage}
          alt="login"
          width="100%"
          style={{ objectFit: "contain" }}
        />
      </Box>
      <Box
        flex={0.5}
        sx={{
          display: "flex",
          flexDirection: "column",
          "& > :not(style)": { m: 1 },
        }}
      >
        <Typography className="blueHeading" variant="h5">
          Login To Account
        </Typography>
        <FormControl>
          <Stack spacing={3}>
            <FormControl>
              <TextField
                id="username"
                value={loginForm.username}
                onChange={handleChange("username")}
                label="Username"
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
              <FormHelperText></FormHelperText>
            </FormControl>

            <TextField
              id="password"
              type={true ? "text" : "password"}
              label="Password"
              value={loginForm.password}
              onChange={handleChange("password")}
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRounded />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              color="primary"
              variant="contained"
              onClick={handleFormSubmit}
            >
              Log In
            </Button>
          </Stack>
        </FormControl>
      </Box>
    </Stack>
  );
}

export default Login;
