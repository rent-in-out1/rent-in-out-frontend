import styled from "styled-components";

export const Button = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    button{
      display: flex;
      justify-content: center;
      padding: 12px 24px;
      border-radius: 4px;
      font-size: 1em;
      background-color: #2d80c9;
      color: white;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      &:hover{
        background-color: #024580;
        }
      &:active{
        transform: translateY(20deg)
      }
    }


`