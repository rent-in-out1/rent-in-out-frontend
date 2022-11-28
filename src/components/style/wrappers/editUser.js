import styled from "styled-components";

export const Wrapper = styled.div`
margin-top: 48px;
padding: 24px;
main{
max-width : 600px;
margin: 0 auto;
form{
    position: relative;
    background-color: var(--skyblue-50);
    display: flex; 
    padding:48px 24px 12px 24px;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);  
    div{ 
        width: 100%;
    input{
    display: block;
      width: 100%;
      background: var(--white);
      color: var(--black);
      border: 1px solid var(--grey-200);
      border-radius: 8px;
      padding: 8px;
      margin-bottom: 6px;
}
}
button,a{
    margin-top: 12px;
      width: 100px;
      padding: 10px 22px;
      border-radius: 5px;
      color: var(--white);
      background: var(--primary-300);
      display: flex;
      align-items: center;
      font-weight: bold;
      margin-bottom: 20px;
      cursor: pointer;
      display:flex;
      justify-content: center;
      
}
}
.avatar{
    position: absolute;
    top: -40px;
    left: 20%;
    background: white;
    border-radius: 50%;
    border: 1px solid black;
    width: 90px;
    height: 90px;
    overflow: hidden;
    padding: 4px;
    img{
        width: 100%;
        height: 100%;
    }
}
}

`

