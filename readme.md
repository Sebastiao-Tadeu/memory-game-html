## Jogo da Memória - Imagem e Texto

Bem-vindo ao **Jogo da Memória - Imagem e Texto**! Este é um jogo educativo interativo projetado para tornar o aprendizado divertido e envolvente. Ideal para ser utilizado em salas de Atendimento Educacional Especializado (AEE), salas de aula ou para estudo individual, o jogo permite a personalização completa do conteúdo para atender às necessidades específicas dos usuários.

## Sumário

* [Características](#características)
* [Como Jogar](#como-jogar)
* [Personalização](#personalização)
  * [Configurações do Jogo](#configurações-do-jogo)
  * [Conteúdo Personalizado](#conteúdo-personalizado)
* [Sistema de Medalhas](#sistema-de-medalhas)
* [Requisitos](#requisitos)
* [Contribuindo](#contribuindo)
* [Licença](#licença)
* [Créditos](#créditos)

* * *

## Características

* **Personalizável**: Crie suas próprias cartas com imagens e textos através de um arquivo CSV.
* **Modo de jogo**: Jogue individualmente ou em equipes, realize a seleção nas configurações.
* **Acessibilidade**: Compatível com leitores de tela e navegável via teclado (tecla tab).
* **Medalhas**: Receba medalhas de ouro, prata ou bronze com base no seu desempenho.

* * *

## Como Jogar

### Preparação

1. **Selecionar o Arquivo CSV**:
   * Clique no botão **"Escolher arquivo"** e selecione um arquivo CSV com os dados das cartas.
2. **Iniciar o Jogo**:
   * Após selecionar o arquivo, clique em **"Começar Jogo"**.

### Objetivo

* Encontrar todos os pares de cartas correspondentes no menor número de tentativas possível.

### Regras Básicas

* **Virar cartas**: Clique em duas cartas para revelá-las.
* **Encontrar pares**: Se as cartas forem um par, elas permanecerão viradas. Caso contrário, serão ocultadas novamente.
* **Turnos**: No modo de equipes, a vez passa para a outra equipe se um par não for encontrado.
* **Vencendo o jogo**: O jogo termina quando todos os pares forem encontrados. A equipe ou jogador com mais pares vence.

* * *

## Personalização

### Configurações do jogo

Clique em **"Configurações"** para ajustar as seguintes opções:

* **Modo single-player**: Ative para jogar sozinho.
* **Habilitar leitura das cartas**: Ative para que as cartas sejam lidas em voz alta (requer suporte do navegador).
* **Dimensões das cartas**: Ajuste a **largura** e **altura** das cartas conforme sua preferência.
* **Limitar número de pares**: Defina um número máximo de pares para o jogo (0 para usar todos os pares do arquivo CSV). O jogo selecionará aleatoriamente os pares se o limite for menor que o total disponível.

### Conteúdo personalizado

Você pode criar suas próprias cartas utilizando um arquivo CSV. Siga as instruções abaixo:

#### Formato do arquivo CSV

O arquivo deve conter os seguintes campos, separados por vírgula:

* **id**: Número identificador do par (use o mesmo número para cartas que formam um par).
* **type**: Tipo de conteúdo (`image` ou `text`).
* **content**: Caminho para a imagem (relativo à localização do `index.html` se for local, ou URL completa) ou o texto da carta.
* **alt**: Texto alternativo para a imagem (importante para acessibilidade; pode ser deixado vazio se o tipo for `text`, mas uma breve descrição é útil).

#### Exemplo de Arquivo CSV

```csv
# Este é um arquivo CSV para o Jogo da Memória - Imagem e Texto
# Formato: id,type,content,alt
id,type,content,alt
1,image,imagens/emocao/1.png,garoto expressando medo
1,text,Medo
2,image,imagens/emocao/2.png,homem expressando raiva
2,text,Raiva
3,image,imagens/emocao/3.png,menina expressando alegria
3,text,Alegria
```

#### Passos para Personalização

1. **Criar o Arquivo CSV**:
   * Utilize um editor de texto simples (como Bloco de Notas, VS Code, Sublime Text) ou um software de planilha (Excel, Google Sheets, LibreOffice Calc) para criar o arquivo seguindo o formato acima.
2. **Salvar o Arquivo CSV**:
   * Certifique-se de salvar o arquivo com a extensão `.csv` (por exemplo, `meu_jogo_da_memoria.csv`). Se usar um software de planilha, escolha "Salvar Como" e selecione o tipo CSV.
3. **Selecionar o Arquivo no Jogo**:
   * No jogo, clique em **"Escolher arquivo"** e selecione seu arquivo CSV personalizado.

#### Dicas

* **Caminhos das Imagens**: Se as imagens estiverem na mesma pasta do `index.html`, você pode apenas usar o nome do arquivo (ex: `gato.png`). Se estiverem em uma subpasta (ex: `imagens`), use `imagens/gato.png`.
* **Descrições Claras**: Use descrições significativas no campo `alt` para auxiliar na acessibilidade e para a leitura em voz alta.
* **Consistência**: Certifique-se de que cada par de cartas compartilhe o mesmo `id` e que cada `id` apareça exatamente duas vezes no arquivo.

* * *

Sistema de medalhas
-------------------

Após concluir o jogo, você receberá uma medalha com base no seu desempenho:

* **Medalha de Ouro 🥇**:
  * **Critério**: Número de tentativas menor ou igual ao número total de pares em jogo + 2.
  * **Significado**: Excelente desempenho!
* **Medalha de Prata 🥈**:
  * **Critério**: Número de tentativas menor ou igual a 1,6 vezes o número total de pares em jogo.
  * **Significado**: Bom desempenho!
* **Medalha de Bronze 🥉**:
  * **Critério**: Número de tentativas superior a 1,6 vezes o número total de pares em jogo.
  * **Significado**: Desempenho satisfatório.

**Como é Calculado:**

* **Total de Pares em Jogo**: O número de pares que foram efetivamente carregados e exibidos no jogo atual.
* **Exemplo**:
  * Se houver 10 pares em jogo:
    * **Ouro**: Até 10 tentativas.
    * **Prata**: De 11 a 15 tentativas.
    * **Bronze**: Mais de 15 tentativas.

* * *

Requisitos
----------

* **Navegador compatível**: Versões recentes do Chrome, Firefox, Safari ou Edge.
* **JavaScript habilitado**: O jogo utiliza JavaScript para funcionar.
* **Suporte a voz (opcional)**: Para a leitura das cartas, o navegador deve suportar a API de Síntese de Voz (Web Speech API).

* * *

Licença
-------

Este projeto está licenciado sob a **Licença MIT**.



Para o texto completo da licença, consulte o arquivo  [License.txt · Sebastiao-Tadeu/memory-game-html@75119f4 · GitHub](https://github.com/Sebastiao-Tadeu/memory-game-html/commit/75119f4f2c19898fbb3a6eedba8a7f9e0b2e5f2d) incluído neste repositório.

* * *

Créditos
--------

* **Autores**:
  
  * **Sebastião Tadeu de Oliveira Almeida**
    * Email: [almeida_sto@ufrrj.br](mailto:almeida_sto@ufrrj.br)
    * GitHub:[Sebastiao-Tadeu · GitHub](https://github.com/Sebastiao-Tadeu)
  * **Alexsandra Barbosa da Silva**
    * Email: [alexsa7@gmail.com](mailto:alexa7@gmail.com)
