import styled from "styled-components";

export const Wrapper = styled.div`
  margin-bottom: 10px;
  user-select: none;
    position: relative;
    background: var(--white);
    z-index: 0;
    height: 100%;
    border-radius: 8px;
    filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));

    span {
      font-size: 1em;
    }

  img {
    width: 100%;
  }

  .postImg {
    height: 400px;
  }

  /* smart phones */
  @media screen and (min-width: 320px) and (max-width: 480px) {
    padding: 4px;
      .postImg {
        height: 200px;
      }

      span {
        font-size: 0.8em;
      }
  }
  /* For tablets and ipads */
  @media screen and (min-width: 481px) and (max-width: 768px) {
    width: 100%;
    padding: 6px;
    margin: 12px 0 0 0;
      .postImg {
        height: 300px;
      }

      span {
        font-size: 0.8em;
      }
  }
  /* For laptops */
  @media screen and (min-width: 769px) and (max-width: 1024px) {

  }
`
