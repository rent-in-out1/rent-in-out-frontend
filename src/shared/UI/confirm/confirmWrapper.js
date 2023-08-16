import styled from "styled-components";

export const BackDropS = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);

`;

export const Modal = styled.div`
  .modal {
    overflow-y: hidden;
    padding: 12px;
    position: fixed;
    max-height: 80vh;
    margin-bottom: 20px;
    top: 20vh;
    left: 35%;
    width: 30%;
    background-color: white;
    border-radius: 14px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    z-index: 30;
    animation: slide-down 600ms ease-in-out forwards;
  }

  @media (max-width: 1024px) {
    .modal {
      top: 10vh;
      width: 60%;
      left: 20%;
    }
  }
  @media (max-width: 768px) {
    .modal {
      max-height: 100vh;
      top: 10vh;
      left: 5%;
      width: 90%;
    }

    .modal .h2 {
      cursor: pointer;
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