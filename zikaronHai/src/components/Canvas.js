import React, { Component } from 'react';

export class Canvas extends Component {

    static CANVAS_WIDTH = 120;
    static CANVAS_HEIGHT = 90;

    constructor(props) {
        super(props);
        this.state = ({
            video: ''
        });
        this.canvasRef = React.createRef();
        this.drawImageOnCanvas = this.drawImageOnCanvas.bind(this);
        this.setVideo = this.setVideo.bind(this);
    }

    setVideo() {
        this.canvasRef.current.currKey = this.props.currKey;
        console.log("setVideo: this.canvasRef.current.currKey: ", this.canvasRef.current.currKey);
        this.setState({ video: this.props.video }, () => {
            this.drawImageOnCanvas();
        });
    }

    drawImageOnCanvas() {
        let ctx = this.canvasRef.current.getContext('2d');
        ctx.drawImage(this.state.video, 0, 0, Canvas.CANVAS_WIDTH, Canvas.CANVAS_HEIGHT);
    }

    componentDidMount() {
        this.setVideo();
    }

    render() {
        return (
            <div >
                <canvas
                    width={Canvas.CANVAS_WIDTH}
                    height={Canvas.CANVAS_HEIGHT}
                    ref={this.canvasRef}
                    onClick={() => this.props.selectCanvas(this.canvasRef.current)}>
                </canvas>
                
                <button id="deleteCanvas" onClick={() => {
                    console.log("this.canvasRef.current: ", this.canvasRef.current); 
                    console.log("this.canvasRef.current.currKey: ", this.canvasRef.current.currKey); 
                    this.props.deleteCanvas(this.canvasRef.current.currKey);
                }}>×</button>
            </div>
        )
    }
}

export default Canvas;
