import { useSnackbar } from "notistack";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const snackbarShown = useRef(false);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");
    const origin = urlParams.get("origin");

    fetch(
      `https://rest-as.garagefarm.net/user/session-status?session_id=${sessionId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
        if (data.status === "open") {
          return <Navigate to="/checkout" />;
        }

        if (data.status === "complete" && !snackbarShown.current) {
          enqueueSnackbar("Your payment succeed", {
            variant: "success",
          });
          snackbarShown.current = true;
          navigate(origin);
        }
      });
  }, []);

  // if (status === "open") {
  //   return <Navigate to="/checkout" />;
  // }

  // if (status === "complete") {
  //   return (
  //     <section id="success">
  //       <p>
  //         We appreciate your business! A confirmation email will be sent to{" "}
  //         {customerEmail}. If you have any questions, please email{" "}
  //         <a href="mailto:orders@example.com">orders@example.com</a>.
  //       </p>
  //     </section>
  //   );
  // }

  return null;
};

export default Return;
