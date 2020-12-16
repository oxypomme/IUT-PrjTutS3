import styled from '@emotion/styled';

export const Spacer = styled.div`
  margin: 10px;
`;

export const HiddenLabel = styled.label`
  display: none;
`;


export const TextBox = styled.div<{ borderColor?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 0;
  width: 200px;
  border: 1px solid ${props => props.borderColor && props.borderColor != 'default' ? props.borderColor : 'lightgray'};
  border-radius: 5px;
  background: var(--background2);

  & > * {
    border: none;
    margin: 0 5px 0 10px;
    outline: 0;
    height: 100%;
    background-color: transparent;
  }
  &:not(:last-of-type){
    border-bottom: none;
  }
`;

export const Button = styled.button<{ primary?: boolean }>`
  margin-top: 10px;
  width: 220px;
  height: 32px;
  background-color: ${props => props.primary ? 'var(--accent1)' : 'var(--accent2)'};
  border: none;
  border-radius: 5px;
  outline: 0;
  color: var(--background2);
  cursor: pointer;
  transition: .5s;

  &:hover{
    border: 1px solid ${props => props.primary ? 'var(--accent1)' : 'var(--accent2)'};
    color: ${props => props.primary ? 'var(--accent1)' : 'var(--accent2)'};
    background: var(--background2);
  }
`;

export const ErrorLabel = styled.div`
  color: red;
  border: 2px solid red;
  border-radius: 5px;
  padding: 4px;
  margin-bottom: 4px;

  & > div > svg {
    margin-right: 8px;
  }
`;
