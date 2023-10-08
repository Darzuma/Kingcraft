//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit
// https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit
export default function loadScript(src){
    let script = document.createElement("script")
    script.type = "text/javascript"
    // 资源地址后添加 callback 参数，脚本加载并执行完成后就会调用该回调
    script.src = src + '?cb=cb'
    document.body.appendChild(script)
    return new Promise(resolve => {
        window.cb = () => {
            resolve()
        }
    })
}