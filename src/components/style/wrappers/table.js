import styled from "styled-components";

export const Wrapper = styled.div`
overflow-x: auto;
    h1{
        text-align: center;
        margin: 8px 0;
        font-size: 2em;
        font-family: sans-serif;
    }
    table{
        width: 85%;
        table-layout: auto;
        thead{
            tr{
                background: var(--grey-50);
                th{
                    padding: 12px 20px;
                    text-align: center;
                    border-bottom: 4px solid var(--grey-100);
                    background: var(--grey-50);
                    font-size: 0.8em;
                    font-weight: bolder;
                    color: var(--grey-600);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
            }
        }
        tbody{
            tr{
                td{
                    padding: 20px 8px;
                    border-bottom: 2px solid var(--grey-100);
                    background: var(--white);
                    font-size: 0.8em;
                    text-align: center;
                    p{
                        text-transform: capitalize;
                    }
                }
            }
        }
    }
    @media(max-width:768px){
        table{
            width: 15000px;
            background: red;
        }
        thead{
            background: red;
        }
    }
`