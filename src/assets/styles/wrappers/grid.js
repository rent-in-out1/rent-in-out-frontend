import styled from "styled-components";

export const Wrapper = styled.div`
margin: 0 auto;
display: grid;
grid-template-columns: repeat(${props => props.col}, 1fr);
grid-template-rows: auto ;
grid-column-gap: ${props => props.colGap}px;
grid-row-gap: ${props => props.rowGap}px;

@media (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
}

`;