import styled from '@emotion/styled';

export const Spacer = styled.div`
  margin: 10px;
`;

export const HiddenLabel = styled.label`
  display: none;
`;

export const Separator = styled.div`
    border-bottom: 1px solid silver;
    width: 45%;
    margin: 15px auto 15px auto;
`;

export const TextBox = styled.div<{ borderColor?: string, width?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 1px auto 0 auto;
  width: ${props => (props.width ? props.width : '200') + 'px'};
  border: 1px solid ${props => props.borderColor && props.borderColor !== 'default' ? props.borderColor : 'lightgray'};
  border-radius: 5px;
  background: var(--background2);

  & > * {
    border: none;
    margin: 0 5px 0 10px;
    outline: 0;
    height: 100%;
    background-color: transparent;
  }

  & > textarea,
  & > input {
    width: 100%;
    font-family: Arial;
  }
`;

export const Button = styled.button<{ primary?: boolean, danger?: boolean }>`
  margin-top: 10px;
  width: 220px;
  height: 32px;
  background-color: ${props => props.primary ? 'var(--accent1)' : props.danger ? '#FF3232' : 'var(--accent2)'};
  border: none;
  border-radius: 5px;
  outline: 0;
  color: var(--background2);
  cursor: pointer;
  transition: .5s;

  &:hover,
  &:focus {
    border: 1px solid ${props => props.primary ? 'var(--accent1)' : props.danger ? '#FF3232' : 'var(--accent2)'};
    color: ${props => props.primary ? 'var(--accent1)' : props.danger ? '#FF3232' : 'var(--accent2)'};
    background: var(--background2);
  }
  &:disabled {
    border: 1px solid gray;
    color: gray;
    background: var(--background2);
    cursor: not-allowed;
  }
`;

export const ButtonFlex = styled.div`
    display: flex;
    margin: 0 auto;
    justify-content: center;
    
    &>*:not(:last-child) {
        margin-right: 10px;
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


export const WaitingForData = styled.div<{ length?: number }>`
    background-color: #00000030;
    color: #00000000;
    border-radius: 2px;
    width: ${({ length }) => (length || 8) * 8 + "px"};
    display: inline-block;
    margin: 0 2px;

    &:before {
        content: "_";
    }
`;

export const AudioElement = styled.video`
    height: 60px;
`;
