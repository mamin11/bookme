<template>
    <div class="h-screen w-screen flex flex-col justify-center content-center flex-wrap">
        <p class="font-sans text-red-500 error-text">404</p>
        <span class="text-red-500 font-thin text-center">oops there was a problem</span>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    * {
    font-family: "Whitney SSm A", "Whitney SSm B", "Helvetica Neue", Helvetica, Arial, Sans-Serif;
    }

    .error-text {
        font-size: 130px;
    }

    @media (min-width: 768px) {
        .error-text {
        font-size: 220px;
        }
    }
</style>