import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, logout } from "state/auth";
import { useLoginMutation, useGoogleLoginMutation } from "api/apiSlice";

import { Box, CircularProgress, Divider, useTheme } from "@mui/material";
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
import GoogleIcon from "@mui/icons-material/Google";

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
  const [googleLogin, { isLoading: isGoogleLoading }] =
    useGoogleLoginMutation();

  const isAuthenticated = useSelector(
    (state) => state.authentication.user.authenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/create");
    }
  }, [isAuthenticated]);

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

  const handleGoogleLogin = async () => {
    // const userData = await googleLogin().unwrap();
    // dispatch(setCredentials(userData.data));
    // navigate("/create");

    window.location.href = "https://rest-as.garagefarm.net/user/google-login";
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
        {/* <img src={logo} alt="GLEEM AI"></img> */}
        <Avatar sx={{ m: 1, bgcolor: theme.palette.yellows[700] }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              sx={{
                justifySelf: "center",
                width: "100%",
                mb: 1,
                backgroundColor: theme.palette.yellows[700],
                color: theme.palette.getContrastText(
                  theme.palette.yellows[700]
                ),
                "&:hover": {
                  backgroundColor: theme.palette.yellows[800],
                },
                "&:active": {
                  backgroundColor: theme.palette.yellows[900],
                },
              }}
            >
              Continue with Google
            </Button>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "15px",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Divider sx={{ width: "10%" }} />
              <Typography sx={{ textAlign: "center", width: "auto" }}>
                or log in with your email
              </Typography>
              <Divider sx={{ width: "10%" }} />
            </Box>
          </Box>
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
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: "5px", mt: 4 }}
          >
            <Typography
              sx={{ textAlign: "center", color: theme.palette.grey[700] }}
            >
              By signing up, you agree to our
            </Typography>
            <Typography
              sx={{ textAlign: "center", color: theme.palette.grey[700] }}
            >
              <span>
                <a
                  href="https://gleem.ai/terms-of-service"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    color: theme.palette.yellows[700],
                  }}
                >
                  Terms of Service
                </a>
              </span>{" "}
              and{" "}
              <span>
                <a
                  href="https://gleem.ai/terms-of-service#privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    color: theme.palette.yellows[700],
                  }}
                >
                  Privacy Policy
                </a>
              </span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );

  return content;
};

export default Login;
