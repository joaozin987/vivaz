<template>
  <header class="site-header" id="inicio">
    <nav class="nav">
      <a class="brand" href="#inicio" aria-label="Ótica Amancio">
        <span class="brand-mark">OA</span>
        <span>
          <strong>Ótica Amancio</strong>
          <small>Catálogo de armações</small>
        </span>
      </a>

      <div class="nav-links">
        <a href="#catalogo">Catálogo</a>
        <a class="whatsapp-link" :href="quickWhatsAppLink" target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </nav>
  </header>

  <main>
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Óculos de grau e Óculos solares em Maceió</p>
        <h1>Selecione a armação ideal</h1>
        <p> e informe sua receita por foto ou pela grade OD/OE com esférico, cilindro e eixo.</p>
        <div class="hero-actions">
          <a class="primary-button" href="#catalogo">Ver armações</a>
          <a class="secondary-button" :href="quickWhatsAppLink" target="_blank" rel="noopener">{{ orderIntentText }}</a>
        </div>
      </div>
      <div class="hero-showcase" aria-label="Armações em destaque">
        <img
          v-for="image in featuredImages"
          :key="image.src"
          :src="image.src"
          :alt="image.alt"
          @click="openImage(image.src)"
        >
      </div>
    </section>

    <section class="notice-grid" id="receita">
      <article class="notice important">
        <span class="notice-icon">!</span>
        <div>
          <h2>Atenção para lente multifocal</h2>
          <p>Se o grau for multifocal, lente para perto e longe, é necessário fazer a marcação da distância naso-pupilar, também conhecida como DNP.</p>
        </div>
      </article>

      <article class="notice" id="visita">
        <span class="notice-icon">✓</span>
        <div>
          <h2>Visita em toda Maceió</h2>
          <p>Fazemos visita caso você tenha dúvida sobre qual armação levar ou queira ver como o modelo fica melhor no seu rosto.</p>
        </div>
      </article>
    </section>

    <section class="catalog-section" id="catalogo">
      <div class="section-heading">
        <p class="eyebrow">Catálogo</p>
        <h2>Nossas Armações</h2>
        <p>Toque em uma categoria para ver os modelos e depois escolha a armação para enviar a receita.</p>
      </div>

      <div class="filters" role="tablist" aria-label="Categorias de armações">
        <button
          v-for="filter in filters"
          :key="filter.value"
          class="filter-button"
          :class="{ active: activeFilter === filter.value }"
          type="button"
          @click="activeFilter = filter.value"
        >
          {{ filter.label }}
        </button>
      </div>

      <div v-if="filteredProducts.length" class="catalog-grid" aria-live="polite">
        <article v-for="product in filteredProducts" :key="product.id" class="product-card">
          <div class="product-media">
            <span class="tag">{{ categories[product.category] }}</span>
            <img :src="product.image" :alt="product.name" @click="openImage(product.image)">
          </div>
          <div class="product-content">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <div class="price-row">
              <span class="price">{{ product.price }}</span>
              <span class="badge">Armação disponível</span>
            </div>
            <div class="product-actions">
              <button class="icon-button" type="button" :aria-label="`Ampliar ${product.name}`" @click="openImage(product.image)">⌕</button>
              <button class="choose-button" type="button" @click="openOrderPanel(product)">Escolher armação</button>
            </div>
          </div>
        </article>
      </div>

      <p v-else class="empty-state">Nenhuma armação encontrada nesta categoria.</p>
    </section>
  </main>

  <aside class="order-panel" :class="{ open: isOrderPanelOpen }" :aria-hidden="String(!isOrderPanelOpen)" @click.self="closeOrderPanel">
    <div v-if="selectedProduct" class="order-card" role="dialog" aria-modal="true" aria-labelledby="orderTitle">
      <button class="close-button" type="button" @click="closeOrderPanel" aria-label="Fechar">×</button>
      <div class="selected-product">
        <img :src="selectedProduct.image" :alt="selectedProduct.name">
        <div>
          <p class="eyebrow">Armação escolhida</p>
          <h2 id="orderTitle">{{ selectedProduct.name }}</h2>
          <p>{{ categories[selectedProduct.category] }}</p>
        </div>
      </div>

      <form @submit.prevent="sendOrder">
        <fieldset>
          <legend>Envio da receita</legend>
          <label class="check-row">
            <input type="checkbox" v-model="form.hasRecipePhoto" >
            Vou enviar foto da consulta/receita pelo WhatsApp
          </label>
          <label class="check-row">
            <input type="checkbox" v-model="form.isMultifocal">
            Meu grau é multifocal
          </label>
          <p class="form-note">Para multifocal, a Ótica Amancio fará a orientação da marcação de DNP.</p>
        </fieldset>

        <fieldset class="prescription-grid">
          <legend>Grade do grau</legend>
          <div class="grid-head"></div>
          <div class="grid-head">Esférico</div>
          <div class="grid-head">Cilindro</div>
          <div class="grid-head">Eixo</div>

          <label class="eye-label" for="odSphere">OD</label>
          <select id="odSphere" v-model="form.od.sphere">
            <option v-for="option in sphereOptions" :key="`od-sphere-${option.value}`" :value="option.value">{{ option.label }}</option>
          </select>
          <select v-model="form.od.cylinder">
            <option v-for="option in cylinderOptions" :key="`od-cylinder-${option.value}`" :value="option.value">{{ option.label }}</option>
          </select>
          <select v-model="form.od.axis">
            <option v-for="option in axisOptions" :key="`od-axis-${option.value}`" :value="option.value">{{ option.label }}</option>
          </select>

          <label class="eye-label" for="oeSphere">OE</label>
          <select id="oeSphere" v-model="form.oe.sphere">
            <option v-for="option in sphereOptions" :key="`oe-sphere-${option.value}`" :value="option.value">{{ option.label }}</option>
          </select>
          <select v-model="form.oe.cylinder">
            <option v-for="option in cylinderOptions" :key="`oe-cylinder-${option.value}`" :value="option.value">{{ option.label }}</option>
          </select>
          <select v-model="form.oe.axis">
            <option v-for="option in axisOptions" :key="`oe-axis-${option.value}`" :value="option.value">{{ option.label }}</option>
          </select>
        </fieldset>

        <label class="text-label" for="observations">Observações: </label>
        <textarea id="observations" v-model.trim="form.observations" rows="3" placeholder="Ex: tenho dúvida no tamanho, quero visita em Maceió, preferência de cor..."></textarea>

        <button class="primary-button full" type="submit">Enviar pedido no WhatsApp</button>
      </form>
    </div>
  </aside>

  <div id="lightbox" :class="{ open: lightboxImage }" :aria-hidden="String(!lightboxImage)" @click="closeImage">
    <img v-if="lightboxImage" :src="lightboxImage" alt="Imagem ampliada">
  </div>

  <footer>
    <strong>Ótica Amancio</strong>
    <p>Catálogo online de armações. Atendimento e visitas em Maceió.</p>
    <div class="footer-actions">
      <a :href="quickWhatsAppLink" target="_blank" rel="noopener">WhatsApp</a>
      <a href="#catalogo">Ver catálogo</a>
    </div>
    <small>© 2026 Ótica Amancio. Todos os direitos reservados.</small>
  </footer>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const whatsappNumber = "5582987229827";
const orderIntentText = "Enviar meu grau e receber avaliação";
const activeFilter = ref("todos");
const selectedProduct = ref(null);
const isOrderPanelOpen = ref(false);
const lightboxImage = ref("");

const categories = {
  polarizadas: "Polarizadas",
  "feminina-acetato": "Feminina acetato",
  "feminina-metal": "Feminina metal",
  "masculina-metal": "Masculina metal",
  "masculina-acetato": "Masculina acetato"
};

const imagePath = (fileName) => new URL(`../img/${fileName}`, import.meta.url).href;

const products = [
  {
    id: "oa-101",
    name: "Amancio Classic 101",
    category: "polarizadas",
    image: imagePath("569c6206-8e72-4b4b-8658-3ecd83b529b7.jpeg"),
    price: "Sob consulta",
    description: "Modelo solar polarizado para uso diário, com visual leve e proteção contra reflexos."
  },
  {
    id: "oa-102",
    name: "Amancio Riviera 102",
    category: "polarizadas",
    image: imagePath("dbd07694-e507-4323-9a1e-9dcf85647007.jpeg"),
    price: "Sob consulta",
    description: "Armação solar com lente polarizada e presença elegante para dirigir ou caminhar."
  },
  {
    id: "oa-201",
    name: "Amancio Bella 201",
    category: "feminina-acetato",
    image: imagePath("ee5af563-9c6e-4564-8cd5-e48ed9ce8030.jpeg"),
    price: "Sob consulta",
    description: "Acetato feminino com frente marcante e encaixe confortável para lentes de grau."
  },
  {
    id: "oa-202",
    name: "Amancio Iris 202",
    category: "feminina-acetato",
    image: imagePath("d1d38d87-7a6a-4eda-b292-a6fbe97b6483.jpeg"),
    price: "Sob consulta",
    description: "Formato versátil para quem busca uma armação feminina moderna e resistente."
  },
  {
    id: "oa-301",
    name: "Amancio Lina 301",
    category: "feminina-metal",
    image: imagePath("1d1fd67a-684d-4f4c-b59d-f80c8db56050.jpeg"),
    price: "Sob consulta",
    description: "Metal feminino delicado, indicado para um visual discreto e acabamento refinado."
  },
  {
    id: "oa-302",
    name: "Amancio Flora 302",
    category: "feminina-metal",
    image: imagePath("420bf4da-f212-47ea-bef9-c48b2a6d4789.jpeg"),
    price: "Sob consulta",
    description: "Armação metálica leve para lentes de grau com desenho confortável."
  },
  {
    id: "oa-401",
    name: "Amancio Urban 401",
    category: "masculina-metal",
    image: imagePath("79088748-b6b9-4882-99b8-1e965ba79837.jpeg"),
    price: "Sob consulta",
    description: "Metal masculino com linhas firmes para rotina de trabalho e uso prolongado."
  },
  {
    id: "oa-402",
    name: "Amancio Prime 402",
    category: "masculina-metal",
    image: imagePath("7026a3b3-2f35-45b3-abfb-bfedace5e65e.jpeg"),
    price: "Sob consulta",
    description: "Modelo masculino discreto, com ponte ajustável e acabamento minimalista."
  },
  {
    id: "oa-501",
    name: "Amancio Forte 501",
    category: "masculina-acetato",
    image: imagePath("d90410eb-0bf3-48f5-86f7-670c5f185880.jpeg"),
    price: "Sob consulta",
    description: "Acetato masculino com estrutura robusta para quem prefere armações encorpadas."
  },
  {
    id: "oa-502",
    name: "Amancio Norte 502",
    category: "masculina-acetato",
    image: imagePath("3b278097-34a6-4a9d-8a6b-491236a7bb1e.jpeg"),
    price: "Sob consulta",
    description: "Armação masculina em acetato com desenho atual e ótimo apoio no rosto."
  }
];

const featuredImages = [
  {
    src: imagePath("569c6206-8e72-4b4b-8658-3ecd83b529b7.jpeg"),
    alt: "Armação de óculos em destaque"
  },
  {
    src: imagePath("79088748-b6b9-4882-99b8-1e965ba79837.jpeg"),
    alt: "Óculos polarizado em destaque"
  },
  {
    src: imagePath("5c191210-aaf0-468e-8694-82b99ab09bc7.jpeg"),
    alt: "Armação metálica em destaque"
  }
];

const initialPrescriptionForm = () => ({
  hasRecipePhoto: false,
  isMultifocal: false,
  observations: "",
  od: {
    sphere: "0.00",
    cylinder: "0.00",
    axis: "0°"
  },
  oe: {
    sphere: "0.00",
    cylinder: "0.00",
    axis: "0°"
  }
});

const form = ref(initialPrescriptionForm());

const filters = computed(() => [
  { value: "todos", label: "Todos" },
  ...Object.entries(categories).map(([value, label]) => ({ value, label }))
]);

const filteredProducts = computed(() => {
  if (activeFilter.value === "todos") return products;
  return products.filter((product) => product.category === activeFilter.value);
});

const formatDegree = (value, showPlus = true) => {
  if (value === 0) return "0.00";
  const signal = value > 0 && showPlus ? "+" : "";
  return `${signal}${value.toFixed(2)}`;
};

const sphereOptions = computed(() => {
  const values = [0];
  for (let value = 0.25; value <= 6.001; value += 0.25) values.push(value);
  for (let value = -0.25; value >= -5.001; value -= 0.25) values.push(value);

  return values.map((value) => ({
    value: formatDegree(value),
    label: value === 0 ? "Sem grau / 0.00" : formatDegree(value)
  }));
});

const cylinderOptions = computed(() => {
  const values = [0];
  for (let value = -0.25; value >= -4.001; value -= 0.25) values.push(value);

  return values.map((value) => ({
    value: formatDegree(value, false),
    label: value === 0 ? "Sem cilindro / 0.00" : formatDegree(value, false)
  }));
});

const axisOptions = computed(() => {
  const values = [];
  for (let value = 0; value <= 180; value += 5) values.push(value);

  return values.map((value) => ({
    value: `${value}°`,
    label: value === 0 ? "0° ou 180°" : `${value}°`
  }));
});

const whatsAppLink = (message) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
const quickWhatsAppLink = computed(() => whatsAppLink("Olá, Tenho uma receita de vista e quero fazer um orçamento de armação + lente. Como faço para enviar?"));

const openOrderPanel = (product) => {
  selectedProduct.value = product;
  form.value = initialPrescriptionForm();
  isOrderPanelOpen.value = true;
};

const closeOrderPanel = () => {
  isOrderPanelOpen.value = false;
};

const openImage = (src) => {
  lightboxImage.value = src;
};

const closeImage = () => {
  lightboxImage.value = "";
};

const prescriptionText = () => [
  `OD: Esférico ${form.value.od.sphere} | Cilindro ${form.value.od.cylinder} | Eixo ${form.value.od.axis}`,
  `OE: Esférico ${form.value.oe.sphere} | Cilindro ${form.value.oe.cylinder} | Eixo ${form.value.oe.axis}`
].join("\n");

const sendOrder = () => {
  if (!selectedProduct.value) return;

  const message = [
    "Olá, gostaria de atendimento da Ótica Amancio.",
    orderIntentText,
    "",
    `Armação escolhida: ${selectedProduct.value.name}`,
    `Categoria: ${categories[selectedProduct.value.category]}`,
    `Imagem: ${selectedProduct.value.image}`,
    "Review da imagem: quero que vocês avaliem essa armação pela imagem e me orientem se ela combina com meu rosto e com o meu grau.",
    "",
    form.value.hasRecipePhoto
      ? "Vou enviar a foto da consulta/receita pelo WhatsApp."
      : "Preenchi meu grau pela grade:",
    form.value.hasRecipePhoto ? "" : prescriptionText(),
    form.value.isMultifocal
      ? "Meu grau é multifocal. Preciso de orientação para marcação da DNP."
      : "Meu grau não é multifocal.",
    form.value.observations ? `Observações: ${form.value.observations}` : ""
  ].filter(Boolean).join("\n");

  window.open(whatsAppLink(message), "_blank");
};

onMounted(() => {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeOrderPanel();
      closeImage();
    }
  });
});
</script>
