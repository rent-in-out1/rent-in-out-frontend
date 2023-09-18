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
    position: fixed;
    top: 10vh;
    left: 25%;
    width: 60%;
    z-index: 40;
    animation: slide-down 600ms ease-in-out forwards;

    &-header-exit {
      display: flex;
      justify-content: end;
      align-items: center;
      padding: 4px 0;
    }

    &-body {
      max-height: 70vh;
      background-color: white;
      border-radius: 4px;
      overflow-y: auto;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    .model {
      width: 80%;
      left: 10%;
    }
  }

  @media (max-width: 767px) {
    .model {
      width: 96%;
      border-radius: 0;
      left: 2%;
      top: 10vh;
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
