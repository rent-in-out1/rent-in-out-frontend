import styled from 'styled-components';

export const Wrapper = styled.div`
margin-bottom: 12px;
*:focus{
   border: 1px solid var(--primary-300);
   outline: none;
   box-shadow: none;
}
   main{
    margin-top: 12px;
    form{
      div{ 
         input{
         width: 100%;
         background: var(--white);
         color: var(--black);
         border: 1px solid var(--grey-200);
         border-radius: 8px;
         padding: 8px;
         }
         select{
            width: 100%;
            border: 1px solid var(--grey-200);
            border-radius: 8px ;
            padding: 8px;
         }
      }
   }
}
`;
