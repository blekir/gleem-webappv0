import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch } from "react-redux";
import logo from "../../assets/logo.webp";
import ReCAPTCHA from "react-google-recaptcha";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useLoginMutation, useRegisterMutation } from "api/apiSlice";
import { setCredentials, logout } from "state/auth";
import { useSnackbar } from "notistack";

const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;

const Join = () => {
  const [searchParams] = useSearchParams();
  const order = searchParams.get("order"); // Will be null if not present

  const { enqueueSnackbar } = useSnackbar();

  const { token } = useParams();
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();

  const emailRef = useRef();
  const errorRef = useRef();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [emailError, setEmailError] = useState("");

  const [visitorId, setVisitorId] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const isLoading = false;

  //   const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    // Initialize FingerprintJS and get the visitorId
    FingerprintJS.load().then((fp) => {
      fp.get().then((result) => {
        setVisitorId(result.visitorId);
        // You can now send result.visitorId to your backend if needed
      });
    });
  }, []);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    seterrorMsg("");
  }, [email, password, confirmPassword]);

  useEffect(() => {
    // Email validation
    if (email && !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
    if (confirmPassword && password !== confirmPassword) {
      seterrorMsg("Passwords do not match");
    } else {
      seterrorMsg("");
    }
  }, [email, password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorMsg || emailError) return;

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      etsy_order: order,
      token: token,
    };

    // Password match validation
    if (password !== confirmPassword) {
      seterrorMsg("Passwords do not match");
      return;
    }
    try {
      await register({ ...data }).unwrap();
    } catch {
      enqueueSnackbar("Invalid registration token", {
        variant: "error",
      });
      return false;
    }
    try {
      const userData = await login({ ...data }).unwrap();
      dispatch(
        setCredentials({
          ...userData.data,
          authenticated: true,
        })
      );
      navigate("/create");
    } catch {}
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
            inputRef={emailRef}
            value={email}
            onChange={(e) => setemail(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
            error={!!emailError}
            helperText={emailError}
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
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
            error={!!errorMsg}
            helperText={errorMsg}
          />
          {/* <TextField
            margin="normal"
            required
            fullWidth
            name="orderNumber"
            label="Order number"
            id="orderNumber"
            autoComplete="ordernumber"
            value={etsyOrder}
            onChange={(e) => setetsyOrder(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
          /> */}
          {/* <Box display="flex" justifyContent="center">
            <ReCAPTCHA
              sitekey="6LcbMVUrAAAAANdvd6lOzs_taL9S1UkDx9nt0k4d" // <-- Replace with your site key
              onChange={handleCaptchaChange}
            />
            {captchaError && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {captchaError}
              </Typography>
            )}
          </Box> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={
              errorMsg ||
              emailError ||
              email === "" ||
              password === "" ||
              confirmPassword === ""
            }
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
            Create account
          </Button>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              justifyContent: "flex-end",
            }}
          >
            <Typography>Already have an account ?</Typography>
            <Typography
              sx={{ color: theme.palette.yellows[700], cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Sign in
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );

  return content;
};

export default Join;
