window.onload = function () {
	_metadata = false;
	_classTracks = "track";
	_classSelected = "selected";
	_shuffleArray = [];
	_shuffleOn = "url(\"/img/shuffleon.svg\")";
	_repeatOn = "url(\"/img/repeaton.svg\")";
	_shuffle = document.getElementById("shuffle");
	_repeat = document.getElementById("repeat");
	_shuffleTop = document.getElementById("shuffleTop");
	_repeatTop = document.getElementById("repeatTop");
	_menu = document.getElementById("divSide");
	_bar = document.getElementById("divBar");
	_playlist = document.getElementById("playlist");
	_search = document.getElementById("searchResult");
	_controls = document.getElementById("divControls");
	_controlPlay = document.getElementById("controlPlay");
	_progressBar = document.getElementById("divProgress");
	_progressLoad = document.getElementById("progressLoad");
	_progressPlay = document.getElementById("progressPlay");
	_progressText = document.getElementById("progressText");
	_volumeText = document.getElementById("volumeText");
	_volumeTextTop = document.getElementById("volumeTextTop");
	_controlPlayPause = "url(\"/img/pause.svg\")"
	_audio = document.getElementById("audio");
	_sourceMpeg = document.getElementById("sourceMpeg");
	_sourceOgg = document.getElementById("sourceOgg");
	_tracks = _playlist.getElementsByClassName(_classTracks);
	_selected = _playlist.getElementsByClassName(_classSelected);

	_playlist.addEventListener("click", clickElement);
	_audio.addEventListener("ended", eventNext);
	_audio.addEventListener("error", eventNext);
	_audio.addEventListener("progress", progressLoad);
	_audio.addEventListener("timeupdate", progressPlay);
	_progressBar.addEventListener("click", progressClick);
	_progressLoad.addEventListener("click", progressClick);
	_progressPlay.addEventListener("click", progressClick);
	_audio.addEventListener("loadedmetadata", metadataLoad);
	_audio.addEventListener("volumechange", volumeText);
	document.addEventListener("keydown", hotkey);
}

function menuShow() {
	_menu.style.left = "0";
}

function menuHide() {
	_menu.style.left = "";
}

function shuffleOn() {
	if (_shuffle.style.backgroundImage != "") {
		return true;
	} else {
		return false;
	}
}

function repeatOn() {
	if (_repeat.style.backgroundImage != "") {
		return true;
	} else {
		return false;
	}
}

function shuffleToggle() {
	if (shuffleOn()) {
		_shuffle.style.backgroundImage = "";
		_shuffleArray = [];
	} else {
		_shuffle.style.backgroundImage = _shuffleOn;
	}
	_shuffleTop.style.backgroundImage = _shuffle.style.backgroundImage;
}

function repeatToggle() {
	if (repeatOn()) {
		_repeat.style.backgroundImage = "";
	} else {
		_repeat.style.backgroundImage = _repeatOn;
	}
	_repeatTop.style.backgroundImage = _repeat.style.backgroundImage;
}

function random(max) {
	return Math.floor(Math.random() * max);
}

function elementIndex(element) {
	if (element) {
		for (var x = 0; x < _tracks.length; x++) {
			if (_tracks[x] === element) {
				return x;
			}
		}
	}
	return -1;
}

function shuffleIndex(element) {
	for (var x = 0; x < _shuffleArray.length; x++) {
		if (_shuffleArray[x] == element) {
			return x;
		}
	}
	return -1;
}

function createArray(max) {
	var array = [];
	for (var x = 0; x < max; x++) {
		array[x] = x;
	}
	return array;
}

function shuffleArray(array) {
	var index = array.length, randomIndex, temp;
	while (index > 0) {
		randomIndex = Math.floor(Math.random() * index);
		index--;
		temp = array[index];
		array[index] = array[randomIndex];
		array[randomIndex] = temp;
	}
	return array;
}

function selectElement(element) {
	if (element) {
		for (var x = _selected.length; x > 0; x--) {
			if (_selected[x - 1]) {
				_selected[x - 1].classList.remove(_classSelected);
			}
		}
		element.classList.add(_classSelected);
		var name = element.getAttribute("src");
		if (name) {
			_sourceMpeg.setAttribute("src", "/getsource.php?id=" + name + "&name=null.m4a");
			_sourceOgg.setAttribute("src", "/getsource.php?id=" + name + "&name=null.ogg");
			_metadata = false;
			_progressLoad.style.width = "0%";
			_progressPlay.style.width = "0%";
			_progressText.innerHTML = "0:00";
			_audio.load();
			scrollElement(element);
			document.title = element.getElementsByClassName("trackName")[0].innerHTML;
			if(element.getElementsByClassName("trackComment")[0]) {
				document.title += element.getElementsByClassName("trackComment")[0].innerHTML;
			}
			playPlay();
		}
	}
}

function totalOffsetTop(element) {
	var offset = element.offsetTop;
	if (element.offsetParent) {
		offset += totalOffsetTop(element.offsetParent);
	}
	return offset;
}

function scrollElement(element) {
	if (element) {
		var offsetTop = window.pageYOffset + _bar.offsetHeight;
		var offsetBottom = window.pageYOffset + window.innerHeight - _controls.offsetHeight;
		var offset = totalOffsetTop(element);
		if ((offset < offsetTop) || (offset + element.offsetHeight > offsetBottom)) {
			window.scrollTo(0, offset + (element.offsetHeight / 2) - ((window.innerHeight - _controls.offsetHeight + _bar.offsetHeight) / 2));
		}
	}
}

function clickElement(element) {
	var elem = element.target;
	if (elem && elem.classList.contains(_classTracks)) {
		selectElement(elem);
	}
}

function playlistClear() {
	_playlist.innerHTML = "";
}

function artistsString(artists) {
	string = [];
	for (var x = 0; x < artists.length; x++) {
		string[x] = artists[x]["name"];
	}
	return string.sort().join(", ");
}

function playlistAdd(json) {
	var albums = JSON.parse(json);
	for (var x = 0; x < albums.length; x++) {
		if (albums[x]["tracks"].length > 0) {
			var album = document.createElement("tr");
			var right = document.createElement("td");
			var left = document.createElement("td");
			var albumArt = document.createElement("img");
			var albumTitle = document.createElement("tr");
			var albumList = document.createElement("table");
			album.setAttribute("class", "album");
			if (albums[x]["tracks"].length > 1) {
				albumArt.setAttribute("class", "albumArt");
			} else {
				albumArt.setAttribute("class", "albumArtSmall");
			}
			left.setAttribute("class", "albumLeft");
			right.setAttribute("class", "albumRight");
			albumArt.setAttribute("src", "getart.php?id=" + albums[x]["id"]);
			albumTitle.innerHTML = "<td class=\"albumTitle\">" + artistsString(albums[x]["artists"]) + " - " + albums[x]["name"] + " (" + albums[x]["year"] + ", " + albums[x]["genre"] + ")</td>"
			if (albums[x]["tracks"].length > 1) {
				var deleteButton = document.createElement("td");
				deleteButton.setAttribute("onclick", "deleteAlbum(this.parentNode.parentNode.parentNode.parentNode)");
				deleteButton.setAttribute("class", "deleteButton");
				albumTitle.appendChild(deleteButton);
			}
			albumList.setAttribute("class", "albumList");
			albumList.appendChild(albumTitle);
			for (var y = 0; y < albums[x]["tracks"].length; y++) {
				var tracks = albums[x]["tracks"][y];
				var trackRow = document.createElement("tr");
				var track = document.createElement("td");
				var trackName = document.createElement("span");
				var trackComment = document.createElement("span");
				var trackArtists = document.createElement("span");
				trackName.innerHTML = tracks["number"] + ". " + tracks["name"];
				trackName.classList.add("trackName");
				track.appendChild(trackName);
				if (tracks["comment"]) {
					trackComment.innerHTML = " (" + tracks["comment"] + ")";
					trackComment.classList.add("trackComment");
					track.appendChild(trackComment);
				}
				if (tracks["artists"].length > 0) {
					trackArtists.innerHTML += " - " + artistsString(tracks["artists"]);
					trackArtists.classList.add("trackArtists");
					track.appendChild(trackArtists);
				}
				track.setAttribute("src", tracks["id"]);
				track.classList.add(_classTracks);
				var deleteButton = document.createElement("td");
				deleteButton.setAttribute("onclick", "deleteTrack(this.parentNode)");
				deleteButton.setAttribute("class", "deleteButton");
				trackRow.appendChild(track);
				trackRow.appendChild(deleteButton);
				albumList.appendChild(trackRow);
			}
			left.appendChild(albumArt);
			right.appendChild(albumList);
			album.appendChild(left);
			album.appendChild(right);
			_playlist.appendChild(album);
		}
	}
}

function playPlay() {
	if ( _sourceMpeg.getAttribute("src") && _sourceOgg.getAttribute("src") ) {
		_controlPlay.style.backgroundImage = _controlPlayPause;
		_audio.play();
	} else {
		playNext();
	}
}

function playStop() {
	_controlPlay.style.backgroundImage = "";
	_audio.pause();
}

function playPause() {
	if (!_audio.paused) {
		playStop();
	} else {
		playPlay();
	}
}

function playNext() {
	playStop();
	if (shuffleOn()) {
		shuffleNext();
	} else {
		var index = elementIndex(_selected[0]);
		if (index >= _tracks.length - 1) {
			index = -1;
		}
		selectElement(_tracks[index + 1]);
	}
}

function shuffleCreate() {
	if (_shuffleArray.length != _tracks.length) {
		_shuffleArray=shuffleArray(createArray(_tracks.length));
	}
}

function shuffleNext() {
	shuffleCreate();
	var index = elementIndex(_selected[0]);
	var arrayIndex = 0;
	if (index < 0) {
		index = _shuffleArray[_tracks.length - 1];
	}
	arrayIndex = shuffleIndex(index);
	if (arrayIndex >= _tracks.length - 1) {
		arrayIndex = -1
	}
	selectElement(_tracks[_shuffleArray[arrayIndex + 1]]);
}

function eventNext() {
	playStop();
	if (repeatOn()) {
		_audio.currentTime = 0;
		playPlay();
	} else {
		playNext();
	}
}

function shufflePrev() {
	shuffleCreate();
	var index = elementIndex(_selected[0]);
	var arrayIndex = 0;
	if (index < 0) {
		index = _shuffleArray[0];
	}
	arrayIndex = shuffleIndex(index);
	if (arrayIndex <= 0) {
		arrayIndex = _tracks.length;
	}
	selectElement(_tracks[_shuffleArray[arrayIndex - 1]]);
}

function playPrev() {
	playStop();
	if (shuffleOn()) {
		shufflePrev();
	} else {
		var index = elementIndex(_selected[0]);
		if (index <= 0) {
			index = _tracks.length;
		}
		selectElement(_tracks[index - 1]);
	}
}

function progressLoad() {
	if (_metadata) {
		var load = ((100 / _audio.duration) * _audio.buffered.end(0));
		_progressLoad.style.width = load + "%";
	}
}

function secondsString(time) {
	time = Math.floor(time);
	var minutes = time / 60;
	minutes = Math.floor(minutes);
	var seconds = time - minutes * 60;
	seconds = Math.floor(seconds);
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	return minutes + ":" + seconds;
}

function progressPlay() {
	if (_metadata) {
		var play = (100 / _audio.duration) * _audio.currentTime;
		var time = secondsString(_audio.currentTime) + "/" + secondsString(_audio.duration);
		_progressPlay.style.width = play + "%";
		_progressText.innerHTML = time;
	}
}

function progressClick(element) {
	if (_metadata) {
		var time = (_audio.duration / 100) * (100 / _progressBar.clientWidth) * (element.clientX - _progressBar.offsetLeft);
		_audio.currentTime = time;
	}
}

function metadataLoad() {
	_metadata = true;
	progressLoad();
}

function volumeUp() {
	if (_audio.volume < 1) {
		var volume = Math.floor(_audio.volume * 100);
		volume += 5;
		_audio.volume = volume / 100;
	}
}

function volumeDown() {
	if (_audio.volume > 0) {
		var volume = Math.floor(_audio.volume * 100);
		volume -= 5;
		_audio.volume = volume / 100;
	}
}

function volumeText() {
	_volumeText.innerHTML = Math.floor(_audio.volume * 100) + "%";
	_volumeTextTop.innerHTML = _volumeText.innerHTML;
}

function hotkey(key) {
	switch(key.keyCode) {
		case 80:
			playPause();
			break;
		case 75:
			playPrev();
			break;
		case 76:
			playNext();
			break;
		case 188:
			volumeDown();
			break;
		case 190:
			volumeUp();
			break;
		case 82:
			repeatToggle();
			break;
		case 83:
			shuffleToggle();
			break;
	}
}

function deleteAlbum(element) {
		element.parentNode.removeChild(element);
}

function deleteTrack(element) {
	if (element.parentNode.getElementsByClassName(_classTracks).length < 2) {
		deleteAlbum(element.parentNode.parentNode.parentNode);
	} else {
		if (element.parentNode.getElementsByClassName(_classTracks).length < 3) {
			element.parentNode.parentNode.parentNode.getElementsByClassName("albumArt")[0].setAttribute("class", "albumArtSmall");
			element.parentNode.firstChild.removeChild(element.parentNode.getElementsByClassName("deleteButton")[0]);
		}
		element.parentNode.removeChild(element);
	}
}

function searchClear() {
	_search.innerHTML = "";
}

function searchArtistAdd(json) {
	var result = JSON.parse(json);
	for (var x = 0; x < result.length; x++) {
		var artist = document.createElement("li");
		artist.setAttribute("class", "menuitem");
		artist.setAttribute("onclick", "addArtist(" + result[x]["id"] + ")");
		artist.innerHTML = "Artist: " + result[x]["name"];
		_search.appendChild(artist);
	}
}

function searchAlbumAdd(json) {
	var result = JSON.parse(json);
	for (var x = 0; x < result.length; x++) {
		var artist = document.createElement("li");
		artist.setAttribute("class", "menuitem");
		artist.setAttribute("onclick", "addAlbum(" + result[x]["id"] + ")");
		artist.innerHTML = "Album: " + result[x]["name"] + " (" + result[x]["year"] + ")";
		_search.appendChild(artist);
	}
}

function searchTrackAdd(json) {
	var result = JSON.parse(json);
	for (var x = 0; x < result.length; x++) {
		var artist = document.createElement("li");
		artist.setAttribute("class", "menuitem");
		artist.setAttribute("onclick", "addTrack(" + result[x]["id"] + ")");
		artist.innerHTML = "Track: " + result[x]["name"];
		if (result[x]["comment"] != null) {
			artist.innerHTML += " (" + result[x]["comment"] + ")";
		}
		_search.appendChild(artist);
	}
}


function searchEnter(event) {
	if (event.keyCode == 13) {
		search();
	}
}

//temp

function addArtist(id) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200 ) {
			playlistAdd(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", "/getartist.php?id=" + id, true);
	xmlhttp.send();
}

function addAlbum(id) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200 ) {
			playlistAdd(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", "/getalbum.php?id=" + id, true);
	xmlhttp.send();
}

function addTrack(id) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200 ) {
			playlistAdd(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", "/gettrack.php?id=" + id, true);
	xmlhttp.send();
}

function addRandom() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200 ) {
			playlistAdd(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", "/getrandom.php?count=10", true);
	xmlhttp.send();
}

function search() {
	searchClear();
	var xmlhttp;
	var search = document.getElementById("search").value;
	if (search.length < 2) {
		var item = document.createElement("li");
		item.setAttribute("class", "menuitem");
		item.innerHTML = "Minimum 2 characters";
		_search.appendChild(item);
		return;
	}
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200 ) {
			searchArtistAdd(xmlhttp.responseText);
			searchAlbums();
		}
	}
	xmlhttp.open("GET", "/getartists.php?name=" + search, true);
	xmlhttp.send();
}

function searchAlbums() {
	var xmlhttp;
	var search = document.getElementById("search").value;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200 ) {
			searchAlbumAdd(xmlhttp.responseText);
			searchTracks();
		}
	}
	xmlhttp.open("GET", "/getalbums.php?name=" + search, true);
	xmlhttp.send();
}

function searchTracks() {
	var xmlhttp;
	var search = document.getElementById("search").value;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200 ) {
			searchTrackAdd(xmlhttp.responseText);
			document.getElementById("search").value = "";
			if (_search.getElementsByClassName("menuitem").length < 1) {
				var item = document.createElement("li");
				item.setAttribute("class", "menuitem");
				item.innerHTML = "Nothing found";
				_search.appendChild(item);
			}
		}
	}
	xmlhttp.open("GET", "/gettracks.php?name=" + search, true);
	xmlhttp.send();
}
