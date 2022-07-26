<template>
  <section class="main-view">
    <div v-if="'q' in query"> <span style="font-weight: bold;">{{ query.q }} </span>の検索結果</div>
    <div v-else-if="'c' in query"> カテゴリー：<span style="font-weight: bold;">{{ query.c }} </span>の検索結果</div>
    <div v-else-if="'dir' in query"><i class="fas fa home"></i>/<a href="/view/{{ query.dir }} " style="font-weight: bold;">{{ query.dir }} </a>内の検索結果</div>
    
    <p>全&nbsp;{{ nfound }}&nbsp;件中&nbsp;{{ nresult }}&nbsp;件を表示</p>
    <nav aria-label="pagination" class="pnavigation-nav">
      <ul class="pagination">
          <li><a href="">«</a></li>
          <li><a href="">1</a></li>
          <li><a href="">2</a></li>
          <li><a href="">3</a></li>
          <li><a href="">4</a></li>
          <li><a href="">5</a></li>
          <li><a href="">»</a></li>
      </ul>
  </nav>

    <p>詳細条件：</p>
    <ul>
        <li>カテゴリー   :  {{ query.c }} </li>
        <li>ディレクトリ   :  {{ query.dir }} </li>
        <li>記事作成範囲   :  {{ query.drange }} </li>
        <li>記事作成日   :  {{ query.d }} </li>
        <li>並び順   :  
          <span v-if='query.sort === "create_r"'> 記事作成日（降順）</span>
          <span v-else-if='query.sort === "create"'> 記事作成日</span>
          <span v-else-if='query.sort === "update"'> 最後の編集日</span>
          <span v-else-if='query.sort === "update_r"'> 記事作成日（降順）</span>
          <span v-else-if='query.sort === "nvisited"'> 閲覧回数</span>
          <span v-else-if='query.sort === "nvisited_r"'> 閲覧回数（降順）</span>
          <span v-else-if='query.sort === "nword"'> 単語数（降順）</span>
          <span v-else-if='query.sort === "nword_r"'> 単語数</span>
          <span v-else> UNDEFINED??</span>
        </li>
        <li v-if="'d' in query">記事作成日:{{ query.d }} </li>
    </ul>
  
  <details class="detail-search">
    <summary>詳細検索</summary>
    <form class="my-form my-form-oneline" action="/search">
      <div class="search-ui-component">
          <label for="search-q float-left">検索する語句</label>
          <input type="text" class="float-left" id="search-q" name="q" placeholder="What are you looking for?" :value= query.q >
      </div>
      <div class="search-ui-component">
          <label for="search-aq float-left">除外する語句</label>
          <input type="text" class="float-left" id="search-aq" name="aq" readonly placeholder="501 Not implemented" :value= query.aq >
      </div>
      <div class="search-ui-component">

        <label for="search-dir" class="float-left" >検索場所</label>
        <input type="text" name="dir" id="search-dir" list="search_dir_datalist" class="float-left" :value= query.dir  >
        <datalist id="search_dir_datalist">
          <option value="">全範囲</option>
          <option value="RC2022/WorkShop2022"></option>
          <option value="RC2021/WorkShop2021"></option>
          <option value="RC2020/WorkShop2020"></option>
          <option value="RC2019/WorkShop2019"></option>
          <option value="RC2018/WorkShop2018"></option>
          <option value="RC2017/WorkShop2017"></option>
          <option value="RC2016/WorkShop2016"></option>
          <option value="RC2015/WorkShop2015"></option>
          <option value="RC2014/WorkShop2014"></option>
          <option value="RC2021">RC2021</option>
          <option value="RC2020">RC2020</option>
          <option value="RC2019">RC2019</option>
          <option value="RC2018">RC2018</option>
          <option value="RC2017">RC2017</option>
          <option value="RC2016">RC2016</option>
          <option value="RC2015">RC2015</option>
          <option value="RC2014">RC2014</option>
          <option value="RC2013">RC2013</option>
          <option value="F3RC^2021">F3RC2022</option>
          <option value="F3RC^2020">F3RC2021</option>
          <option value="F3RC^2019">F3RC2020</option>
          <option value="F3RC^2018">F3RC2019</option>
          <option value="F3RC^2017">F3RC2018</option>
          <option value="春ロボ2021">春ロボ2021</option>
          <option value="春ロボ2020">春ロボ2019</option>
          <option value="春ロボ2019">春ロボ2018</option>
          <option value="春ロボ2018">春ロボ2017</option>
          <option value="春ロボ2017">春ロボ2016</option>
          <option value="admin">admin</option>
        </datalist>
     </div>
      <div class="search-ui-component">
        <label for="search-c" class="float-left">カテゴリー</label>
          <select name="c" id="search-c" size="1" class="float-left" value={{ query.c }} >
          <option value="">未選択</option>
          </select>
      </div>
      <div class="search-ui-component">
        <label for="search-sort" class="float-left">並び替え</label>
        <select name="sort" id="search-sort" size="1" class="float-left" value={{ query.sort }}>
        <option value="">未選択</option>
        <option value="create">作成日時</option>
        <option value="create_r">作成日時（降順）</option>
        <option value="modify">最終更新日時</option>
        <option value="modify_r">最終更新日時（降順）</option>
        <option value="nword">単語数</option>
        <option value="nword_r">単語数（降順）</option>
        <option value="nvisited">閲覧数</option>
        <option value="nvisited_r">閲覧数（降順）</option>
        <option value="title">タイトル</option>
        <option value="title_r">タイトル（降順）</option>
        </select>
    </div>

      <div class="search-ui-component">
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
          <label for="drange">記事作成日</label>
          <input type="text" id="drange" name="drange" readonly placeholder="SELECT RANGE">
      </div>
    </form>
  </details>
  
  <div class="search-result">
  <PageCardLarge v-for="page in hits" :page=page />
  </div>
  </section>
</template>


<script lang="ts">
export default {
  data() {
    return {
      query : this.$route.query || {}
    }
  },
  mounted:async() => {
  let cat_el = document.getElementById("search-c");
  category_datalist = ""
  const response = await fetch("/api/component?query=category&format=json")
  if(response.ok){
    const res_json = (await response.json())["categories"];
    for (i in res_json){
      category_datalist += `<option value="${res_json[i]}">${res_json[i]}</option>`
    }
    cat_el.innerHTML = "<option value=''>未選択</option>" + category_datalist;
  }
    const el = document.getElementsByClassName("detail-search")[0];
    el.open  = true;
},
methods:{
}
}
</script>

<style scoped>
.pnavigation-nav {
  display: flex;
  justify-content: center;
}
        
.pagination {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}
        
.pagination li {
  margin: 2px;
  padding:0;
  width:50px;
  height:50px;
  border: solid 1px #fff;
  border-radius: 5px;
}
.pagination li,
.pagination li  a {
  color:#fff;
  font-size: 30px;
  line-height: 50px;
  text-decoration: none;
  text-align: center;
}

.visuallyhidden{
  font-size: 0px;
  visibility: hidden;
}
</style>
