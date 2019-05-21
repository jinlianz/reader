<template>
  <div id="app">
  	
  	<router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
body{
	margin: 0;
}
input{
	padding: 0;
	margin: 0;
	border: 0;
	background-color: transparent;
	outline: none;
}
h4,p{
	margin: 0;
}

#app{
	max-width: 640PX;
	position: relative;
	margin: 0 auto;
}
	img{
		width: 100%;
		display: block;
	}
	.fl{
		float: left;
		
	}
	.fr{
		float: right;
	}
	.clearfix{
		overflow: hidden;
	}
</style>
