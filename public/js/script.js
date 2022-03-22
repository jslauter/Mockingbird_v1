let addSongBtn = document.getElementById('addSongBtn')
let addSongBtn1 = document.getElementById('addSongBtn1')
let songList = document.querySelector('.songList')
let songDiv = document.querySelectorAll('.songDiv')[0]

addSongBtn.addEventListener('click', function(){
  let newSongs = songDiv.cloneNode(true)
  let input = newSongs.getElementsByTagName('input')[0]
  input.value = ''
  songList.appendChild(newSongs)
})

addSongBtn1.addEventListener('click', function(){
  let newSongs = songDiv.cloneNode(true)
  let input = newSongs.getElementsByTagName('input')[0]
  input.value = ''
  songList.appendChild(newSongs)
})