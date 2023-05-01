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
    this.setState(
      {
        userName: name,
      },
      function () {
        console.log(this.state);
      }
    );
  }

  async surveySubmit(event) {
    console.log("post");
    event.preventDefault();
    let win = false;
    this.setState({
      loading: true,
    });
    console.log(this.state.loading);
    try {
      await getWinApi.getWin().then((response) => {
        console.log(response.data);
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
        survey: this.state.answers,
      };
      console.log(body);
      postSurveyApi
        .postSurvey(body)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
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
    this.setState({ answers: answers }, function () {
      console.log(this.state);
    });
  }

  render() {
    let name = "";
    let questions = "";
    let loading = this.state.loading;
    if (this.state.userName === "" && this.state.isSubmitted === false) {
      console.log(this.state.userName);
      name = (
        <div style={{ height: "90vh" }}>
          {" "}
          <br />
          <h2 style={{}}>Datadog Serverless Session</h2>
          <h3>Take the survey,</h3>
          <h3>for a chance to win a coffee coupon.</h3>
          <form onSubmit={this.datadogNameSubmit}>
            <input
              className="uName"
              type="text"
              placeholder="Enter nickname :)"
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
      //   console.log(this.state.userName);
      name = (
        <div>
          <h2>Welcome! {this.state.userName} </h2>
        </div>
      );
      questions = (
        <div>
          <h3>I have three questions.</h3>
          <form onSubmit={this.surveySubmit}>
            <div className="card">
              <label>1) What is your occupation?</label> <br />
              <input
                type="radio"
                name="ans1"
                value="Developer"
                onChange={this.answerSelected}
              />
              {"Developer"}
              <br />
              <input
                type="radio"
                name="ans1"
                value="Platform engineer"
                onChange={this.answerSelected}
              />
              {"Platform engineer"}
              <br />
              <input
                type="radio"
                name="ans1"
                value="Manager"
                onChange={this.answerSelected}
              />
              {"Manager"}
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
              <label>2) Are you using Serverless Architecture?</label> <br />
              <input
                type="radio"
                name="ans2"
                value="Yes, I'm using it"
                onChange={this.answerSelected}
              />
              {"Yes, I'm using it"}
              <br />
              <input
                type="radio"
                name="ans2"
                value="No, I haven't tried it yet"
                onChange={this.answerSelected}
              />
              {"No, I haven't tried it yet"}
              <br />
            </div>
            <div className="card">
              <label>3) How do you monitor your Serverless architecture?</label>{" "}
              <br />
              <input
                type="radio"
                name="ans3"
                value="CloudWatch"
                onChange={this.answerSelected}
              />
              {"CloudWatch"}
              <br />
              <input
                type="radio"
                name="ans3"
                value="CloudWatch&X-Ray"
                onChange={this.answerSelected}
              />
              {"CloudWatch&X-Ray"}
              <br />
              <input
                type="radio"
                name="ans3"
                value="The other Commercial solution"
                onChange={this.answerSelected}
              />
              {"The other Commercial solution"}
              <br />
              <input
                type="radio"
                name="ans3"
                value="Opensource"
                onChange={this.answerSelected}
              />
              {"Opensource"}
              <br />
              <input
                type="radio"
                name="ans3"
                value="Datadog"
                onChange={this.answerSelected}
              />
              {"Datadog"}
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
          <h2 style={{ paddingTop: "25%" }}>
            {this.state.userName} <br />
            You have won! <br />
            <br />
            Please capture your screen and, <br />
            come to the Datadog booth :) <br />
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
            {this.state.userName} <br />
            Thank you for taking the survey! <br />
            Unfortunately, you were not selected as a winner. <br />
            <br />
            However, if you come to the Datadog booth, you will have the chance
            to win various prizes such as iPhones and iPads! <br />
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
