<template>
<h1>AAAAAAAAAAAAAAA</h1>
  <div class="popup new-page" id="popup-new-page">
    <div class="popup-inner my-form">
      <button class="popup-close-btn" @click="close()"><i class="fas fa-times"></i></button>
      <p class="my-form-title">新しいページを作成</p>
      <table>
      <tbody>
        <tr style="background:none;"><td><span>自分のページ内で作成</span></td><td></td></tr>
        <tr class="my-form-oneline">
          <td><span><i class="fas fa-home"></i>/user/{{ username }}/<input type="text" id="f_page_title_0" value=""></span></td>
          <td><button class="form-submit-btn" @click="create_new_page_mydir()">作成</button></td>
        </tr>

        <tr style="background:none;"><td><span>現在の場所から作成</span></td><td></td></tr>
        <tr class="my-form-oneline">
          <td><i class="fas fa-home"></i>/<span>{{ title }}</span>/<input type="text" id="f_page_title_1" value=""></td>
          <td><button class="form-submit-btn" @click="create_new_page_curdir()">作成</button></td>
        </tr>

        <tr style="background:none;"><td><span>その他</span></td><td></td></tr>
        <tr class="my-form-oneline">
          <td><i class="fas fa-home"></i>/<input type="text" id="f_page_title_2" value=""></td>
          <td><button class="form-submit-btn" @click="create_new_page_custom()">作成</button></td>
        </tr>
      </tbody>
      </table>
      <p id="create-new-page-err-msg" style="color:#f22;"></p>
      <p>新しいページのタイトルを入力し、「作成」ボタンを押して下さい。</p>
      <p>同名のページを複数作ることはできません</p>
    </div>
  </div>
<h1>AAAAAAAAAAAAAAA</h1>
</template>

<script lang="ts">
export default {
props:["title", "username", "endcb"],
methods:{
  create_new_page_mydir : async function(){

    },

  create_new_page_custom : async function(){

    },
  create_new_page_curdir : async function(){

    },
  close : function(){this.endcb();}
}
}
</script>

<style scoped>
.popup {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index:30;
  background-color:rgba(0, 20, 40, 0.3);
  transition: .6s;
}

.popup-inner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 80%;
  height:70%;
  max-width:700px;
  max-height:500px;
  padding: 30px;
  background-color: #013;
  border:solid 2px #fff;
  border-radius: 15px;
  font-size: 1.2rem;
  overflow-x: hidden;
  overflow-y: scroll;
}

.popup-inner p{
  margin-top:0;
}

.popup-inner img {
  width: 100%;
}
.popup-close-btn {
  float:right;
  width: 30px;
  height: 30px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}
.popup-close-btn i {
  font-size: 30px;
  line-height: 30px;
  color: #000;
}
.black-background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.8);
  z-index: 1;
  cursor: pointer;
}

#popup-new-page table, 
#popup-new-page tr, 
#popup-new-page tbody{
  font-size: 1.2rem;
  width:90%;
  border:unset;
}

#popup-new-page td{
  border:unset;
}
</style>
