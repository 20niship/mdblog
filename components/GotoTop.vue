<template>
<div class="page-top"><span class="page-top-icon"><a href="#pagetop"> top </a></span></div>
</template>

<style scoped>
.page-top {
    position: fixed;
    width: 80px;
    height: 40px;
    right: 30px;
    bottom: 30px;
    background-color: #20fff7;
    border-radius: 20px;
    z-index: 10;
}

.page-top-icon {
    font-size: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-weight: bold;
}

.page-top-icon a{color:#000;}
</style>
