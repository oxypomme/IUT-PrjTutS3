import React from "react";
import Form from '../../features/accounts/form/Form';




export default function CreateProfile(): JSX.Element {
    return(
        <div className='App'>
            <div>
                <h2>Formulaire</h2>
                <Form />
            </div>
        </div>
    );
}