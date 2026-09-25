const fs = require('fs');
let html = fs.readFileSync('convidado.html', 'utf8');

function genItem(num, title, obj, foco, topics) {
    let tHtml = '';
    topics.forEach(t => {
        tHtml += `<div class="acc-topic-item"><span class="check">✓</span><span>${t}</span></div>`;
    });
    return `
    <div class="accordion-item">
        <button class="accordion-header">
            <div class="mod-number">${num}</div>
            <span class="mod-title-text">${title}</span>
            <span class="mod-icon">▼</span>
        </button>
        <div class="accordion-body">
            <div class="accordion-inner">
                <p class="acc-section-title">OBJETIVO DO MÓDULO</p>
                <p class="acc-text">${obj}</p>

                <p class="acc-section-title" style="margin-top: 24px;">FOCO PRÁTICO E APLICAÇÃO</p>
                <p class="acc-text">${foco}</p>

                <p class="acc-topics-title">TÓPICOS E AULAS PRÁTICAS:</p>
                <div class="acc-topics-grid">
                    ${tHtml}
                </div>
            </div>
        </div>
    </div>`;
}

const especialistasData = [
    ["01", "GOOGLE EARTH ENGINE DESCOMPLICADO", "Introduzir a maior plataforma de processamento em nuvem de dados geoespaciais.", "Criação de mosaicos de imagens sem nuvem, cálculos de índices espectrais e classificação de uso do solo na nuvem.", ["01 | Introdução ao GEE: funcionalidades e vantagens", "02 | Importação de dados vetoriais e delimitação geométrica", "03 | Manipulação de Coleções de Imagens orbitais", "04 | Filtros de nuvem e criação de mosaicos", "05 | Índices espectrais calculados via script", "06 | Coleta de amostras na plataforma GEE", "07 | Algoritmos de classificação de imagens", "08 | Filtros de suavização pós-classificação", "09 | Validação de acurácia dos resultados", "10 | Como exportar arquivos para uso local", "11 | Deploy de aplicação interativa com Streamlit"]],
    ["02", "PROCESSAMENTO DE IMAGENS DE DRONES", "Gerar ortomosaicos e modelos de relevo tridimensionais a partir de fotos aéreas.", "Uso do Agisoft Metashape para alinhar fotos, gerar nuvens de pontos e exportar curvas de nível e ortofotos.", ["1 | Introdução ao mapeamento com drones", "2 | Instalação e recursos recomendados", "3 | Planejamento de Voos e sobreposição de imagens", "4.1 | Conhecendo a interface do Agisoft Metashape", "4.2 | Conversão de coordenadas e alinhamento de fotos", "5 | Geração de Nuvem Densa de Pontos", "6 | Geração de MDT (Terreno) e MDS (Superfície)", "7 | Modelagem 3D e construção de texturas", "8 | Geração de curvas de nível baseadas em altimetria", "9 | Exportação de Ortomosaico final, cálculo de NDVI e exportação de dados"]],
    ["03", "LINGUAGEM R PARA CIÊNCIA DE DADOS", "Aprender a linguagem estatística R voltada a análises ambientais.", "Criação de objetos, data frames, filtros com dplyr, estatísticas e plotagem de mapas dinâmicos.", ["1 | Introdução e Apresentação da Linguagem R", "2 | Download e Instalação (R e RStudio)", "3 | Interface e configuração do RStudio", "4 | Instalação e utilização de Pacotes essenciais", "5 | Manipulação de Objetos, Vetores e Matrizes", "6 | Criação de Listas, Data Frames e Arrays", "7 | Organização e tratamento de Dados com dplyr (Filter, Arrange)", "8 | Resumos de dados espaciais (Mutate, Summarise, Group By)", "9 | Criação de funções personalizadas no R", "10 | Elaboração e exportação de um mapa no R"]],
    ["04", "PYTHON PARA GEOPROCESSAMENTO", "Introduzir a programação em Python aplicada a automatização em ambiente GIS.", "Instalação do Jupyter Notebook, lógica de programação (operadores, condicionais e loops) e bibliotecas espaciais.", ["01 | Porque aprender Python para fins GIS", "02 | Primeiros passos com o Jupyter Notebook", "03 | Sintaxe e lógica básica do Python", "04 | Variáveis, tipos de dados e operadores lógicos", "05 | Manipulação de Listas, Tuplas e Dicionários", "06 | Estruturas condicionais e de repetição (if/else/for/while)", "07 | Principais Bibliotecas GIS no Python (Geopandas, Fiona, Shapely)"]],
    ["05", "DASHBOARDS COM POWER BI", "Criar painéis dinâmicos e relatórios interativos contendo dados espaciais georreferenciados.", "Tratamento de dados no Power Query, importação de shapefiles no Power BI e design de layouts no Figma.", ["Módulo 1: Base Fundamental e Ideação do Business Intelligence (BI)", "1.2 | Pilares e Linguagens de consulta do BI", "1.4 | Instalação do Power BI e apresentação da interface", "2.1 | Modelos de Dashboards e fontes de dados", "2.2 | Importação, adequação e ETL de dados (Power Query)", "2.3 | Montagem da Área Visual e automatização de tarefas", "2.6 | Interações entre filtros e opções de navegação", "3.1 | Mapas de Formas e Coropléticos no Power BI", "3.3 | Importação de arquivos Shapefile no Power BI", "3.4 | Mapas de Pontos e mapas de Calor", "4.1 | Design de Dashboards: Preparação de telas com Figma", "5.1 | Publicação de relatórios interativos e compartilhamento"]],
    ["06", "CADASTRO AMBIENTAL RURAL (CAR) NA PRÁTICA", "Aprender a legislação florestal brasileira e o passo a passo para submissão do CAR no SICAR.", "Delimitação de Áreas de Preservação Permanente (APP), Reserva Legal (ARL) e consolidadas, e inserção no portal oficial.", ["1 | Introdução e Fundamentação Inicial do Código Florestal", "2 | CAR e o relacionamento com os produtores rurais", "3 | Importância de noções de legislação e análises de imagens temporais", "4 | Delimitação prática de Áreas de APP e suas funções ecológicas", "5 | Caracterização e localização de Área de Reserva Legal (ARL)", "6 | Delimitação de Áreas Consolidadas", "7 | Prática 01: Comparação multitemporal com 2008 e vetorização", "8 | Prática 02: Portal SICAR - Do cadastro do imóvel ao recibo final", "Prática Extra: Especialista Pedro Ogibowski (Módulos Fiscais e APP de corpos hídricos)"]],
    ["07", "RADAR - PROCESSAMENTO DE IMAGENS SAR", "Aprender o processamento digital de dados provenientes de sensores de radar de abertura sintética (SAR).", "Download de dados no ASF Data Search, pré-processamento no Sentinel Application Platform (SNAP) e cálculo de índices.", ["1.1 | Apresentação e Histórico do ensino de Radar", "1.2 | O que o Profissional da área de meio ambiente precisa saber", "1.4 | Tipos de Sensores de Micro-ondas e geometria SLAR", "1.7 | A Lógica do Radar de Abertura Sintética (SAR) e Polarização", "2.1 | ASF Data Search para Download gratuito de Imagens", "2.2 | Pré-Processamento de Dados SAR no software SNAP", "2.5 | Correção de Órbita, remoção de ruído térmico em dados GRD", "2.9 | Deburst e processamento de dados no SNAP", "2.11 | Calibração de Dados, Filtros de Speckle e Correção Geométrica", "2.15 | Radar Vegetation Index (RVI) e alternativas em Python"]],
    ["08", "GEOMARKETING NA PRÁTICA", "Aplicar a inteligência geográfica em negócios para delimitar áreas de influência comercial.", "Uso de geocodificadores, mapeamento de concorrentes, geradores de fluxo e venda de serviços de geomarketing.", ["Aula 01 | Introdução ao Geomarketing e suas aplicações práticas", "Aula 02 | Análise espacial aplicada a mercados", "Aula 03 | Mapeamento de Concorrentes e geradores de fluxo de clientes", "Aula 05 | Geocodificação: transformando endereços em pontos de mapa", "Aula 07 | Fontes de dados públicas e privadas no Brasil", "Aula 14 | Mapeamento do Perfil de consumo da região", "Bônus: Como montar propostas e vender serviços de Geomarketing"]],
    ["09", "MEMORIAL DESCRITIVO E PLATAS TOPOGRÁFICAS", "Automatizar a geração de memórias de cálculo fundiárias e plantas profissionais.", "Uso do plugin LF Tools no QGIS para geração de memoriais descritivos e pranchas dinâmicas pelo Atlas.", ["1.1 | Apresentação, Objetivos e instalação do Plugin LF Tools", "1.3 | Carregando o Modelo TopoGeo no QGIS", "1.4 | Gerenciamento de Geopackages e simbologia por regras", "2.2 | Importação do Geopackage e vetorização de limites de confrontações", "2.4 | Cálculo de Área e Perímetro do imóvel rural", "2.5 | Execução da ferramenta de Memorial Descritivo automatizada", "2.6 | Inserindo Memorial Sintético na Planta Topográfica", "2.7 | Geração em lote de Plantas e Memoriais dinâmicos pelo Atlas"]],
    ["10", "ECOLOGIA DE PAISAGENS", "Análise quantitativa de métricas ambientais de fragmentação de habitats florestais.", "Download de bases do MapBiomas e cálculo de métricas espaciais com o Fragstats e plugin Lecos no QGIS.", ["01 | Introdução teórica à Ecologia da Paisagem (Heterogeneidade e Elementos)", "04 | Métricas da paisagem (Efeito de borda, fragmentação, isolamento)", "05 | Conhecendo e baixando dados históricos do Plugin MapBiomas", "06 | Preparação, reclassificação e adequação de legendas raster", "08 | Cálculo de métricas da paisagem utilizando o software Fragstats", "10 | Cálculo de métricas utilizando o Plugin Lecos (QGIS)", "11 | Conversão de dados Raster para Vetor e cálculo de áreas fragmentadas", "14 | Cruzamento temporal (1985 vs 2022) e exportação de planilhas de análise"]],
    ["11", "CHATGPT PARA ANÁLISES AMBIENTAIS E GIS", "Utilizar modelos de inteligência artificial generativa como assistente de geoprocessamento.", "Construção de prompts para resolução de erros de softwares GIS, tradução e análise estatística.", ["01 | Introdução à inteligência artificial generativa", "02 | Registro e primeiros passos na interface do ChatGPT", "03 | Princípios de Engenharia de Prompt para analistas", "04 | Síntese de textos e tradução de termos técnicos", "06 | Análise exploratória de dados tabulares", "07 | Gestão e resolução de Erros em softwares de Geoprocessamento"]]
];

const iaData = [
    ["01", "INTRODUÇÃO À INTELIGÊNCIA ARTIFICIAL", "Aprender os conceitos fundamentais de IA e aplicá-los na construção de um portfólio web.", "Utilização de ferramentas de IA para desenvolvimento web e automação de tarefas.", ["Introdução e Principais Ferramentas", "Quem será seu professor?", "Por que aprender sobre IA?", "O que é Inteligência Artificial?", "Explorando possibilidades com o ChatGPT", "Agendando Tarefas com o Gemini", "Criando um Artefato com Claude", "Aprenda qualquer assunto com o Notebook LM"]],
    ["02", "MÓDULO PRÁTICA: CRIANDO UM PORTFÓLIO WEB COM O ANTIGRAVITY", "Desenvolver e publicar um site completo de forma automatizada com IA.", "Do prompt inicial à publicação de um portfólio web gratuito com suporte do Antigravity.", ["Referências e Descrição de Ideias", "5 Passos para Desenvolver com IA", "Download, Instalação e Diferença de Versões", "Prompt Inicial e Início das Tarefas", "Primeira versão", "Ajustes e melhorias", "Publicando o site gratuitamente", "Finalizando o projeto com Fable 5"]]
];

const livesData = [
    ["01", "GRAVAÇÕES DAS LIVES DE GEOPROCESSAMENTO", "Biblioteca contínua de aulas semanais práticas gravadas, abordando os desafios reais do mercado de trabalho.", "Estudos de caso reais de consultoria ambiental, análises multicritério, modelagem de processos e mapas avançados.", ["Live #001 - Mapa de Localização no ArcGIS", "Live #003 - Análise Multicritério aplicada à área de estudo", "Live #005 - Estimativa de Temperatura Superficial com Landsat 8", "Live #008 - Delimitação de APP de Altitude, Declividade e Topo de Morro", "Live #010 - Delimitação automática de APP em margem de corpo Hídrico", "Live #012 - Mapa Topográfico do Zero no ArcGIS", "Live #025 - ModelBuilder: o tutorial supremo de automações", "Live #037 - Como criar um Dashboard do zero (ArcGIS Dashboards)", "Live #041 - Como precificar serviços de Geoprocessamento", "Live #042 - Hidrologia: Tutorial Supremo no ArcGIS Pro", "Live #045 - Truques para Layout Moderno (Map Design)", "Live #052 - Automação com MODELBUILDER do ZERO", "Live #063 - Desvendando o Google Earth Engine (GEE Scripts)", "Live #070 - Mapa do Absoluto Zero ao Layout Final", "Live #089 - Automatizando tarefas no QGIS (Modelador Gráfico)", "Live #095 - Como montar propostas comerciais para a área ambiental", "Live #106 - Análise Multicritério, Sobreposição Ponderada e Álgebra de Mapas"]]
];

function buildContent(id, data) {
    let out = `<div class="syllabus-content" id="${id}" style="display: none;">\n<div class="accordion">\n`;
    data.forEach(d => {
        out += genItem(d[0], d[1], d[2], d[3], d[4]);
    });
    out += `\n</div>\n</div>\n`;
    return out;
}

const allContent = buildContent("especialistas", especialistasData) + 
                   buildContent("ia", iaData) + 
                   buildContent("lives", livesData);

// To ensure it's precisely inside <section id="ementa" class="syllabus-section">
// We find where this section closes.
const ementaStart = html.indexOf('<section id="ementa"');
if (ementaStart !== -1) {
    let i = ementaStart;
    let openSections = 0;
    let foundFirst = false;
    while (i < html.length) {
        if (html.substring(i, i+8) === '<section') {
            openSections++;
            foundFirst = true;
            i += 8;
        } else if (html.substring(i, i+9) === '</section') {
            openSections--;
            if (foundFirst && openSections === 0) {
                // Here we inject allContent just before </section>
                html = html.substring(0, i) + '\n' + allContent + '\n' + html.substring(i);
                break;
            }
            i += 9;
        } else {
            i++;
        }
    }
}

// Update cache buster
html = html.replace(/style\.css\?v=[0-9]+/, 'style.css?v=' + Date.now());

fs.writeFileSync('convidado.html', html);
console.log('Successfully injected content strictly inside #ementa');
