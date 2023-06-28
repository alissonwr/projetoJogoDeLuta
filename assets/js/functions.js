const personagemPadrao = {
    name: '',
    vida: 1,
    vidaMaxima: 1,
    ataque: 0,
    defesa: 0
}

const createKnight = (name) => {
    return{
        ...personagemPadrao,
        name,
        vida: 100,
        vidaMaxima: 100,
        ataque: 14,
        defesa: 8 
    }
}

const createWizard = (name) => {
    return{
        ...personagemPadrao,
        name,
        vida: 80,
        vidaMaxima: 80,
        ataque: 16,
        defesa: 6 
    }
}

const createPequenoMonstro = () =>{
    return{
        ...personagemPadrao,
        name: 'Pequeno monstro',
        vida: 50,
        vidaMaxima: 50,
        ataque: 8,
        defesa: 3 
    }
}

const createGrandeMonstro = () =>{
    return{
        ...personagemPadrao,
        name: 'Grande Monstro',
        vida: 80,
        vidaMaxima: 80,
        ataque: 10,
        defesa: 6 
    }
}

const cenario = {
    lutador1: null,
    lutador1El: null,
    lutador2: null,
    lutador2El: null,

    start(lutador1, lutador2, lutador1El, lutador2El){
        this.lutador1 = lutador1;
        this.lutador2 = lutador2;
        this.lutador1El = lutador1El;
        this.lutador2El = lutador2El;

        this.lutador1El.querySelector('.botaoDeAtacar').addEventListener('click', () => this.fazerAtaque(this.lutador1, this.lutador2));
        this.lutador2El.querySelector('.botaoDeAtacar').addEventListener('click', () => this.fazerAtaque(this.lutador2, this.lutador1));

        this.atualizacao();
    },
    atualizacao(){
        this.lutador1El.querySelector('.nome').innerHTML = `${this.lutador1.name} - ${this.lutador1.vida.toFixed(1)} HP`;
        let l1Pct = (this.lutador1.vida / this.lutador1.vidaMaxima) * 100;
        this.lutador1El.querySelector('.barra').style.width = `${l1Pct}%`;

        this.lutador2El.querySelector('.nome').innerHTML = `${this.lutador2.name} - ${this.lutador2.vida.toFixed(1)} HP`;
        let l2Pct = (this.lutador2.vida / this.lutador2.vidaMaxima) * 100;
        this.lutador2El.querySelector('.barra').style.width = `${l2Pct}%`;
    },
    fazerAtaque(atacando, atacado){
        if(atacando.vida <= 0 || atacado.vida <= 0){
            log.addMensagem('Este personagem está morto, impossível atacar.');
            return
        }

        const fatorDeAtaque = (Math.random() * 2).toFixed(2);
        const fatorDeDefesa = (Math.random() * 2).toFixed(2);

        const ataqueAtual = atacando.ataque * fatorDeAtaque;
        const defesaAtual = atacado.defesa * fatorDeDefesa;

        if(ataqueAtual > defesaAtual){
            atacado.vida -= ataqueAtual;
            atacado.vida = atacado.vida < 0 ? 0 : atacado.vida;
            log.addMensagem(`${atacando.name} causou ${ataqueAtual.toFixed(2)} de dano em ${atacado.name}.`)
        }else{
            log.addMensagem(`${atacado.name} conseguiu se defender.`)
        }

        this.atualizacao();
    }
    
}

const log = {
    lista: [],
    addMensagem(msg){
        this.lista.push(msg);
        this.render();
    },
    render(){
        const logEl = document.querySelector('.log');
        logEl.innerHTML = '';

        for(let i in this.lista){
            logEl.innerHTML += `<li>${this.lista[i]}</li>`
        }
    }
}

