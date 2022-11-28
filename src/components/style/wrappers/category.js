import styled from "styled-components";
export const Input = styled.div`
main {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 100%;
  @media( max-width: 768px){
      flex-direction: column;
    }
  input {
    display: block;
    width: 80%;
    background: var(--grey-100);
    color: var(--black);
    border: 1px solid var(--grey-200);
    border-radius: 8px;
    padding: 8px;
    margin-bottom: 2px;
    &:focus {
      outline: none;
      background: var(--white);
      border: 1px solid var(--grey-500);
    }
  }
  .main{
    margin: 0 auto;
    min-width: inherit;
    flex-direction: row;
    form {
    display: flex;
    width: inherit;
    justify-content: space-between;
    input{
      padding: 8px;
    }
    @media( max-width: 768px){
      flex-direction: column;
      input{
        width: 100%;
      }
    }
    button {
      color: var(--black);
      border-radius: 12px;
      padding: 0 8px;
      background: var(--skyblue-700);
      &:hover {
        background: var(--skyblue-500);
      }
    }
  }
  }

}

`
