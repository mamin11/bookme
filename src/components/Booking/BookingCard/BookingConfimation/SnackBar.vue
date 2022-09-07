<template>
    <v-snackbar v-model="showSnackbar" :color="colour">
        {{ text }}

        <template v-slot:action="{ attrs }">
            <v-btn
            text
            v-bind="attrs"
            @click="close"
            >
            Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import {Messages} from "@/Util/contants";

export default {
    props: {
        snackbar: Boolean,
        text: String,
        messageType: Messages
    },
    data() {
        return {
        }
    },
    computed: {
        showSnackbar: {
            get() {
                return this.snackbar
            },
            set() {
            }
        },
        colour() {
          return this.messageType === Messages.ERROR ? 'red' : 'green'
      }
    },

  methods: {
    close() {
        this.$emit('updateSnackbar', false)
      // this.$destroy();
      // this.$el.parentNode.removeChild(this.$el);
    },
  }

}
</script>

<style>

</style>