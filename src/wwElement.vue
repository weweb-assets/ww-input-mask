<template>
    <div class="ww-input-basic" :class="{ editing: isEditing }">
        <input
            ref="input"
            v-bind="$attrs"
            :key="componentKey"
            :value="value"
            v-imask="maskOptions"
            class="ww-input-basic__input"
            :class="{ editing: isEditing }"
            type="text"
            :name="wwElementState.name"
            :readonly="content.readonly"
            :required="content.required"
            :placeholder="isAdvancedPlaceholder ? '' : wwLang.getText(content.placeholder)"
            :style="style"
            @blur="isFocused = false"
            @focus="isFocused = true"
            @input="onInputChange"
            @accept="handleDebounce"
            @complete="handleDebounce"
        />
        <div
            v-if="isAdvancedPlaceholder"
            ref="placeholder"
            class="ww-input-basic__placeholder"
            :class="{ editing: isEditing }"
            :style="placeholderSyle"
            @click="focusInput"
        >
            <wwElement
                style="pointerevents: none"
                v-bind="content.placeholderElement"
                :states="value.length ? ['active'] : []"
                :ww-props="{ text: wwLang.getText(content.placeholder) || 'Placeholder' }"
            ></wwElement>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { IMaskDirective } from 'vue-imask';

export default {
    inheritAttrs: false,
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwFrontState: { type: Object, required: true },
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        uid: { type: String, required: true },
        wwElementState: { type: Object, required: true },
    },
    emits: ['trigger-event', 'add-state', 'remove-state', 'update:content:effect'],
    directives: {
        imask: IMaskDirective,
    },
    setup(props) {
        const type = computed(() => {
            if (Object.keys(props.wwElementState.props).includes('type')) {
                return props.wwElementState.props.type;
            }
            return props.content.type;
        });

        const { value: variableValue, setValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'value',
            type: computed(() => (['decimal', 'number'].includes(type.value) ? 'number' : 'string')),
            defaultValue: props.content.value === undefined ? '' : props.content.value,
        });

        const inputRef = ref('input');

        return { variableValue, setValue, type, inputRef };
    },
    data() {
        return {
            paddingLeft: '0px',
            placeholderPosition: {
                top: '0px',
                left: '0px',
            },
            isFocused: false,
            noTransition: false,
            isMounted: false,
            isDebouncing: false,
            componentKey: 0,
            lastEvent: null,
            lastKey: '',
            prevValue: '',
        };
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        value() {
            return this.variableValue;
        },
        delay() {
            return wwLib.wwUtils.getLengthUnit(this.content.debounceDelay)[0];
        },
        placeholderSyle() {
            const transition = `all ${this.noTransition ? '0ms' : this.content.transition} ${
                this.content.timingFunction
            }`;

            const animatedPosition =
                this.content.placeholderPosition === 'outside'
                    ? {
                          top: '-' + this.content.positioningAjustment,
                          left: this.placeholderPosition.left,
                          transform: `translate3d(0, -100%, 0) scale(${this.content.placeholderScaling})`,
                          transformOrigin: 'left',
                          transition,
                      }
                    : {
                          top: this.content.positioningAjustment,
                          left: this.placeholderPosition.left,
                          transform: `translate3d(0, 0%, 0) scale(${this.content.placeholderScaling})`,
                          transformOrigin: 'left',
                          transition,
                      };

            if (this.content.forceAnimation && this.isEditing) return animatedPosition;
            if (this.value && this.value !== 0) return animatedPosition;
            if (this.isDebouncing) return animatedPosition;
            if (this.content.animationTrigger === 'focus' && this.isFocused) return animatedPosition;

            return {
                top: this.placeholderPosition.top,
                left: this.placeholderPosition.left,
                userSelect: 'none',
                transform: 'translate3d(0, 0%, 0) scale(1)',
                transformOrigin: 'left',
                transition,
            };
        },
        style() {
            return {
                ...wwLib.getTextStyleFromContent(this.content),
                '--placeholder-color': this.content.placeholderColor,
            };
        },
        inputType() {
            if (!this.content) return 'text';
            if (this.content.type === 'password') {
                return this.content.displayPassword ? 'text' : 'password';
            }
            return this.content.type;
        },
        isReadonly() {
            /* wwEditor:start */
            if (this.wwEditorState.isSelected) {
                return this.wwElementState.states.includes('readonly');
            }
            /* wwEditor:end */
            return this.wwElementState.props.readonly === undefined
                ? this.content.readonly
                : this.wwElementState.props.readonly;
        },
        isAdvancedPlaceholder() {
            return this.content.advancedPlaceholder && !this.isReadonly;
        },
        maskOptions() {
            return {
                mask: this.content.pattern,
                lazy: !this.content.placeholderVisible,
                placeholderChar: this.content.placeholderChar,
            };
        },
    },
    watch: {
        'content.value'(newValue) {
            if (newValue === this.value) return;
            this.setValue(newValue);
            this.$emit('trigger-event', { name: 'initValueChange', event: { value: newValue } });
        },
        isReadonly: {
            immediate: true,
            handler(value) {
                if (value) {
                    this.$emit('add-state', 'readonly');
                } else {
                    this.$emit('remove-state', 'readonly');
                }

                this.$nextTick(() => {
                    this.handleObserver();
                });
            },
        },
        'content.type'() {
            this.$nextTick(() => {
                this.handleObserver();
            });
        },
        inputRef() {
            this.$nextTick(() => {
                this.handleObserver();
            });
        },
        'content.advancedPlaceholder': {
            async handler(value) {
                /* wwEditor:start */
                if (this.wwEditorState.isACopy) {
                    return;
                }

                let placeholderElement = null;

                if (value) {
                    placeholderElement = await wwLib.createElement(
                        'ww-text',
                        {},
                        { name: 'Placeholder' },
                        this.wwFrontState.sectionId
                    );
                }

                this.$emit('update:content:effect', { placeholderElement });
                /* wwEditor:end */

                this.$nextTick(() => {
                    this.handleObserver();
                });
            },
        },
    },
    beforeUnmount() {
        if (this.resizeObserverContent) this.resizeObserverContent.disconnect();
        if (this.resizeObserverBorder) this.resizeObserverBorder.disconnect();

        wwLib.getFrontDocument().removeEventListener('keyup', this.onKeyEnter);
    },
    mounted() {
        this.isMounted = true;
        this.handleObserver();
        wwLib.getFrontDocument().addEventListener('keyup', this.onKeyEnter);
    },
    methods: {
        onInputChange(event) {
            const newValue = event.target.value;
            if (this.prevValue === newValue) {
                this.onCharacterReject(event);
            } else {
                this.prevValue = newValue;
                this.handleDebounce(event);
            }
        },
        handleDebounce(event) {
            const newValue = event.target.value;
            this.setValue(newValue);

            if (this.content.debounce) {
                this.isDebouncing = true;
                if (this.debounce) {
                    clearTimeout(this.debounce);
                }
                this.debounce = setTimeout(() => {
                    this.dispatchInputEvents(newValue, event);
                    this.isDebouncing = false;
                }, this.delay);
            } else {
                this.dispatchInputEvents(newValue, event);
            }
        },
        onCharacterReject(event) {
            if (event.key === 'Enter') return;
            this.lastKey = event.key;

            setTimeout(() => {
                if (!this.lastEvent) {
                    this.$emit('trigger-event', { name: 'characterReject', event: { value: this.value } });
                }

                this.lastEvent = null;
            }, 0);
        },
        dispatchInputEvents(value, event) {
            const type = event.type;
            this.$nextTick(() => {
                if (type === 'complete') {
                    this.$emit('trigger-event', {
                        name: 'maskComplete',
                        event: { domEvent: event, value: this.prevValue },
                    });
                } else if (type === 'accept') {
                    this.$emit('trigger-event', {
                        name: 'characterAccept',
                        event: { domEvent: event, value: this.prevValue },
                    });
                    this.$emit('trigger-event', { name: 'change', event: { domEvent: event, value } });
                }
            });
        },
        onKeyEnter(event) {
            if (event.key === 'Enter' && this.isFocused)
                this.$emit('trigger-event', { name: 'onEnterKey', event: { value: this.value } });
        },
        handleObserver() {
            if (!this.isMounted) return;
            if (this.resizeObserverContent) this.resizeObserverContent.disconnect();
            if (this.resizeObserverBorder) this.resizeObserverBorder.disconnect();
            const el = this.$refs.input;
            if (!el) return;

            // We need both Observers because one of them works outside a ww-modal, while the other in a ww-modal
            this.resizeObserverContent = new ResizeObserver(() => {
                this.updatePosition(el);
            });
            this.resizeObserverBorder = new ResizeObserver(() => {
                this.updatePosition(el);
            });
            this.resizeObserverContent.observe(el, { box: 'content-box' });
            this.resizeObserverBorder.observe(el, { box: 'border-box' });
        },
        updatePosition(el) {
            const placeholder = this.$refs.placeholder;
            if (!el || !placeholder || this.isReadonly) return;
            this.noTransition = true;

            const pos = el.clientHeight / 2 - placeholder.clientHeight / 2;
            this.placeholderPosition.top = pos + 'px';
            this.placeholderPosition.left = el.style.paddingLeft;

            setTimeout(() => {
                this.noTransition = false;
            }, wwLib.wwUtils.getLengthUnit(this.content.transition)[0]);
        },
        // /!\ Use externally
        focusInput() {
            if (this.isReadonly) return;
            const el = this.$refs.input;
            if (el) el.focus();
        },
    },
};
</script>

<style lang="scss" scoped>
.ww-input-basic {
    width: 100%;
    height: 100%;

    &__input {
        width: 100%;
        height: 100%;
        outline: none;
        border: none;
        background-color: inherit;
        border-radius: inherit;

        &::placeholder {
            color: var(--placeholder-color, #000000ad);
            font-family: inherit;
            font-size: inherit;
            font-weight: inherit;
            line-height: inherit;
            text-decoration: inherit;
            letter-spacing: inherit;
            word-spacing: inherit;
        }

        &.date-placeholder {
            color: var(--placeholder-color, #000000ad);
            font-family: inherit;
            font-size: inherit;
            font-weight: inherit;
            line-height: inherit;
            text-decoration: inherit;
            letter-spacing: inherit;
            word-spacing: inherit;
        }

        /* wwEditor:start */
        &.editing {
            pointer-events: none;
        }
        /* wwEditor:end */
    }

    &__placeholder {
        position: absolute;
        cursor: text;
        height: fit-content;

        /* wwEditor:start */
        &.editing {
            cursor: initial;
        }
        /* wwEditor:end */
    }

    /* wwEditor:start */
    &.editing {
        pointer-events: none;
    }
    /* wwEditor:end */
}
</style>
