import styled from "styled-components";


export const Wrapper = styled.div`
 
 .search{
border: 3px solid #C2CCEB;
  margin-left: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 80%;
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
        }
    /* .dropdown{
      background-color: white;
      display: flex;
      flex-direction: column;
      border: 1px solid gray;
    }
    .dropdown:empty{
      border: none;
    }

    .dropdown-row{
      cursor: pointer;
      text-align:start;
      margin: 2px 0;
    } */

   

 }
     
    
   
    

    
`