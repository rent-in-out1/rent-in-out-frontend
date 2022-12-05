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
        margin-top: 12px;
        min-height: 300px;
        display: flex;
        padding: 12px;
        aside section{
            min-height: inherit;
        }
        aside{
            width: 22%;
            text-align: center;
            justify-content: center;
            h3{
                font-size: 1.2em;
                font-weight: 600;
            }
        }
        section{
            width: 56%;
        }
            /* smart phones */
    @media screen and (min-width: 320px) and (max-width:480px) {
        display: block;
        #details{
            width: 100%;
        }
        #main{
            width: 100%;
        }
    }
    /* For tablets and ipads */
    @media screen and (min-width: 481px) and (max-width:768px) {
        display: block;
        #details{
            width: 100%;
        }
        #main{
            width: 100%;
        }
    }
    /* For laptops */
    @media screen and (min-width: 769px) and (max-width:1280px) {
        #details{
            width: 30%;
        }
        #main{
            width: 70%;
        }
    }
    }
`