import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store"; 
import Sidebar from "./components/SideBar";
import Dashboard from "./pages/Dashboard"; 
import "./styles/global.css"
import "./App.css"

function App() {
  return (
    <Provider store={store}>
      <main className="md:grid md:grid-cols-8 bg-[#F1F1F1] min-h-screen">
        <div className="hidden md:block md:col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-6 p-4">
          <Dashboard />
        </div>
      </main>
    </Provider>
  );
}

export default App;
