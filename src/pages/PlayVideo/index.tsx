import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Row, Col } from 'react-bootstrap';
import "./index.css";
interface PlayVideoProps extends RouteComponentProps {
}
class PlayVideoState {
    playBtnShow: boolean = true;
    videoShow:boolean = false;
}
export default class PlayVideo extends Component<PlayVideoProps, PlayVideoState>{
    private videoEl: HTMLVideoElement = null;
    constructor(props: PlayVideoProps) {
        super(props);
        this.state = new PlayVideoState();
    }

    componentDidMount(){
        // this.videoEl = document.getElementById("video") as HTMLVideoElement;
        //  console.log(this.videoEl);
         this.videoEl.setAttribute("autobuffer","true");
         this.videoEl.setAttribute("playsinline","true");
    }

    private playVideo(): void {
        this.videoEl.play();
        this.setState({playBtnShow:false,videoShow:true});
    }

    private videoEnd():void{
        this.setState({playBtnShow:true,videoShow:false}); 
    }

    render() {
        return (<div>
            <Row style={{ display: this.state.playBtnShow === true ? "block" : "none" }}>
                <Col xs={{ span: 6, offset: 3 }} md={{ span: 6, offset: 3 }} lg={{ span: 6, offset: 3 }} className="text-center">
                    <Button variant="info" className="playBtn" size="lg" onClick={this.playVideo.bind(this)}>播放视频</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={12} lg={12}>
                    <video id="video" preload="false" webkit-playsinline="true" x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-orientation="portraint" 
                    src="videos/video1.mp4" style={{display:this.state.videoShow === true ? "block" : "none"}} onEnded={this.videoEnd.bind(this)} ref={ref=>{this.videoEl=ref}}></video>
                </Col>
            </Row>
        </div>);
    }
}