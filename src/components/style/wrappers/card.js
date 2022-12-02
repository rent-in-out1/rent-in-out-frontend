import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    padding: 12px;
    .card{
    z-index: 0;
    background: var(--white);
    border-radius: 8px;
    margin-bottom: 12px;
    filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
    }
    img{
        width: 100%;
    }
    @media(max-width: 768px) {
        width: 100%;
        padding: 0;
        margin: 12px 0 0px 0;
    }
`
