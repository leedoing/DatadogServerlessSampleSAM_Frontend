import React, { useReducer } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { datadogRum } from "@datadog/browser-rum";
import { datadogLogs } from "@datadog/browser-logs";

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
  trackInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: "allow",
  allowedTracingUrls: [
    "https://58olzmgstl.execute-api.ap-northeast-2.amazonaws.com/",
  ],
  beforeSend: (event, context) => {
    if (event.type === "view") {
      if (
        event._dd.document_version === 1 ||
        event._dd.document_version === 2
      ) {
        event.view.url = "/main";
      } else if ("global_context" in event.context) {
        event.view.url = "/result";
      } else if ("usr" in event) {
        event.view.url = "/survey";
      } else {
        event.view.url = "/main";
      }
    }
    console.log(event.view.url);
    if (event.type === "resource" && event.resource.type === "xhr") {
      event.context = {
        ...event.context,
        responseBody: context.xhr.response,
      };
    }
  },
});

datadogRum.startSessionReplayRecording();

const root = ReactDOM.createRoot(document.getElementById("root"));
datadogRum.clearGlobalContext();
root.render(
  <>
    <App />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
