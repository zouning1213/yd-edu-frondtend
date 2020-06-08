<template>
    <li class="step-list">
        <div class="round">{{steps}}</div>
        <h3>{{title}}</h3>
    </li>
</template>

<script>
    export default {
        name:"yd-step",
        props:['title','steps'],
        data() {
            return {}
        }
    }
</script>

<style scoped>

</style>