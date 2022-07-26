<template>
<link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
<div v-if="error?.msg != undefined">
  <h1>You are not admin user</h1>
  <h2>Please login as an admin user</h2>
</div>
    <p>ユーザー数：{{ user_list.length }}</p>
    <p>theadをクリックすると、その値でソートできます。</p>
    <table id="users">
      <thead>
        <tr>
          <td class="sort" data-sort="td_userid">ユーザID</td>
          <td class="sort" data-sort="td_name">ユーザ名</td>
          <td class="sort" data-sort="td_gender">性別</td>
          <td class="sort" data-sort="td_date">登録日</td>
          <td class="sort" data-sort="td_icon">アイコン</td>
          <td class="sort" data-sort="td_nedit">編集回数</td>
          <td class="sort" data-sort="td_pubmail">PublicEmail</td>
          <td class="sort" data-sort="td_enabled">Enabled</td>
          <td class="sort" data-sort="td_admin">admin</td>
          <td >変更</td>
          <td >削除</td>
        </tr>
      </thead>
      <tbody id="datatable" class="list">

          <tr v-for="user in user_list">
            <td class="td_userid">{{ user.id}}</td>
            <td class="td_name">{{ user.name}}</td>
            
            <td v-if="user.gender===0" class="td_gender">未登録</td>
            <td v-if="user.gender===1" class="td_gender">Male</td>
            <td v-if="user.gender===2" class="td_gender">Female</td>
            <td v-else class="td_gender">Unknown</td>
            
            <td class="td_date">{{ user.register }}</td>
            <td class="td_icon">{{ user.icon}}</td>
            <td class="td_nedit">{{ user.editcount}}</td>
            <td class="td_pubmail">{{ user.email}}</td>
            <td class="td_enabled">{{ user.enable}}</td>
            <td class="td_admin">{{ user.isadmin}}</td>
            <td><button class="form-submit-btn-small" @click="open_config_user( user.id )">編集</button></td>
            <td><button class="form-submit-btn-small" @click="delete_user(user.id)">削除</button></td>
          </tr>
      </tbody>
    </table>

    <div class="popup user-config" id="popup-user-config" style="visibility:hidden;">
      <div class="popup-inner my-form">
        <button class="popup-close-btn" onclick="close_config_user()"><i class="fas fa-times"></i></button>
        <p class="my-form-title">Change User Input</p>

        <!-- <form> -->
          <input type="hidden" id="user_id" name="user_id" value="">

          <label for="user_name">ユーザー名</label><br>
          <input type="text" id="user_name" name="user_name" value="name"><br>

          <label for="user_email">メールアドレス</label><br>
          <input type="text" id="user_email" name="user_email" value="email"><br><br>

          <label for="アイコンURL">アイコンURL</label><br>
          <input type="text" id="user_icon" name="user_icon" value="email"><br><br>

          <label for="gender">性別</label>
          <select name="gender" id="user_gender">
              <option value="0">--Please choose an option--</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
          </select>

          <input type="checkbox" id="user_publicmail" name="user_publicmail">
          <label for="user_publicmail">Public Email</label>

          <input type="checkbox" id="user_admin" name="user_admin">
          <label for="user_admin">Admin</label>

          <input type="checkbox" id="user_enabled" name="user_enabled">
          <label for="user_enabled">Enabled</label>
          
          <button class="form-submit-btn-small" onclick="edit_user()">更新</button>
        <!-- </form>  -->
      </div>
    </div>
</template>
<script lang="ts">
export default {
  data(){
    /* const {data: user_list_} = await useFetch("/api/user/list", {method:"POST"}); */
    return {
      title: "title",
      error: {},
      user_list:[]
    }
  },
  mounted:() => {
    this.onload();
  },
  methods:{
      delete_user_from_group : async(user_id, group_id) => {
      },
       
      edit_user : async(id) => {
      },

      onload : async() => {
        let all_users = []
        const response = await fetch("/api/user", {
          method:"POST", headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({query:"getallusers"})
        })
        all_users = await response.json()
        var hoge = document.getElementById("allusers");
        for(i in all_users){
            let newUser = document.createElement("option"); // p要素作成
            newUser.setAttribute("value",all_users[i].user_name); // p要素にidを設定
            hoge.appendChild(newUser);
        }
      }
  }

}
</script>

