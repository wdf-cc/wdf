import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
interface TextToSoundProps extends RouteComponentProps {
}
class TextToSoundState {
    //downHref:string = "";
}

export default class TextToSound extends Component<TextToSoundProps, TextToSoundState>{
    private text: string = "";
    private speed: string = "5";
    private audioUrl: string = "";
    private downEl: HTMLAnchorElement | null = null;
    audio: HTMLAudioElement = new Audio();
    constructor(props: TextToSoundProps) {
        super(props);
        this.state = new TextToSoundState();
    }


    private getUrl(speed: string, text: string): string {
        let result: string = `http://tts.baidu.com/text2audio?lan=en&ie=UTF-8&spd=${speed}&text=${text}`;
        result = encodeURI(result);
        return result;
    }

    private async getSound(play: boolean) {
        this.audioUrl = await this.getRes(this.speed, this.text);
        this.audio.src = this.audioUrl;
        if (play) {
            this.audio.play();
        }
        (this.downEl as HTMLAnchorElement).href = this.audioUrl;
        (this.downEl as HTMLAnchorElement).download = Date.now().toString() + ".mp3";
    }

    private getRes(speed: string, text: string): Promise<string> {
        let url = this.getUrl(speed, text);
        return new Promise((resolve) => {
            fetch(url, ({
                method: 'get',
                responseType: 'blob'
            } as any)).then(res => {
                return res.blob();
            }).then(blob => {
                let resUrl: string = window.URL.createObjectURL(blob);
                resolve(resUrl);
            })
        })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={{span:6,offset:3}} xs={12}>
                        <h4>TTS应用</h4>
                    </Col>
                </Row>
                <Row>
                    <Col  md={{span:6,offset:3}} xs={12}>
                        <Form.Control as="textarea" rows={5} placeholder={"请输入英文字符"} onChange={e => { this.text = e.target.value }} />
                    </Col>
                </Row>
                <Row>
                    <Col md={{span:6,offset:3}} xs={12}>
                        <Form.Control type="range" onChange={e => { this.speed = e.target.value }} step={1} min={1} max={9} />
                    </Col>
                </Row>
                <Row>
                    <Col md={{offset:3,span:2}} xs={4} className="flex-center">
                        <Button variant="primary" size="lg" onClick={this.getSound.bind(this, false)}>获取</Button>
                    </Col>
                    <Col md={{span:2}}  xs={4} className="flex-center">
                        <Button variant="success" size="lg" onClick={this.getSound.bind(this, true)}>播放</Button>
                    </Col>
                    <Col md={{span:2}}  xs={4} className="flex-center">
                        <Button variant="outline-danger" size="lg">
                            <a ref={ref => { this.downEl = ref }}>下载</a>
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}