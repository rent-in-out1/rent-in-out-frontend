import styled from "styled-components";
export const Input = styled.div`
input {
    display: block;
    width: 80%;
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
`
