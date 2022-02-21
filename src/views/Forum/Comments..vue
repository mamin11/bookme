<template>
<v-row>
    <v-col cols="11" sm="9" class="mx-auto">
        <h1 class="my-2">Comments: </h1>
        <v-list two-line>
            <v-list-item v-for="(comment, i) in comments" :key="i">
                    <v-list-item-avatar>
                        <v-img :src="comment.avatar"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <span class="text-sm font-light">{{comment.subtitle}}</span>
                    </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-col>
</v-row>
</template>

<script>
export default {
data: () => ({
        comments: [
            {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            title: 'Brunch this weekend?',
            subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
            },
            {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
            subtitle: `Wish I could come, but I'm out of town this weekend.`,
            },
            {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            title: 'Oui oui',
            subtitle: 'Do you have Paris recommendations? Have you ever been?',
            },
            {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
            title: 'Birthday gift',
            subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
            },
            {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
            title: 'Recipe to try',
            subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
            },
            {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            title: 'Brunch this weekend?',
            subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
            },
            {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
            subtitle: `Wish I could come, but I'm out of town this weekend.`,
            },
            {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            title: 'Oui oui',
            subtitle: 'Do you have Paris recommendations? Have you ever been?',
            },
            {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
            title: 'Birthday gift',
            subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
            },
            {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
            title: 'Recipe to try',
            subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
            },
        ],
    }),
}
</script>

<style>

</style>