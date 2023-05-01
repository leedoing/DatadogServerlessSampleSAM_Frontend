import { datadogRum } from "@datadog/browser-rum";
import { datadogLogs } from "@datadog/browser-logs";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

datadogLogs.init({
  clientToken: "pub350c3d32dc186cadf0fe877fd14e3f1e",
  site: "datadoghq.com",
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,
  service: "hyunjin-datadog-sam-vote-app-front",
  env: "dev",
  forwardConsoleLogs: "all",
});

datadogRum.init({
  applicationId: "6be1a363-c45d-4956-875a-ce5c741e91e4",
  clientToken: "pub350c3d32dc186cadf0fe877fd14e3f1e",
  site: "datadoghq.com",
  service: "hyunjin-datadog-sam-vote-app-front",
  env: "dev",
  version: "1.0.0",
  sampleRate: 100,
  sessionReplaySampleRate: 100,
  trackResources: true,
  trackUserInteractions: true,
  trackFrustrations: true,
  trackLongTasks: true,
  defaultPrivacyLevel: "allow",
  allowedTracingUrls: [
    "https://9kcfcjnh5j.execute-api.ap-northeast-2.amazonaws.com/",
  ],
  beforeSend: (event, context) => {
    if ("global_context" in event.context) {
      event.view.url = "/survey";
    } else {
      event.view.url = "/main";
    }
    if (event.type === "resource" && event.resource.type === "xhr") {
      event.context = {
        ...event.context,
        responseBody: context.xhr.response,
      };
      console.log(event);
    }
  },
});

datadogRum.startSessionReplayRecording();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
