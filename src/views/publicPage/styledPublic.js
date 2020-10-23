import styled from "styled-components";

export const BackgroundDiv = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${(props) =>
    props.bgcolor && `${props.bgcolor}`} !important;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
