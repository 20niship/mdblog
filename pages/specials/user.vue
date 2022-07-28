<template>
<section>

<link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
<div v-if="error?.msg != undefined">
  <h1>You are not admin user</h1>
  <h2>Please login as an admin user</h2>
</div>

<section class="main-item">
<p class="h1"> User Settings</p>
<details>
<summary class="newuser"><p>新しいユーザーを登録</p></summary>
  <label for="user_name">ユーザー名</label><br>
  <input type="text" id="user_name" placeholder="Name" v-model="form.user.name" ><br>

  <label for="user_email">メールアドレス</label><br>
  <input type="text" id="user_email" placeholder="Email" v-model="form.user.email" ><br>

  <label for="user_iconL">アイコンURL</label><br>
  <input type="text" id="user-icon" placeholder="url" v-model="form.user.icon" ><br>

  <label for="user_admin">Admin</label>
  <input type="checkbox" id="user_admin" name="user_admin" v-model="form.user.isadmin">

  <label for="user_enabled">Enabled</label>
  <input type="checkbox" id="user_enabled" name="user_enabled" v-model="form.user.enabled">
  
  <button @click="add_user()">更新</button>
<p>{{form}}</p>
</details>

<p>ユーザー数：{{ user_list.length }}</p>
<p>theadをクリックすると、その値でソートできます。</p>
<table id="users">
  <thead>
    <tr>
      <td class="sort" data-sort="td_userid">ユーザID</td>
      <td class="sort" data-sort="td_name">ユーザ名</td>
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
        <td class="td_date">{{ user.register }}</td>
        <td class="td_icon">{{ user.icon}}</td>
        <td class="td_nedit">{{ user.editcount}}</td>
        <td class="td_pubmail">{{ user.email}}</td>
        <td class="td_enabled">{{ user.enabled}}</td>
        <td class="td_admin">{{ user.isadmin}}</td>
        <td><button class="form-submit-btn-small" @click="open_config_user( user.id )">編集</button></td>
        <td><button class="form-submit-btn-small" @click="delete_user(user.id)">削除</button></td>
      </tr>
  </tbody>
</table>
</section>

<section class="main-item">
<p class="h1"> Usergroup Settings</p>

<p class="h2">新しくグループを作成する </p>
<div class="my-form my-form-oneline" style="max-width:600px">
  <input type="text" id="usergroup-input" placeholder="グループ名" v-model="form.group.new_group">
  <button type="submit" class="favorite styled" @click="create_group()">作成する</button>
</div>

<p>グループ数：{{ usergroup.length }}</p>
<p>theadをクリックすると、その値でソートできます。</p>

<p class="h1">グループ一覧</p>
<details v-for="group in usergroup">
  <summary class="flex ug-summary">
    <span class="ug-name">{{ group.name}} </span>
    <span class="ug-id">{{ group._id}}</span>
    <span class="ug-register">Registered : {{ group.register?.toLocaleString('ja-JP', {}) }}</span>
    <span class="ug-member">Menber：{{ group.users.length }}人</span>
    <span class="ug-enabled">Enabled : {{ group.enabled}}</span>
  </summary>
  <div class="flex">
    <table>
      <thead>
        <tr>
          <td class="sort" data-sort="td_userid">ユーザID</td>
          <td class="sort" data-sort="td_icon">アイコン</td>
          <td class="sort" data-sort="td_name">ユーザ名</td>
          <td class="sort" data-sort="td_date">登録日</td>
          <td class="sort" data-sort="td_admin">admin</td>
          <td >削除</td>
        </tr>
      </thead>
      <tbody id="datatable" class="list">
          <tr v-for="i of group.users">
            <td class="td_userid">{{ _get_user(i)?.id }}</td>
            <td class="td_icon">{{ _get_user(i)?.icon}}</td>
            <td class="td_name">{{ _get_user(i)?.name}}</td>
            <td class="td_date">{{ _get_user(i)?.register}}</td>
            <td class="td_admin">{{ _get_user(i)?.isadmin }}</td>
            <td><button @click="del_user_from_group2(group, i)">削除</button></td>
          </tr>
      </tbody>
    </table>
   <div>
    <div class="my-form my-form-oneline">
      <input type="text" list="allusers" placeholder="追加するユーザー名" v-model="form.group.add_name">
      <datalist id="allusers"><option v-for="u of user_list" :value=u.name /></datalist>
      <button @click="add_user_to_grouop(group)">追加</button>
    </div>

    <div class="my-form my-form-oneline">
      <input type="text" list="delusers" placeholder="削除するユーザー名" v-model="form.group.del_name">
      <datalist id="delusers"><option v-for="u of group.users" :value="_get_user(u)?.name" /></datalist>
      <button @click="del_user_from_grouop(group)">削除</button>
    </div>
    </div>
  </div>
</details>
</section>

</section>
</template>

<script setup lang="ts">
let error = reactive({});
let form = ref({
  user: {
    name :"",
    icon : "",
    email:"",
    isadmin: false,
    enabled:true,
  },
  group:{
    add_name:"",
    del_name:"",
    new_group : "",
  }
})

const user_list_ = await useFetch("/api/user", {method:'GET'});
const usergroup_ = await useFetch("/api/usergroup", {method:'GET'});
let user_list= user_list_.data;
let usergroup= usergroup_.data;

async function update_data() {
  const user_list_ = await useFetch("/api/user", {method:'GET'});
  const usergroup_ = await useFetch("/api/usergroup", {method:'GET'});
  user_list.value = user_list_.data.value;
  usergroup.value = usergroup_.data.value;
}
update_data();

 
const add_user = async function() {
  console.log(form);
  const user = form.value.user;
  console.log(user);
  await $fetch("/api/user", {method:'PUT', body:user});
  await update_data();
  console.log("Add complete!!")
};

const delete_user = async function(id:number) {
  await $fetch("/api/user", {method:'DELETE', body:{id}});
  location.reload();
};

const create_group = async()=>{
  const name = form.value.group.new_group;
  await $fetch("/api/usergroup", {method:'PUT', body:{name, users:[]}});
  location.reload();
}

const add_user_to_grouop = async(group: Usergroup) => {
  const users = group.users;
  const new_user = _get_user_from_name(form.value.group.add_name);
  if( new_user == undefined ) {
    console.error("User is undefined");
    return;
  }
  users.push(new_user.id)
  console.log("NEW usergroup = " , users);
  await $fetch("/api/usergroup", {method:'POST', body:{name:group.name, users}});
  location.reload();
}

const del_user_from_group2 = async(group : Usergroup, userid : number) => {
  const users_old = group.users;
  const users = []
  for(const o of users_old) if(o != userid) users.push(o);
  if( users == undefined ) {
    console.error("User is undefined");
    return;
  }
  console.log(group.name, users);
  await $fetch("/api/usergroup", {method:'POST', body:{name:group.name, users}});
  location.reload();
};

 
const _get_user_from_name = (name: string) => {
  console.log(user_list.value);
  for(const u of user_list.value) {
    console.log(u.name, name)
    if(u.name == name)return u;
  }
}

const _get_user = (id: string) => {
  for(const u of user_list.value) if(u.id === id)return u;
  return {}
}

</script>


<style scoped>
.h1{
  font-weight:bolder;
  font-size:1.8rem;
}

.main-item{
  width:95%;
  margin:20px;
  background-color:#224;
  padding:20px;
  border-radius:15px;
  border: solid 0.1px #444;
}

.flex{  display:flex;}

/* ---------------------------  表のソートで矢印表示  -------------------------*/
details {
	background-color: #337;
  border-radius: 10px;
  margin:13px;
  border: solid 1px #ccc;
  padding:15px;
}

details:hover {
  background-color: #1e4e8a;
}

.newuser p{margin:0;}

summary {
	position: relative;
	cursor: pointer;
  padding:5px;
	list-style: none;
  width:100%;
}
summary::-webkit-details-marker {
  display: none;
}

.ug-summary{
  padding:11px;
  display: table-cell;
  padding:5px 20px;
}

.ug-summary span{ margin:5px 20px; }
.ug-id{color:#aaa; }
.ug-register, .ug-enabled{  font-size:1.2rem;  font-weight:bold;}
.ug-name{  font-weight: bold;  font-size:2.0rem; }
</style>
