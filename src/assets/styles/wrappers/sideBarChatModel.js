import styled from "styled-components";

export const Wrapper = styled.div`
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 20;
    background-color: rgba(0, 0, 0, 0.75);
  }
  .model {
    overflow-y: hidden;
    position: fixed;
    max-height: 90vh;
    margin-bottom: 20px;
    top: 5vh;
    left: 20%;
    width: 60%;
    background-color: white;
    border-radius: 14px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    z-index: 30;
    animation: slide-down 600ms ease-in-out forwards;
  }
  .model .data{
    overflow-y: scroll;
  }
  /* .model >h3{
    display: none;
  } */
  @media (max-width: 1024px) {
    .model {
      width: 95%;
      left: 2.5%;
    }
  }
  @media (max-width: 768px) {
    .model {
      border-radius: 0;
      max-height: 100vh;
      top: 0;
      left: 0;
      width: 100%;
      padding: 0;
    }
  
    .model >h3 {
      position: fixed;
      width: 100%;
      height: 20px;
      padding: 0;
      margin: 0;
      top: 10px;
      z-index: 30;
      right: 10px;
      color: var(--skyblue-600);
      font-size: 2em;
      cursor: pointer;
      transition: 0.5s linear;
    }
    .model .exit:hover{
      color: var(--skyblue-900);
    }
  }
  
  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-48px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`