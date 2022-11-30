import styled from "styled-components";

export const Wrapper = styled.aside`
    a{
        /* flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 */
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
        /* inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full */
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
`