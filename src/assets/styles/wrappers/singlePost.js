import styled from "styled-components";

export const Wrapper = styled.div`
    position: fixed;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 999999;
    width: 100%;
    background: white;
    section{
        display: flex;
        .images-carousel{
            width: 50%;
            height:100vh;
            overflow: hidden;
            display: flex;
            background: royalblue;
            justify-content: center;
            align-items: center;
            img{
                object-fit: cover;
                object-position: top;
            }
        }
        main{
            width: 50%;
        }
    }
`