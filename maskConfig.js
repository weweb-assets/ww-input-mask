export const maskPropertiesOrder = ['maskType', 'pattern', 'regexp', 'placeholderVisible', 'placeholderChar'];

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
`;
/* wwEditor:end */

export const maskProperties = {
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
