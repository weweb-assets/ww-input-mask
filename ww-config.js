import { maskProperties, maskPropertiesOrder } from './maskConfig.js';

export default {
    inherit: {
        type: 'ww-text',
        exclude: ['text'],
    },
    editor: {
        label: { en: 'Mask Input' },
        icon: 'text-input',
        customSettingsPropertiesOrder: [
            'value',
            ['placeholder'],
            ['readonly', 'required'],
            ['debounce', 'debounceDelay'],
            [...maskPropertiesOrder],
        ],
        customStylePropertiesOrder: [
            'placeholderColor',
            'advancedPlaceholder',
            'forceAnimation',
            [
                'animationTrigger',
                'placeholderPosition',
                'placeholderScaling',
                'positioningAjustment',
                'transition',
                'timingFunction',
            ],
        ],
    },
    triggerEvents: [
        { name: 'change', label: { en: 'On change' }, event: { value: '' }, default: true },
        { name: 'initValueChange', label: { en: 'On init value change' }, event: { value: '' } },
        { name: 'onEnterKey', label: { en: 'On enter key' }, event: { value: '' }, default: true },
        { name: 'characterAccept', label: { en: 'On character accepted' }, event: { value: '' }, default: true },
        { name: 'characterReject', label: { en: 'On character rejected' }, event: { value: '' }, default: true },
        { name: 'maskComplete', label: { en: 'On mask completed' }, event: { value: '' }, default: true },
    ],
    properties: {
        placeholderColor: {
            label: {
                en: 'Placeholder color',
            },
            type: 'Color',
            options: {
                nullable: true,
            },
            bindable: true,
            responsive: true,
            states: true,
            defaultValue: '#000000ad',
            hidden: content => content.advancedPlaceholder,
            /* wwEditor:start */
            bindingValidation: {
                cssSupports: 'color',
                type: 'string',
                tooltip: 'A string that represents a color code: `"rebeccapurple" | "#00ff00" | "rgb(214, 122, 127)"`',
            },
            /* wwEditor:end */
        },
        advancedPlaceholder: {
            label: 'Advanced placeholder',
            type: 'OnOff',
            defaultValue: false,
        },
        forceAnimation: {
            label: { en: 'Force animation' },
            type: 'OnOff',
            defaultValue: false,
            hidden: content => !content.advancedPlaceholder,
        },
        animationTrigger: {
            label: { en: 'Trigger on' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'focus', label: { en: 'Focus' } },
                    { value: 'input', label: { en: 'Input' } },
                ],
            },
            responsive: true,
            defaultValue: 'input',
            hidden: content => !content.advancedPlaceholder,
        },
        placeholderPosition: {
            label: { en: 'Active position' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'inside', label: { en: 'Inside' } },
                    { value: 'outside', label: { en: 'Outside' } },
                ],
            },
            responsive: true,
            defaultValue: 'outside',
            hidden: content => !content.advancedPlaceholder,
        },
        placeholderScaling: {
            label: { en: 'Active size' },
            type: 'Number',
            options: { min: 0, max: 1, step: 0.1 },
            responsive: true,
            defaultValue: 0.8,
            hidden: content => !content.advancedPlaceholder,
        },
        positioningAjustment: {
            type: 'Length',
            label: {
                en: 'Active margin',
            },
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 0, max: 500 }],
            },
            responsive: true,
            defaultValue: '0px',
            hidden: content => !content.advancedPlaceholder,
        },
        transition: {
            type: 'Length',
            label: {
                en: 'Transition',
            },
            options: {
                unitChoices: [{ value: 'ms', label: 'ms', min: 0, max: 2000 }],
            },
            responsive: true,
            defaultValue: '400ms',
            hidden: content => !content.advancedPlaceholder,
        },
        timingFunction: {
            label: { en: 'Timing function' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'cubic-bezier(0, 1.08, 0.76, 1)', label: { en: 'auto' } },
                    { value: 'ease', label: { en: 'ease' } },
                    { value: 'ease-in', label: { en: 'ease-in' } },
                    { value: 'ease-out', label: { en: 'ease-out' } },
                    { value: 'ease-in-out', label: { en: 'ease-in-out' } },
                    { value: 'linear', label: { en: 'linear' } },
                ],
            },
            defaultValue: 'cubic-bezier(0, 1.08, 0.76, 1)',
            hidden: content => !content.advancedPlaceholder,
        },
        value: {
            label: {
                en: 'Init value',
            },
            type: 'Text',
            section: 'settings',
            bindable: true,
            defaultValue: '',
            /* wwEditor:start */
            bindingValidation: {
                validations: [
                    {
                        type: 'string',
                    },
                    {
                        type: 'number',
                    },
                ],
                tooltip: 'A string or a number depending on the type of input chosen: `42`, `"My message"`',
            },
            /* wwEditor:end */
        },
        readonly: {
            label: { en: 'Read only', fr: 'Lecture seule' },
            type: 'OnOff',
            section: 'settings',
            bindable: true,
            defaultValue: false,
            hidden: (content, sidePanelContent, boundProps, wwProps) => !!(wwProps && wwProps.readonly !== undefined),
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if the input is in readonly: `true | false`',
            },
            /* wwEditor:end */
        },
        required: {
            label: { en: 'Required', fr: 'Requis' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if the input is required: `true | false`',
            },
            /* wwEditor:end */
        },
        placeholder: {
            label: { en: 'Placeholder', fr: 'Placeholder' },
            type: 'Text',
            options: { placeholder: 'Type text' },
            section: 'settings',
            multiLang: true,
            bindable: true,
            defaultValue: {},
            /* wwEditor:start */
            bindingValidation: {
                validations: [
                    {
                        type: 'string',
                    },
                    {
                        type: 'number',
                    },
                ],
                tooltip: 'A string or a number depending on the type of input chosen: `42`, `"My placeholder"`',
            },
            /* wwEditor:end */
        },
        rows: {
            label: { en: 'Rows', fr: 'Rows' },
            type: 'Number',
            options: { min: 1, max: 25 },
            section: 'settings',
            hidden: content => content.type !== 'textarea',
            defaultValue: 4,
        },
        resize: {
            label: { en: 'Resize', fr: 'Resize' },
            type: 'OnOff',
            hidden: content => content.type !== 'textarea',
            defaultValue: false,
        },
        min: {
            label: { en: 'Min number', fr: 'Min number' },
            type: 'Number',
            options: { min: 0, max: 100 },
            section: 'settings',
            hidden: content => content.type !== 'number',
            defaultValue: '0',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'number',
                tooltip: 'A number that defines the minimum value: `50`',
            },
            /* wwEditor:end */
        },
        max: {
            label: { en: 'Max number', fr: 'Max number' },
            type: 'Number',
            options: { min: 0, max: 10000 },
            section: 'settings',
            hidden: content => content.type !== 'number',
            defaultValue: '10000',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'number',
                tooltip: 'A number that defines the maximum value: `500`',
            },
            /* wwEditor:end */
        },
        hideArrows: {
            label: { en: 'Hide arrows', fr: 'Masquer les flèches' },
            type: 'OnOff',
            section: 'settings',
            hidden: content => content.type !== 'number',
            defaultValue: false,
        },
        debounce: {
            label: { en: 'Debounce' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
        },
        debounceDelay: {
            type: 'Length',
            label: {
                en: 'Delay',
            },
            options: {
                unitChoices: [{ value: 'ms', label: 'ms', min: 1, max: 5000 }],
            },
            section: 'settings',
            defaultValue: '500ms',
            hidden: content => !content.debounce,
        },
        placeholderElement: {
            hidden: true,
            defaultValue: null,
        },
        ...maskProperties,
    },
};
