<template>
<aside class="sidebar" id="sidebar">
  <div class="e-sidebar-menu-buttons">
    <div class="e-sidebar-menu-buttons-w">
      <input type="radio" id="sidebar_menu_image" class="nodisplay" name="sidemenu" onclick="toggleSidebar('image')" >
      <label for="sidebar_menu_image"><i class="fas fa-image"></i></label>
      
      <input type="radio" id="sidebar_menu_setting" class="nodisplay" name="sidemenu" onclick="toggleSidebar('setting')">
      <label for="sidebar_menu_setting"><i class="fas fa-cog"></i> </label>

      <input type="radio" id="sidebar_menu_folder" class="nodisplay" name="sidemenu" onclick="toggleSidebar('file')">
      <label for="sidebar_menu_folder"><i class="fas fa-folder"></i></label>

      <input type="radio" id="sidebar_menu_view" class="nodisplay" name="sidemenu" onclick="toggleSidebar('view')">
      <label for="sidebar_menu_view"><i class="fas fa-eye"></i> </label>

      <input type="radio" id="sidebar_menu_edit" class="nodisplay" name="sidemenu" onclick="toggleSidebar('edit')">
      <label for="sidebar_menu_edit"><i class="fas fa-edit"></i></label>
    </div>
  </div>
  <div class="e-sidebar-main-content" id="e-sidebar-main-content">
    <div class="e-sidebar-main-content-inner">
      <section id="editor-side-sec-main">
      </section>
      <section id="editor-side-sec-loading">
        <h1>　Now Loading......</h1>
        <p>　Please wait for a minute.....</p>
      </section>
    </div>
  </div>
</aside>

</template>

<style scoped>
.sidebar {
height: 100%;
width: 150px;
position: fixed;
right: 0;
top: 85px;
padding: 0;
/* overflow: hidden; */
background-color: lightblue;
border-left: solid 1px #fff;
display:table;
}

.e-sidebar-menu-buttons{
display:table-cell;
background-color: #000;
width:50px;
}

.e-sidebar-main-content{
display:table-cell;
}


.e-sidebar-main-content-inner{
  display: block;
  overflow:scroll;
  width:100%;
  height:90vh;
  margin-bottom:100px;
}

.e-sidebar-menu-buttons-w label i,
.e-sidebar-menu-buttons-w label a i{
color:#fff;
}

.header-ui-1{
height:34px;
}

.e-sidebar-menu-buttons-w label {
border:none;
text-align: center;
font-size:20px;
display: inline-block;
padding: 3px 0px;
margin-bottom: 7px;
border-top:5px;
width: 45px;
padding-right: 5px;
}

.e-sidebar-menu-buttons-w input:checked + label{
border-right:5px solid #fff;
padding-right: 0px;
}

.e-sidebar-menu-buttons-w label:hover {
cursor: pointer;
}



/*----------------------------------------------------------
                    Sidebar Each Views
----------------------------------------------------------*/
.toggle_switch {
  display: table;
  font-size: 30px;
}

.toggle_switch > input {
  display: none;
}

.toggle_switch > label {
  display: block;
  position: relative;
  width: 1.8em;
  height: 1em;
  border-radius: 1em;
  background-color: #2b2a2f;
  cursor: pointer;
}
.toggle_switch > input:checked + label {
  background-color: #2dcb45;
}
.toggle_switch > label::before {
  position: absolute;
  top: 0.05em;
  left: 0.05em;
  width: calc(1em - 0.1em);
  height: calc(1em - 0.1em);
  border-radius: calc(1em - 0.1em);
  background-color: #fff;
  transition: 0.5s;
  content: "";
}
.toggle_switch > input:checked + label::before {
  left: calc(100% - 1em + 0.05em);
}

.side-sec-group-select{
  width:100%;
  padding:5px;
  font-size: 1.1rem;
}

.side-sec-group-select table{
  width:100%;
}

.side-sec-group-select tr td{
  padding:5px 15px;
  margin:auto;
}

/*----------------------------------------------------------
                    Sidebar Each Views
----------------------------------------------------------*/
.toggle_switch {
  display: table;
  font-size: 30px;
}

.toggle_switch > input {
  display: none;
}

.toggle_switch > label {
  display: block;
  position: relative;
  width: 1.8em;
  height: 1em;
  border-radius: 1em;
  background-color: #2b2a2f;
  cursor: pointer;
}
.toggle_switch > input:checked + label {
  background-color: #2dcb45;
}
.toggle_switch > label::before {
  position: absolute;
  top: 0.05em;
  left: 0.05em;
  width: calc(1em - 0.1em);
  height: calc(1em - 0.1em);
  border-radius: calc(1em - 0.1em);
  background-color: #fff;
  transition: 0.5s;
  content: "";
}
.toggle_switch > input:checked + label::before {
  left: calc(100% - 1em + 0.05em);
}

.side-sec-group-select{
  width:100%;
  padding:5px;
  font-size: 1.1rem;
}

.side-sec-group-select table{
  width:100%;
}

.side-sec-group-select tr td{
  padding:5px 15px;
  margin:auto;
}

</style>
