import styled from '@emotion/styled/macro';

export const Spacer = styled.div`
  margin: 10px;
`;

export const TextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 0;
  width: 200px;
  border: 1px solid lightgray;
  border-radius: 5px;
  background: var(--background2);

  & > * {
    border: none;
    margin: 0 5px 0 10px;
    outline: 0;
    height: 100%;
    background-color: transparent;
  }
  &:not(:last-child){
    border-bottom: none;
  }
`;

export const Button = styled.button`
  margin-top: 10px;
  width: 220px;
  height: 32px;
  background-color: var(--accent2);
  border: none;
  border-radius: 5px;
  outline: 0;
  cursor: pointer;

  &:hover{
    /*TODO: Style on hover*/
  }
  &:focus{
    /*TODO: Style on click*/
  }
`;