import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCheckCircle, faExclamationCircle, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

const alertStyle = {
  backgroundColor: 'white',
  color: 'black',
  padding: '10px',
  borderRadius: '3px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
  fontFamily: 'Arial',
  width: 'fit-content',
  maxWidth: '500px',
  boxSizing: 'border-box'
}

const buttonStyle = {
  marginLeft: '20px',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  color: 'black'
}

const AlertTemplate = ({ message, options, style, close }: any) => {
  return (
    <div style={{ ...alertStyle, ...style }}>
      {options.type === 'info' && <FontAwesomeIcon icon={faInfoCircle} color={'var(--accent2)'} />}
      {options.type === 'success' && <FontAwesomeIcon icon={faCheckCircle} color={'lime'} />}
      {options.type === 'error' && <FontAwesomeIcon icon={faExclamationCircle} color={'red'} />}
      <span style={{ flex: 2, marginLeft: 10 }}>{message}</span>
      <button onClick={close} style={buttonStyle}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  )
};

export default AlertTemplate;