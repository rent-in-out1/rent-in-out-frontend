import styled from "styled-components";

export const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
    background: transparent;
    color: var(--grey-500);
    section{
        display: flex;
        .images-carousel{
            position: relative;
            width: 50%;
            height:100vh;
            overflow: hidden;
            display: flex;
            background: var(--black);
            justify-content: center;
            align-items: center;
            img{
                object-fit: cover;
                object-position: top;
            }
            .controllers{

                position: absolute;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 100%;
            }
        }
        main{
            padding:0 16px;
            width: 50%;
        }
        @media (max-width: 768px) {
                flex-wrap: wrap;
                .images-carousel{
                    width: 100%;
                    height: 50vh;
                }
                main{
                    padding:0 4px;
                    width: 100%;
                }
            }
        }
`