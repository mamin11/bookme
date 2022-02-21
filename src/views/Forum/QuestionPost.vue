<template>
<v-container class="my-3">
    <v-row>
        <v-col cols="12" sm="9" class="mx-auto ">
        <v-card>
            <v-row>
                <v-col cols="1">
                    <v-list dense>
                        <v-list-item
                        >
                        <v-list-item-icon  class="cursor-pointer mx-auto" @click="handleUpvote(discussion.id)">
                            <v-icon :color="discussion.clickedUp ? 'blue' : ''">mdi-arrow-up-bold</v-icon>
                        </v-list-item-icon>
                        </v-list-item>
                        <v-list-item>
                            <span class="font-light text-sm text-center mx-auto">{{discussion.votes}}</span>
                        </v-list-item>
                        
                        <v-list-item >
                        <v-list-item-icon class="cursor-pointer mx-auto" @click="handleDownvote(discussion.id)">
                            <v-icon :color="discussion.clickedDown ? 'red' : ''">mdi-arrow-down-bold</v-icon>
                        </v-list-item-icon>
                        </v-list-item>
                    </v-list>
                </v-col>
                    <v-col sm="11" cols="9" class="my-auto mx-auto cursor-pointer">
                        <router-link :to="'/forum/'+discussion.id">
                            <span class="text-center p-1 text-black">{{discussion.text}}</span>
                        </router-link>
                    </v-col>
            </v-row>
        </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
    name: 'QuestionPost',
    props: ['discussion'],
    data () {
        return {

        }
    },
    methods: {
        handleUpvote(id) {
            // console.log('upvote clicked');
            this.$emit('handleUpvote', id)
        },
        handleDownvote(id) {
            // console.log('downvote clicked');
            this.$emit('handleDownvote', id)
        }
    }

}
</script>

<style>

</style>