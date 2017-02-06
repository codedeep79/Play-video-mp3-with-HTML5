window.addEventListener('load', function(){
	playButton 			= document.getElementById("button-play");
	progressBar 		= document.getElementById("progressBar");
	timeField 			= document.getElementById("time-field");
	
	buttonSound 		= document.getElementById("button-sound");
	buttonSound.addEventListener('click', muteOrUnMute, false);
	
	soundBarContainer 	= document.getElementById("soundBar-container");
	soundBar			= document.getElementById("soundBar");
	progressBarContainer = document.getElementById("progressBar-container");
	
	buttonFullscreen	= document.getElementById("button-fullscreen");
	buttonScreen		= document.getElementById("button-screen");
	pauseScreen 		= document.getElementById("screen");
	
	video 				 = document.getElementById("video");
	
	video.load();
	video.addEventListener('canplay', function(){
		buttonScreen.addEventListener('click', playOrPause, false);
		playButton.addEventListener('click', playOrPause, false);
		progressBarContainer.addEventListener('click', skip, false);
		soundBarContainer.addEventListener('click', changeVolume, false);
		buttonFullscreen.addEventListener('click', fullScreen, false);
		
	}, false);
	
	
	 
}, false);

function playOrPause(){
	if (video.paused)
	{
		video.play();
		playButton.src = "image/play.png";	
		update = setInterval(updatePlayer, 30); // Sau 30 mili cập nhật lại
		pauseScreen.style.display = 'none';
	}
	else
	{
		playButton.src = "image/pause.png";	
		video.pause();
		clearInterval(update);
		pauseScreen.style.display = 'block';
	}
}

function updatePlayer(){
	var percentStage = (video.currentTime/video.duration) * 100;
	progressBar.style.width = percentStage + '%';
	timeField.innerHTML = getFormatTime();
	if (video.ended)
	{
		clearInterval(update);
		playButton.src = "image/replay.png";
	}
}

function skip(e){
	// Tua nhạc
	var mouseX = e.pageX - progressBarContainer.offsetLeft;
	var width = window.getComputedStyle(progressBarContainer).getPropertyValue('width');
	width = parseFloat(width.substr(0, width.length - 2));
	video.currentTime = (mouseX/width) * video.duration;
	
}

function getFormatTime(){
	var second = Math.round(video.currentTime);
	var minute = Math.floor(second/60);
	if (minute > 0)
		second = second - minute*60;
	if (second.toString().length === 1)
		second = '0' + second;
	
	var totalSecond = Math.round(video.duration);
	var totalMinute = Math.floor(totalSecond/60);
	if (totalMinute)
		totalSecond -= totalMinute * 60;
	if (totalSecond.toString().length === 1)
		totalSecond = '0' + totalSecond; 
	return minute +' : ' + second + " / " + totalMinute + ' : ' + totalSecond;
}

function muteOrUnMute(){
	if (!video.muted)
	{
		video.muted = true;
		buttonSound.src = "image/mute.png";
		soundBar.style.display = "block";
	}
	else
	{
		video.muted = false;
		buttonSound.src = "image/sound.png";
	}
}

function changeVolume(e){
	var mouseX = e.pageX - soundBarContainer.offsetLeft;
	var width = window.getComputedStyle(soundBarContainer).getPropertyValue('width');
	width = parseFloat(width.substr(0, width.length - 2));
	// Âm thanh
	video.volume = (mouseX / width);
	soundBar.style.width = (mouseX / width) * 100 + '%';
}

function fullScreen(){
	if (video.requestFullscreen)
		video.requestFullscreen();
	else if (video.webkitRequestFullscreen)
		video.webkitRequestFullscreen();
	else if (video.mozRequestFullscreen)
		video.mozRequestFullscreen();
	else if (video.msRequestFullscreen)
		video.msRequestFullscreen();
}
