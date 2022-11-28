import styled from "styled-components";

export const Wrapper = styled.div`


main{
    
 height: 900px;
max-width : 600px;
margin: 0 auto;

div{
    margin-top: 6px; 
    margin: 0 auto;
}


h2{
    background-color: var(--skyblue-50);
    margin-bottom: 28px;
    font-size: 1.1em;
    text-align: center;
    padding: 24px;
    color: purple;
    margin-top:6px;
}
form{
    background-color: var(--skyblue-50);
    text-align: center;
    display: flex; 
    flex-direction: column;
    justify-content: center;
    height: 520px;
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);

    
}

input{
    display: block;
      width: 100%;
      background: var(--white);
      color: var(--grey-700);
      border: 1px solid var(--grey-200);
      border-radius: 8px;
      padding: 8px;
      margin-bottom: 6px;
}


button{
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

`

