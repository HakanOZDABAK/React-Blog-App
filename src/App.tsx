import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./layouts/Navbar";
import Dashboard from "./layouts/Dashboard";
import { useUserStore } from "./store/useUserStore";
import { Grid } from "@mui/material";

function App() {
  const { login } = useUserStore();
  return (
    <div className="App">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Dashboard />
        </Grid>

        {login && (
          <Grid item xs={12}>
            <Navbar />
          </Grid>
        )}
      </Grid>
    </div>
  );

}

export default App;
