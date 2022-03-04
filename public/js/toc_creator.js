

let id = 0;
const uid = () => { return `heading${id++}`; }


const createSimpleToc = (mainEl, tocInsertElement)=> {
  /**
      Table of Contents
  
      Copyright (c) 2020 Kamosan https://cookbook.xrea.jp/
  
      This software is released under the MIT License.
      http://opensource.org/licenses/mit-license.php
  */
  const TOC_INSERT_SELECTOR = '#toc';              // [セレクター指定] 目次を挿入する要素 querySelector用
  const HEADING_SELECTOR    = 'h1,h2,h3,h4,h5,h6'; // [セレクター指定] 収集する見出し要素 querySelectorAll用
  const LINK_CLASS_NAME     = 'tocLink';           // [クラス名] 目次用aタグに追加するクラス名     .無し
  const ID_NAME             = 'heading';           // [ID名]    目次に追加するID名のプレフィックス #無し
  const headingElements     = mainEl.querySelectorAll(HEADING_SELECTOR);
  const layer = [];
  let links = null;
  let oldRank = -1;

  tocInsertElement.innerHTML = '<p id="toc-title">目次</p><hr>'
  
  try {
      const createLink = (el) => {
          let li = document.createElement('li');
          let a  = document.createElement('a');
          el.id  = el.id || uid();
          a.href = `#${el.id}`;
          a.innerText = el.innerText;
          a.className = LINK_CLASS_NAME;
          li.appendChild(a);
          return li;
      };
      const findParentElement = (layer, rank, diff) => {
          do {
              rank += diff;
              if (layer[rank]) return layer[rank];
          } while (0 < rank && rank < 7);
          return false;
      };
      const appendToc = (els, toc) => {
        els.appendChild(toc.cloneNode(true));
      };
      const tocHighlight = (e) => {
          const sy = window.pageYOffset;
          const ey = sy + document.documentElement.clientHeight;
          let tocHighlightEl = null;
          links.forEach( (el) => {
              const targetEl = document.querySelector(el.hash);
              const y = sy + targetEl.getBoundingClientRect().top ;
              el.classList.remove("active") ;
              if(sy < y &&  y < ey)tocHighlightEl = el;
              if(sy > y) tocHighlightEl = el;
          });
          if(tocHighlightEl)tocHighlightEl.classList.add("active");
      };
      headingElements.forEach( (el) => {
          let rank   = Number(el.tagName.substring(1));
          let parent = findParentElement(layer, rank, -1);
          if (oldRank > rank) layer.length = rank + 1;
          if (!layer[rank]) {
              layer[rank] = document.createElement('ol');
              if (parent.lastChild) parent.lastChild.appendChild(layer[rank]);
          }
          layer[rank].appendChild(createLink(el));
          oldRank = rank;
      });
      if (layer.length) appendToc(tocInsertElement, findParentElement(layer, 0, 1));
      links = document.querySelectorAll(`.${LINK_CLASS_NAME}`);
      links.forEach((el) => {
          el.addEventListener("click",(e)=>{
              const targetEl = document.querySelector(el.hash);
              scrollTo(0, window.pageYOffset + targetEl.getBoundingClientRect().top - 100);
              e.preventDefault();
              e.stopPropagation();
          });
      });
      tocHighlight();
      window.addEventListener("scroll", tocHighlight);
  } catch (e) {
    console.log("error", e)
  }
}


/* ----------------------------------------------------------------------------------------------------
----------------                       カレンダーのTOC                                 ------------------
----------------------------------------------------------------------------------------------------*/


const today = new Date();
let currentMonth = today.getMonth() + 1;
let currentYear = today.getFullYear();


let tocInsertElement = null;
let selectYear = null;
let selectMonth = null;
let calendar = null;
let monthAndYear = null;
let mainElement = null;


const next = ()=> {
  currentYear = (currentMonth === 12) ? currentYear + 1 : currentYear;
  currentMonth += 1;
  if(currentMonth > 12){currentMonth = 1;}
  showCalendar(currentMonth, currentYear);
}

const previous=()=> {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 12 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

const jump=()=> {
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
}


const getDatefromHeaderStr = (hstr) => {
  const with_year = /^(\s|　)*([0-9]{2,4})[\/|年|／]([0-9]{1,2})[\/|月|／]([0-9]{1,2})(.*)$/
  const no_year = /^(\s|　)*([0-9]+)[\/|月|／]([0-9]+)(.*)$/

  if (with_year.test(hstr)) {
    return hstr.replace(with_year, 'toc-id-$3-$4')
  }
  if (no_year.test(hstr)) {
    return hstr.replace(no_year, 'toc-id-$2-$3')
  }
  return ""
}


const showCalendar=(month, year)=> {
  var firstDay = (new Date(year, month)).getDay();
  tbl =tocInsertElement.querySelector("#calendar-body")

  tbl.innerHTML = "";

  monthAndYear.innerHTML = month + "月 " + year;
  selectYear.value = year;
  selectMonth.value = month;

  // creating all cells
  var date = 1;
  for (var i = 0; i < 6; i++) {
    var row = document.createElement("tr");

    for (var j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        cell = document.createElement("td");
        cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth(month, year)) {
        break;
      } else {
        cell = document.createElement("td");
        const id_str = "toc-id-" + month + "-" + date
        cell.setAttribute("id", id_str);
        cell.className = "date-picker";
        cell.innerHTML = "<span>" + date + "</span>";

        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth() + 1) {
          cell.className = "date-picker today";
        }
        row.appendChild(cell);
        date++;
      }
    }
    tbl.appendChild(row);
  }
  createLink2()
}

const daysInMonth = (iMonth, iYear) => {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}


const createLink2 = () => {
  const headingElements = mainElement.querySelectorAll('h1,h2,h3,h4,h5,h6');
  console.log(headingElements)
  for (i in headingElements) {
    const toc_id = getDatefromHeaderStr(headingElements[i].innerText);
    if (toc_id !== "") {
      headingElements[i].setAttribute("id", headingElements[i].id || uid())
      const id = headingElements[i].id;
      const tt = document.getElementById(toc_id);
      if (tt) {
        const date = tt.innerText;
        tt.innerHTML = `<a href=#${id}>${date}</a>`
        tt.className = "date-picker with-heading";
      }
    }
  }
}

const createCalenderToc = (mainEl, _tocInsertElement) => {
  mainElement = mainEl;
  tocInsertElement = _tocInsertElement;

  tocInsertElement.innerHTML = '<div class="container-calendar">' +
      '<div class="button-container-calendar">' +
         '<button id="previous" onclick="previous()">‹</button><span id="monthAndYear"></span><button id="next" onclick="next()">›</button>' +
      '</div>' +
      '<table class="table-calendar" id="calendar">' +
          '<thead id="thead-month"><tr><th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th></tr></thead>' +
          '<tbody id="calendar-body"></tbody></table>' +
      '<div class="footer-container-calendar">' +
          '<label for="month">日付指定：</label>' +
          '<select id="month" onchange="jump()"><option value=1>1月</option><option value=2>2月</option><option value=3>3月</option><option value=4>4月</option><option value=5>5月</option><option value=6>6月</option><option value=7>7月</option><option value=8>8月</option><option value=9>9月</option><option value=10>10月</option><option value=11>11月</option><option value=12>12月</option></select>' +
          '<select id="year" onchange="jump()"><option value=2000>2000</option><option value=2001>2001</option><option value=2000>2002</option><option value=2003>2003</option><option value=2010>2010</option><option value=2011>2011</option><option value=2012>2012</option><option value=2013>2013</option><option value=2014>2014</option><option value=2015>2015</option><option value=2016>2016</option><option value=2017>2017</option><option value=2018>2018</option><option value=2019>2019</option><option value=2020>2020</option><option value=2021>2021</option></select>' +
      '</div></div>'

  selectYear = tocInsertElement.querySelector("#year");
  selectMonth = tocInsertElement.querySelector("#month");
  calendar = tocInsertElement.querySelector("#calendar");
  monthAndYear = tocInsertElement.querySelector("#monthAndYear");

  showCalendar(currentMonth, currentYear);
}
