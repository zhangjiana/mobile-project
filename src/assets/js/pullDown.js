
function pull(el,binding,vnode){
    this.el = el; // 当前绑定的元素
    this.pullLength = '';
    let start = '';// 初始值
    this.binding = binding;
    this.vnode = vnode;
    this.flagEX = this.el.getAttribute('pull-flag') || true;
    this.distance = this.el.getAttribute('pull-distance') || 30;
    this.pullText = this.el.getAttribute('pull-text') || '释放刷新';
    this.el.addEventListener("touchstart",(e)=>{
        start = e.changedTouches[0].pageY;
        this.pullLength = 0;
        // 新建P标签，用于下拉刷新的提示文案。
        this.p = document.createElement('P')
        this.p.innerHTML = this.pullText;
        this.p.style.textAlign = 'center';
        this.p.style.display = 'none';
        this.p.style.fontSize = '16px';
        this.el.parentNode.insertBefore(this.p,this.el);
    },false);
    this.el.addEventListener("touchmove",(e)=>{
        this.pullLength = e.changedTouches[0].pageY - start;
        this.docScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 页面在顶部，并且有所滑动，则阻止浏览器默认事件，否则 安卓手机touchend 事件不触发。
        if(this.pullLength>=0 && this.docScrollTop ==0) {e.preventDefault();}
        el.style.transform = `translateY(${this.pullLength/2}px)`;
        el.style.transition = '';
        this.p.style.display = 'block';
        this.p.innerHTML = this.pullLength > this.distance ? '释放刷新' : '下拉刷新';
    },false);
    this.el.addEventListener("touchend",(e)=>{
        this.p.innerHTML = '刷新中'
        this.docScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        this.el.style.transform = `translateY(0)`; 
        this.el.style.transition = 'transform ease .6s';
        if (this.pullLength > 0 && this.docScrollTop == 0) {
            this.pull(e);
        }
         this.el.previousSibling && this.el.parentNode.removeChild(this.p)
    },false);
};
pull.prototype={
    pull: function (e) {
        if (Math.abs(this.pullLength) > this.distance && this.vnode.context[this.flagEX]) {
            this.binding.value();
        } else if (Math.abs(this.pullLength) > this.distance) {
            this.p.innerHTML = '没有更多了'
        } else {
            console.log(Math.abs(this.pullLength))
        }
    },
    pullUp:function(e){
        if (this.docScrollTop == 0) {
           this.pull(e);
        }
    },
    pullDown: function (e) {
       if ((this.docScrollTop+this.docHeight) >= this.elHeight ) {
            this.pull(e);
        }
    }
};
export default {
    install(Vue) {
        // 注册自定义指令
        Vue.directive("pull-down",{
            bind:function(el,binding,vnode){
                new pull(el,binding,vnode);
            }
        });
    }
}