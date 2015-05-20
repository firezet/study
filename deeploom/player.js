window.onload = function () {
	_classTracks = "track";
	_classSelected = "selected";
	_queryTracks = "." + _classTracks;
	_divSide = document.getElementById("divSide");
	_playlist = document.getElementById("playlist");
	_tracks = _playlist.getElementsByClassName(_classTracks);
	_selected = _playlist.getElementsByClassName(_classSelected);

	_playlist.addEventListener("click", clickElement);
}

function menuShow() {
	_divSide.style.left = "0";
}

function menuHide() {
	_divSide.style.left = "";
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
	playlistAdd("[{\"artist\": \"artister\", \"album\": \"albumer\", \"year\": 2007, \"genre\": \"songer\", \"tracks\": [{\"number\": 1, \"title\": \"track01\", \"artist\": \"artist01\", \"path\": \"somepath01\"},{\"number\": 3, \"title\": \"track03\", \"artist\": \"artist04\", \"path\": \"somepath\"},{\"number\": 10, \"title\": \"track\", \"path\": \"somepathz\"}]}]");
}

function playNext() {
	if (_selected[0]) {
		if (_selected[0].nextElementSibling) {
			selectElement(_selected[0].nextElementSibling);
			return;
		} else {
			var nextParent = _selected[0].parentNode.parentNode.nextElementSibling;
			if (nextParent) {
				var nextChild = nextParent.querySelector(_queryTracks);
				if (nextChild) {
					selectElement(nextChild);
					return;
				}
			}
		}
	}
	selectElement(_tracks[0]);
}

function playPrev() {
	if (_selected[0]) {
		if (_selected[0].previousElementSibling) {
			selectElement(_selected[0].previousElementSibling);
			return;
		} else {
			var prevParent = _selected[0].parentNode.parentNode.previousElementSibling;
			if (prevParent) {
				var prevChilds = prevParent.querySelectorAll(_queryTracks);
				var prevChild = prevChilds[prevChilds.length - 1];
				if (prevChild) {
					selectElement(prevChild);
					return;
				}
			}
		}
	}
	selectElement(_tracks[_tracks.length - 1]);
}
