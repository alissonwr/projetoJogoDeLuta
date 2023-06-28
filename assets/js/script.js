const personagem = createKnight('Você');
const monstro = createGrandeMonstro();

cenario.start(
    personagem,
    monstro,
    document.querySelector('#personagem'),
    document.querySelector('#monstro')
);

document.querySelector('.bola').addEventListener('click', (e) => {
    e.target.classList.toggle('bola-mover');
    document.body.classList.toggle('escuro');
});

