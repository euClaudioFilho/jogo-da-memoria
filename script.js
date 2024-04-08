var todasAsImagens = [
    "../assets/img/Characters/Bastion.png",
    "../assets/img/Characters/Brigitte.png",
    "../assets/img/Characters/D.VA.png",
    "../assets/img/Characters/DoomFist.png",
    "../assets/img/Characters/Echo.png",
    "../assets/img/Characters/Genji.png",
    "../assets/img/Characters/Hanzo.png",
    "../assets/img/Characters/Junkrat.png",
    "../assets/img/Characters/Moira.png",
    "../assets/img/Characters/Orisa.png",
    "../assets/img/Characters/Pharah.png",
    "../assets/img/Characters/Reinhardt.png",
    "../assets/img/Characters/Roadhog.png",
    "../assets/img/Characters/Ramattra.png",
    "../assets/img/Characters/Reaper.png",
    "../assets/img/Characters/RainhaJunker.png",
    "../assets/img/Characters/Sigma.png",
    "../assets/img/Characters/Sojourn.png",
    "../assets/img/Characters/Soldado.png",
    "../assets/img/Characters/Sombra.png",
    "../assets/img/Characters/Symmetra.png",
    "../assets/img/Characters/Torbjorn.png",
    "../assets/img/Characters/Tracer.png",
    "../assets/img/Characters/Widowmaker.png",
    "../assets/img/Characters/Ana.png",
    "../assets/img/Characters/Baptiste.png",
    "../assets/img/Characters/Winston.png",
    "../assets/img/Characters/Wreckingball.png",
    "../assets/img/Characters/Zarya.png",
    "../assets/img/Characters/zenyatta.png",
    "../assets/img/Characters/Illari.png",
    "../assets/img/Characters/Kiriko.png",
    "../assets/img/Characters/Lifeweaver.png",
    "../assets/img/Characters/Lucio.png",
    "../assets/img/Characters/Mcree.png",
    "../assets/img/Characters/Mercy.png",
];

var imagensIniciais = todasAsImagens.slice();
var impostores = [];

function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function escolherImpostores(imagens, numeroDeImpostores) {
    for (let i = 0; i < numeroDeImpostores; i++) {
        const index = Math.floor(Math.random() * imagens.length);
        const impostor = imagens[index];
        impostores.push(impostor);
        imagens.splice(index, 1); // Remove o impostor do array inicial
    }
}

function mostrarImagens(imagens) {
    var container = document.getElementById("demo");
    container.innerHTML = "";

    imagens.forEach(function (src) {
        var img = document.createElement("img");
        img.setAttribute("src", src);
        img.addEventListener("click", function () {
            if (!temporizadorConcluído) {
                return;
            }

            if (impostores.includes(src)) {
                alert("Derrota! Você selecionou um IMPOSTOR");
                location.reload();
            } else {
                this.style.display = "none";
                var imagensVisíveis = imagens.filter(function (imgSrc) {
                    return (
                        container.querySelector('[src="' + imgSrc + '"]').style
                            .display !== "none"
                    );
                });

                if (
                    imagensVisíveis.length === 0 ||
                    imagensVisíveis.every((img) => impostores.includes(img))
                ) {
                    alert("VITÓRIA! Todos os IMPOSTORES foram encontrados!");
                    location.reload();
                }
            }
        });

        container.appendChild(img);
    });
}

var temporizadorConcluído = false;

function iniciarContador() {
    var tempoRestante = 60; // MUDAR O TEMPO
    var textoTempoRestante = document.getElementById("style-timer");
    var textoTitulo = document.getElementById("title-jogo");
    var contador = document.getElementById("timer");

    var interval = setInterval(function () {
        tempoRestante--;

        if (tempoRestante >= 0) {
            contador.textContent = tempoRestante;
        } else {
            clearInterval(interval);
            temporizadorConcluído = true;
            contador.style.display = "none";
            textoTempoRestante.style.display = "none";
            textoTitulo.textContent = "SALVE A EQUIPE!";

            // Troca as imagens iniciais com os impostores após o timer chegar a 0
            var novasImagens = imagensIniciais.concat(impostores);
            embaralharArray(novasImagens);
            mostrarImagens(novasImagens);
        }
    }, 1000);
}

window.onload = function () {
    embaralharArray(imagensIniciais);
    escolherImpostores(imagensIniciais, 4); // Escolhe 4 impostores aleatoriamente
    mostrarImagens(imagensIniciais);
    iniciarContador();
};
