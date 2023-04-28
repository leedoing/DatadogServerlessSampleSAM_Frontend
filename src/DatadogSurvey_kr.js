import React, { Component } from "react";
import { postSurveyApi, getWinApi } from "./api";
import Loading from "./Loading";
import { datadogRum } from "@datadog/browser-rum";

class DatadogSurvey extends Component {
  constructor(props) {
    datadogRum.clearGlobalContext();
    super(props);

    this.state = {
      userName: "",
      answers: {
        ans1: "",
        ans2: "",
        ans3: "",
      },
      isSubmitted: false,
      win: false,
      loading: false,
    };

    this.datadogNameSubmit = this.datadogNameSubmit.bind(this);
    this.surveySubmit = this.surveySubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
  }

  datadogNameSubmit(event) {
    event.preventDefault();
    let name = this.refs.name.value;
    this.setState({
      userName: name,
    });
    datadogRum.setUser({
      name: name,
    });
  }

  async surveySubmit(event) {
    event.preventDefault();
    let win = false;
    this.setState({
      loading: true,
    });
    try {
      await getWinApi.getWin().then((response) => {
        console.log(response);
        win = response.data;
        this.setState({
          isSubmitted: true,
          win: win,
        });
        if (win === true) {
          datadogRum.setUser({
            plan: "당첨",
          });
        } else {
          datadogRum.setUser({
            plan: "미당첨",
          });
        }
      });
      let body = {
        vote_name: this.state.answers,
      };
      postSurveyApi
        .postSurvey(body)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      datadogRum.addRumGlobalContext("global_context", {
        info: this.state,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(
        () =>
          this.setState({
            loading: false,
          }),
        2000
      );
    }
  }

  answerSelected(event) {
    let answers = this.state.answers;
    if (event.target.name === "ans1") {
      answers.ans1 = event.target.value;
    } else if (event.target.name === "ans2") {
      answers.ans2 = event.target.value;
    } else if (event.target.name === "ans3") {
      answers.ans3 = event.target.value;
    }
    this.setState({ answers: answers });
  }

  render() {
    let name = "";
    let questions = "";
    if (this.state.userName === "" && this.state.isSubmitted === false) {
      name = (
        <div style={{ height: "90vh" }}>
          {" "}
          <br />
          <h2 style={{}}>Datadog Serverless Session</h2>
          <h3>간단한 설문에 참여해주시면,</h3>
          <h3>추첨을 통해 커피 쿠폰을 드립니다.</h3>
          <form onSubmit={this.datadogNameSubmit}>
            <input
              className="uName"
              type="text"
              placeholder="닉네임을 적어주세요 :)"
              ref="name"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
            <input
              className="feedback-button"
              type="submit"
              value="submit"
              style={{ marginTop: "5vh", marginBottom: "1vh" }}
              data-dd-action-name="nickname-submit"
            ></input>
          </form>
          <br />
          <br />
          <br />
          <br />
          <br />
          <img src="./datadog.png" style={{ borderRadius: 10 }} />
        </div>
      );
    } else if (this.state.userName !== "" && this.state.isSubmitted === false) {
      name = (
        <div>
          <h2>Welcome! {this.state.userName} </h2>
        </div>
      );
      questions = (
        <div>
          <h3>3개 질문입니다.</h3>
          <form
            onSubmit={this.surveySubmit}
            data-dd-action-name="survey-submit"
          >
            <div className="card">
              <label>1) 직무가 무엇인가요?</label> <br />
              <input
                type="radio"
                name="ans1"
                value="개발자"
                onChange={this.answerSelected}
              />
              {"개발자"}
              <br />
              <input
                type="radio"
                name="ans1"
                value="플랫폼 엔지니어"
                onChange={this.answerSelected}
              />
              {"플랫폼 엔지니어"}
              <br />
              <input
                type="radio"
                name="ans1"
                value="관리자"
                onChange={this.answerSelected}
              />
              {"관리자"}
              <br />
              <input
                type="radio"
                name="ans1"
                value="Who Am I?"
                onChange={this.answerSelected}
              />
              {"Who Am I?"}
            </div>
            <div className="card">
              <label>2) Serverless Architecture를 사용하고 계신가요?</label>{" "}
              <br />
              <input
                type="radio"
                name="ans2"
                value="네, 사용 중입니다."
                onChange={this.answerSelected}
              />
              {"네, 사용 중입니다."}
              <br />
              <input
                type="radio"
                name="ans2"
                value="아니요, 아직 사용해보지 않았습니다."
                onChange={this.answerSelected}
              />
              {"아니요, 아직 사용해보지 않았습니다."}
              <br />
            </div>
            <div className="card">
              <label>3) Serverless 모니터링은 어떻게 하고 계신가요?</label>{" "}
              <br />
              <input
                type="radio"
                name="ans3"
                value="CloudWatch만 사용"
                onChange={this.answerSelected}
              />
              {"CloudWatch만 사용"}
              <br />
              <input
                type="radio"
                name="ans3"
                value="CloudWatch와 X-Ray 사용"
                onChange={this.answerSelected}
              />
              {"CloudWatch와 X-Ray를 사용"}
              <br />
              <input
                type="radio"
                name="ans3"
                value="Datadog이 아닌 상용 솔루션을 사용"
                onChange={this.answerSelected}
              />
              {"Datadog이 아닌 상용 솔루션 사용"}
              <br />
              <input
                type="radio"
                name="ans3"
                value="오픈소스 사용"
                onChange={this.answerSelected}
              />
              {"오픈소스 사용"}
              <br />
              <input
                type="radio"
                name="ans3"
                value="Datadog을 사용"
                onChange={this.answerSelected}
              />
              {"Datadog 사용"}
            </div>
            <input
              className="feedback-button"
              type="submit"
              value="submit"
              data-dd-action-name="survey-submit"
              style={{ marginBottom: "1vh" }}
            ></input>
          </form>
        </div>
      );
    } else if (this.state.isSubmitted === true && this.state.win === true) {
      name = (
        <div>
          <h2 style={{ paddingTop: "15%" }}>
            {this.state.userName}님 <br />
            당첨 되셨습니다! <br />
            <br />
            화면을 캡쳐하고, <br />
            데이터독 부스로 와주세요 :) <br />
          </h2>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <img src="./datadog.png" style={{ borderRadius: 10 }} />
        </div>
      );
    } else if (this.state.isSubmitted === true && this.state.win === false) {
      name = (
        <div>
          <h3 style={{ paddingTop: "15%" }}>
            {this.state.userName}님 <br />
            설문 조사 감사합니다! <br />
            아쉽게도 당첨되지 않았습니다. <br />
            <br />
            그러나 데이터독 부스로 오시면 <br />
            아이폰, 아이패드 등 <br />
            다양한 경품 이벤트가 <br />
            준비되어 있습니다! <br />
          </h3>
          <br />
          <br />
          <br />
          <br />
          <img src="./datadog.png" style={{ borderRadius: 10 }} />
        </div>
      );
    }
    if (this.state.loading) {
      return <Loading />;
    } else {
      return (
        <div>
          {name}
          {questions}
        </div>
      );
    }
  }
}

export default DatadogSurvey;
