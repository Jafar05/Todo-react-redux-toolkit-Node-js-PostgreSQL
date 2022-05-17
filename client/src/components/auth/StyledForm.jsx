import styled from 'styled-components'

export const StyledForm = styled.form`
  max-width: 350px;
  width: 100%;
  margin: 2rem auto;
  h2 {
    margin-bottom: 1rem;
  }
  button, input {
    height: 35px;
    width: 100%;
    padding: 7px;
    outline: none;
    border-radius: 5px;
    border: 1px solid wheat;
    margin-bottom: 1rem;
    
    &:focus {
      border: 1px solid blue;
    }
  }
  
  button {
    cursor: pointer;
    
    &:focus {
      border: none;
    }
  }
  header {
    display: flex;
    justify-content: space-between;
    position: relative;
    left: 70vh;
    padding-bottom: 26px;
    padding-top: 46px;
  }
`;