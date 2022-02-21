<template>
<v-container>
    <h1 class="text-center font-light text-lg md:text-2xl p-3">ASK A QUESTION</h1>

    <v-row>
        <v-col cols="12">
            <v-row>
                <v-col
                    class="d-flex mx-auto"
                    cols="12"
                    xs="12"
                    sm="12"
                    md="9"
                >
                    <v-textarea
                    label="Write here"
                    auto-grow
                    outlined
                    rows="3"
                    class="border-red-500"
                    row-height="25"
                    v-model="post"
                    required
                    ></v-textarea>
                <v-btn
                depressed
                color="primary"
                class="mt-4 mx-4"
                @click="handleAddPost"
                >
                Post
                </v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>

    <v-row>
        <v-col cols="12">
            <question-post v-for="discussion in discussions" 
            :key="discussion.id" 
            :discussion="discussion"
            @handleUpvote="handleUpvote"
            @handleDownvote="handleDownvote"
            ></question-post>
        </v-col>
    </v-row>

</v-container>
</template>

<script>
import QuestionPost from './QuestionPost.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'Forum',
    components: {QuestionPost},
    data() {
        return {
            post: '',
        }
    },
    computed: {
        ...mapGetters ({
            discussions: 'getForumDiscussions'
        }),
    },
    methods: {
        handleUpvote(id) {
            // console.log('up --- event captured');
            this.discussions.map((item) => {
                if(item.id === id) {
                    item.votes++
                    item.clickedUp = true
                    item.clickedDown = false
                }
            })
        },
        handleDownvote(id) {
            // console.log('down --- event captured', id);
            this.discussions.map((item) => {
                if(item.id === id) {
                    item.votes--
                    item.clickedDown = true
                    item.clickedUp = false
                }
            })
        },
        handleAddPost() {
            if(this.post !== '') {
                let nextD = this.discussions[this.discussions.length-1].id + 1
                let payload = {id: nextD, votes: 0, text: this.post}
                this.$store.dispatch('addForumDiscussion', payload)
            }
            this.post = ''
        }
    }
}
</script>

<style>

</style>