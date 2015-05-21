window.onload = function () {
	_classTracks = "track";
	_classSelected = "selected";
	_queryTracks = "." + _classTracks;
	_menu = document.getElementById("divSide");
	_bar = document.getElementById("divBar");
	_playlist = document.getElementById("playlist");
	_controls = document.getElementById("divControls");
	_audio = document.getElementById("audio");
	_sourceMp4 = document.getElementById("sourceMp4");
	_sourceOgg = document.getElementById("sourceOgg");
	_tracks = _playlist.getElementsByClassName(_classTracks);
	_selected = _playlist.getElementsByClassName(_classSelected);

	_playlist.addEventListener("click", clickElement);
}

function menuShow() {
	_menu.style.left = "0";
}

function menuHide() {
	_menu.style.left = "";
}

function selectElement(element) {
	if (element) {
		for (x = _selected.length; x > 0; x--) {
			if (_selected[x - 1]) {
				_selected[x - 1].classList.remove(_classSelected);
			}
		}
		element.classList.add(_classSelected);
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

function playlistAdd(json) {
	var tracks = JSON.parse(json);
	for (x = 0; x < tracks.length; x++) {
		if (tracks[x]["tracks"].length > 0) {
			var album = document.createElement("div");
			var albumArt = document.createElement("img");
			var albumList = document.createElement("div");
			album.setAttribute("class", "album");
			albumArt.setAttribute("class", "albumArt");
			albumArt.setAttribute("src", "album.svg");
			albumList.setAttribute("class", "albumList");
			for (y = 0; y < tracks[x]["tracks"].length; y++) {
				var elem = tracks[x]["tracks"][y];
				var track = document.createElement("li");
				track.innerHTML = elem["number"] + " " + elem["title"];
				if (elem["artist"]) {
					track.innerHTML += " (" + elem["artist"] + ")"
				}
				track.setAttribute("src", elem["src"]);
				track.classList.add(_classTracks);
				albumList.appendChild(track);
			}
			album.appendChild(albumArt);
			album.appendChild(albumList);
			_playlist.appendChild(album);
		}
	}
}

function playPlay() {
}

function playStop() {
	alert("Stop");
}

function playPause() {
	playlistAdd("[{\"artist\": \"artister\", \"album\": \"albumer\", \"year\": 2007, \"genre\": \"songer\", \"tracks\": [{\"number\": 1, \"title\": \"track01\", \"artist\": \"artist01\", \"src\": \"somepath01\"},{\"number\": 3, \"title\": \"track03\", \"artist\": \"artist04\", \"src\": \"somepath\"},{\"number\": 10, \"title\": \"track\", \"src\": \"somepathz\"}]}]");
}

function playNext() {
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
	scrollElement(element);
}

function playPrev() {
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
	scrollElement(element);
}
