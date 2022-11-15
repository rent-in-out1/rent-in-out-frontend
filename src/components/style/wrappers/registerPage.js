import styled from "styled-components";

export const Wrapper = styled.div`
    height: 90vh;
    width: 100%;
    display: flex;
    justify-content: center;

    align-items: center;
    box-sizing: border-box;
    .inside_box{
      min-height: max-content;
      background: var(--white);;
      display: flex;
      flex-wrap: wrap;
      padding:8px;
      max-width: 900px;
      width:100%;
      /* box-sizing: border-box; */
      border-radius: 8px;
      @media(max-width:768px){
          border-radius:0;
        } 
    } 
    @media(max-width:768px){
          align-items: baseline;
        } 
 
    .right{
        input{
            display: block;
            width: 100%;
            background: var(--grey-100);
            color: var(--grey-700);
            border: 1px solid var(--grey-200);
            border-radius: 8px;
            padding: 8px;
            margin-bottom: 2px;
            &:focus{
                outline: none;
                background: var(--white);
                border: 1px solid var(--grey-500);
            }
        }
        padding: 12px 12px 0px 0px;
        @media(max-width:768px){
          padding: 24px;
        } 
        }

        label{
            display: block;
            color: var(--grey-700);
            font-size: x-small;
            font-weight: bold;
            margin-bottom: 12px;
            text-transform: uppercase;
        }
        small{
            color: var(--red);
            margin: 0;
            padding: 0;
            font-size: x-small;
            font-style: italic;
        }
        .input{
            display: block;
            width: 100%;
            background: var(--grey-100);
            color: var(--grey-700);
            border: 1px solid var(--grey-200);
            border-radius: 8px;
            padding: 8px 32px;
            margin-bottom: 2px;
            cursor:pointer;
            
            &:focus{
                outline: none;
                background: var(--white);
                border: 1px solid var(--grey-500);
            }
        }
.left{
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    @media(max-width:768px){
          flex-direction:row;
          justify-content: space-around;
        } 
    .loginButton{
  width: 150px;
  padding: 15px 25px;
  border-radius: 5px;
  color: white;
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 20px;
  cursor: pointer;
}
.google{
  background-color: #df4930;
}
.facebook{
  background-color: #507cc0;
}
.github{
  background-color: black;
}

.icon{
  width: 20px;
  height: 20px;
  margin-right: 10px;
}.google{
  background-color: #df4930;
}
.facebook{
  background-color: #507cc0;
}


.icon{
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
}
`

export const Button = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    margin-top:24px;
    button{
      display: flex;
      justify-content: center;
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 1em;
      background-color: #2d80c9;
      color: white;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      &:hover{
        background-color: #024580;
        }
      &:active{
        transform: translateY(20deg)
      }
    }
`