import styled from "styled-components";

export const Wrapper = styled.aside`
    a{
        display: flex;
       align-items :center;
       padding: 8px;
       font-size: 1rem;
       line-height: 1.5rem;
       font-weight: 400;
       color: var(--grey-900);
       border-radius: 8px;
       &:hover{
        background: var(--grey-100);
       }
       aside{
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 12px;
        margin-left: 12px;
        width: 12px;
        height: 12px;
        font-size: small;
        font-weight: 500;
        color: var(--skyblue-800);
        background: var(--skyblue-50);
        border-radius: 50%;
       }
    }
`;