// Jogo da Memória - Imagem e Texto
// Script Principal
// Autores: Sebastião Tadeu de Oliveira Almeida e Alexsandra Barbosa da Silva
// Ano: 2025
// Licença: MIT License (Veja LICENSE.txt para mais detalhes)

document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        cardsContainer: document.getElementById('cards-container'),
        messageDiv: document.getElementById('message'),
        startButton: document.getElementById('start-button'),
        instructionsButton: document.getElementById('instructions-button'),
        restartButton: document.getElementById('restart-button'),
        rulesDiv: document.getElementById('rules'),
        instructionsDiv: document.getElementById('instructions'),
        closeInstructionsButton: document.getElementById('close-instructions-button'),
        fileInput: document.getElementById('file-input'),
        settingsButton: document.getElementById('settings-button'),
        settingsModal: document.getElementById('settings-modal'),
        saveSettingsButton: document.getElementById('save-settings-button'),
        closeSettingsButton: document.getElementById('close-settings-button'),
        singlePlayerModeCheckbox: document.getElementById('single-player-mode'),
        enableSpeechCheckbox: document.getElementById('enable-speech'),
        cardWidthInput: document.getElementById('card-width'),
        cardHeightInput: document.getElementById('card-height'),
        maxPairsInput: document.getElementById('max-pairs')
    };

    const sounds = {
        match: new Audio('sounds/match.WAV'),
        noMatch: new Audio('sounds/no-match.WAV')
    };

    sounds.match.volume = 0.3;
    sounds.noMatch.volume = 0.3;

    let gameState = {
        fullCardsData: [], // Armazenará todos os dados do CSV
        cardsDataForCurrentGame: [], // Dados filtrados para o jogo atual
        cards: [], // Elementos DOM das cartas no jogo atual
        firstCard: null,
        secondCard: null,
        matches: 0,
        attempts: 0,
        currentTeam: 1,
        scores: [0, 0],
        lockBoard: false,
        singlePlayerMode: false,
        enableSpeech: true,
        cardWidth: 175,
        cardHeight: 200,
        maxPairs: 0, // 0 significa sem limite
        numPairsInCurrentGame: 0
    };

    function createCardElement(index) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        const cardDataItem = gameState.cardsDataForCurrentGame[index];
        card.dataset.id = cardDataItem.id;
        card.tabIndex = 0;
        card.setAttribute('role', 'button');

        card.style.width = `${gameState.cardWidth}px`;
        card.style.height = `${gameState.cardHeight}px`;

        const cardNumber = document.createElement('div');
        cardNumber.className = 'card-number';
        cardNumber.textContent = index + 1;
        card.appendChild(cardNumber);

        if (cardDataItem.type === 'image') {
            const img = document.createElement('img');
            img.src = cardDataItem.content;
            img.alt = cardDataItem.alt || 'Imagem do jogo da memória'; // Fallback para alt
            img.setAttribute('aria-hidden', 'true');
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'contain';
            card.appendChild(img);
            card.setAttribute('aria-label', `Carta com imagem: ${img.alt}, não revelada`);
        } else { // text
            const text = document.createElement('div');
            text.className = 'text';
            text.textContent = cardDataItem.content;
            text.setAttribute('aria-hidden', 'true');
            card.appendChild(text);
            card.setAttribute('aria-label', 'Carta com texto, não revelada');
        }

        card.addEventListener('click', onCardClick);
        card.addEventListener('touchstart', onCardClick); // Para dispositivos móveis
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onCardClick(event);
            }
        });
        return card;
    }

    function onCardClick(event) {
        if (gameState.lockBoard) return;

        const cardElement = event.currentTarget; // Garante que pegamos o elemento com o listener
        const cardIndex = cardElement.dataset.index;

        // Ignorar se a carta já foi revelada ou se é a mesma carta clicada duas vezes
        if (cardElement.classList.contains('revealed') || cardElement === gameState.firstCard) return;

        cardElement.classList.add('revealed');
        const cardData = gameState.cardsDataForCurrentGame[cardIndex];

        if (cardData.type === 'image') {
            const img = cardElement.querySelector('img');
            if (img) img.setAttribute('aria-hidden', 'false');
            cardElement.setAttribute('aria-label', `Imagem: ${cardData.alt || 'Conteúdo revelado'}`);
        } else { // text
            const text = cardElement.querySelector('.text');
            if (text) text.setAttribute('aria-hidden', 'false');
            cardElement.setAttribute('aria-label', `Texto: ${cardData.content}`);
        }

        if (gameState.enableSpeech) {
            const feedbackText = cardData.type === 'image' ? (cardData.alt || 'Imagem') : cardData.content;
            const utterance = new SpeechSynthesisUtterance(feedbackText);
            speechSynthesis.speak(utterance);
        }

        if (!gameState.firstCard) {
            gameState.firstCard = cardElement;
        } else { // secondCard implicitamente
            gameState.secondCard = cardElement;
            gameState.attempts++;
            gameState.lockBoard = true;
            setTimeout(checkForMatch, 1000);
        }
    }

    function checkForMatch() {
        if (!gameState.firstCard || !gameState.secondCard) return;

        const firstCardId = gameState.firstCard.dataset.id;
        const secondCardId = gameState.secondCard.dataset.id;

        if (firstCardId === secondCardId) {
            gameState.matches++;
            if (!gameState.singlePlayerMode) {
                gameState.scores[gameState.currentTeam - 1]++;
            }
            sounds.match.play();
            elements.messageDiv.textContent = 'Parabéns! Você encontrou um par!';
            // Remover 'role' e 'tabindex' das cartas combinadas para não serem mais focáveis
            gameState.firstCard.removeAttribute('role');
            gameState.firstCard.removeAttribute('tabindex');
            gameState.secondCard.removeAttribute('role');
            gameState.secondCard.removeAttribute('tabindex');
            resetCardsState(); // Renomeado de resetCards para evitar confusão
            if (gameState.matches === gameState.numPairsInCurrentGame) {
                endGame();
            }
        } else {
            sounds.noMatch.play();
            elements.messageDiv.textContent = 'Não foi dessa vez. Continue tentando!';
            setTimeout(flipBackNonMatchingCards, 1000); // Renomeado
        }
    }

    function resetCardsState() { // Anteriormente resetCards
        gameState.firstCard = null;
        gameState.secondCard = null;
        gameState.lockBoard = false;
        // A vez só muda ou permanece se não for um par, tratado em flipBackNonMatchingCards
    }

    function flipBackNonMatchingCards() { // Anteriormente resetNonMatchingCards
        if (gameState.firstCard) {
            gameState.firstCard.classList.remove('revealed');
            const firstCardData = gameState.cardsDataForCurrentGame[gameState.firstCard.dataset.index];
            if (firstCardData.type === 'image') {
                const img = gameState.firstCard.querySelector('img');
                if (img) img.setAttribute('aria-hidden', 'true');
                gameState.firstCard.setAttribute('aria-label', `Carta com imagem: ${firstCardData.alt || 'Imagem do jogo da memória'}, não revelada`);
            } else {
                const text = gameState.firstCard.querySelector('.text');
                if (text) text.setAttribute('aria-hidden', 'true');
                gameState.firstCard.setAttribute('aria-label', 'Carta com texto, não revelada');
            }
        }

        if (gameState.secondCard) {
            gameState.secondCard.classList.remove('revealed');
            const secondCardData = gameState.cardsDataForCurrentGame[gameState.secondCard.dataset.index];
            if (secondCardData.type === 'image') {
                const img = gameState.secondCard.querySelector('img');
                if (img) img.setAttribute('aria-hidden', 'true');
                gameState.secondCard.setAttribute('aria-label', `Carta com imagem: ${secondCardData.alt || 'Imagem do jogo da memória'}, não revelada`);
            } else {
                const text = gameState.secondCard.querySelector('.text');
                if (text) text.setAttribute('aria-hidden', 'true');
                gameState.secondCard.setAttribute('aria-label', 'Carta com texto, não revelada');
            }
        }

        resetCardsState();
        if (!gameState.singlePlayerMode) {
            gameState.currentTeam = gameState.currentTeam === 1 ? 2 : 1;
        }
        updateMessage();
    }

    function updateMessage() {
        if (gameState.singlePlayerMode) {
            elements.messageDiv.textContent = `Tentativas: ${gameState.attempts}`;
        } else {
            elements.messageDiv.textContent = `Equipe ${gameState.currentTeam} deve jogar | Tentativas: ${gameState.attempts} | Equipe 1: ${gameState.scores[0]} | Equipe 2: ${gameState.scores[1]}`;
        }
    }

    function endGame() {
        gameState.lockBoard = true; // Bloqueia o tabuleiro ao final
        let winnerMessage = 'Fim de Jogo!';
        if (!gameState.singlePlayerMode) {
            if (gameState.scores[0] > gameState.scores[1]) {
                winnerMessage = 'Equipe 1 Venceu!';
            } else if (gameState.scores[1] > gameState.scores[0]) {
                winnerMessage = 'Equipe 2 Venceu!';
            } else {
                winnerMessage = 'Empate!';
            }
        }

        elements.messageDiv.textContent = `${winnerMessage} | Total de Tentativas: ${gameState.attempts}.`;

        const totalPairsInGame = gameState.numPairsInCurrentGame;
        if (totalPairsInGame > 0) { // Evitar divisão por zero se não houver pares
            if (gameState.attempts <= totalPairsInGame+2) {
                elements.messageDiv.textContent += ' 🥇 Medalha de Ouro!';
            } else if (gameState.attempts <= totalPairsInGame * 1.6) {
                elements.messageDiv.textContent += ' 🥈 Medalha de Prata!';
            } else {
                elements.messageDiv.textContent += ' 🥉 Medalha de Bronze!';
            }
        }
        elements.restartButton.style.display = 'inline-block';
    }

    function initializeGame() {
        // 1. Determinar os dados das cartas para o jogo atual
        let sourceDataForSelection = [...gameState.fullCardsData]; // Trabalhar com uma cópia

        if (gameState.maxPairs > 0) {
            const allUniqueIds = [...new Set(sourceDataForSelection.map(card => card.id))];
            if (allUniqueIds.length > gameState.maxPairs) {
                // Embaralhar os IDs únicos
                for (let i = allUniqueIds.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [allUniqueIds[i], allUniqueIds[j]] = [allUniqueIds[j], allUniqueIds[i]];
                }
                const selectedIds = allUniqueIds.slice(0, gameState.maxPairs);
                sourceDataForSelection = sourceDataForSelection.filter(card => selectedIds.includes(card.id));
            }
        }
        gameState.cardsDataForCurrentGame = [...sourceDataForSelection];
        gameState.numPairsInCurrentGame = gameState.cardsDataForCurrentGame.length / 2;

        if (gameState.numPairsInCurrentGame < 1) {
            elements.messageDiv.textContent = "Não há pares suficientes para iniciar o jogo com as configurações atuais.";
            elements.cardsContainer.style.display = 'none';
            elements.restartButton.style.display = 'inline-block'; // Permitir reiniciar para talvez carregar outro arquivo
            return;
        }

        // 2. Embaralhar os dados para o jogo atual
        gameState.cardsDataForCurrentGame.sort(() => Math.random() - 0.5);

        elements.cardsContainer.innerHTML = '';
        elements.cardsContainer.style.display = 'flex';
        gameState.cards = []; // Limpar array de elementos DOM

        gameState.cardsDataForCurrentGame.forEach((cardData, index) => {
            const cardElement = createCardElement(index);
            elements.cardsContainer.appendChild(cardElement);
            gameState.cards.push(cardElement);
        });

        // Resetar o estado do jogo
        gameState.firstCard = null;
        gameState.secondCard = null;
        gameState.matches = 0;
        gameState.attempts = 0;
        gameState.currentTeam = 1;
        gameState.scores = [0, 0];
        gameState.lockBoard = false;

        updateMessage();
        elements.restartButton.style.display = 'none';
        elements.startButton.style.display = 'none';
        elements.rulesDiv.style.display = 'none';
        elements.instructionsDiv.style.display = 'none';
        // Manter fileInput, instructionsButton, settingsButton visíveis se o jogo recomeçar
        elements.fileInput.style.display = 'inline-block';
        elements.instructionsButton.style.display = 'inline-block';
        elements.settingsButton.style.display = 'inline-block';
    }

    function parseCSV(csvContent) {
        const rows = csvContent.split('\n').map(row => row.trim()).filter(row => row.length > 0 && !row.startsWith('#'));
        if (rows.length < 2) return []; // Precisa de cabeçalho e pelo menos uma linha de dados para 1 par
        const headers = rows.shift().split(',').map(header => header.trim().toLowerCase()); //toLowerCase para consistência

        // Verificar se as colunas essenciais (id, type, content) existem
        if (!headers.includes('id') || !headers.includes('type') || !headers.includes('content')) {
            console.error("Arquivo CSV deve conter colunas 'id', 'type', e 'content'.");
            return [];
        }

        return rows.map(row => {
            const values = row.split(','); // Não aparar aqui, pode haver vírgulas em 'alt' ou 'content'
            let card = {};
            headers.forEach((header, index) => {
                // Atribuir valor, ou string vazia se não houver valor para essa coluna na linha
                // Concatenar o restante dos valores se for 'alt' ou 'content' para permitir vírgulas
                if ( (header === 'alt' || header === 'content') && values.length > headers.length ) {
                     card[header] = values.slice(index).join(',').trim();
                } else {
                     card[header] = (values[index] || '').trim();
                }
            });
            // Garante que 'alt' exista mesmo que vazio, especialmente para imagens
            if (card.type === 'image' && typeof card.alt === 'undefined') {
                card.alt = 'Imagem do jogo';
            }
            return card;
        }).filter(card => card.id && card.type && card.content); // Filtrar linhas malformadas
    }

    function updateGameSettings() {
        gameState.singlePlayerMode = elements.singlePlayerModeCheckbox.checked;
        gameState.enableSpeech = elements.enableSpeechCheckbox.checked;
        const prevCardWidth = gameState.cardWidth;
        const prevCardHeight = gameState.cardHeight;

        gameState.cardWidth = parseInt(elements.cardWidthInput.value) || 175;
        gameState.cardHeight = parseInt(elements.cardHeightInput.value) || 200;
        gameState.maxPairs = parseInt(elements.maxPairsInput.value);
        if (isNaN(gameState.maxPairs) || gameState.maxPairs < 0) {
            gameState.maxPairs = 0; // Tratar NaN ou negativo como 0 (sem limite)
        }


        // Aplicar dimensões apenas se o jogo estiver ativo e as dimensões mudaram
        if (gameState.cards.length > 0 && (prevCardWidth !== gameState.cardWidth || prevCardHeight !== gameState.cardHeight) ) {
            gameState.cards.forEach(cardElement => {
                cardElement.style.width = `${gameState.cardWidth}px`;
                cardElement.style.height = `${gameState.cardHeight}px`;
            });
        }
        updateMessage(); // Atualizar mensagem caso modo de jogo mude
    }

    elements.fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const csvContent = e.target.result;
                gameState.fullCardsData = parseCSV(csvContent);

                if (gameState.fullCardsData.length === 0 || (gameState.fullCardsData.length % 2 !== 0) ) {
                    elements.messageDiv.textContent = "Erro: Arquivo CSV inválido, sem dados ou com número ímpar de cartas. Verifique o console para mais detalhes.";
                    elements.startButton.style.display = 'none';
                    gameState.fullCardsData = []; // Limpar dados inválidos
                    return;
                }
                // Verificar se há IDs duplicados que não formam pares (ex: 3 cartas com mesmo ID)
                const idCounts = gameState.fullCardsData.reduce((acc, card) => {
                    acc[card.id] = (acc[card.id] || 0) + 1;
                    return acc;
                }, {});

                for (const id in idCounts) {
                    if (idCounts[id] !== 2) {
                        elements.messageDiv.textContent = `Erro: O ID '${id}' não forma um par (encontrado ${idCounts[id]} vezes). Cada ID deve aparecer exatamente duas vezes.`;
                        elements.startButton.style.display = 'none';
                        gameState.fullCardsData = []; // Limpar dados inválidos
                        return;
                    }
                }

                elements.messageDiv.textContent = `Arquivo "${file.name}" carregado com ${gameState.fullCardsData.length / 2} pares.`;
                elements.startButton.style.display = 'inline-block';
                elements.cardsContainer.style.display = 'none'; // Esconder cartas de jogo anterior
                elements.restartButton.style.display = 'none'; // Esconder botão de reiniciar
            };
            reader.onerror = function() {
                elements.messageDiv.textContent = "Erro ao ler o arquivo.";
                gameState.fullCardsData = [];
                elements.startButton.style.display = 'none';
            };
            reader.readAsText(file);
        }
    });

    elements.startButton.addEventListener('click', () => {
        if (gameState.fullCardsData.length > 0) {
            initializeGame();
        } else {
            elements.messageDiv.textContent = "Por favor, carregue um arquivo CSV primeiro.";
        }
    });
    elements.restartButton.addEventListener('click', () => {
         // Ao reiniciar, deve voltar ao estado de seleção de arquivo ou usar o arquivo já carregado
        if (gameState.fullCardsData.length > 0) {
            initializeGame(); // Reinicia com o mesmo arquivo e configurações
        } else {
            // Se não há arquivo carregado, apenas reseta a UI para o estado inicial
            elements.messageDiv.textContent = "Carregue um arquivo CSV para jogar.";
            elements.cardsContainer.innerHTML = '';
            elements.cardsContainer.style.display = 'none';
            elements.startButton.style.display = 'none';
            elements.restartButton.style.display = 'none';
            elements.rulesDiv.style.display = 'block';
            elements.fileInput.value = ''; // Limpa a seleção do arquivo
            elements.fileInput.style.display = 'inline-block';
            elements.instructionsButton.style.display = 'inline-block';
            elements.settingsButton.style.display = 'inline-block';
        }
    });

    elements.instructionsButton.addEventListener('click', () => {
        elements.instructionsDiv.style.display = 'block';
        // Ocultar outros botões/seções para focar nas instruções
        if (elements.startButton.style.display !== 'none') elements.startButton.style.display = 'none';
        if (elements.restartButton.style.display !== 'none') elements.restartButton.style.display = 'none';
        elements.rulesDiv.style.display = 'none';
        elements.instructionsButton.style.display = 'none';
        elements.settingsButton.style.display = 'none';
        elements.fileInput.style.display = 'none';
    });

    elements.closeInstructionsButton.addEventListener('click', () => {
        elements.instructionsDiv.style.display = 'none';
        // Restaurar visibilidade dos botões/seções
        if (gameState.fullCardsData.length > 0 && gameState.cardsDataForCurrentGame.length === 0 && elements.cardsContainer.style.display === 'none') {
             elements.startButton.style.display = 'inline-block';
        } else if (gameState.cardsDataForCurrentGame.length > 0 || elements.cardsContainer.style.display === 'flex') { // Jogo em andamento ou finalizado
            elements.restartButton.style.display = 'inline-block';
        }
        elements.rulesDiv.style.display = 'block';
        elements.instructionsButton.style.display = 'inline-block';
        elements.settingsButton.style.display = 'inline-block';
        elements.fileInput.style.display = 'inline-block';
    });

    elements.settingsButton.addEventListener('click', () => {
        elements.singlePlayerModeCheckbox.checked = gameState.singlePlayerMode;
        elements.enableSpeechCheckbox.checked = gameState.enableSpeech;
        elements.cardWidthInput.value = gameState.cardWidth;
        elements.cardHeightInput.value = gameState.cardHeight;
        elements.maxPairsInput.value = gameState.maxPairs;
        elements.settingsModal.style.display = 'block';
    });

    elements.closeSettingsButton.addEventListener('click', () => {
        elements.settingsModal.style.display = 'none';
    });

    elements.saveSettingsButton.addEventListener('click', () => {
        updateGameSettings();
        elements.settingsModal.style.display = 'none';
        // Nota: Alterar maxPairs aqui não reinicia o jogo automaticamente.
        // O novo limite de pares será aplicado no próximo clique em "Começar Jogo" ou "Reiniciar".
        // Se um jogo estiver em andamento e `maxPairs` for alterado para um valor que exigiria
        // um novo `initializeGame`, o usuário precisará reiniciar o jogo.
        if (gameState.cardsDataForCurrentGame.length > 0) { // Se um jogo está em andamento ou concluído
             elements.messageDiv.textContent += " (Configurações de pares atualizadas para o próximo jogo)";
        }
    });

    // Estado inicial da UI
    elements.cardsContainer.style.display = 'none';
    elements.startButton.style.display = 'none';
    elements.restartButton.style.display = 'none';
    elements.messageDiv.textContent = "Carregue um arquivo CSV para começar.";
});
