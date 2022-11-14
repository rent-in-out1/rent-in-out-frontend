import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 0;
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.705);
    z-index: 999;
    justify-content: center;
    align-items: center;
    display: block;
    box-sizing: border-box;
    .inside_box{
    display: flex;
    background: var(--white);
    padding:8px;
    margin: auto;
    max-width: 900px;
    flex-wrap: wrap;
    width:100%;
    overflow-y: scroll;
    max-height: 80vh;
    box-sizing: border-box;
    }   
    .right{
        padding: 12px 36px 0px 0px;
        input{
            display: block;
            width: 100%;
            background: var(--grey-100);
            color: var(--grey-700);
            border: 1px solid var(--grey-200);
            border-radius: 8px;
            padding: 8px 32px;
            margin-bottom: 2px;
            &:focus{
                outline: none;
                background: var(--white);
                border: 1px solid var(--grey-500);
            }
        }
        label{
            /* block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 */
            display: block;
            color: var(--grey-700);
            font-size: x-small;
            font-weight: bold;
            margin-bottom: 12px;
            text-transform: uppercase;
        }
        small{
            /* text-red-500 text-xs italic */
            color: var(--red);
            margin: 0;
            padding: 0;
            font-size: x-small;
            font-style: italic;
        }
    }

`

export const Button = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    margin-top:24px;
    button{
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
      &:hover{
        background-color: #024580;
        }
      &:active{
        transform: translateY(20deg)
      }
    }
`