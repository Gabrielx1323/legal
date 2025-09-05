let botoes = document.querySelectorAll(".btn")
let botoesclicados = []
let sequenciajogo = []
let jogoiniciado = false
let nivel = 0
let pts = document.getElementById("pts")

let cores = ["verde","vermelho","amarelo","azul"]

function iniciarjogo() {
    if (!jogoiniciado) {
        jogoiniciado = true
        nivel = 0
        botoesclicados = []
        sequenciajogo = []
        proximasequencia()
    }
}

function começar() {
    if (!jogoiniciado) {
        jogoiniciado = true
        nivel = 0
        botoesclicados = []
        sequenciajogo = []
        proximasequencia()
    }
}

document.addEventListener("keydown", iniciarjogo)

function proximasequencia() {
    botoesclicados = []
    nivel ++
    document.getElementById("level-title").textContent = "Nivel" + nivel

    let numeroaleatorio = Math.floor(Math.random() * 4)
    let coraleatoria = cores[numeroaleatorio]
    sequenciajogo.push(coraleatoria)
    animaçaomaisaudio(coraleatoria)
}

function animaçaomaisaudio(cor) {
    animarbotao(cor)
    tocarsom(cor)
}

function animarbotao(cor) {
    let botao = document.getElementById(cor) 
    if (!botao) return
    botao.classList.add("pressed")
    setTimeout(() => {
        botao.classList.remove("pressed")
    }, 300);
    
}

function tocarsom(cor) {
    let audio = new Audio("sons/" + cor + ".mp3")
    audio.play()
}

botoes.forEach(btn => {
    btn.addEventListener("click", function() {
    let corescolhida = this.id
    botoesclicados.push(corescolhida)
    animaçaomaisaudio(corescolhida)
    testaresposta(botoesclicados.length - 1)
    })
})

function reiniciarjogo() {
    jogoiniciado =false
    nivel = 0
    sequenciajogo = []
    pt = 0
    pts.textContent = `Pontos = 0`
}

function testaresposta(nivelatual) {
    if (botoesclicados[nivelatual] === sequenciajogo[nivelatual]) {
        if (botoesclicados.length === sequenciajogo.length) {
            setTimeout(() => {
                proximasequencia()
            }, 100);
        let pt = nivel * 10 
        pts.textContent = `Pontos = ${pt}`
        }
    } else {
        alert("voce errou! fim de jogo. pressione qualquer tecla para reniciar.")

        tocarsom("wrong")
        document.body.classList.add("game-over")
        setTimeout(() => {
            document.body.classList.remove("game-over")
        }, 200);
        document.getElementById("level-title").textContent = "pressione uma tecla para começar"

        reiniciarjogo()
        
    }
}

