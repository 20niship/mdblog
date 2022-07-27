<template>
 <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
<div v-if="error.msg != undefined">
  <h1>You are not admin user</h1>
  <h2>Please login as an admin user</h2>
</div>
    <p>グループ数：{{ usergroup.length }}</p>
    <p>theadをクリックすると、その値でソートできます。</p>

    <h2>グループ作成</h2>
      <div class="my-form my-form-oneline" style="max-width:600px">
        <div class="search-ui-component">
          <input type="text" id="usergroup-input" placeholder="グループ名">
          <button type="submit" class="favorite styled" @click="createGroup()">作成する</button>
        </div>
      </div>

    <h2>グループ一覧</h2>

    <div v-for="group in usersgourp">
    <details>
      <summary class="usergroup-summary-continer">
        <div class="usergroup-summary-box user-icon">
          <i v-if="group.enabled" class="fas fa-users"></i>
          <i v-else class="fas fa-users-slash"></i>
          </div>
        <div class="usergroup-summary-box user-name">
          <p><span class="usergroup-name">{{ group.usergroup_name }} </span><span>ID : {{ group.usergroup_id }}</span></p>
          <p >Registered : {{ group.usergroup_registration.toLocaleString('ja-JP', {}) }}</p>
        </div>
        <div class="usergroup-summary-box user-info">
          <p>Menber：{{ group.users.length }}人</p>
          <p>Enabled : {{ group.usergroup_enabled }}</p>
        </div>
        <div class="usergroup-summary-box user-users">
          <span >{{ group.user_string }}</span>
        </div>
      </summary>
    <div class="detail-inner"></div>

    <div class="usergroup-summary-continer">
      <div class="usergroup-summary-box">
    <table id="users">
      <thead>
        <tr>
          <td class="sort" data-sort="td_userid">ユーザID</td>
          <td class="sort" data-sort="td_name">ユーザ名</td>
          <td class="sort" data-sort="td_icon">アイコン</td>
          <td class="sort" data-sort="td_admin">admin</td>
          <td >削除</td>
        </tr>
      </thead>
      <tbody id="datatable" class="list">
          <tr v-for="user in group.users">
            <td class="td_userid">{{ user._id}}</td>
            <td class="td_userid">{{ user._source.user_id }}</td>
            <td class="td_name">{{ user._source.username }}</td>
            <td class="td_icon">{{ user._source.user_icon }}</td>
            <td class="td_admin">{{ user._source.user_admin }}</td>
            <td><button onclick="delete_user_from_group( {{ user.user_id }}, {{ group.usergroup_id }} )">削除</button></td>
          </tr>
      </tbody>
    </table>
      <input type="hidden" name="usergroup_id" value="{{ group.usergroup_id }}">
      <div class="form-submit-btn-oneline">
        <input type="text" id="add-user-name-{{ group.usergroup_id }}" list="allusers" class="input-text-with-btn" placeholder="追加するユーザー名"><br>
        <datalist id="allusers">
        </datalist>
        <button onclick="add_user_to_grouop({{ group.usergroup_id }})" class="form-submit-btn-oneline">追加</button>
      </div>
    </div>
    <div class="usergroup-summary-box my-form">
        <p class="form-title">Change Usergroup Settings</p>
          <label for="usergroup_name">新しいグループ名</label><br>
          <input type="text" id="'usergroup_name-' +  group.usergroup_id" name="usergroup_name" value="{{ group.usergroup_name }}"><br>

          <label for="アイコンURL">アイコンURL</label><br>
          <input type="text" id="'usergroup_icon-' + group.usergroup_id" name="usergroup_icon" value="Not implemented yet"><br><br>

          <input type="checkbox" :id="'group_enabled-' + group.usergroup_id" name="group_enabled">
          <label for="group_enabled">Enabled</label>
          <button onclick="delete_usergroup({{ group.usergroup_id }})" class="form-submit-btn-small">削除</button>
          <button onclick="edit_usergroup({{ group.usergroup_id }})" class="form-submit-btn-small">更新</button>
        </div>
    </div>
    </details>
    </div>

    <component :is="'script'">
      window.onload = async() => {
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
      </component>
</template>


<script setup lang="ts">
const title = "title";
const usergroup = [];
</script>


<script lang="ts">
export default {
  data(){
    /* const {data: user_list_} = await useFetch("/api/user/list", {method:"POST"}); */
    return {
      title: "title",
      error: {},
      usergroup:[]
    }
  },
  methods:{
      delete_user_from_group : async(user_id : any, group_id : any) => {
        if (window.confirm("ユーザー" + user_id.toString() + "をグループ" + group_id + "から削除しますか？")) {
          const fields = {query:"deleteuserfromgroup", user_id:user_id, usergroup_id:group_id};
          let response = await fetch("/api/user", {
                method:"POST", headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(fields)
              })
          if(response.ok){
            console.log("OK!", response.text())
            document.location.reload();
          }else{
            console.log("Some error occuerd :", response.text())
          }
        }
      },
       
      edit_user : async(id : any) => {
        const input_username = document.getElementById("user_name")
        const input_email    = document.getElementById("user_email")
        const input_icon     = document.getElementById("user_icon")
        const input_gender   = document.getElementById("user_gender")
        const input_emailable = document.getElementById("user_publicmail")
        const input_admin = document.getElementById("user_admin")
        const input_user_enabled = document.getElementById("user_enabled")
        const input_user_id = document.getElementById("user_id")

        const fields = { 
          query           : "edituser", 
          user_id         : input_user_id.value,
          user_name       : input_username.value,
          user_gender     : input_gender.value,
          user_icon       : input_icon.value,
          user_email      : input_email.value,
          // user_password   : input_username.value,
          user_publicmail : input_emailable.checked,
          user_admin      : input_admin.checked,
          user_enabled    : input_user_enabled.checked
        }
        console.log(JSON.stringify(fields));

        let response = await fetch("/api/user", {
          method:"POST", headers: {'Content-Type': 'application/json'},
          body:JSON.stringify(fields)
        })

        if(response.status !== 200){
          console.log("Some error occuerd :", response.text())
        }else{
          console.log("OK!", response.text())
          document.location.href = window.location.href.split('?')[0];
        }
      },

      add_user_to_grouop : async(group_id : any) => {
        const name = document.getElementById(`add-user-name-${group_id}`).value;
        const fields = {query:"addusertogroup", user_name:name, usergroup_id:group_id};
        let response = await fetch("/api/user", {
              method:"POST", headers: {'Content-Type': 'application/json'},
              body:JSON.stringify(fields)
            })
        if(response.status !== 200){
          console.log("Some error occuerd :", response.text())
        }else{
          console.log("OK!", response.text())
          document.location.reload();
        }
      },

      edit_usergroup : async(group_id : any) => {
        const fields = { 
          query             : "editusergroup", 
          usergroup_id      : group_id,
          usergroup_name    : document.getElementById(`usergroup_name-${group_id}`).value,
          usergroup_enabled : document.getElementById(`group_enabled-${group_id}`).checked,
          usergroup_icon    : document.getElementById(`usergroup_icon-${group_id}`).value,
        }
        console.log(fields);

        let response = await fetch("/api/user", {
          method:"POST", headers: {'Content-Type': 'application/json'},
          body:JSON.stringify(fields)
        })

        if(response.status !== 200){
          MyMessage({msg:"ERROR 保存できませんでした : " + response.statusText, type:"alert"})
        }else{
          MyMessage({msg:"ユーザーグループを保存しました", type:"simple"})
          document.location.href = window.location.href.split('?')[0];
        }
      },

      delete_usergroup : async(group_id :any) => {
        const response = await fetch("/api/user", {
          method:"POST", headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({query:"deleteusergroup", usergroup_id:group_id})
        })
        if(response.ok){
          document.location.reload();
        }else{
          MyMessage({msg:"グループ削除に失敗しました", duration:3000})
        }
      },

      createGroup : async() => {
        const new_group_name = document.getElementById("usergroup-input").value;
        const response = await fetch("/api/user", {
          method:"POST", headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({query:"createusergroup", usergroup_name:new_group_name})
        })
        if(response.ok){
          document.location.reload();
        }else{
          MyMessage({msg:"グループ作成に失敗しました", duration:3000})
        }
      }
  }
}
</script>


