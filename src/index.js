import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { datadogRum } from "@datadog/browser-rum";

datadogRum.init({
  applicationId: "6be1a363-c45d-4956-875a-ce5c741e91e4",
  clientToken: "pub350c3d32dc186cadf0fe877fd14e3f1e",
  site: "datadoghq.com",
  service: "voting-serverless",
  env: "dev",
  version: "1.0.0",
  sampleRate: 100,
  sessionReplaySampleRate: 100,
  trackInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: "allow",
  // allowedTracingUrls: [
  //   "https://58olzmgstl.execute-api.ap-northeast-2.amazonaws.com/",
  // ],
  // allowedTracingUrls: ["https://api.example.com", /https:\/\/.*\.my-api-domain\.com/, (url) => url.startsWith("https://api.example.com")]
});

datadogRum.startSessionReplayRecording();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
