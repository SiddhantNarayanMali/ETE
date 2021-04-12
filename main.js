

Predict1 =  "";
Predict2 = "";

Webcam.set(

    {

        width: 350,
        height:300,
        image_format: "png",
        png_quality: 90

    }

);

Webcam.attach("#webcam");

function capture()
{
    Webcam.snap(function(link)
    {
        //console.log(link);
        document.getElementById("result").innerHTML = "<img src='"+link+"' id='img-result'>";
    });
}

console.log("ml5 version: ",ml5.version);

Ml5 = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/WXb7I1mtB/model.json", check);

function check()
{
    console.log("Model Loaded!!!");
}

function utter()
{
    var Api = window.speechSynthesis;
    Prediction1 = "The First Prediction is "+Predict1;
    Prediction2 = " And The Second Prediction is "+Predict2;

    var utter = new SpeechSynthesisUtterance(Prediction1+Prediction2);
    Api.speak(utter);
}

function result()
{
    image = document.getElementById("img-result");
    Ml5.classify(image, Fnctn);

}

function Fnctn(err,res)
{
    if (err)
    {
        console.error(err);
    }
    else
    {
        console.log(res);
        document.getElementById("emtn1").innerHTML = res[0].label;
        document.getElementById("emtn2").innerHTML = res[1].label;

        Predict1 = res[0].label;
        Predict2 = res[1].label;

       utter()

       if (Predict1 == "Happy")
       {
           document.getElementById("emogi1").innerHTML = "&#128522;";
       }
       else if(Predict1 == "Sad")
       {
           document.getElementById("emogi1").innerHTML = "&#128532;";
       }
       else
       {
            document.getElementById("emogi1").innerHTML = "&#128548;";
       }

       if(Predict2 == "Happy")
       {
           document.getElementById('emogi2').innerHTML = "&#128522;";
       }
       else if(Predict2 == "Sad")
       {
           document.getElementById("emogi2").innerHTML = "&#128532;";
       }
       else
       {
            document.getElementById("emogi2").innerHTML = "&#128548;";
       }


    }

}