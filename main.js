video = "";
modelstatus = "";
objects = [];
function setup(){
    canvas = createCanvas(500,400);
    canvas.position(50,150);
    
}
function preload(){
    video = createVideo('video.mp4');
    video.hide();
}
function draw(){
    image(video,0,0,500,400);
    if (modelstatus != ""){
        objectDetector.detect(video,gotResults);
        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "number of objects detected are " + objects.length;
            fill("red")
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill()
            stroke("red")
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }

}
function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML = "status : detecting objects";
}
function modelLoaded(){
    console.log("model Loaded");
    modelsatus = true ;
    video.loop();
    video.speed(1);
}
function gotResults(error,result){
if (error){
    console.log (error);
}
else{
    console.log(result);
    objects = result;
}
}