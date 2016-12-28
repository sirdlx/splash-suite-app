import React, {Component, PropTypes, cloneElement} from 'react';

import {VideoPlayerUtils, readableDuration} from '../util/VideoPlayerUtils'

const styles = {
    root: {
        padding: 16
    },

    videoPlayer: {
        width: '100%'
    }

};

class VideoPlayer extends Component {

    static defaultState = {
        item: {},
        currentTick: readableDuration(0),
        durationTick: readableDuration(0),
        duration: 0,
        videoTimeline: 0,
        src: '',
        loading: true
    };

    constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            width: '100%',
            muted: false,
            poster: '',
            preload: true,
            height: '200px',
            src: '',
            autoplay: false,
            loop: false
        };
    }

    shouldComponentUpdate(newProps, newState) {
        // console.log(newProps, newState);
        // console.log(window.listPage.lastListName);
        // if (params.listName != window.listPage.lastListName) {
        //     window.listPage.lastListName = params.listName
        //     this.loadItems(window.listPage.lastListName);
        //
        // }
        return true;
    }

    componentWillUpdate(e) {

        // let params = e.params
        // if (params.listName != window.listPage.lastListName) {
        //     window.listPage.lastListName = params.listName
        //     this.loadItems(window.listPage.lastListName);
        //     console.log(window.listPage.lastListName);
        // }

        //
        //
        // if (params['listName']) {
        //
        // } else {
        //   console.log('load with params');
        //   let listName = params['listName']
        //   this.loadItems(listName);
        //   console.log('load all items');
        //   this.loadAllItems();
        // }

    }

    componentDidMount() {
        // setInterval(this.loadItems, this.props.pollInterval);
        // this.handleResize();
        // window.addEventListener('resize', this.handleResize.bind(this));
    }
    componentWillUnmount() {
        // window.removeEventListener('resize', this.handleResize.bind(this));
    }

    _canplay(event) {
        //console.log(event);
        let video = document.getElementById('videoPlayer');
        this.set('currentTick', readableDuration(video.currentTime));
        this.set('durationTick', readableDuration(video.duration));
    }
    _youtubeTimeupdate(currentTime) {
        // this.set('currentTime', document.getElementById('youtubePlayer').currentTime);
        this.set('duration', document.getElementById('youtubePlayer').duration);
        this.set('videoTimeline', (currentTime / this.duration) * 100);
        // console.log(this.videoTimeline);
    }
    _timeupdate(event) {
        //console.log(event.timeStamp );
        let video = document.getElementById('videoPlayer');
        // if (video.paused || video.ended)
        //     this.set('playPauseIcon', 'av:play-arrow');
        // else
        //     this.set('playPauseIcon', 'av:pause');

        this.set('currentTick', readableDuration(video.currentTime));
        this.set('durationTick', readableDuration(video.duration));
        // Setting the video parameters to the component
        this.set('duration', video.duration);
        this.set('currentTime', video.currentTime);
        //console.log((video.currentTime / video.duration)*100);
        this.set('videoTimeline', (video.currentTime / video.duration) * 100);
    }
    setTimelineFrame(event) {
        // console.log('setTimelineFrame');
        if (this.youtubeId) {
            console.log((event.target.value / 100) * document.getElementById('youtubePlayer').duration);
            // this.set('videoTimeline', ((event.target.value/100) / this.duration) * 100);
            document.getElementById('youtubePlayer').seekTo((event.target.value / 100) * document.getElementById('youtubePlayer').duration);
        } else {
            let video = document.getElementById('videoPlayer');
            //console.log(video);
            video.currentTime = Math.floor(video.duration * event.target.getAttribute('value') / 100);
        }
    }
    _changeVolume(event) {
        if (this.youtubeId && typeof event === 'number') {
            this.set('videoVolume', event);
        } else {}
        //         if (this.videoVolume / 100) {
        //             this.set('volumeIcon', 'av:volume-up');
        //         } else {
        //             this.set('volumeIcon', 'av:volume-off');
        //         }
    }

    play() {
        return document.getElementById('videoPlayer').play();
    }
    pause() {
        if (this.youtubeId) {
            document.getElementById('youtubePlayer').pause();
        }
        if (this.raw) {
            return document.getElementById('videoPlayer').pause();
        }

    }
    togglePlayPause() {
        //         console.log(document.getElementById('youtubePlayer').state);
        if (this.youtubeId) {
            //             console.log(document.getElementById('youtubePlayer').state);
            switch (document.getElementById('youtubePlayer').state) {
                case - 1:
                    document.getElementById('youtubePlayer').play();
                    break;
                case 0:
                    //                 console.log('ended');
                    document.getElementById('youtubePlayer').play();
                    //switch icon to replay
                    break;
                case 1:
                    //                 console.log('playing');
                    document.getElementById('youtubePlayer').pause();
                    break;
                case 2:
                    //                 console.log('paused');
                    document.getElementById('youtubePlayer').play();
                    break;
                case 3:
                    //                 console.log('buffering');
                    this.set('playPauseIcon', '');
                    //disable while buffering
                    break;
                case 5:
                    //                 console.log('video cued');
                    //video is ready
                    break;
                default:
                    console.log('no youtube state');
            }
        } else {
            let video = document.getElementById('videoPlayer');

            // if (video.paused || video.ended) {
            //     this.play();
            // } else {
            //     this.pause();
            // }
        }
    }
    toggleMute(event) {
        if (this.youtubeId) {
            //console.log('toggleMute');
            //this.set('volumeIcon', 'av:volume-up');
            if (!this.muted) {
                document.getElementById('youtubePlayer').mute();
                this.set('volumeIcon', 'av:volume-off');
            } else if (this.muted) {
                document.getElementById('youtubePlayer').unMute();
                this.set('volumeIcon', 'av:volume-up');
            }
        }
        this.set('muted', !this.muted);
    }

    onMouseEntered(e) {
        this.entered = true;
    }

    onMouseLeave(e) {
        this.entered = false;
    }

    OnVideoPlay() {
        // let videoPlayer = document.getElementById('videoPlayer');
        // let canvas = document.getElementById('videoPlayer')Canvas;
        // let cw = Math.floor(canvas.clientWidth / 100);
        // let ch = Math.floor(canvas.clientHeight / 100);
        // let context = canvas.getContext('2d');
        // // videoPlayer.hidden = true;
        // this.canvasDraw(videoPlayer, context, cw, ch);
    }

    canvasDraw(videoPlayer, context, w, h) {
        if (videoPlayer.paused || videoPlayer.ended)
            return false;
        context.drawImage(videoPlayer, 0, 0, w, h);
        requestAnimationFrame(this.canvasDraw(context, w, h));
    }

    reset() {
        //this.setState(defaultState);
    }

    render() {
        return (
            <div>
                <video autoPlayp style={styles.videoPlayer} id="videoPlayer" src={'/data/2016-03-24 SIZZURDLX(2)-Master.stem.mp4'}/>
            </div>

        )
    }
}
export default VideoPlayer;

// <div>
//   <video
//   id = "videoPlayer"
//   onMouseenter ={this.onMouseEntered()}
//   onMouseleave = {this.onMouseLeave()}
//   onTap = {this.togglePlayPause()}
//   width = {this.state.width}
//   muted = {this.state.muted}
//   poster = {this.state.poster}
//   preload = {this.state.preload}
//   height = {this.state.height}
//   src = {this.state.src}
//   autoplay = {this.state.autoplay}
//   loop = {this.state.loop}
//   onPlay = {this.OnVideoPlay()}/> </div >
