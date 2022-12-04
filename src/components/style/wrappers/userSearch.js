import styled from "styled-components";

export const Wrapper = styled.div`

  .search {
    width: 85%;
    border: 3px solid #c2cceb;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80%;
    background: var(--white);
    border-radius: 60px;
    padding: 0px 8px;
    transition: 800ms;

    .icon {
      width: 15%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .dropdown{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    input {
      border-radius: 8px;
      background: transparent;
      border: 0;
      height: 100%;
      width: 85%;
      outline: none;
    }
  }
`;
