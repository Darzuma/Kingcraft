<template>
    <modal title="Game Control" nudgeY="-100"
           v-model:valid="$store.user.showSetting"
           @close="close"
    >
        <div class="helps_dkwad163">
            <div class="section">
                <div class="info">
                    <div class="title">
                        Pan Gameview
                    </div>
                    <div class="detail" >
                        You can also use the mouse button to move the viewport.
                    </div>
                </div>
                <div class="sample">
                    <div class="row" style="align-items: end;padding-bottom: 8px">
                        <keyBtn name="W"/>
                    </div>
                    <div class="row">
                        <keyBtn name="A"/><keyBtn name="S"/><keyBtn name="D"/>
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="info">
                    <div class="title">
                        Zoom Viewport
                    </div>
                    <div class="detail">
                        Scroll the mouse wheel to zoom in and out.
                    </div>
                </div>
                <div class="sample">
                    <div class="mouse_scroll">
                        <div class="bg"></div>
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="info">
                    <div class="title">
                        Pause Game
                    </div>
                    <div class="detail">
                        Press "Esc" to toggle the pause state.
                    </div>
                </div>
                <div class="sample">
                    <div class="row" style="justify-content: start;align-items:end;padding-bottom: 8px">
                        <keyBtn name="Esc"/>
                    </div>
                    <div class="row">
                        <div class="spacebar">Spacebar</div>
                    </div>
                </div>
            </div>
            <div class="Notice">
                Shortcuts for game control are exclusively functional in battle ground.
            </div>
            <div class="btnBox_dawjd442">
                <div class="btn" @click="close">Confirm</div>
            </div>
        </div>
    </modal>
</template>

<script>
import keyBtn from '@/components/gadgets/keyBtn'
export default {
    name: "helps",
    components: { keyBtn },
    emits: [ 'close' ],
    methods:{
        close(){
            this.$emit('close')
            if(this.$route.name === 'tutorial' && this.$store.trainer.step === 5)
                this.$store.trainer.step += 1
            this.$store.user.showSetting = false
        },
    }
}
</script>

<style scoped lang="scss">
div.helps_dkwad163{
    div.section{
        width: 400px;
        height: 150px;
        border: 1px solid #73674f;border-radius: 1px;
        display: flex;justify-content: space-between;
        margin-bottom: 20px;
        div.info{
            width: 50%;padding: 15px 15px 10px 20px;
            div.title{
                color: #cab898;font-size: 22px;font-weight: bold;
            }
            div.detail{
                padding: 10px 0;
                text-align: justify;
                text-justify: inter-word;
                line-height: 1.4;
                color: #f2efe1;
            }
        }
        div.sample{
            width: 50%;
            div.row{
                height: 50%;
                display: flex;justify-content: center;
                div.keyBtn{
                    margin: 0 4px;
                }
            }
            div.mouse_scroll{
                height: 100%;
                display: flex;align-items: center;justify-content: center;
                div.bg{
                    background: url("@/assets/img/mouse_scroll.png");
                    background-size: 100% 100%;
                    width: 120px;
                    height: 105px;
                }
            }
            div.spacebar{
                color: black;
                width: 190px;
                height: 60px;
                background: url("@/assets/img/keyboard_spacebar.png");
                background-size: 100% 100%;
                font-size: 22px;text-align: center;line-height: 44px;
            }
        }
    }
    div.Notice{
        width: 400px;
        color: #3b94cc;
        line-height: 1.5;
    }
    div.btnBox_dawjd442{
        height: 100px;
        display: flex;align-items: center;justify-content: center;
        div.btn{
            color: #e5d3a0;
            font-size:18px;text-align: center;
            width: 182px;height: 36px;line-height: 34px;
            background: url("@/assets/英雄选择_按钮.jpg");
            background-size: cover;
            letter-spacing: 2px;
            &:active{
                background: url("@/assets/英雄选择_按钮2.jpg");
                background-size: cover;
                line-height: 36px;
                color: #d5ad6c;
            }
        }
    }
}

</style>