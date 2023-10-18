import styled from "styled-components";

export const Wrapper = styled.aside`
  a {
    display: flex;
    align-items: center;
    padding: 8px;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 400;
    color: var(--grey-900);
    border-radius: 8px;
    &:hover {
      background: var(--grey-100);
    }
  }
`;
