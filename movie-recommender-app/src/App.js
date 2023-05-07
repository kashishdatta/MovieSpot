import "./App.css";
import Home from "./Pages/Home";
import SearchResult from "./Pages/SearchResult";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import UserDetail from "./Pages/UserDetail";
import Protected from "./Pages/Components/Protected";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                <Route exact path="/" element={<Signup/>} /> 
              <Route exact path="/sign-in" element={<Login/>} />
              <Route exact path="/sign-up" element={<Signup/>} />
              {/* <Route exact path="/userDetail" element={<UserDetail/>} /> */}
                    <Route exact path="/home" element={<Protected>  <Home />  </Protected>} />
                    <Route
                        exact
                        path="/search/:id"
                        element={<SearchResult />}
                    />
                </Routes>
            </Router>
        </div>

    //     <>
    //     <Router>
    //       <div className="App">
    //         <div className="auth-wrapper">
    //           <div className="auth-inner">
    //             <Routes>
    //               {/* <Route exact path="/" element={isLoggedIn==="true"?<UserDetail/>:<Login/> } /> */}
 
    //               <Route exact path="/" element={<Signup />} />
 
 
    //               <Route exact path="/sign-in" element={<Login />} />
 
    //               {/* <Route element={<Protected/>}>     */}
    //               <Route exact path="/userDetail" element={<Protected><SearchResult/></Protected>} />
    //               {/* </Route> */}
    //             </Routes>
    //           </div>
    //         </div>
    //       </div>
        
    //     </Router>
    //   </>
    );
}

export default App;





