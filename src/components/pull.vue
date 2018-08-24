<template>
	<div id="app">
		<div class="tab-wrap">
			<div :class="{'active': cur==1}" @click="tab(1)">上滑刷新</div>
			<div :class="{'active': cur==2}" @click="tab(2)">下拉刷新</div>
		</div>
			<!-- 页面内容 -->
		<div v-if="cur==1" :key=1 class="pull-main" v-pull-down="loadMore" pull-flag="flag" pull-distance="30">
			<div class="main-list" v-for="item in list">{{item}}</div>
		</div>
		<div v-if="cur==2" :key=2 class="pull-main" v-pull-up="upLoad" pull-flag="flag" pull-distance="30" pull-text="下拉刷新">
			<div class="main-list" v-for="item in list">{{item}}</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				list: [],
				flag: true,
				count: 0,
				cur: 1
			}
		},
		created() {
			for(let i = 0; i < 13; i++) {
				this.list.push(i)
			};
		},
		methods: {
			tab(i) {
				this.cur = i;
				this.count = 0;
				this.loadList();
				this.flag = true;
			},
			loadMore() {
				console.log('loading-上滑')
				if (this.count < 3) {
					setTimeout(()=> {
						this.count++
						for(let i = 0; i < 7; i++) {
							this.list.push(i)
						};
					}, 2000)
				} else {
					this.flag = false;	
				}
			},
			upLoad() {
				console.log('loading-下拉')
				if (this.count < 3) {
					setTimeout(()=> {
						this.count++
						for(let i = 0; i < 10; i++) {
							this.list.unshift(i)
						};
					}, 2000)
				} else {
					this.flag = false;
				}
			},
			loadList() {
				this.list = [];
				setTimeout(()=>{
					for(let i = 0; i < 13; i++) {
						this.list.push(i)
					};	
				},1000)
				
			}
		}
	}
</script>
<style lang="scss">
	body{
		margin: 0;
		padding: 0;
	}
	.tab-wrap{
		display:flex;
		width: 5rem;
		height: .88rem;
		line-height: .88rem;
		border-radius: .88rem;
		border: 1px solid #ccc;
		margin: .5rem auto;
		font-size: .3rem;
		overflow: hidden;
		background: #f2f2f2;
		div{
			flex-grow: 1;
			text-align: center;
			&:first-child{
				border-right: 1px solid #ccc;
			}
		}
		.active{
			background: #3399FF;
			color: #fff;
		}
	}
	.pull-main{
		padding: 0 .32rem;
		border: 1px solid #999;
		background: #fff;
		border-radius: .1rem;
	}
	.main-list{
			font-size: .3rem;
			padding: .5rem;
			border-bottom: 1px solid #ccc;
			text-align: center;
		
	}
</style>