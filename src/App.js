import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/home";

import {
  cont_address,
  usdt_address,
  token_abi,
  cont_abi,
} from "../src/configs/Contracts";
import { useAccount, useDisconnect } from "wagmi";
import Web3 from "web3";

function App() {

  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={
            <Home

            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
