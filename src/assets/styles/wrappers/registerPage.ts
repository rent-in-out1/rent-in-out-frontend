import styled from 'styled-components';

export const Button = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 24px;
  button {
    display: flex;
    justify-content: center;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 1em;
    background-color: #2d80c9;
    color: white;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
      background-color: #024580;
    }
    &:active {
      transform: translateY(20deg);
    }
  }
`;

export const Wrapper = styled.div`
  width:100%;
  max-height: 90vh;
  display: flex;
  justify-content: center;
  padding-top: 0;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 20px;
  user-select: none;
  .inside_box {
    justify-content: center;
    min-height: inherit;
    background: var(--white);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 8px;
    max-width: inherit;
    width: 100%;
    border-radius: 8px;
    @media (max-width: 768px) {
      border-radius: 0;
    }
  }
  @media (max-width: 768px) {
    align-items: baseline;
  }

  .right {
      label {
      display: block;
      color: var(--grey-700);
      font-size: x-small;
      font-weight: bold;
      margin-bottom: 12px;
      text-transform: uppercase;
    }
    small {
      color: var(--red);
      margin: 0;
      padding: 0;
      font-size: x-small;
      font-style: italic;
    }
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
    #password{
      background: var(--grey-100);
      display: flex;
      align-items: center;
      border: 1px solid var(--grey-200);
      border-radius: 8px;
      input{
        height: 100%;
      background: none;
      border: 0;
      border-radius: 8px;
      margin-bottom: 0;
      box-shadow: none;
      &:focus {
        outline: none;
        background: none;
        border: none;
      }
      }
    }
    padding: 12px 12px 0 0;
    @media (max-width: 768px) {
      padding: 24px;
    }
  }`;
