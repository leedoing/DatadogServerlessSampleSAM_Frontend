import axios from "axios";

const api = axios.create({
  baseURL: "https://9kcfcjnh5j.execute-api.ap-northeast-2.amazonaws.com/dev/",
});

export const postSurveyApi = {
  postSurvey: (body) => api.post("votes", body),
};

export const getWinApi = {
  getWin: () => api.get("win"),
};
