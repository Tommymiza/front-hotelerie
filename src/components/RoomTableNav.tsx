"use client";
import { HotelRounded, TableRestaurantRounded } from "@mui/icons-material";
import { set } from "date-fns";
import React, { useEffect, useState } from "react";

export default function RoomTableNav() {
  const [active, setActive] = useState("chambre");
  useEffect(() => {
    const chambre = document.getElementById("chambre-list");
    const table = document.getElementById("table-list");
    if (active === "chambre") {
      chambre!.style.display = "flex";
      table!.style.display = "none";
      // setTimeout(() => {
      //   chambre?.scrollIntoView({ behavior: "smooth" });
      // }, 200);
    } else {
      chambre!.style.display = "none";
      table!.style.display = "flex";
      // setTimeout(() => {
      //   table?.scrollIntoView({ behavior: "smooth" });
      // }, 200);
    }
  }, [active]);
  return (
    <div
      className="flex relative font-bold my-4 items-center"
      style={{
        boxShadow: "0 0 5px rgba(0,0,0,0.2)",
        borderRadius: 7,
        overflow: "hidden",
      }}
    >
      <p
        style={{
          color: active === "chambre" ? "white" : "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
        className="nav-btn"
        onClick={() => setActive("chambre")}
      >
        <HotelRounded /> Chambres
      </p>
      <p
        style={{
          color: active === "table" ? "white" : "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
        className="nav-btn"
        onClick={() => setActive("table")}
      >
        <TableRestaurantRounded />
        Tables
      </p>
      <span
        style={{
          background: "var(--primary)",
          height: "100%",
          width: "50%",
          position: "absolute",
          top: 0,
          left: active === "chambre" ? 0 : "50%",
          transition: ".4s",
          zIndex: -1,
        }}
      ></span>
    </div>
  );
}
