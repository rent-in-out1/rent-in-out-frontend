import styled from "styled-components";

export const Wrapper = styled.div`
    nav{
        background: var(--white);
        & > div{
        width: 75%;
        margin-left: auto;
        display: flex;
        align-items: center;
        padding: 0 12px;
        justify-content: space-between;
        
        ul{
            display: flex;
            align-items: center;
            li{
                cursor: pointer;
                padding: 4px 12px;
                font-size: 1.5em;
                font-family: 'Times New Roman', Times, serif;
                &::after{
                    content: "";
                    margin: 0;
                    padding: 0;
                    display: block;
                    
                    background-color:var(--primary-300);
                    width: 0%;
                    transition: 800ms ease;
                }
                &:active::after{
                    border: 1px solid var(--primary-300);
                    width: 100%;
                }
            }
        }
    }
    }
    main{
        min-height: 300px;
        display: flex;
        aside section{
            min-height: inherit;
        }
        aside{
            display: flex;
            justify-content: center;
            h3{
                font-size: 1.5em;
            }
        }
        section{
        }
    }
`