export default {
    inherit: {
        type: 'ww-text',
        exclude: ['text'],
    },
    editor: {
        label: { en: 'Form Input', fr: 'Entrée de Formulaire' },
        icon: 'text-input',
    },
    triggerEvents: [
        { name: 'change', label: { en: 'On change' }, event: { value: '' }, default: true },
        { name: 'initValueChange', label: { en: 'On init value change' }, event: { value: '' } },
        { name: 'onEnterKey', label: { en: 'On enter key' }, event: { value: '' }, default: true },
    ],
    properties: {},
};
