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
	_search = document.getElementById("search");
	_searchInput = document.getElementById("searchInput");
	_searchResult = document.getElementById("searchResult");
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
	_search.addEventListener("click", clickSearch);
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

	if (document.cookie.search("PHPSESSID=") != -1) {
		sessionLoad();
	} else {
		addRandom();
	}
}

function menuShow() {
	_menu.style.display = "block";
}

function menuHide() {
	_menu.style.display = "";
}

function searchClear() {
	_search.innerHTML = "";
}

function searchShow() {
	_search.parentNode.style.display = "block";
}

function searchHide() {
	searchClear();
	_search.parentNode.style.display = "";
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

function artistsStringTitle(artists, dest) {
	string = [];
	for (var x = 0; x < artists.length; x++) {
		string[x] = artists[x]["name"];
		if (artists[x]["wiki"] != null) {
			if (artists[x]["wiki"].length > 0) {
				string[x] += " <a href=\"http://" + artists[x]["wiki"] + "\" target=\"_blank\"><img src=\"/img/wiki.svg\" class=\"wiki\"/></a>";
			}
		}
		if (artists[x]["discogs"] != null) {
			if (artists[x]["discogs"].length > 0) {
				string[x] += " <a href=\"http://" + artists[x]["discogs"] + "\" target=\"_blank\"><img src=\"/img/discogs.svg\" class=\"discogs\"/></a>";
			}
		}
		if (dest != "playlist") {
			string[x] += " <img src=\"/img/add.svg\" class=\"addArtist\" onclick=\"addArtist(" + artists[x]["id"] + ")\"/>";
		}
	}
	return string.sort().join(", ");
}

function artistsString(artists) {
	string = [];
	for (var x = 0; x < artists.length; x++) {
		string[x] = artists[x]["name"];
	}
	return string.sort().join(", ");
}

function jsonAdd(json, dest) {
	var albums = JSON.parse(json);
	for (var x = 0; x < albums.length; x++) {
		if (albums[x]["tracks"].length > 0) {
			var albumRow = document.createElement("tr");
			var albumArtCell = document.createElement("td");
			var albumListCell = document.createElement("td");
			var albumArt = document.createElement("img");
			var albumList = document.createElement("table");
			var albumTitleRow = document.createElement("tr");
			var albumTitleCell = document.createElement("td");
			albumRow.setAttribute("class", "album");
			albumArtCell.setAttribute("class", "albumLeft");
			if (albums[x]["tracks"].length > 1) {
				albumArt.setAttribute("class", "albumArt");
			} else {
				albumArt.setAttribute("class", "albumArtSmall");
			}
			albumArt.setAttribute("src", "getart.php?id=" + albums[x]["id"]);
			albumArtCell.appendChild(albumArt);
			albumList.setAttribute("class", "albumList");
			albumListCell.setAttribute("class", "albumRight");
			albumTitleCell.setAttribute("class", "albumTitle");
			albumTitleCell.innerHTML = artistsStringTitle(albums[x]["artists"], dest) + " - " + albums[x]["name"];
			if (albums[x]["comment"] != null) {
				if (albums[x]["comment"].length > 0) {
					albumTitleCell.innerHTML += " (" + albums[x]["comment"] + ")";
				}
			}
			albumTitleCell.innerHTML += " (" + albums[x]["year"] + ", " + albums[x]["genre"] + ")";
			if (albums[x]["wiki"] != null) {
				if (albums[x]["wiki"].length > 0) {
					albumTitleCell.innerHTML += " <a href=\"http://" + albums[x]["wiki"] + "\" target=\"_blank\"><img src=\"/img/wiki.svg\" class=\"wiki\"/></a>";
				}
			}
			if (albums[x]["discogs"] != null) {
				if (albums[x]["discogs"].length > 0) {
					albumTitleCell.innerHTML += " <a href=\"http://" + albums[x]["discogs"] + "\" target=\"_blank\"><img src=\"/img/discogs.svg\" class=\"discogs\"/></a>";
				}
			}
			albumTitleRow.appendChild(albumTitleCell);
			if (dest == "playlist") {
				if (albums[x]["tracks"].length > 1) {
					var deleteButton = document.createElement("td");
					deleteButton.setAttribute("onclick", "deleteAlbum(this.parentNode.parentNode.parentNode.parentNode)");
					deleteButton.setAttribute("class", "deleteButton");
					albumTitleRow.appendChild(deleteButton);
				}
			} else {
				var addButton = document.createElement("td");
				addButton.setAttribute("onclick", "addAlbum(" + albums[x]["id"] + ")");
				addButton.setAttribute("class", "addButton");
				albumTitleRow.appendChild(addButton);
			}
			albumList.appendChild(albumTitleRow);
			for (var y = 0; y < albums[x]["tracks"].length; y++) {
				var track = albums[x]["tracks"][y];
				var trackRow = document.createElement("tr");
				var trackCell = document.createElement("td");
				var trackName = document.createElement("span");
				var trackComment = document.createElement("span");
				var trackArtists = document.createElement("span");
				trackName.innerHTML = track["number"] + ". " + track["name"];
				trackName.classList.add("trackName");
				trackCell.appendChild(trackName);
				if (track["comment"]) {
					trackComment.innerHTML = " (" + track["comment"] + ")";
					trackComment.classList.add("trackComment");
					trackCell.appendChild(trackComment);
				}
				if (track["artists"].length > 0) {
					trackArtists.innerHTML += " - " + artistsString(track["artists"]);
					trackArtists.classList.add("trackArtists");
					trackCell.appendChild(trackArtists);
				}
				trackCell.setAttribute("src", track["id"]);
				trackCell.classList.add(_classTracks);
				trackRow.appendChild(trackCell);
				if (dest == "playlist") {
					var deleteButton = document.createElement("td");
					deleteButton.setAttribute("onclick", "deleteTrack(this.parentNode)");
					deleteButton.setAttribute("class", "deleteButton");
					trackRow.appendChild(deleteButton);
				} else {
					var addButton = document.createElement("td");
					addButton.setAttribute("onclick", "addTrack(" + track["id"] + ")");
					addButton.setAttribute("class", "addButton");
					trackRow.appendChild(addButton);
				}
				albumList.appendChild(trackRow);
			}
			albumListCell.appendChild(albumList);
			albumRow.appendChild(albumArtCell);
			albumRow.appendChild(albumListCell);
			if (dest == "playlist") {
				_playlist.appendChild(albumRow);
			} else {
				_search.appendChild(albumRow);
			}
		}
	}
	sessionSave();
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
	if( document.body !== document.activeElement) {
		return;
	}
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
	if (confirm("Delete Album?")) {
		element.parentNode.removeChild(element);
		sessionSave();
	}
}

function deleteAlbumForce(element) {
	element.parentNode.removeChild(element);
	sessionSave();
}

function deleteTrack(element) {
	if (confirm("Delete track?")) {
		if (element.parentNode.getElementsByClassName(_classTracks).length < 2) {
			deleteAlbumForce(element.parentNode.parentNode.parentNode);
		} else {
			if (element.parentNode.getElementsByClassName(_classTracks).length < 3) {
				element.parentNode.parentNode.parentNode.getElementsByClassName("albumArt")[0].setAttribute("class", "albumArtSmall");
				element.parentNode.firstChild.removeChild(element.parentNode.getElementsByClassName("deleteButton")[0]);
			}
			element.parentNode.removeChild(element);
		}
		sessionSave();
	}
}

function searchResultClear() {
	_searchResult.innerHTML = "";
}

function searchArtistAdd(json) {
	var result = JSON.parse(json);
	for (var x = 0; x < result.length; x++) {
		var artist = document.createElement("li");
		artist.setAttribute("class", "menuitem");
		artist.setAttribute("onclick", "searchShowArtist(" + result[x]["id"] + ")");
		artist.innerHTML = "Artist: " + result[x]["name"];
		_searchResult.appendChild(artist);
	}
}

function searchAlbumAdd(json) {
	var result = JSON.parse(json);
	for (var x = 0; x < result.length; x++) {
		var artist = document.createElement("li");
		artist.setAttribute("class", "menuitem");
		artist.setAttribute("onclick", "searchShowAlbum(" + result[x]["id"] + ")");
		artist.innerHTML = "Album: " + result[x]["name"] + " (" + result[x]["year"] + ")";
		_searchResult.appendChild(artist);
	}
}

function searchTrackAdd(json) {
	var result = JSON.parse(json);
	for (var x = 0; x < result.length; x++) {
		var artist = document.createElement("li");
		artist.setAttribute("class", "menuitem");
		artist.setAttribute("onclick", "searchShowTrack(" + result[x]["id"] + ")");
		artist.innerHTML = "Track: " + result[x]["name"];
		if (result[x]["comment"] != null) {
			artist.innerHTML += " (" + result[x]["comment"] + ")";
		}
		_searchResult.appendChild(artist);
	}
}


function searchEnter(event) {
	if (event.keyCode == 13) {
		search();
	}
}

function searchShowAjax(path) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200 ) {
			jsonAdd(xmlhttp.responseText, "search");
		}
	}
	xmlhttp.open("GET", path, true);
	xmlhttp.send();
}

function playlistAjax(path) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200 ) {
			jsonAdd(xmlhttp.responseText, "playlist");
		}
	}
	xmlhttp.open("GET", path, true);
	xmlhttp.send();
}

function searchArtistAjax(name) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200 ) {
			searchArtistAdd(xmlhttp.responseText);
			searchAlbumAjax(name);
		}
	}
	xmlhttp.open("GET", "/getartists.php?name=" + name, true);
	xmlhttp.send();
}

function searchAlbumAjax(name) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200 ) {
			searchAlbumAdd(xmlhttp.responseText);
			searchTrackAjax(name);
		}
	}
	xmlhttp.open("GET", "/getalbums.php?name=" + name, true);
	xmlhttp.send();
}

function searchTrackAjax(name) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200 ) {
			searchTrackAdd(xmlhttp.responseText);
			_searchInput.value = "";
			if (_searchResult.getElementsByClassName("menuitem").length < 1) {
				var item = document.createElement("li");
				item.setAttribute("class", "menuitemerror");
				item.innerHTML = "Nothing found";
				_searchResult.appendChild(item);
			}
		}
	}
	xmlhttp.open("GET", "/gettracks.php?name=" + name, true);
	xmlhttp.send();
}

function search() {
	searchResultClear();
	if (_searchInput.value.length < 2) {
		var item = document.createElement("li");
		item.setAttribute("class", "menuitemerror");
		item.innerHTML = "Minimum 2 characters";
		_searchResult.appendChild(item);
		return;
	}
	searchArtistAjax(_searchInput.value)
}

function searchShowArtist(id) {
	searchClear();
	searchShowAjax("/getartist.php?id=" + id);
	searchShow();
}

function searchShowAlbum(id) {
	searchClear();
	searchShowAjax("/getalbum.php?id=" + id);
	searchShow();
}

function searchShowTrack(id) {
	searchClear();
	searchShowAjax("/gettrack.php?id=" + id);
	searchShow();
}

function addArtist(id) {
	playlistAjax("/getartist.php?id=" + id);
}

function addAlbum(id) {
	playlistAjax("/getalbum.php?id=" + id);
}

function addTrack(id) {
	playlistAjax("/gettrack.php?id=" + id);
}

function selectSearch(element) {
	if (element) {
		var name = element.getAttribute("src");
		if (name) {
			_sourceMpeg.setAttribute("src", "/getsource.php?id=" + name + "&name=null.m4a");
			_sourceOgg.setAttribute("src", "/getsource.php?id=" + name + "&name=null.ogg");
			_metadata = false;
			_progressLoad.style.width = "0%";
			_progressPlay.style.width = "0%";
			_progressText.innerHTML = "0:00";
			_audio.load();
			document.title = element.getElementsByClassName("trackName")[0].innerHTML;
			if(element.getElementsByClassName("trackComment")[0]) {
				document.title += element.getElementsByClassName("trackComment")[0].innerHTML;
			}
			playPlay();
		}
	}
}

function clickSearch(element) {
	var elem = element.target;
	if (elem && elem.classList.contains(_classTracks)) {
		selectSearch(elem);
	}
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
			jsonAdd(xmlhttp.responseText, "playlist");
		}
	}
	xmlhttp.open("GET", "/getrandom.php?count=" + 10, true);
	xmlhttp.send();
}

function save() {
	var save = String();
	for (var x = 0; x < _tracks.length; x++) {
		save += _tracks[x].getAttribute("src") + ";";
	}
	return btoa(save);
}

function load(base) {
	playlistClear();
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200 ) {
			jsonAdd(xmlhttp.responseText, "playlist");
		}
	}
	xmlhttp.open("GET", "/load.php?base=" + base, true);
	xmlhttp.send();
}

function sessionSave() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET", "/sessionsave.php?base=" + save(), true);
	xmlhttp.send();
}

function sessionLoad() {
	playlistClear();
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200 ) {
			jsonAdd(xmlhttp.responseText, "playlist");
		}
	}
	xmlhttp.open("GET", "/sessionload.php", true);
	xmlhttp.send();
}

function playlistSave() {
	window.prompt("Save", save());
}

function playlistLoad() {
	var base = window.prompt("Load");
	if (base != null) {
		load(base);
	}
}
