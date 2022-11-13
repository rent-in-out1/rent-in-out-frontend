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
    }
    input{
    }
`