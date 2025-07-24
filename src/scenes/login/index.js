import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials, logout } from "state/auth";
import { useLoginMutation } from "api/apiSlice";

import { Box, CircularProgress, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useSnackbar } from "notistack";

import logo from "../../assets/logo.webp";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();

  const emailRef = useRef();
  const errorRef = useRef();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errorMsg, seterrorMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    seterrorMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      const userData = await login({ ...data }).unwrap();
      dispatch(
        setCredentials({
          ...userData.data,
          authenticated: true,
        })
      );
      navigate("/create");
    } catch {
      enqueueSnackbar("Invalid credentials", {
        variant: "error",
      });
    }
  };

  const content = isLoading ? (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 0,
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="GLEEM AI"></img>
        <Avatar sx={{ m: 1, bgcolor: theme.palette.yellows[700] }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ color: "#fff" }}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            className="ring-0"
            ref={emailRef}
            onKeyDown={(e) => e.stopPropagation()}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onKeyDown={(e) => e.stopPropagation()}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: theme.palette.yellows[700],
              color: theme.palette.getContrastText(theme.palette.yellows[700]),
              "&:hover": {
                backgroundColor: theme.palette.yellows[800],
              },
              "&:active": {
                backgroundColor: theme.palette.yellows[900],
              },
            }}
          >
            Sign In
          </Button>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              justifyContent: "flex-end",
            }}
          >
            <Typography>Don't have an account yet ?</Typography>
            <Typography
              sx={{ color: theme.palette.yellows[700], cursor: "pointer" }}
              onClick={() => navigate("/join")}
            >
              Create account
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );

  return content;
};

export default Login;
