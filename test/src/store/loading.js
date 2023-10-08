import { reactive } from 'vue'

export default reactive({
    progress: 0,   // 进度条
    valid: true,  // 是否显示
    passive: true, // Click to start
    reload(){
        this.passive = true
        this.progress = 0
        this.valid = true
        let t = setInterval(()=>{
            if(this.progress >= 1)
                clearInterval(t)
            else{
                let val = Math.random().toFixed(2) / 4
                if(this.progress + val > 1)
                    this.progress = 1
                else
                    this.progress += val
            }
        },1300)
    }
})