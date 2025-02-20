---
name: ww-input-mask
description: A customizable masked input component for form fields with pattern-based validation and formatting
keywords: input, mask, form, pattern, validation, formatting
---

#### ww-input-mask

A specialized input component that enforces formatting patterns on user input. It inherits from ww-text and provides advanced masking capabilities using the iMask library.

Properties:
- pattern (string) - The mask pattern to apply (e.g. '{#}000[aaa]/NIC-'), default: '{8}000000'
- placeholderVisible (boolean) - Whether to show mask placeholder characters, default: false
- placeholderChar (string) - Character to use as placeholder when visible, default: '_'
- value (string|number) - Initial value of the input, default: ''
- readonly (boolean) - Makes the input read-only, default: false
- required (boolean) - Makes the input required, default: true
- placeholder (string|object) - Placeholder text with optional multi-language support, default: {}
- placeholderColor (string) - Color of the placeholder text, default: '#000000ad'
- advancedPlaceholder (boolean) - Enables advanced placeholder animations, default: false
- forceAnimation (boolean) - Forces placeholder animation in editor, default: false
- animationTrigger (string) - When to trigger placeholder animation ('focus'|'input'), default: 'input'
- placeholderPosition (string) - Position of active placeholder ('inside'|'outside'), default: 'outside'
- placeholderScaling (number) - Scale factor for active placeholder (0-1), default: 0.8
- positioningAjustment (string) - Margin adjustment for active placeholder, default: '0px'
- transition (string) - Animation transition duration, default: '400ms'
- timingFunction (string) - Animation timing function, default: 'cubic-bezier(0, 1.08, 0.76, 1)'
- debounce (boolean) - Enable input debouncing, default: false
- debounceDelay (string) - Debounce delay duration, default: '500ms'
- fieldName: string - Input name used in form fields key.
- customValidation: boolean - Enable custom validation. Default: false
- validation: Formula - Custom validation formula. Requires customValidation to be true!

Events:
- change - Triggered when input value changes
- initValueChange - Triggered when initial value is set
- onEnterKey - Triggered when Enter key is pressed
- characterAccept - Triggered when a character is accepted by the mask
- characterReject - Triggered when a character is rejected by the mask
- maskComplete - Triggered when the mask pattern is completely filled

Variables:
- value (string|number) - Current masked value
- raw value (string|number) - Unmasked value

Example:
<elements>
{"uid":0,"tag":"ww-input-mask","name":"Phone Input","states":[{"id":"_wwHover","label":"hover"}],"props":{"default":{"max":"10000","min":"0","rows":4,"value":"","resize":false,"pattern":"{+1} (000) 000-0000","debounce":false,"readonly":false,"required":true,"fieldName":"phone","hideArrows":false,"transition":"400ms","validation":{"type":"js","wwJavascript":"return context.local.data?.['form']?.['fields']?.['phone']?.['value']?.length === 18"},"placeholder":{"en":"Enter phone number"},"debounceDelay":"500ms","forceAnimation":false,"timingFunction":"cubic-bezier(0, 1.08, 0.76, 1)","placeholderChar":"_","animationTrigger":"input","customValidation":true,"placeholderColor":"#000000ad","placeholderScaling":0.8,"placeholderVisible":true,"advancedPlaceholder":false,"placeholderPosition":"outside","positioningAjustment":"0px"}},"styles":{"default":{"width":"100%","border":"1px solid #E5E7EB","padding":"8px 12px","transition":"all 0.2s ease","borderRadius":"6px"},"_wwHover_default":{"borderColor":"#3B82F6"}}}
</elements>
