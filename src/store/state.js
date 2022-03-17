import moment from "moment"
export default {
    questions: [
        {
            title: 'Who was the first president of Kenya',
            options: [
                {
                    text: 'Uhuru Kenyatta',
                    isCorrect: false
                },
                {
                    text: 'Mwai Kibaki',
                    isCorrect: false
                },
                {
                    text: 'Daniel Arap Moi',
                    isCorrect: false
                },
                {
                    text: 'Jomo Kenyatta',
                    isCorrect: true
                },
            ]
        },
        {
            title: 'Which one of the following groups of communities belong to the Coastal Bantus',
            options: [
                {
                    text: 'Taita, Pokomo, Mijikenda',
                    isCorrect: false
                },
                {
                    text: 'Abakuria, Abagusii, Abaluhya',
                    isCorrect: false
                },
                {
                    text: 'Akamba, Aembu, Amer',
                    isCorrect: false
                },
                {
                    text: 'Pokomo, Agikuyu, Abakuria',
                    isCorrect: true
                },
            ]
        },
        {
            title: 'The Ruwenzori mountains were formed as a result of',
            options: [
                {
                    text: 'faulting',
                    isCorrect: false
                },
                {
                    text: 'folding',
                    isCorrect: false
                },
                {
                    text: 'erosion',
                    isCorrect: false
                },
                {
                    text: 'volcanicity',
                    isCorrect: true
                },
            ]
        },
                        {
            title: 'Which one of the following groups of communities belong to the Coastal Bantus',
            options: [
                {
                    text: 'Taita, Pokomo, Mijikenda',
                    isCorrect: false
                },
                {
                    text: 'Abakuria, Abagusii, Abaluhya',
                    isCorrect: false
                },
                {
                    text: 'Akamba, Aembu, Amer',
                    isCorrect: false
                },
                {
                    text: 'Pokomo, Agikuyu, Abakuria',
                    isCorrect: true
                },
            ]
        },
    ],
    forumDiscussion: [
        {id: 1, clickedUp: false, clickedDown: false, votes: 200, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio cupiditate aspernatur est recusandae atque voluptas. Rerum aspernatur modi voluptate rem.'},
        {id: 2, clickedUp: false, clickedDown: false, votes: 134, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio cupiditate aspernatur est recusandae atque voluptas. Rerum aspernatur modi voluptate rem.'},
        {id: 3, clickedUp: true, clickedDown: false, votes: 183, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio cupiditate aspernatur est recusandae atque voluptas. Rerum aspernatur modi voluptate rem.'},
        {id: 4, clickedUp: false, clickedDown: false, votes: 66, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio cupiditate aspernatur est recusandae atque voluptas. Rerum aspernatur modi voluptate rem.'},
    ],
    skippedQuestions: [],
    answerSheet: [],
    questionIndex: 0,
    previousQuestion: null,
    totalMarksScored: 0,
    optionsNext: null,
    optionsPrevious: null,
    layoutState: false,
    hideNav: false,
    loading: false,
    registerFormErrors: {},
    loginFormErrors: {},
    registerFormResponse: {},

    userToken: null,
    user: null,

    forgotPasswordResponse: null,
    forgotPasswordErrors: null,

    resetPasswordResponse: null,
    resetPasswordErrors: null,

    papers: [],
    selected_paper: null,
    papers_subjects: [],
    papers_years: [],

    users: [],
    editingUser: null,

    bookingCreateData: {
        bookingDetails: {
            service: [],
            staff: {},
            date: moment().format("YYYY-MM-DD"),
            time: moment().format("HH:mm")
        },
        customer: {}
    },

}