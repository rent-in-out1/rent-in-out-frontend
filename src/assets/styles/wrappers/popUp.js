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
    padding: 12px;
    position: fixed;
    min-height: 40vh;
    max-height: 80vh;
    margin-bottom: 20px;
    top: 20vh;
    left: 25%;
    width: 50%;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    z-index: 999;
    animation: slide-down 600ms ease-in-out forwards;
  }

  .model .data {
    overflow-y: auto;
  }

  .model .h2 {
    display: none;
  }

  @media (max-width: 1024px) {
  .model {
      border-radius: 0;
      top: 30;
      left: 0;
      width: 100%;
      max-height: 50vh;
      padding: 0;
  }

    .model h2 {
      z-index: 30;
      transition: 0.5s linear;
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