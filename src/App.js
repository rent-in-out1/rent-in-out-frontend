import "./index.css"
import React ,{useState} from "react";
import AppRoutes from "./appRoutes";
function App() {
  const [registerShow, setRegisterShow] = useState(false);
  
  const registerShowHandler = () => {
    setRegisterShow(!registerShow);
  };
  return (
    <React.Fragment>
      
      <AppRoutes />
    </React.Fragment>
  );
}

export default App;
