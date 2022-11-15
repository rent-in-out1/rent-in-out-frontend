import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    background: var(--skyblue-50);
    .left{
        width: 60%;
        .search{
        margin-left: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 50%;
        background: var(--white);
        border-radius: 60px;
        padding: 0px 8px;
        transition: 800ms;
        .icon{
            width: 15%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        input{
            border-radius: 8px;
            background: transparent;
            border: 0;
            height: 100%;
            width: 85%;
            outline: none;
              &:focus{
                  border: none;
                  outline: none !important;
                  .search{
                    max-width: 25%;
                  }
             }
        }
    }
    }
    .right{
        width: 40%;
        display: flex;
        justify-content: end;
        align-items: center;
        height: inherit;
        .avatar{
            cursor: pointer;
            margin-left: 12px;
        }
        nav{
            height: inherit;
            ul{
                height: inherit;
                display: flex;
                li{
                    height: inherit;
                    padding: 0 8px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    transition: 800ms ease-in-out ;
                    font-size: 1.2em;
                    &:hover{
                        color: var(--pink-200);
                    }
                }
            }
        }
    }
    @media(max-width:768px){
        .left{
            width: 80%;
        }
        .right{
            width: 20%;
            nav{
                display: none;
            }
        }
    }

`
export const Logo = styled.div`
display: flex;
align-items: center;
max-width: 40%;
cursor: pointer;
p{
    margin: 0 4px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
    img{
        width: 40px;
        height: 40px;
    }
`