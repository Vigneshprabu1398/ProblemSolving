import React from "react";
import PossibleMiniumDifference from "./PossibleMiniumDifference";
import StrongPassword from "./StrongPassword";

const Problems = () => {
  return (
    <div style={{display:"flex",gap:"3rem", marginTop:"5rem", justifyContent:"space-around"}}>
      <StrongPassword />
      {/* <PossibleMiniumDifference /> */}
    </div>
  );
};

export default Problems;
