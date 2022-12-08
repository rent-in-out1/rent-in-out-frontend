import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 12px;
    user-select: none;
    .card{
    position: relative;
    background: var(--white);
    z-index: 0;
    border-radius: 8px;
    margin-bottom: 12px;
    filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
    span{
        font-size: 1em;
    }
    }
    img{
        width: 100%;
    }
    .postImg{
        height: 600px;
    }
    /* smart phones */
    @media screen and (min-width: 320px) and (max-width:480px) {
        padding:4px;
        .card{
         .postImg{
            height: 200px;
            }
            span{
                font-size: 0.8em;
            }
        }


    }
    /* For tablets and ipads */
    @media screen and (min-width: 481px) and (max-width:768px) {
        width: 100%;
        padding: 6px;
        margin: 12px 0 0px 0;
        .card{
         .postImg{
            height: 300px;
            }
            span{
                font-size: 0.8em;
            }
        }
    }
    /* For laptops */
    @media screen and (min-width: 769px) and (max-width:1024px) {

    }
`
