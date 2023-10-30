export const maskPropertiesOrder = ['maskType', 'pattern', 'options', 'placeholderVisible', 'placeholderChar'];

/* wwEditor:start */
const patternHelp = `Pattern mask is just a string: \`'{#}000[aaa]/NIC-\`\`*[**]'\`

Where definitions are:
- 0 - any digit
- a - any letter
- * - any char
- [] - make input optional
- {} - include fixed part in unmasked value

Examples:

US phone: \`'{(000)} 000-0000'\` <br/>
French phone: \`'+{33} 000 000 000'\` <br/>

Bank card: \`'0000 0000 0000 0000'\` <br/>
International Bank Account Number (IBAN): \`'0000 0000 0000 0000 0000 00'\` <br/>

IP: \`'000.000.000.000'\`

US Social security number: \`'000-00-0000'\` <br/>
French Social security number: \`'00 00 00 000 000'\` <br/>

iMask documentation: <a href="https://imask.js.org/guide.html#masked-pattern" target="_blank">https://imask.js.org/guide.html#masked-pattern</a>
`;

const customHelp = `iMask documentation: <a href="https://imask.js.org/guide.html#masked-pattern" target="_blank">https://imask.js.org/guide.html#masked-pattern</a>

In the documentation, the mask initialization is presented as follows:<br/>

\`IMask(element, options)\`<br/>

The expected bound value is the \`options\` object.
<br/>
`;
/* wwEditor:end */

export const maskProperties = {
    maskType: {
        label: { en: 'Mask type' },
        type: 'TextSelect',
        options: {
            options: [
                { value: 'pattern', label: { en: 'Pattern' } },
                { value: 'custom', label: { en: 'Custom' } },
            ],
        },
        section: 'settings',
        responsive: true,
        defaultValue: 'pattern',
    },
    pattern: {
        label: {
            en: 'Pattern',
        },
        type: 'Text',
        section: 'settings',
        bindable: true,
        defaultValue: '{8}000000',
        /* wwEditor:start */
        bindingValidation: {
            type: 'string',
            tooltip: patternHelp,
        },
        propertyHelp: {
            tooltip: patternHelp,
        },
        /* wwEditor:end */
        hidden: content => content.maskType !== 'pattern',
    },
    options: {
        label: {
            en: 'Options',
        },
        type: 'Info',
        options: {
            text: { en: 'Bind the whole iMask options object' },
        },
        section: 'settings',
        defaultValue: '',
        bindable: true,
        propertyHelp: {
            tooltip: customHelp,
        },
        hidden: content => content.maskType !== 'custom',
    },
    placeholderVisible: {
        label: {
            en: 'Mask placeholder',
        },
        type: 'OnOff',
        section: 'settings',
        defaultValue: false,
    },
    placeholderChar: {
        label: {
            en: 'Placeholder character',
        },
        type: 'Text',
        section: 'settings',
        bindable: true,
        defaultValue: '_',
        /* wwEditor:start */
        bindingValidation: {
            type: 'string',
            tooltip: 'A string that represents the placeholder: `"0"`, `"X"` or `"#"`',
        },
        /* wwEditor:end */
        hidden: content => content.placeholderVisible !== true,
    },
};
