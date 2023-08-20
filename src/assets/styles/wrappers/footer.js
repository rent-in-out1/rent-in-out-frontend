import styled from "styled-components";

export const Wrapper = styled.div`
  main {
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    p {
      margin-bottom: 12px;
    }
    .social {
      display: flex;
      justify-content: space-evenly;
      margin-bottom: 18px;
      font-size: 1.4em;
    }
    li {
      margin-right: 20px;
      padding-right: 18px;
    }
    h3 {
      margin-bottom: 6px;
    }
    h2 {
      margin-bottom: 12px;
      font-size: 1.2em;
    }
    form {
      display: flex;
      flex-direction: column;
      
      input,
      textarea {
      display: block;
      width: 100%;
      background: var(--white);
      color: var(--grey-700);
      border: 1px solid var(--grey-200);
      border-radius: 8px;
      padding: 8px;
      margin-bottom: 6px;
    }

    small {
      color: var(--red);
    }

    button {
      margin-top: 12px;
      width: 100px;
      padding: 10px 22px;
      border-radius: 5px;
      color: var(--white);
      background: var(--primary-300);
      display: flex;
      align-items: center;
      font-weight: bold;
      margin-bottom: 20px;
      cursor: pointer;
    }
    }
  }
`;
