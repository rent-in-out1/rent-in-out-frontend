import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 384px;
  display: flex;
  justify-content: center;
  align-items: center;
  .chats {
    width: 95%;
    margin: -70px auto;
    display: flex;
    justify-content: space-between;
    height: 100%;
    background: var(--white);
    transition: 800ms;
    h2{
      font-size: larger;
        width: 50%;
        font-weight: bolder;
        margin: 12px auto;
        text-align: center;
      }
    .icon {
      width: 15%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .dropdown {
      overflow-y: scroll;
      max-height: inherit;
    }
  }
  @media (max-width: 768px) {
    height: 100vh;
    max-height: 100vh;
    .chats {
      margin-top: -30px;
      .dropdown {
        height: 80vh;
        max-height: 80vh;
      }
    }
  }
`;
