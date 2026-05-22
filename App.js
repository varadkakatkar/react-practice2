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
import Greeting from "./InterviewProblems/Greeting";
import TogglePassword from "./InterviewProblems/TogglePassword";
import EvenOrOddChecker from "./InterviewProblems/EvenOrOddCheck";
import ProgressBar from "./InterviewProblems/ProgressBar";
import Navbar from "./InterviewProblems/Context/NavBar";
import Dashboard from "./InterviewProblems/Context/Dashboard";
import { UserProvider } from "./InterviewProblems/Context/userContext";
import AutoSaveInput from "./InterviewProblems/AutoSaveInput";
import AcronymGenerator from "./InterviewProblems/AcronymGenerator";
import ColorExplorer from "./InterviewProblems/ColorExplorer";
import ConfirmationModal from "./InterviewProblems/ConfirmationModal";
import CharacterCount from "./InterviewProblems/CharacterCount";
import AgeCalculator from "./InterviewProblems/AgeCalculate";

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
      {/* <ShoppingCart /> */}
      {/** Interview Practice */}
      {/* <Greeting /> */}
      {/* <TogglePassword /> */}
      {/* <EvenOrOddChecker /> */}
      {/* <ProgressBar /> */}
      {/* <UserProvider>
        <div className="app">
          <Navbar />
          <Dashboard />
        </div>
      </UserProvider> */}
      {/* <AutoSaveInput /> */}
      {/* <AcronymGenerator /> */}
      {/* <ColorExplorer /> */}
      {/* <ConfirmationModal /> */}
      {/* <CharacterCount /> */}
      <AgeCalculator />
    </div>
  );
};

// export default App;
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
