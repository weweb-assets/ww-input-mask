<template>
    <div class="ww-input-mask" :class="{ editing: isEditing }"></div>
</template>

<script>
import { computed, ref } from 'vue';

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
    setup() {},
    data() {
        return {};
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
    },
    watch: {},
    beforeUnmount() {},
    mounted() {},
    methods: {},
};
</script>

<style lang="scss" scoped>
.ww-input-basic {
}
</style>
