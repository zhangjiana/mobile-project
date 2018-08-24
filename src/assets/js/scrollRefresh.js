
function pull(el,binding,vnode){
    this.el = el; // 当前绑定的元素
    this.pullLength = '';
    let start = '';// 初始值
    this.binding = binding;
    this.vnode = vnode;
    this.flagEX = this.el.getAttribute('pull-flag') || true;
    this.distance = this.el.getAttribute('pull-distance') || 30;
    window.addEventListener("scroll",(e)=>{
       this.scroller();
    })
};
pull.prototype={
    scroller:function(){
        let eleHeight = this.getElmHeight() - (this.getScrollTop() + this.getDocHeight());
        // 判断到达底部条件  this.distance 达到底部前，就触发
        if ((eleHeight < this.distance) && this.vnode.context[this.flagEX]) {
            console.log('loading')
            this.binding.value();
        } else if (this.getScrollTop() >= (this.getElmHeight() - this.getDocHeight())){
            console.log('no more');
        }
    },
    // getBoundingClientRect获取元素位置
    // 元素高度
    getElmHeight() {
        return this.el === window ? this.el.innerHeight : this.el.getBoundingClientRect().height;
    },
    // 滚动条高度
    getScrollTop() {
       return this.el === window ? document.documentElement.scrollTop || document.body.scrollTop : Math.ceil(Math.abs(this.el.getBoundingClientRect().top));
    },
    // 可视窗口高度
    getDocHeight() {
       return document.documentElement.clientHeight || document.body.clientHeight;
    }
};
export default {
    install(Vue) {
        // 注册自定义指令
        Vue.directive("scroll-refresh",{
            bind:function(el,binding,vnode){
                new pull(el,binding,vnode);
            },
            unbind: function (el) {
                window.removeEventListener('scroll',()=>{

                })
            }
        });
    }
}