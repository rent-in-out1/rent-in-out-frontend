import styled from "styled-components";

export const Wrapper = styled.div`
width: 100%;
  .wrapper {
    margin-bottom: 3em;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  h1 {
    text-align: center;
    margin: 8px 0;
    font-size: 2em;
    font-family: sans-serif;
  }
  table {
    overflow-x: scroll;
    width: 100%;
    /* table-layout: auto; */
    thead {
      tr {
        background: var(--grey-50);
        th {
          padding: 12px 20px;
          text-align: center;
          border-bottom: 4px solid var(--grey-100);
          background: var(--grey-50);
          font-size: 0.8em;
          font-weight: bolder;
          color: var(--grey-600);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      }
    }
    tbody {
      tr {
        td {
          padding: 8px 8px;
          border-bottom: 2px solid var(--grey-100);
          background: var(--white);
          font-size: 0.7em;
          text-align: center;
          input {
            font-size: 0.7em;
            display: block;
            background: var(--grey-100);
            color: var(--black);
            border: 1px solid var(--grey-200);
            border-radius: 8px;
            padding: 4px;
            margin-bottom: 2px;
            &:focus {
              outline: none;
              background: var(--white);
              border: 1px solid var(--grey-500);
            }
          }
          p {
            text-transform: capitalize;
          }
        }
      }
    }
  }
  @media (max-width: 768px) {
    .wrapper {
      margin: 0;
      display: block;
      overflow-x: scroll;
      width: 100%;
    }
    table {
      max-width: 100%;
      background: red;
    }
    thead {
      background: red;
    }
  }
`;
