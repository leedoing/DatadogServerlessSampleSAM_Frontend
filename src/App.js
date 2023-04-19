import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import DatadogSurvey_kr from "./DatadogSurvey_kr.js";
import DatadogSurvey_en from "./DatadogSurvey_en.js";

function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{ height: "100%" }}>
        {/* <h2 style={{ marginTop: "0" }}>Datadog Serverless Session</h2> */}
        <Routes>
          <Route path="/" element={<DatadogSurvey_kr />} />
          <Route path="/kr" element={<DatadogSurvey_kr />} />
          <Route path="/en" element={<DatadogSurvey_en />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
