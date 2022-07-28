<template>
 <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
<div v-if="error?.msg != undefined">
  <h1>You are not admin user</h1>
  <h2>Please login as an admin user</h2>
</div>
  <h1>Page List</h1>
    <table>
      <tbody>
          <tr><td><a href="/special/config/user">User config</a></td>
              <td>ユーザー情報の設定を行います。</td>
          </tr>
          <tr><td><a href="/special/config/usergroup">Usergroup config</a></td>
              <td>ユーザーグループ情報の設定を行います。</td>
          </tr>
          <tr><td><a href="/special/config/page">Page config</a></td>
              <td>ページの設定を行います。</td>
          </tr>
      </tbody>
    </table>

    <h1>Page settings</h1>
    <table id="page_list">
      <thead>
        <tr>
          <td class="sort" data-sort="td_url">url</td>
          <td class="sort" data-sort="td_title">title</td>
          <td class="sort" data-sort="td_username">username</td>
          <td class="sort" data-sort="td_c_time">created at</td>
          <td class="sort" data-sort="td_u_time">last update</td>
          <td class="sort" data-sort="td_tag">tag</td>
          <td class="sort" data-sort="td_content">content</td>
          <td >削除</td>
          <td >Rename</td>
        </tr>
      </thead>
      <tbody id="datatable" class="list">
          <tr v-for="p in pages">
            <td class="td_url"><a :href="'/view/'+ p.url">{{p.url}}</a></td>
            <td class="td_title"><a :href="'/view/' + p.url">{{p.title}}</a></td>
            <td class="td_title">{{ p.user }}</td>
            <td class="td_c_time">{{ p.created }}</td>
            <td class="td_u_time">{{ p.update}}</td>
            <td class="td_tag">{{ p.tag }} </td>
            <td class="td_u_time">{{ p.content }}</td>
            <td><button @click="delete_page(p.url)">削除</button></td>
            <td><button @click="rename_page( p.url)">Rename</button></td>
          </tr>
      </tbody>
    </table>
</template>


<script setup lang="ts">
const title = "title";
const data = await useFetch('/api/page/search', {method:"POST", body:{type:"list"}})
const pages = data.data;
const error = {}

</script>


