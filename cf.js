class Pregunta{
    constructor(Datoid,DatoTexto,Datorespuestacorrecta){
        this.id=Datoid;
        this.texto=DatoTexto;
        this.respuestacorrecta=Datorespuestacorrecta;
    }
    getRespuesta(){
        return document.querySelector(`input[name="${this.id}"]:checked`)?.value;
        
    }
    Respuestacorrecta(){
        const respuestausuario =this.getRespuesta();
        return respuestausuario === this.respuestacorrecta
    }
}
class Form{
    constructor(){
        this.questions=[
            new Pregunta('p1','1.) _____ is your favorite type of music?','a'),
            new Pregunta('p2','2.) _____ would you prefer to travel?','c'),
            new Pregunta('p3','3.) _____ time is it?','a'),
            new Pregunta('p4','4.) _____ do you usually talk to when you need advice?','c'),
            new Pregunta('p5','5.) ______ do you enjoy watching movies?','d'),
            new Pregunta('p6','6.) ______ is your favorite place to relax?','c'),
            new Pregunta('p7','7.) _____ many continents are there on Earth?','b'),
            new Pregunta('p8','8.) _____ is the author of "Harry Potter"?','b'),
            new Pregunta('p9','9.) _____ many hours are there in a day?','d'),
        ]
    }
    Respuestas(event){
        event.preventDefault();
        let puntaje=0
        this.questions.forEach(divpreguntas=>{
            if(divpreguntas.Respuestacorrecta()){
                puntaje=puntaje+1
            }
        });
        this.mostrarresult(puntaje)
    }
    mostrarresult(puntaje){
        document.getElementById('result').innerText =`Tu puntaje es: ${puntaje} de 9`
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const quiz = new Form();
    document.querySelector('.btn-class-name').addEventListener('click', (event) => {
        quiz.Respuestas(event);
    });
});

