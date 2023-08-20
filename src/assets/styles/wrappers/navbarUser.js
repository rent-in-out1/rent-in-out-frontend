import styled from "styled-components";

export const Wrapper = styled.div`
  background: var(--white);
  position: sticky;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;

  section {
    display: flex;
    justify-content: space-between;
    padding: 8px 24px;
    margin: 0 auto;

    .left {
      width: 50%;
      display: flex;
      align-items: center;

      .search {
        margin-left: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 80%;
        background: var(--white);
        border-radius: 60px;
        padding: 0 8px;
        transition: 800ms;

        .icon {
          width: 15%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        input {
          border-radius: 8px;
          background: transparent;
          border: 0;
          height: 100%;
          width: 85%;
          outline: none;

          &:focus, textarea:focus, select:focus {
            outline: red !important;

            .search {
              max-width: 25%;
            }
          }
        }
      }
    }

    .right {
      width: auto;
      display: flex;
      justify-content: end;
      align-items: center;
      height: inherit;

      .avatar {
        cursor: pointer;
        margin-left: 12px;
        width: 40px;
        height: 40px;

        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }

      nav {
        height: inherit;

        ul {
          height: inherit;
          display: flex;

          li {
            height: inherit;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: 800ms ease-in-out;
            font-size: 1.2em;

            button, a {
              font-size: 0.9em;
              border-radius: 8px;
            }

            &:hover {
              button, a {
                background: var(--skyblue-300);
              }
            }
          }
        }
      }
    }

    @media (max-width: 768px) {
      padding: 8px 4px;
      .left {
        width: 15%;

        p {
          display: none;
        }

        .search {
          display: none;
        }
      }

      .right {
        width: auto;
      }
    }
  }

  .dropdown {
    li {
      transition: 1s ease;
    }

    li:hover {
      background: var(--grey-300);
    }
  }
`;
export const Logo = styled.div`
display: flex;
align-items: center;
margin: 0;
cursor: pointer;
    p{
        margin: 0 4px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    img{
        width: 40px;
        height: 40px;
    }
    @media(max-width:768px){
        display: block;
        max-width: 100%;
        img{
            width: 30px;
            height: 30px;
        }
        a{
            margin: 0;
        }
        p{
            margin: 0;
        }
    }
`;