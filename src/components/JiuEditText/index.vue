<template>
  <div class="jiu-edit-text">
    <template v-if="isEdit">
      <input
          v-if="type==='input'"
          ref="editor"
          class="jiu-edit-text--edit"
          type="text"
          :placeholder="placeholder"
          :value="showValue"
          @change="handleEditTextChange"
          @blur="handleBlur">
      <textarea
          v-if="type==='textarea'"
          ref="editor"
          rows="1"
          class="jiu-edit-text--edit"
          :placeholder="placeholder"
          :value="showValue"
          @keyup="handleKeyup"
          @change="handleEditTextChange"
          @blur="handleBlur">
      </textarea>
    </template>
    <template v-else>
      <span v-if="value" class="jiu-edit-text--show" @click="handleTextClick">{{ showValue }}</span>
      <span v-else class="jiu-edit-text--tip" @click="handleTextClick">{{ tip }}</span>
    </template>

  </div>
</template>

<script>
export default {
  name: "JiuEditText",
  props: {
    type: {
      type: String,
      default: "input"
    },
    placeholder: String,
    tip: {
      type: String,
      default: "点我试试"
    },
    value: String
  },
  data() {
    return {
      isEdit: false,
      showValue: ""
    }
  },
  created() {
    this.showValue = this.value
  },
  methods: {
    handleKeyup(e) {
      e.target.style.height = e.target.scrollHeight + 'px';
    },
    handleEditTextChange(e) {
      this.$emit("change", e.target.value)
    },
    handleTextClick() {
      this.isEdit = true
      this.$nextTick(() => {
        this.$refs.editor.focus()
      })
    },
    handleBlur() {
      this.isEdit = false
    }
  }
}
</script>

<style scoped>
.jiu-edit-text {

}

.jiu-edit-text--edit {
  border: none;
  outline: none;
}

.jiu-edit-text--tip {
  color: #999;
  cursor: pointer;
}
</style>
