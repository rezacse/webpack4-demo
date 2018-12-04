import '../css/main.scss';

import {
    secretButton,
    secretParagraph
} from './dom-loader';

// let API_URL;
const updateSecretButton = () => {
    secretButton.textContent = showSecret ?
        'Hide the Secret' :
        'Show the Secret';
        
    console.log(API_URL);
}

const updateSecretParagraph = () => {
    secretParagraph.style.display = showSecret ?
        'block' :
        'none';
}
updateSecretParagraph();

const toggleSecretState = () => {
    showSecret = !showSecret;
    updateSecretParagraph();
    updateSecretButton()
}

let showSecret = false;
secretButton.addEventListener('click', toggleSecretState);
