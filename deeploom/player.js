window.onload = function () {
	_metadata = false;
	_classTracks = "track";
	_classSelected = "selected";
	_queryTracks = "." + _classTracks;
	_shuffleOn = "url(\"/img/shuffleon.svg\")";
	_repeatOn = "url(\"/img/repeaton.svg\")";
	_shuffle = document.getElementById("shuffle");
	_repeat = document.getElementById("repeat");
	_menu = document.getElementById("divSide");
	_bar = document.getElementById("divBar");
	_playlist = document.getElementById("playlist");
	_controls = document.getElementById("divControls");
	_controlPlay = document.getElementById("controlPlay");
	_progressBar = document.getElementById("divProgress");
	_progressLoad = document.getElementById("progressLoad");
	_progressPlay = document.getElementById("progressPlay");
	_progressText = document.getElementById("progressText");
	_volumeText = document.getElementById("volumeText");
	_controlPlayPause = "url(\"/img/pause.svg\")"
	_audio = document.getElementById("audio");
	_sourceMpeg = document.getElementById("sourceMpeg");
	_sourceOgg = document.getElementById("sourceOgg");
	_tracks = _playlist.getElementsByClassName(_classTracks);
	_selected = _playlist.getElementsByClassName(_classSelected);

	_playlist.addEventListener("click", clickElement);
	_audio.addEventListener("ended", playNext);
	_audio.addEventListener("error", playNext);
	_audio.addEventListener("progress", progressLoad);
	_audio.addEventListener("timeupdate", progressPlay);
	_progressBar.addEventListener("click", progressClick);
	_progressLoad.addEventListener("click", progressClick);
	_progressPlay.addEventListener("click", progressClick);
	_audio.addEventListener("loadedmetadata", metadataLoad);
	_audio.addEventListener("volumechange", volumeText);
}

function menuShow() {
	_menu.style.left = "0";
}

function menuHide() {
	_menu.style.left = "";
}

function shuffleOn() {
	if (_shuffle.style.backgroundImage == _shuffleOn) {
		return true;
	} else {
		return false;
	}
}

function repeatOn() {
	if (_repeat.style.backgroundImage == _repeatOn) {
		return true;
	} else {
		return false;
	}
}

function shuffleToggle() {
	if (shuffleOn()) {
		_shuffle.style.backgroundImage = "";
	} else {
		_shuffle.style.backgroundImage = _shuffleOn;
	}
}

function repeatToggle() {
	if (repeatOn()) {
		_repeat.style.backgroundImage = "";
	} else {
		_repeat.style.backgroundImage = _repeatOn;
	}
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
			playPlay();
		}
	}
}

function scrollElement(element) {
	if (element) {
		var offsetTop = window.pageYOffset + _bar.offsetHeight;
		var offsetBottom = window.pageYOffset + window.innerHeight - _controls.offsetHeight;
		if ((element.offsetTop < offsetTop) || (element.offsetTop + element.offsetHeight > offsetBottom)) {
			window.scrollTo(0, element.offsetTop + (element.offsetHeight / 2) - ((window.innerHeight - _controls.offsetHeight + _bar.offsetHeight) / 2));
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
			var album = document.createElement("div");
			var albumArt = document.createElement("img");
			var albumTitle = document.createElement("li");
			var albumList = document.createElement("li");
			album.setAttribute("class", "album");
			albumArt.setAttribute("class", "albumArt");
			albumArt.setAttribute("src", "getart.php?id=" + albums[x]["id"]);
			albumTitle.setAttribute("class", "albumTitle");
			albumTitle.innerHTML = artistsString(albums[x]["artists"]) + " - " + albums[x]["name"] + " (" + albums[x]["year"] + ", " + albums[x]["genre"] + ")"
			albumList.setAttribute("class", "albumList");
			for (var y = 0; y < albums[x]["tracks"].length; y++) {
				var tracks = albums[x]["tracks"][y];
				var track = document.createElement("li");
				track.innerHTML = tracks["number"] + ". " + tracks["name"];
				if (tracks["comment"]) {
					track.innerHTML += " (" + tracks["comment"] + ")";
				}
				if (tracks["artists"].length > 0) {
					track.innerHTML += " - " + artistsString(tracks["artists"]);
				}
				track.setAttribute("src", tracks["id"]);
				track.classList.add(_classTracks);
				albumList.appendChild(track);
			}
			album.appendChild(albumArt);
			album.appendChild(albumTitle);
			album.appendChild(albumList);
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
	var element = _tracks[0];
	if (_selected[0]) {
		if (_selected[0].nextElementSibling) {
			element = _selected[0].nextElementSibling;
		} else {
			var nextParent = _selected[0].parentNode.parentNode.nextElementSibling;
			if (nextParent) {
				var nextChild = nextParent.querySelector(_queryTracks);
				if (nextChild) {
					element = nextChild;
				}
			}
		}
	}
	selectElement(element);
}

function playPrev() {
	playStop();
	var element = _tracks[_tracks.length - 1];
	if (_selected[0]) {
		if (_selected[0].previousElementSibling) {
			element = _selected[0].previousElementSibling;
		} else {
			var prevParent = _selected[0].parentNode.parentNode.previousElementSibling;
			if (prevParent) {
				var prevChilds = prevParent.querySelectorAll(_queryTracks);
				var prevChild = prevChilds[prevChilds.length - 1];
				if (prevChild) {
					element = prevChild;
				}
			}
		}
	}
	selectElement(element);
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
}

//temp

function add() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200 ) {
			playlistAdd(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", "/getlist.php", true);
	xmlhttp.send();
}
