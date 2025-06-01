#### ## Jogo da Memória - Imagem e Texto

Bem-vindo ao **Jogo da Memória - Imagem e Texto**! Este é um jogo educativo interativo projetado para tornar o aprendizado divertido e envolvente. Ideal para ser utilizado em salas de Atendimento Educacional Especializado (AEE), salas de aula ou para estudo individual, o jogo permite a personalização completa do conteúdo para atender às necessidades específicas dos usuários.

**Jogue Online Agora:** [`https://sebastiao-tadeu.github.io/memory-game-html/`](https://sebastiao-tadeu.github.io/memory-game-html/)

## Sumário

* [Características](#características)
* [Como Jogar](#como-jogar)
  * [Jogando Online](#jogando-online)
  * [Objetivo do Jogo](#objetivo-do-jogo)
  * [Regras Básicas](#regras-básicas)
* [Configurações do Jogo](#configurações-do-jogo)
* [Personalização de Conteúdo](#personalização-de-conteúdo)
  * [Formato do Arquivo CSV (Comum para Online e Offline)](#formato-do-arquivo-csv-comum-para-online-e-offline)
  * [Arquivo CSV de Exemplo para Teste](#arquivo-csv-de-exemplo-para-teste)
  * [1. Personalização para Jogar Online (Usando Imagens da Internet)](#1-personalização-para-jogar-online-usando-imagens-da-internet)
  * [2. Personalização para Jogar Offline (Usando Imagens do seu Computador)](#2-personalização-para-jogar-offline-usando-imagens-do-seu-computador)
* [Sistema de Medalhas](#sistema-de-medalhas)
* [Requisitos](#requisitos)
* [Contribuindo](#contribuindo)
* [Licença](#licença)
* [Créditos](#créditos)

* * *

## Características

* **Jogue Online ou Offline**: Acesse o jogo diretamente pelo navegador ou baixe para usar com seus arquivos locais.
* **Totalmente Personalizável**: Crie suas próprias cartas com imagens e textos através de um arquivo CSV.
* **Modos de Jogo**: Jogue individualmente ou em equipes (selecionável nas configurações).
* **Configurações Ajustáveis**: Defina o número de pares, dimensões das cartas e habilite/desabilite a leitura de cartas.
* **Acessibilidade**: Compatível com leitores de tela e navegável via teclado.
* **Sistema de Medalhas**: Receba medalhas de ouro, prata ou bronze com base no seu desempenho.

* * *

## Como Jogar

### Jogando Online

Você pode jogar a versão mais recente do jogo diretamente no seu navegador através do seguinte link:
[**JOGAR ONLINE AGORA: https://sebastiao-tadeu.github.io/memory-game-html/**](https://sebastiao-tadeu.github.io/memory-game-html/)

No jogo online:

1. Clique no botão **"Escolher arquivo"** e selecione um arquivo `.csv` com os dados das cartas.
   * Para que as imagens personalizadas funcionem na versão online, elas **devem estar hospedadas na internet** (veja a seção "Personalização para Jogar Online" abaixo).
   * Você pode usar o [arquivo CSV de exemplo para teste](#arquivo-csv-de-exemplo-para-teste) fornecido abaixo para começar rapidamente.
2. Após selecionar o arquivo, clique em **"Começar Jogo"**.

### Objetivo do Jogo

* Encontrar todos os pares de cartas correspondentes no menor número de tentativas possível.

### Regras Básicas

* **Virar cartas**: Clique em duas cartas para revelá-las.
* **Encontrar pares**: Se as cartas forem um par, elas permanecerão viradas. Caso contrário, serão ocultadas novamente após um curto período.
* **Turnos (Modo Equipes)**: Se um par não for encontrado, a vez passa para a outra equipe. Uma equipe continua jogando enquanto acerta.
* **Vencendo o jogo**: O jogo termina quando todos os pares forem encontrados. No modo de equipes, a equipe com mais pares vence. No modo individual, o jogador vence ao encontrar todos os pares.

* * *

## Configurações do Jogo

Antes de iniciar uma partida, ou mesmo durante (as alterações podem exigir um reinício do jogo para pleno efeito), clique em **"Configurações"** para ajustar:

* **Modo Single-Player**: Ative para jogar sozinho. Desative para jogar em modo de equipes.
* **Habilitar Leitura das Cartas**: Ative para que o conteúdo das cartas (texto ou descrição `alt` da imagem) seja lido em voz alta (requer suporte do navegador à Web Speech API).
* **Dimensões das Cartas**: Ajuste a **largura** e **altura** das cartas (em pixels) conforme sua preferência.
* **Limitar número de pares**: Defina um número máximo de pares para o jogo. Se o arquivo CSV contiver mais pares que o limite, o jogo selecionará aleatoriamente o número de pares especificado. Digite `0` para usar todos os pares do arquivo CSV.

* * *

## Personalização de Conteúdo

O grande diferencial deste jogo é a capacidade de personalizá-lo com suas próprias imagens e textos! Isso é feito através de um arquivo `.csv` (Valores Separados por Vírgula).

### Formato do Arquivo CSV (Comum para Online e Offline)

O arquivo CSV deve seguir um formato específico para que o jogo possa entendê-lo. Cada linha representa uma carta, e as colunas devem ser:

1. **`id`**: Um número identificador para o par. Cartas que formam um par devem ter o mesmo `id`.
2. **`type`**: O tipo de conteúdo da carta. Use `image` para imagens ou `text` para texto.
3. **`content`**:
   * Se `type` for `image`, esta coluna deve conter o caminho ou URL da imagem.
   * Se `type` for `text`, esta coluna deve conter o texto a ser exibido na carta.
4. **`alt`**:
   * Se `type` for `image`, esta coluna deve conter um texto alternativo descritivo para a imagem (importante para acessibilidade e para a leitura em voz alta).
   * Se `type` for `text`, esta coluna pode ser deixada vazia ou conter uma breve descrição (opcional).



#### Exemplo de Arquivo CSV (primeira linha é o cabeçalho obrigatório)

```csv
id,type,content,alt
1,image,caminho_ou_url_da_imagem1.png,Descrição da Imagem 1 para acessibilidade
1,text,Texto correspondente ao par da Imagem 1,
2,image,caminho_ou_url_da_imagem2.jpg,Descrição da Imagem 2
2,text,Texto correspondente ao par da Imagem 2,
```

#### Arquivo CSV de Exemplo para Teste

Para ajudar você a começar e entender a estrutura, disponibilizamos um arquivo CSV de exemplo pronto para uso ou para servir de modelo. Ele contém exemplos de cartas com diferentes tipos de conteúdo.

[**Clique aqui para baixar o arquivo CSV de exemplo (exemplo_Modelo.csv)**](https://www.google.com/url?sa=E&source=gmail&q=https://drive.google.com/uc?export=download%26id=165Hwtxke-Pk69w5gjtEER1FWGvmXV23w)

Você pode editá-lo e substituir as URLs das imagens por links diretos para suas próprias imagens hospedadas na internet (ex: Imgur), como explicado na seção "Personalização para Jogar Online". 

### 1. Personalização para Jogar Online (Usando Imagens da Internet)

Ao jogar a versão online (disponível em [Jogo da Memória - Imagem e Texto](https://sebastiao-tadeu.github.io/memory-game-html/)), se você quiser usar um arquivo CSV com suas próprias imagens, essas imagens **precisam estar acessíveis publicamente na internet**.

* **Fontes de Imagem:**
  
  * **Serviços de Hospedagem de Imagens:** Faça upload das suas imagens para serviços como [Imgur](https://imgur.com/), [Postimages](https://postimages.org/) ou similar. Após o upload, esses serviços fornecem um **"Link Direto"** (geralmente terminando em `.png`, `.jpg`, etc., e começando com `https://i.imgur.com/...` no caso do Imgur). É este link direto que você deve usar na coluna `content` do seu CSV.
  * **Outras Fontes Online:** Qualquer imagem que já esteja online e tenha uma URL pública direta pode ser usada.
  * **Google Drive/Dropbox, etc.:** Links de compartilhamento padrão desses serviços geralmente **não** são links diretos para a imagem e podem não funcionar. Se for usar, garanta que o arquivo está compartilhado publicamente e use um formato de link que force o acesso direto à imagem (como o exemplo `uc?export=view&id=...` ou `uc?export=download&id=...`), mas saiba que estes não são tão confiáveis quanto serviços dedicados à hospedagem de imagens para sites.

* **Exemplo de Linha no CSV para Jogo Online (usando Imgur):**
  Snippet de código
  
      1,image,https://i.imgur.com/kSaaKeo.png, Descrição da imagem hospedada no Imgur

* **Importante:** Caminhos para arquivos no seu computador (ex: `C:\Imagens\foto.png` ou `minhas_fotos/gato.jpg`) **não funcionarão** na versão online devido às restrições de segurança dos navegadores.

### 2. Personalização para Jogar Offline (Usando Imagens do seu Computador)

Se você prefere usar imagens que estão salvas no seu computador sem precisar enviá-las para a internet, você pode baixar o jogo e executá-lo localmente.

* **Passo 1: Baixar os Arquivos do Jogo**
  
  1. Acesse o repositório do jogo no GitHub: [`https://github.com/sebastiao-tadeu/memory-game-html/`](https://www.google.com/url?sa=E&source=gmail&q=https://github.com/sebastiao-tadeu/memory-game-html/)
  2. Clique no botão verde **"&lt; > Code"** (Código).
  3. No menu dropdown, selecione **"Download ZIP"**.
  4. Salve o arquivo ZIP no seu computador e extraia o conteúdo para uma pasta de sua preferência (ex: `Meus Documentos/JogoDaMemoria`).

* **Passo 2: Preparar seu CSV e Imagens Locais**
  
  1. Dentro da pasta onde você extraiu o jogo (ex: `JogoDaMemoria`), você pode criar uma subpasta para suas imagens (ex: `minhas_imagens_locais`).
  
  2. Copie suas imagens para essa subpasta.
  
  3. Crie seu arquivo CSV (ou copie um existente para esta pasta). Na coluna `content` para as imagens, use o **caminho relativo** para suas imagens locais, a partir da localização do arquivo `index.html`.
     
     * Exemplo: Se seu `index.html` está em `JogoDaMemoria/index.html` e sua imagem `gato.png` está em `JogoDaMemoria/minhas_imagens_locais/gato.png`, o caminho no CSV seria: `minhas_imagens_locais/gato.png`.
     
     * Se a imagem estiver na mesma pasta que o `index.html`, o caminho seria apenas `gato.png`.
     
     * **Exemplo de Linha no CSV para Jogo Offline:**
       
          1,image,minhas_imagens_locais/gato.png,Gato laranja da minha pasta local

* **Passo 3: Jogar Offline**
  
  1. Navegue até a pasta onde você extraiu o jogo e preparou seus arquivos.
  2. Encontre o arquivo `index.html` e dê um duplo clique nele (ou "Abrir com" seu navegador preferido).
  3. O jogo abrirá no seu navegador. A URL na barra de endereços começará com `file:///...`.
  4. Agora, no jogo, clique em "Escolher arquivo" e selecione o seu arquivo CSV com os caminhos para as imagens locais. As imagens devem carregar corretamente.

Sistema de Medalhas
-------------------

Após concluir o jogo, você receberá uma medalha com base no seu desempenho (considerando o número de pares efetivamente em jogo):

* **Medalha de Ouro 🥇**:
  * **Critério**: Número de tentativas menor ou igual a (`total de pares em jogo + 2`). _Exemplo: para 10 pares, até 12 tentativas._
  * **Significado**: Desempenho muito bom!
* **Medalha de Prata 🥈**:
  * **Critério**: Número de tentativas menor ou igual a (`total de pares em jogo * 1.5`). _Exemplo: para 10 pares, até 15 tentativas._
  * **Significado**: Bom desempenho!
* **Medalha de Bronze 🥉**:
  * **Critério**: Número de tentativas superior ao critério da Prata.
  * **Significado**: Desempenho satisfatório, continue tentando!

_(Os critérios exatos das medalhas podem ser ajustados pelo desenvolvedor. A sugestão acima torna o Ouro mais acessível que a perfeição.)_

* * *

Requisitos
----------

* **Navegador moderno**: Versões recentes do Chrome, Firefox, Safari ou Edge.
* **JavaScript habilitado**: O jogo é construído com JavaScript e requer que ele esteja ativo no navegador.
* **Suporte a Web Speech API (opcional)**: Para a funcionalidade de "leitura das cartas", o navegador do usuário precisa suportar a API de síntese de voz.

* * *

Licença
------------

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
