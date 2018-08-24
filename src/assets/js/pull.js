
function pull(el,binding,type,vnode){
    this.el = el; // 当前绑定的元素
    this.pullLength = '';
    let start = '';// 初始值
    this.binding = binding;
    this.touchType = type;
    this.vnode = vnode;
    this.flagEX = this.el.getAttribute('pull-flag') || true;
    this.distance = this.el.getAttribute('pull-distance') || 30;
    this.pullText = this.el.getAttribute('pull-text') || '释放刷新';
    this.scrollFlag = true;
    this.el.addEventListener("touchstart",(e)=>{
        start = e.changedTouches[0].pageY;
        this.pullLength = 0;
        // 新建P标签，用于下拉刷新的提示文案。
        this.p = document.createElement('P')
        this.p.innerHTML = this.pullText;
        this.p.style.textAlign = 'center';
        this.p.style.display = 'none';
        this.p.style.fontSize = '16px';
        this.touchType === 'pull-up' && this.el.parentNode.insertBefore(this.p,this.el);
        // this.touchType === 'pull-down' && this.el.parentNode.appendChild(this.p,this.el);
    },false);
    this.el.addEventListener("touchmove",(e)=>{
        this.pullLength = e.changedTouches[0].pageY - start;
        this.elHeight = this.el.clientHeight;
        this.docHeight = document.documentElement.clientHeight;
        this.docScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 上拉或者下滑，有个限制，超过了则重置
        if (this.pullLength > 80) {
            this.pullLength = 80;
        }
        if (this.docScrollTop == 0 && this.pullLength>10) {
            e.preventDefault();
        }
        if ((this.docScrollTop+this.docHeight) >= this.elHeight &&  this.pullLength<-10) {
            e.preventDefault();
        }
        if (this.pullLength < -80) {
            this.pullLength = -80;
        }
        if (this.touchType === 'pull-down' && this.pullLength < 0) {
            el.style.transform = `translateY(${this.pullLength}px)`;
        }
        if (this.touchType === 'pull-up' && this.pullLength > 0) {
            el.style.transform = `translateY(${this.pullLength}px)`;
        }
        el.style.transition = '';
        // P 节点的margin-top随着拉伸长度改变
        this.p.style.marginTop = `${this.pullLength-30}px`;
        this.p.style.display = 'block';
    },false);
    this.el.addEventListener("touchend",(e)=>{
        // 释放后，删除P节点
        if (this.touchType === 'pull-up') {
            this.el.previousSibling && this.el.parentNode.removeChild(this.p)
        }
        this.elHeight = this.el.clientHeight;
        this.docHeight = document.documentElement.clientHeight;
        this.docScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        this.el.style.transform = `translateY(0)`; 
        this.el.style.transition = 'transform ease .6s';  
        console.log(this.pullLength);
        if (this.touchType === 'pull-up' && this.pullLength > 0) {
            this.pullUp(e);
        }
        if (this.touchType === 'pull-down' && this.pullLength < 0) {
            this.pullDown(e);
        }
    },false);
};
pull.prototype={
    pull: function (e) {
        console.log('到了 '+this.touchType)
        if (Math.abs(this.pullLength) > this.distance && this.vnode.context[this.flagEX]) {
            this.binding.value();
        } else if (Math.abs(this.pullLength) > this.distance) {
            console.log('没有更多了')
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
        Vue.directive("pull-up",{
            bind:function(el,binding,vnode){
                new pull(el,binding,"pull-up",vnode);
            }
        });
        Vue.directive("pull-down",{
            bind:function(el,binding,vnode){
                new pull(el,binding,"pull-down",vnode);
            }
        });
    }
}