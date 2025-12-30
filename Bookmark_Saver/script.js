const nameInput = document.getElementById('bookmark-name');
const urlInput = document.getElementById('bookmark-url');
const bookmarkBtn = document.getElementById('bookmark-btn');
const bookmarkList = document.getElementById('bookmark-list');

document.addEventListener('DOMContentLoaded',loadBookmark);

bookmarkBtn.addEventListener('click',function () {
  const name = nameInput.value.trim();
  const url = urlInput.value.trim();

  if(!name || !url){
      alert("Please enter both name and url");
      return
  }else{
    if(!url.startsWith("http://") && !url.startsWith("https://")){
      alert("Please enter valid url starting with http:// or https://");
      return ;
    }
    addbookmark(name,url);
    saveBookmark(name,url);
    nameInput.value = "";
    urlInput.value = "";
  }

})

function addbookmark(name,url){
  const li = document.createElement("li");
  const link = document.createElement("a");
  link.href = url;
  link.textContent = name;
  link.target = "_blank";
  
  const removebtn = document.createElement("button");
  removebtn.textContent = "Remove";
  removebtn.addEventListener("click",function (){
    bookmarkList.removeChild(li);
    removebookmarklocalstorage(name,url);
  })
  li.appendChild(link);
  li.appendChild(removebtn);
  bookmarkList.appendChild(li);  
}

function saveBookmark(name,url){
  const bookmarks = getBookmarksfromStorage();
  bookmarks.push({name,url});
  localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
}

function getBookmarksfromStorage(){
  const bookmarks = localStorage.getItem("bookmarks");
  return bookmarks ? JSON.parse(bookmarks):[]
}


function loadBookmark(){
  const bookmarks = getBookmarksfromStorage();
  bookmarks.forEach((bookmark) => {
    addbookmark(bookmark.name,bookmark.url);
  })
}

function removebookmarklocalstorage(name,url){
  let bookmarks = getBookmarksfromStorage();
  bookmarks = bookmarks.filter((bookmark) => bookmark.name !== name || bookmark.url !== url);
  localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
}