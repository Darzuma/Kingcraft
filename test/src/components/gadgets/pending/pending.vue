<template>
    <div class="pending_da523dw">
        <div class="content">
            <slot/>
        </div>
        <div class="lds-ripple"><div></div><div></div></div>
    </div>
</template>

<script>
export default {
name: "pending"
}
</script>

<style scoped lang="scss">
div.pending_da523dw{
    position: relative;
    width: 80px;
    height: 80px;
    display: flex;align-items: center;justify-content: center;
    div.content{
        width: 100%;height: 100%;
        position: absolute;left: 0;top: 0;
        display: flex;justify-content: center;align-items: center;
    }
    .lds-ripple {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 100%;
    }
    .lds-ripple div {
        position: absolute;
        border: 4px solid #fffae2;
        opacity: 1;
        border-radius: 50%;
        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
    .lds-ripple div:nth-child(2) {
        animation-delay: -0.5s;
    }
    @keyframes lds-ripple {
        0% {
            top: 40px;
            left: 40px;
            width: 0;
            height: 0;
            opacity: 0;
        }
        4.9% {
            top: 40px;
            left: 40px;
            width: 0;
            height: 0;
            opacity: 0;
        }
        5% {
            top: 40px;
            left: 40px;
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            top: 0;
            left: 0;
            width: 80px;
            height: 80px;
            opacity: 0;
        }
    }
}
</style>