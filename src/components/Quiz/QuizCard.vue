<template>
        <div  class="hidden col-md-4 xl:flex h-screen items-center my-auto filter blur-sm animate__animated ">
    
        <v-skeleton-loader
        v-if="loading"
        class="w-full max-w-xl p-5 relative mx-auto  rounded-xl shadow-lg  bg-white "
        v-bind="attrs"
        type=" table-heading, divider, list-item-two-line,list-item-three-line, list-item-three-line, list-item-three-line"
        ></v-skeleton-loader>

            <div v-else class="w-full max-w-xl p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white  ">

                    <div class="text-center p-2 flex-auto justify-center align-middle">
                        <div class="flex justify-between">
                            <label for="toogleButton-left" class="flex items-center">
                                <div class="px-2">auto next</div>
                                <!-- toggle -->
                                <div class="relative">
                                <input id="toogleButton-left" disabled type="checkbox" class="hidden" />
                                <!-- path -->
                                <div
                                    class="toggle-path bg-gray-200 w-9 h-5 rounded-full shadow-inner"
                                ></div>
                                <!-- crcle -->
                                <div
                                    class="toggle-circle absolute w-3.5 h-3.5 bg-white rounded-full shadow inset-y-0 left-0"
                                ></div>
                                </div>
                            </label>
                            <div>00:00</div>
                        </div>
                        <h2 class="text-xl font-bold py-4 ">{{question.title}}? ({{questionIndex}}/{{questionsLength}} )</h2>

                            <ul class="flex flex-col bg-white p-2">
                                <li v-for="(option, i) in options" :key="i" class="border-gray-400 flex flex-row mb-2" >
                                    <div class="select-none rounded-md flex flex-1 items-center p-2  
                                    transition duration-200 ease-in-out transform" >
                                    <div class="flex flex-row flex-1 pl-1">
                                        <span class="pr-3">{{optionLetterList(i)}}:</span>
                                        <div class="font-small">{{option.text}}.</div>
                                    </div>
                                    </div>
                                </li>

                            </ul>

                        </div>
                </div>

        </div>
</template>

<script>
export default {
    name: 'QuizCard',
    props: [
        'questionIndex',
        'questionsLength',
        'question',
        'options',
        'loading'
    ],

    data(){
        return {
            attrs: {
            class: 'mb-6',
            boilerplate: true,
            elevation: 2,
            height: 470
            },
        }
    },

    methods: {
        optionLetterList(i) {
            //this function returns the letter representation of selected answer, eg if 
            //answer at index 0 is selected, it returns A
            switch (i) {
                case i = 0:
                    return 'A'
                case i = 1:
                    return 'B'
                case i = 2:
                    return 'C'
                case i = 3:
                    return 'D'
            
                default:
                    return i+1;
            }
        }
    }
}
</script>

<style>

</style>