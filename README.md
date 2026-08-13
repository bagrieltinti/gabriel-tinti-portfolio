# Bento Canvas

Preciso muito criar um portfólio criativo bacana, pra mostrar meus trabalhos e materiais editados, que vão são 16:9, 9:16 e 1:1.

Arquitetura de Layout: O Modelo "Bento Grid"

A melhor solução estrutural para mesclar vídeos verticais do TikTok/Reels, peças quadradas de feed e vídeos horizontais é o uso de um Bento Grid ou um Grid Assimétrico (Masonry).

Em vez de forçar todos os trabalhos em caixas idênticas, o Bento Grid permite que cada formato ocupe o espaço natural da sua proporção matemática. Você cria blocos maiores para dar destaque a projetos principais da Agência GAMA, enquanto acomoda de forma elegante as entregas recorrentes de clientes paralelos, como os materiais do Serginho, em blocos adjacentes. Isso gera um mosaico altamente visual, moderno e que foge completamente da estética engessada de templates corporativos.

Estrutura da Página Principal

A navegação deve ser uma experiência de rolagem única (single page), dividida nas seguintes zonas de conversão:

Hero Section (Abertura): Seu nome em tipografia expressiva e uma declaração de posicionamento clara. Uma microinteração sutil aqui, como o texto acompanhando levemente o movimento do mouse, estabelece o tom criativo imediatamente.

Galeria Dinâmica: O Bento Grid em ação. Ao rolar a página, os projetos devem aparecer com um efeito suave de fade-up (surgindo de baixo para cima). O truque para não parecer corporativo é usar cantos levemente arredondados nos vídeos e aplicar um efeito de escurecimento (dim) nos projetos em volta daquele que o usuário está passando o mouse.

Histórico e Agência: Uma linha do tempo minimalista listando sua trajetória freelancer conectada à fundação da GAMA. Use textos curtos e tipografia de alto contraste.

Floating Action Button (FAB): O botão do WhatsApp não deve ficar apenas no rodapé. Ele precisa ser um elemento flutuante fixo no canto inferior direito da tela, com uma pulsação sutil a cada 10 segundos para lembrar o usuário da chamada para ação.

Otimização Extrema vs. Animações

Como você exigiu adaptação perfeita para mobile e desktop aliada a animações, você enfrentará um conflito técnico. Arquivos de vídeo e scripts de animação pesam no carregamento. Para garantir a ultra otimização:

Lazy Loading Agressivo: Os vídeos e imagens só podem ser carregados quando estiverem a poucos pixels de entrar na tela do usuário.

Formatos Modernos: Nunca suba GIFs ou MP4 pesados. Utilize vídeos encodados em WebM para desktop e HEVC para mobile. Para imagens estáticas, use exclusivamente o formato WebP.

Animações via CSS, não JavaScript: Microinterações ligadas ao scroll devem utilizar preferencialmente propriedades nativas de CSS e Intersection Observers. Evite bibliotecas pesadas se o foco for velocidade pura em redes móveis instáveis.

Passei apenas o meu histórico empregatício, monte toda essa estrutura ai, em seguida, vou mandar meus conteúdos fotos e vídeos, o conteúdo principal do portifólio mesmo, assim como uma foto de perfil para mim (faça um placeholder por enquanto).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5b121edd-88fd-4910-9fee-6905c877e53e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
