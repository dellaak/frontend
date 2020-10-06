import styled from "styled-components";


export const BackgroundDiv = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${props => (props.bgcolor && `${props.bgcolor}` )} !important;
  height: auto;
  min-height: 100vh;
  padding-top: 60px;
`;
