import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import User from "./Components/User";
import Create from "./Components/Create";
function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/User" element={<User />}></Route>
                    <Route path="/Create" element={<Create />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;