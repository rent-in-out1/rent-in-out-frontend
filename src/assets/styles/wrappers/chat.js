import styled from "styled-components";

export const Wrapper = styled.div`
margin-top:20px;
width: 100%;
input {
    display: block;
    width: 100%;
    background: var(--grey-100);
    color: var(--black);
    border: 1px solid var(--grey-200);
    border-radius: 8px;
    padding: 8px;
    margin-bottom: 2px;
    &:focus {
      outline: none;
      background: var(--white);
      border: 1px solid var(--grey-500);
    }
  }
  small {
      color: var(--grey-500);
      margin: 4px;
      padding: 0;
      font-size: x-small;
      font-style: italic;
      animation: forward-up 1500ms ease-out forwards;
    }
    @keyframes forward-up {
    from {
      opacity: 0;
      transform: translateZ(-100px);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }
  `;