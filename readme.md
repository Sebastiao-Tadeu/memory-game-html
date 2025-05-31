## Jogo da Memória - Imagem e Texto

Bem-vindo ao **Jogo da Memória - Imagem e Texto**! Este é um jogo educativo interativo projetado para tornar o aprendizado divertido e envolvente. Ideal para ser utilizado em salas de Atendimento Educacional Especializado (AEE), salas de aula ou para estudo individual, o jogo permite a personalização completa do conteúdo para atender às necessidades específicas dos usuários.

## Sumário

- [Características](#características)
- [Como Jogar](#como-jogar)
- [Personalização](#personalização)
  - [Configurações do Jogo](#configurações-do-jogo)
  - [Conteúdo Personalizado](#conteúdo-personalizado)
- [Sistema de Medalhas](#sistema-de-medalhas)
- [Requisitos](#requisitos)
- [Contribuindo](#contribuindo)
- [Licença](#licença)
- [Créditos](#créditos)

---

## Características

- **Personalizável**: Crie suas próprias cartas com imagens e textos através de um arquivo CSV.
- **Modo de jogo**: Jogue individualmente ou em equipes, realize a seleção nas configurações.
- **Acessibilidade**: Compatível com leitores de tela e navegável via teclado (tecla tab).
- **Medalhas**: Receba medalhas de ouro, prata ou bronze com base no seu desempenho.

---

## Como Jogar

### Preparação

1. **Selecionar o Arquivo CSV**:
   - Clique no botão **"Escolher arquivo"** e selecione um arquivo CSV com os dados das cartas.
2. **Iniciar o Jogo**:
   - Após selecionar o arquivo, clique em **"Começar Jogo"**.

### Objetivo

- Encontrar todos os pares de cartas correspondentes no menor número de tentativas possível.

### Regras Básicas

- **Virar cartas**: Clique em duas cartas para revelá-las.
- **Encontrar pares**: Se as cartas forem um par, elas permanecerão viradas. Caso contrário, serão ocultadas novamente.
- **Turnos**: No modo de equipes, a vez passa para a outra equipe se um par não for encontrado.
- **Vencendo o jogo**: O jogo termina quando todos os pares forem encontrados. A equipe ou jogador com mais pares vence.

---

## Personalização

### Configurações do jogo

Clique em **"Configurações"** para ajustar as seguintes opções:

- **Modo single-player**: Ative para jogar sozinho.
- **Habilitar leitura das cartas**: Ative para que as cartas sejam lidas em voz alta (requer suporte do navegador).
- **Dimensões das cartas**: Ajuste a **largura** e **altura** das cartas conforme sua preferência.

### Conteúdo personalizado

Você pode criar suas próprias cartas utilizando um arquivo CSV. Siga as instruções abaixo:

#### Formato do arquivo CSV

O arquivo deve conter os seguintes campos:

- **id**: Número identificador do par (use o mesmo número para cartas que formam um par).
- **type**: Tipo de conteúdo (`image` ou `text`).
- **content**: Caminho para a imagem ou o texto da carta.
- **alt**: Texto alternativo para a imagem (deixe vazio se o tipo for `text`).

#### Exemplo de Arquivo CSV

```csv
id,type,content,alt
1,image,imagens/imagem1.png,Descrição da imagem 1
1,text,Texto correspondente à imagem 1,
2,image,imagens/imagem2.png,Descrição da imagem 2
2,text,Texto correspondente à imagem 2,
```

#### Passos para Personalização

1. **Criar o Arquivo CSV**:
   - Utilize um editor de texto ou planilha eletrônica para criar o arquivo seguindo o formato acima.
2. **Salvar o Arquivo CSV**:
   - Certifique-se de salvar o arquivo com a extensão `.csv`.
3. **Selecionar o Arquivo no Jogo**:
   - No jogo, clique em **"Escolher arquivo"** e selecione seu arquivo CSV personalizado.

#### Dicas

- **Organização**: Mantenha suas imagens organizadas em pastas e atualize os caminhos no arquivo CSV.
- **Descrições claras**: Use descrições significativas no campo `alt` para auxiliar na acessibilidade.
- **Consistência**: Certifique-se de que cada par de cartas compartilhe o mesmo `id`.

---

## Sistema de medalhas

Após concluir o jogo, você receberá uma medalha com base no seu desempenho:

- **Medalha de Ouro 🥇**:
  - **Critério**: Número de tentativas menor ou igual ao número total de pares.
  - **Significado**: Excelente desempenho!
- **Medalha de Prata 🥈**:
  - **Critério**: Número de tentativas menor ou igual a 1,5 vezes o número total de pares.
  - **Significado**: Bom desempenho!
- **Medalha de Bronze 🥉**:
  - **Critério**: Número de tentativas superior a 1,5 vezes o número total de pares.
  - **Significado**: Desempenho satisfatório.

**Como é Calculado:**

- **Total de Pares**: Calculado dividindo o número total de cartas por 2.
- **Exemplo**:
  - Se houver 10 pares (20 cartas no total):
    - **Ouro**: Até 10 tentativas.
    - **Prata**: Até 15 tentativas.
    - **Bronze**: Mais de 15 tentativas.

---

## Requisitos

- **Navegador compatível**: Versões recentes do Chrome, Firefox, Safari ou Edge.
- **JavaScript habilitado**: O jogo utiliza JavaScript para funcionar.
- **Suporte a voz (opcional)**: Para a leitura das cartas, o navegador deve suportar a API de síntese de voz.

---

## Licença

Este projeto está licenciado sob a **Creative Commons BY-NC 4.0**. Isso significa que você pode compartilhar e adaptar o material, desde que atribua os devidos créditos e não use para fins comerciais.

Para mais detalhes, visite: [Creative Commons BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)

---

## Créditos

- **Autores**:
  - **Sebastião Tadeu de Oliveira Almeida**
    - Email: [almeida_sto@ufrrj.br](mailto:almeida_sto@ufrrj.br)
  - **Alexandra Barbosa da Silva**
    - Email: [alexa7@gmail.com](mailto:alexa7@gmail.com)

---

Esperamos que você aproveite o **Jogo da Memória - Imagem e Texto** e que ele seja uma ferramenta útil para enriquecer o aprendizado. Divirta-se jogando e aprendendo!
