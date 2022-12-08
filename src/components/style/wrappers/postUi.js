import styled from "styled-components";


export const Wrapper = styled.div`
padding:12px;
*:focus{
   border: 1px solid var(--primary-300);
   outline: none;
   box-shadow: none;
}
   main{
    margin-top: 12px;
    form{
     margin-top: 12px;
     display: block;
     text-align: center;
     justify-content: center;
     align-items: center;
      div{ 
      margin:0 auto;
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
         select{
            width: 100%;
            border: 1px solid var(--grey-200);
            border-radius: 8px ;
            padding: 8px ;
            margin-bottom: 6px;
         }
         button{
            margin-top: 12px;
               width: 100px;
               padding: 10px 22px;
               border-radius: 5px;
               color: var(--white);
               background: var(--skyblue-500);
               display: flex;
               align-items: center;
               font-weight: bold;
               margin-bottom: 20px;
               cursor: pointer;
               display:flex;
               justify-content: center;
               margin-right: 36px;
               &:hover{
                  background: var(--skyblue-800);
               }  
         }
   }
}
.secondform{

}
}
 
`