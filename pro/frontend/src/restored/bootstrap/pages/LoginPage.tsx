/**
 * @evidence index-DTKnr6h1.js:43710 dwe
 * survivors: Welcome Trader!, Sign in to continue., Backend URL, Username, Password, Log in
 * storage: ADMIN_PASSWORD (yB), backend URL via Y8/updateBackendUrl
 */
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export function LoginPage() {
  const { backendUrl, setBackendUrl, updateBackendUrl } = useBackendUrl(); // Y8
  const [username, setUsername] = useState("agentrader");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLogin = () => {
    updateBackendUrl(backendUrl);
    window.localStorage.setItem("ADMIN_PASSWORD", password);
    navigate({ to: pathTo("bot") });
  };

  return jsxs(Sheet, {
    sx: {
      width: 300,
      mx: "auto",
      py: 3,
      px: 2,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      borderRadius: "sm",
      boxShadow: "md",
    },
    variant: "outlined",
    children: [
      jsx(Typography, { component: "h1", level: "h4", children: "Welcome Trader!" }),
      jsx(Typography, { level: "body-sm", children: "Sign in to continue." }),
      jsxs(FormControl, {
        children: [
          jsx(FormLabel, { children: "Backend URL" }),
          jsx(Input, {
            name: "username",
            onChange: (e) => setBackendUrl(e.target.value),
            placeholder: "username",
            type: "text",
            value: backendUrl,
          }),
        ],
      }),
      jsxs(FormControl, {
        children: [
          jsx(FormLabel, { children: "Username" }),
          jsx(Input, {
            name: "username",
            onChange: (e) => setUsername(e.target.value),
            placeholder: "username",
            type: "text",
            value: username,
          }),
        ],
      }),
      jsxs(FormControl, {
        children: [
          jsx(FormLabel, { children: "Password" }),
          jsx(Input, {
            name: "password",
            onChange: (e) => setPassword(e.target.value),
            placeholder: "password",
            type: "password",
            value: password,
            autoFocus: true,
            onKeyUp: (e) => {
              if (e.key === "Enter") onLogin();
            },
          }),
        ],
      }),
      jsx(Button, { onClick: onLogin, sx: { mt: 1 }, children: "Log in" }),
    ],
  });
}
