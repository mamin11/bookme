<template>
    <v-row>
        <v-col cols="9" class="mx-auto">
            <v-row>
                    <v-col cols="11" class="my-auto mx-auto">
                            <v-text-field
                            class="my-5"
                                label="add comment"
                                solo
                                v-model="comment"
                                v-on:keyup.enter="submitComment"
                            ></v-text-field>
                    </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data() {
        return {
            comment: ''
        }
    },
    methods: {
        submitComment() {
            if(this.comment === ''){
                alert('add a comment')
            } else {
                console.log('comment added');
            }
        }
    }
}
</script>

<style>

</style>