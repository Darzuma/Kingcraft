<template>
    <canvas id="canvas"></canvas>
</template>

<script>
import createUnityInstance from './loader'  // loader.js 源码是 unity build 后自动生成的
export default {
    name: "mew-unity",
    mounted() {
        this.resizeCanvas()
        this.observer = new ResizeObserver( entries => {
            this.resizeCanvas()
        })
        this.observer.observe(this.$el.parentElement)

        if(!window[this.key])
            window[this.key] = (name, args) => this.$emit('messages', name, args)

        this.createUnityInstance()
    },
    emits:[ 'instance', 'progress', 'messages' ],
    data(){
        return {
            observer: null, dispatch: null,
        }
    },
    methods:{
        createUnityInstance(){
            if(this.src)
                createUnityInstance(this.$el, this.config, progress =>{
                    this.$emit('progress', progress)
                }).then(instance => {
                    this.dispatch = instance.dispatch = instance.SendMessage // 绑定前端向 unity 传值的接口
                    this.$emit('instance', instance) // 加载完成后传递当前 unity 实例
                }).catch(err => console.log(err))
        },
        resizeCanvas(){
            this.$el.height = this.$el.parentElement.offsetHeight
            this.$el.width  = this.$el.parentElement.offsetWidth
        },
    },
    watch:{
        src(val){
            this.createUnityInstance()
        }
    },
    props:{
        // Unity 游戏文件路径，即 xxx.data xxx.framework 接 xxx.wasm 三个文件所在目录，文件生成前需开启 Decompression Fallback 选项
        // Unity 游戏文件路径，必须在 vue 项目的 public 目录内
        // 注！路径最后的目录名必须与文件名一致，例如 /unity/Home 的 Home 必须与其内 Home.data.unityweb 的 Home 同名
        src:{
            type: String,
            default: ""
        },
        // Unity 中 Application.ExternalCall 的第一个参数
        key:{
            type: String,
            default: "messages"
        }
    },
    computed:{
        config(){
            let temp = this.src.split("/")
            let name = temp[temp.length - 1]
            return {
                dataUrl: `${this.src}/${name}.data.unityweb`,
                codeUrl: `${this.src}/${name}.wasm.unityweb`,
                frameworkUrl: `${this.src}/${name}.framework.js.unityweb`,
                devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
                matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
                companyName: "null",productName: "null",productVersion: "1.05",
                // streamingAssetsUrl: `${sceneName}/StreamingAssets`, //音频资源，问题待定
            }
        }
    },
    beforeUnmount() {
        this.observer.disconnect()
    },
}
</script>

<style scoped>

</style>