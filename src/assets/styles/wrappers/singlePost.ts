import styled from 'styled-components';

export const Wrapper = styled.div`
  height: inherit;
  width: 100%;
  background-color: var(--white);
  color: var(--grey-500);
  .loader {
    min-height: 90vh;
  }
  section {
    display: flex;

    .images-carousel {
      user-select: none;
      position: relative;
      width: 50%;
      height: 90vh;
      overflow: hidden;
      display: flex;
      background: var(--black);
      justify-content: center;
      align-items: center;
      img {
        object-fit: cover;
        object-position: top;
      }
      .controllers {
        position: absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
      }
    }
    main {
      height: 85vh;
      padding: 0 16px;
      width: 50%;
      overflow-y: scroll;
      .leaflet-container {
        width: 100%;
        height: 50vh;
      }
    }
    @media (max-width: 768px) {
      .images-carousel {
        width: 100%;
        height: 100vh;
      }
      main {
        padding: 4px 4px;
        height: auto;
        width: 100%;
        .leaflet-container {
          width: 100%;
          height: 45vh;
        }
      }
    }
  }
`;
