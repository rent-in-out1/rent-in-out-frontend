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
    overflow-y: scroll;
    position: fixed;
    max-height: 90vh;
    margin-bottom: 20px;
    top: 5vh;
    left: 5%;
    width: 90%;
    background-color: white;
    border-radius: 14px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    z-index: 30;
    animation: slide-down 600ms ease-in-out forwards;
  }

  .model .data {
    overflow-y: scroll;
  }

  .model .h2 {
    display: none;
  }

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

    .model > h2 {
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

    .model .exit:hover {
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
`;