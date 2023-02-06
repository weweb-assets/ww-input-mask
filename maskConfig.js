export const cleavePropertiesOrder = ['maskType', 'pattern', 'regexp', 'placeholderVisible', 'placeholderChar'];

/* wwEditor:start */
const patternHelp = `Pattern mask is just a string: \`'{#}000[aaa]/NIC-\`\`*[**]'\`

Where definitions are:
- 0 - any digit
- a - any letter
- * - any char
- [] - make input optional
- {} - include fixed part in unmasked value
- \` - prevent symbols shift back

Examples:

US phone: \`'{(000)} 000-0000'\` <br/>
French phone: \`'+{33} 000 000 000'\` <br/>

Bank card: \`'0000 0000 0000 0000'\` <br/>
International Bank Account Number (IBAN): \`'0000 0000 0000 0000 0000 00'\` <br/>

IP: \`'000.000.000.000'\`

US Social security number: \`'000-00-0000'\` <br/>
French Social security number: \`'00 00 00 000 000'\` <br/>
`;

const regExpHelp = `RegExp mask is just a string representation of a regular expression.

Example of an email regexp: \`/^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@a-zA-Z0-9?(?:.a-zA-Z0-9?)*$/\`

You can test and create your own regexp here: <a href="https://regex101.com/" target="_blank">https://regex101.com/</a>
`;
/* wwEditor:end */

export const cleaveProperties = {
    maskType: {
        label: { en: 'Mask type' },
        type: 'TextSelect',
        options: {
            options: [
                { value: 'regexp', label: { en: 'RegExp' } },
                { value: 'pattern', label: { en: 'Pattern' } },
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
            markdown: patternHelp,
        },
        /* wwEditor:end */
        hidden: content => content.maskType !== 'pattern',
    },
    placeholderVisible: {
        label: {
            en: 'Mask placeholder',
        },
        type: 'OnOff',
        section: 'settings',
        defaultValue: false,
        hidden: content => content.maskType !== 'pattern',
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
        hidden: content => content.maskType !== 'pattern' || content.placeholderVisible !== true,
    },
    regexp: {
        label: {
            en: 'RegExp',
        },
        type: 'Text',
        section: 'settings',
        bindable: true,
        defaultValue: `^\d+$`,
        /* wwEditor:start */
        bindingValidation: {
            type: 'string',
            tooltip: regExpHelp,
        },
        propertyHelp: {
            markdown: regExpHelp,
        },
        /* wwEditor:end */
        hidden: content => content.maskType !== 'regexp',
    },
};
