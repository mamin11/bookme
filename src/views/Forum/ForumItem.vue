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
                        <v-list-item-icon  class="cursor-pointer mx-auto" >
                            <v-icon :color="discussion.clickedUp ? 'blue' : ''">mdi-arrow-up-bold</v-icon>
                        </v-list-item-icon>
                        </v-list-item>
                        <v-list-item>
                            <span class="font-light text-sm text-center mx-auto">{{discussion.votes}}</span>
                        </v-list-item>
                        
                        <v-list-item >
                        <v-list-item-icon class="cursor-pointer mx-auto" >
                            <v-icon :color="discussion.clickedDown ? 'red' : ''">mdi-arrow-down-bold</v-icon>
                        </v-list-item-icon>
                        </v-list-item>
                    </v-list>
                </v-col>
                    <v-col sm="11" cols="9" class="my-auto mx-auto cursor-pointer">
                            <span class="text-center p-1 text-black">{{discussion.text}}</span>
                    </v-col>
            </v-row>
        </v-card>
        </v-col>
    </v-row>

    <v-row>
        <comment-field/>
    </v-row>

    <v-row>
        <comments/>
    </v-row>

</v-container>
</template>

<script>
import CommentField from './CommentField.vue'
import Comments from './Comments..vue'
export default {
    components: {CommentField, Comments},
    data() {
        return {
        }
    },
    computed: {
        discussion() {
            let data = this.$store.getters.getForumDiscussions
            let val = data.find(item => item.id == this.$route.params.id)
            return val
        }
    }

}
</script>

<style>

</style>