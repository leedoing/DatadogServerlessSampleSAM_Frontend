import React from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  height: 63vh;
  width: 100%;
  display: flex;
  padding-top: 10vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all ease 1s;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }`;

const Rotate = styled.span`
  display: inline-block;
  animation: ${rotate} 4s linear infinite;
  padding: 2rem 1rem;
  margin-top: 10%;
  font-size: 4rem;
`;

const Loading = () => {
  return (
    <Container>
      <Rotate>
        <span role="img" aria-label="Loading">
          <img src="./datadog.png" style={{ borderRadius: 10 }} />
        </span>
      </Rotate>
      <h3>커피 쿠폰을 추첨하고 있습니다.</h3>
    </Container>
  );
};

export default Loading;
