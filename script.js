var colorFondo = 100;
//var mivideo;
var canvasvisual;

var shaderfx;

var videos =[];

var fragmentSize = 140;
var fragmentAngle = 0.9;
var mixAmount = 1.0;


const Visual = function(p) {



    p.preload = function() {
        //mivideo = p.createVideo(["videos/ave.mp4"])

    videos.push(p.createVideo(["final2.mp4"]))
    videos.push(p.createVideo(["final3.mp4"]))


        shaderfx = p.loadShader("shaders/vertShader.vert" , "shaders/gridShaderV7.frag")
    }

    p.setup = function() {
        canvasvisual = p.createCanvas(window.innerWidth, window.innerHeight,  p.WEBGL);
        //canvasvisual.parent("visual")
        p.background(0,0,0)
        //mivideo.loop()
        //mivideo.hide()

        videos[0].hide()
        videos[1].hide()

        videos[0].mute();
        videos[1].mute();

        videos[0].volume(0);
        videos[1].volume(0);

        videos[0].loop()
        videos[1].loop()

        p.shader(shaderfx) 
        shaderfx.setUniform('texturaA', videos[0] );
        shaderfx.setUniform('texturaB', videos[1] );
        shaderfx.setUniform('resolution', [p.width, p.height]);
        shaderfx.setUniform('fragmentSize', fragmentSize);
        shaderfx.setUniform('fragmentAngle', fragmentAngle);
        shaderfx.setUniform('mixAmount', mixAmount);
        //mivideo.speed(12);
    }


    // 60 fps
   p.draw = function () {
       
        //p.image( videos[1], 0 , 0,p.width,p.height)
        
        mixAmount = p.map( p.mouseX , 0 , p.width , 0.0  , 1.0  )

        shaderfx.setUniform('texturaA', videos[0]);
        shaderfx.setUniform('texturaB', videos[1]);
        shaderfx.setUniform('resolution', [p.width, p.height]);
        shaderfx.setUniform('fragmentSize', fragmentSize);
        shaderfx.setUniform('fragmentAngle', fragmentAngle);
        shaderfx.setUniform('mixAmount', mixAmount); 

        p.rect(p.width/2, 0, p.width, p.height);
    }

}

const videocaomp = new p5(Visual, document.getElementById('visual'));