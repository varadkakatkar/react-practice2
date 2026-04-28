import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import DynamicGrid from "./DynamicGrid";
import UseRefControlledUncontrolledDemo from "./UseRefControlledUncontrolled";
import MemoUseCallbackDemo from "./MemoUseCallback";
import UseEffectUseCallBackDemo from "./UseEffectUseCallBack";
import MemoAndUseMemoDemo from "./MemoAndUseMemo";
import UseMemoOnlyDemo from "./UseMemoOnly";
import UseCallBackOnlyDemo from "./UseCallBackOnly";
import HOCUsed from "./HOC/HOCUsed";
import RestaurantMenu from "./LiftingStateUp/RestaurantMenus/RestaurantMenu";
import ShoppingCart from "./LiftingStateUp/ShoppingCart/ShoppingCart";

const App = () => {
  return (
    <div>
      {/* <UseRefControlledUncontrolledDemo />; */}
      {/* <MemoUseCallbackDemo /> */}
      {/* <UseEffectUseCallBackDemo /> */}
      {/* <MemoAndUseMemoDemo /> */}
      {/* <UseMemoOnlyDemo /> */}
      {/* {<UseCallBackOnlyDemo />} */}
      {/* <HOCUsed /> */}
      {/*   <RestaurantMenu /> */} {/* Lifting State Up */}
      <ShoppingCart />
    </div>
  );
};

// export default App;
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
