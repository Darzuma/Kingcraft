<template>
    <div class="talentBox">
        <div class="pointVal">0</div>
        <div class="btnGroup">
            <div class="lft"/>
            <div class="mid"/>
            <div class="rgt"/>
        </div>
        <div class="result">0%</div>
    </div>
</template>

<script>
export default {
name: "talentBox"
}
</script>

<style scoped lang="scss">
div.talentBox{
    position: absolute;
    width: 165px;height: 100px;
    div.pointVal{
        color: #6dff6d;
        text-align: center;
        height: 24px;line-height: 27px;
    }
    div.btnGroup{
        height: 25px;
        display: flex;justify-content: center;
        div.lft{
            width: 30px;height: 25px;
            background: url("@/assets/img/btn_lft.png");
            background-size: 30px 25px;
            &:active{
                background: url("@/assets/img/btn_lft2.png");
                background-size: 30px 25px;
            }
        }
        div.mid{
            width: 30px;height: 25px;
            background: url("@/assets/img/btn_mid.png");
            background-size: 30px 25px;
            &:active{
                background: url("@/assets/img/btn_mid2.png");
                background-size: 30px 25px;
            }
        }
        div.rgt{
            width: 30px;height: 25px;
            background: url("@/assets/img/btn_rgt.png");
            background-size: 30px 25px;
            &:active{
                background: url("@/assets/img/btn_rgt2.png");
                background-size: 30px 25px;
            }
        }
    }
    div.result{
        color: rgba(255,255,255,.6);
        margin-top: 18px;padding-left: 10px;
        height: 30px;line-height: 30px;text-align: center;
    }
}
</style>