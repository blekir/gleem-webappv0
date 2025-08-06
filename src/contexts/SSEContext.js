// SSEContext.js
import { useSnackbar, closeSnackbar } from "notistack";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { CustomSnackbar } from "components/CustomSnackbar";
import { useSelector } from "react-redux";

const SSEContext = createContext();

export function SSEProvider({ children }) {
  const isAuthenticated = useSelector(
    (state) => state.authentication.user.authenticated
  );
  const user_id = useSelector((state) => state.authentication.user.id);

  const [orderProgressMap, setOrderProgressMap] = useState({});
  const [nsfwFeedback, setnsfwFeedback] = useState({});

  const eventSourceRef = useRef(null);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isAuthenticated) {
      const eventSource = new EventSource(
        `https://rest-as.garagefarm.net/events?channel=${user_id}`
      );

      // Listen for named event (e.g., "progress")
      eventSource.addEventListener("progress", (event) => {
        const sseData = JSON.parse(event.data);
        console.log("SSE progress event received:", sseData);
        const {
          order_id,
          overall_progress,
          training_finished,
          training_progress,
        } = sseData;
        setOrderProgressMap((prev) => ({
          ...prev,
          [order_id]: {
            overall_progress: Number(overall_progress),
            training_finished:
              typeof training_finished === "string"
                ? training_finished?.toLowerCase() === "true"
                : training_finished,
            training_progress: Number(training_progress),
          },
        }));
        if (Number(overall_progress) === 100) {
          enqueueSnackbar("Order completed! Click to view.", {
            content: (key, message) => (
              <CustomSnackbar
                imgSrc="https://via.placeholder.com/48"
                message={message}
                url={`orders/${order_id}`}
                onClose={() => closeSnackbar(key)}
              />
            ),
            autoHideDuration: 5000,
          });
        }
      });

      eventSource.addEventListener("training", (event) => {
        const sseData = JSON.parse(event.data);
        console.log("SSE training event received:", sseData);
        setnsfwFeedback(sseData);
      });

      // Optionally listen for default messages
      eventSource.onmessage = (event) => {
        console.log("SSE default message received:", event.data);
      };

      eventSource.onerror = (error) => {
        console.error("SSE error:", error);
        eventSource.close();
      };
      eventSourceRef.current = eventSource;

      return () => {
        eventSource.close();
      };
    }
  }, [isAuthenticated]);

  return (
    <SSEContext.Provider
      value={{
        orderProgressMap,
        nsfwFeedback,
        cleanNsfwFeedback: () => setnsfwFeedback({}),
      }}
    >
      {children}
    </SSEContext.Provider>
  );
}

export function useSSE() {
  return useContext(SSEContext);
}
