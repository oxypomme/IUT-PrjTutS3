import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import IError from '../include/IError';

import { ErrorLabel } from './styledComponents';

type PropsType = {
    array: IError[];
    name: string;
}

const ErrorComponent = ({ array, name }: PropsType) => {
    const error: IError = array.find(e => e.component === name);

    return (
        <>
            { error &&
                <ErrorLabel>
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    {error?.label}
                </ErrorLabel>
            }
        </>

    );
}

export default ErrorComponent;