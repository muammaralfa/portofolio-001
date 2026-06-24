(function () {
'use strict';

/* --- Theme toggle --- */
const html = document.documentElement;
const toggle = document.getElementById('theme-toggle');

const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (saved === 'dark' || (!saved && prefersDark)) {
html.setAttribute('data-theme', 'dark');
}

toggle.addEventListener('click', () => {
const current = html.getAttribute('data-theme');
const next = current === 'dark' ? 'light' : 'dark';
html.setAttribute('data-theme', next);
localStorage.setItem('theme', next);
});

/* --- Language toggle --- */
const TRANSLATIONS = {
'nav.projects':        { en: 'Projects',       id: 'Proyek' },
'nav.experience':      { en: 'Experience',     id: 'Pengalaman' },
'nav.contact':         { en: 'Contact',        id: 'Kontak' },
'hero.badge':          { en: 'Available for opportunities', id: 'Tersedia untuk peluang' },
'hero.title':          { en: 'Data Engineer <span class="pipe" aria-hidden="true">|</span> Pipelines &amp; Analytics', id: 'Data Engineer <span class="pipe" aria-hidden="true">|</span> Pipeline &amp; Analitik' },
'hero.subtitle':       { en: '<strong>4 Years of Experience</strong> building high-performance pipelines, real-time analytics, and AI-integrated data systems that transform raw data into actionable intelligence.', id: '<strong>4 Tahun Pengalaman</strong> membangun pipeline berkinerja tinggi, analitik real-time, dan sistem data terintegrasi AI yang mengubah data mentah menjadi wawasan yang dapat ditindaklanjuti.' },
'hero.cta_work':       { en: 'View My Work',   id: 'Lihat Karya Saya' },
'hero.cta_contact':    { en: 'Contact Me',      id: 'Hubungi Saya' },
'projects.label':      { en: 'Key Projects',    id: 'Proyek Utama' },
'projects.heading':    { en: 'Selected Work',   id: 'Karya Pilihan' },
'projects.view_details': { en: 'View details',  id: 'Lihat detail' },
'modal.contribution':  { en: 'My Contribution', id: 'Kontribusi Saya' },
'experience.label':    { en: 'Track Record',    id: 'Rekam Jejak' },
'experience.heading':  { en: 'Experience &amp; Achievements', id: 'Pengalaman &amp; Pencapaian' },
'timeline.1.metric':   { en: '30% Faster Processing',  id: 'Pemrosesan 30% Lebih Cepat' },
'timeline.1.desc':     { en: 'Processed large-scale data asynchronously, improving performance and efficiency through multithreading and multiprocessing techniques, reducing data processing time by 30%.', id: 'Memproses data skala besar secara asinkron, meningkatkan performa dan efisiensi melalui teknik multithreading dan multiprocessing, mengurangi waktu pemrosesan data sebesar 30%.' },
'timeline.2.metric':   { en: 'Millions of Events / Day', id: 'Jutaan Event / Hari' },
'timeline.2.desc':     { en: 'Handled millions of events per day using streaming platforms and message queues, ensuring reliable delivery, data consistency, and security across distributed systems.', id: 'Menangani jutaan event per hari menggunakan platform streaming dan message queue, memastikan pengiriman yang andal, konsistensi data, dan keamanan di seluruh sistem terdistribusi.' },
'timeline.3.metric':   { en: 'AI-Powered Pipelines', id: 'Pipeline Bertenaga AI' },
'timeline.3.desc':     { en: 'Integrated data pipelines with pre-built AI models, exposing them as API-based agents to generate enriched and value-added data for downstream consumers.', id: 'Mengintegrasikan pipeline data dengan model AI, mengeksposnya sebagai agen berbasis API untuk menghasilkan data yang diperkaya dan bernilai tambah bagi konsumen hilir.' },
'timeline.4.metric':   { en: 'Automated Scheduling', id: 'Penjadwalan Otomatis' },
'timeline.4.desc':     { en: 'Implemented and managed scheduled data extraction workflows to support automated and timely data ingestion from diverse source systems.', id: 'Mengimplementasikan dan mengelola alur kerja ekstraksi data terjadwal untuk mendukung ingest data otomatis dan tepat waktu dari berbagai sistem sumber.' },
'timeline.5.metric':   { en: 'Multi-Source Orchestration', id: 'Orkestrasi Multi-Sumber' },
'timeline.5.desc':     { en: 'Orchestrated data extraction from multiple sources including APIs, data lakes, and raw datasets, integrating them into cohesive end-to-end data pipelines.', id: 'Mengorkestrasi ekstraksi data dari berbagai sumber termasuk API, data lake, dan dataset mentah, mengintegrasikannya ke dalam pipeline data end-to-end yang kohesif.' },
'timeline.6.metric':   { en: 'Data Transformation', id: 'Transformasi Data' },
'timeline.6.desc':     { en: 'Performed data transformation and cleansing, converting raw and unstructured data into standardized, high-quality datasets ready for analytics and reporting.', id: 'Melakukan transformasi dan pembersihan data, mengonversi data mentah dan tidak terstruktur menjadi dataset berkualitas tinggi yang terstandarisasi dan siap untuk analitik dan pelaporan.' },
'timeline.7.metric':   { en: 'Trusted Data Governance', id: 'Tata Kelola Data Terpercaya' },
'timeline.7.desc':     { en: 'Maintained and governed clean, trusted datasets to ensure consistency, accuracy, and up-to-date availability for downstream systems and stakeholders.', id: 'Memelihara dan mengelola dataset yang bersih dan terpercaya untuk memastikan konsistensi, akurasi, dan ketersediaan terkini bagi sistem hilir dan pemangku kepentingan.' },
'timeline.8.metric':   { en: 'High-Performance APIs', id: 'API Berkinerja Tinggi' },
'timeline.8.desc':     { en: 'Designed and developed high-performance REST APIs for data-driven analytics platforms and real-time logging systems, focusing on low-latency response, caching strategies, and database optimization for high-throughput scalability.', id: 'Merancang dan mengembangkan REST API berkinerja tinggi untuk platform analitik berbasis data dan sistem logging real-time, dengan fokus pada respons latensi rendah, strategi caching, dan optimasi database untuk skalabilitas throughput tinggi.' },
/* --- Project descriptions --- */
'projects.unified.desc':  { en: 'A robust big data ecosystem engineered to seamlessly ingest and integrate information from disparate sources, serving as a centralized data hub and <strong>Single Source of Truth</strong>. The platform implements a <strong>three-tier medallion data architecture</strong> to progressively refine raw data into analytics-ready intelligence — ingesting raw streams and batch payloads, curating validated datasets, and serving high-performance aggregates — while orchestrating the entire lifecycle through Apache Airflow with Kafka-driven real-time ingestion and Elasticsearch-powered centralized observability.', id: 'Sebuah ekosistem big data tangguh yang dirancang untuk menyerap dan mengintegrasikan informasi dari berbagai sumber yang berbeda, berfungsi sebagai pusat data terpusat dan <strong>Single Source of Truth</strong>. Platform ini mengimplementasikan <strong>arsitektur data medallion tiga tingkat</strong> untuk secara progresif menyempurnakan data mentah menjadi intelijen siap analitik — menyerap stream dan batch mentah, mengkurasi dataset tervalidasi, dan menyajikan agregat berkinerja tinggi — sambil mengorkestrasi seluruh siklus hidup melalui Apache Airflow dengan ingest real-time berbasis Kafka dan observabilitas terpusat berbasis Elasticsearch.' },
'projects.massive.desc':  { en: 'An advanced deep-analytics platform that constructs <strong>comprehensive 360-degree individual profiles</strong> by evaluating digital footprints across social media activity and diverse multi-variable data points. The system ingests <strong>real-time social media data streams</strong>, builds <strong>network data models</strong> to map complex social relationships and interaction patterns, and applies complex algorithmic formulas to calculate highly accurate, holistic statistical scores for each individual.', id: 'Sebuah platform deep-analytics canggih yang membangun <strong>profil individu 360 derajat yang komprehensif</strong> dengan mengevaluasi jejak digital di seluruh aktivitas media sosial dan beragam titik data multi-variabel. Sistem ini menyerap <strong>streaming data media sosial real-time</strong>, membangun <strong>model data jaringan</strong> untuk memetakan hubungan sosial yang kompleks dan pola interaksi, serta menerapkan formula algoritmik kompleks untuk menghitung skor statistik holistik yang sangat akurat untuk setiap individu.' },
'projects.politic.desc':  { en: 'A comprehensive presidential election analytics platform engineered to drive regional electoral success through crucial demographic insights — population size, gender distribution, age brackets, and local political party strength. The application centers on an <strong>interactive geospatial map</strong> powered by <strong>Mapbox Vector Tiles (MVT)</strong> and <strong>PostGIS spatial geometry</strong>, with multi-layer filtering that enables users to dynamically visualize and analyze regional electoral data at any zoom resolution.', id: 'Sebuah platform analitik pemilihan presiden yang komprehensif, dirancang untuk mendorong keberhasilan elektoral regional melalui wawasan demografis penting — ukuran populasi, distribusi gender, kelompok usia, dan kekuatan partai politik lokal. Aplikasi ini berpusat pada <strong>peta geospasial interaktif</strong> yang didukung oleh <strong>Mapbox Vector Tiles (MVT)</strong> dan <strong>geometri spasial PostGIS</strong>, dengan pemfilteran multi-layer yang memungkinkan pengguna memvisualisasikan dan menganalisis data elektoral regional secara dinamis pada resolusi zoom apa pun.' },
/* --- Unified Data contributions --- */
'projects.unified.c1':    { en: 'Designed and implemented the full <strong>three-tier medallion architecture</strong> — S3 as the bronze data lake for raw ingestion, PostgreSQL as the silver curation layer for validated and cleansed datasets, and ClickHouse as the gold analytics warehouse for high-performance OLAP queries — establishing a progressive data refinement pipeline from ingest to insight.', id: 'Merancang dan mengimplementasikan <strong>arsitektur medallion tiga tingkat</strong> secara penuh — S3 sebagai bronze data lake untuk ingest mentah, PostgreSQL sebagai silver curation layer untuk dataset tervalidasi dan bersih, dan ClickHouse sebagai gold analytics warehouse untuk kueri OLAP berkinerja tinggi — membangun pipeline pemurnian data progresif dari ingest hingga wawasan.' },
'projects.unified.c2':    { en: 'Engineered the ingestion framework that handles <strong>both streaming and batch data sources</strong>, normalizing disparate formats into a unified schema at the bronze tier before downstream enrichment.', id: 'Merekayasa framework ingest yang menangani <strong>sumber data streaming dan batch</strong>, menormalisasi format yang berbeda ke dalam skema terpadu di tingkat bronze sebelum pengayaan hilir.' },
'projects.unified.c3':    { en: 'Built automated curation workflows in Apache Airflow that orchestrate the <strong>bronze → silver → gold progression</strong>, applying validation rules, deduplication, and transformation logic at each stage transition.', id: 'Membangun alur kerja kurasi otomatis di Apache Airflow yang mengorkestrasi <strong>progresi bronze → silver → gold</strong>, menerapkan aturan validasi, deduplikasi, dan logika transformasi di setiap transisi tahap.' },
'projects.unified.c4':    { en: 'Deployed Kafka-based real-time event streaming to feed all three medallion layers, ensuring <strong>sub-second latency</strong> from raw event capture to silver-layer availability.', id: 'Menerapkan streaming event real-time berbasis Kafka untuk memberi makan ketiga lapisan medallion, memastikan <strong>latensi sub-detik</strong> dari penangkapan event mentah hingga ketersediaan di lapisan silver.' },
'projects.unified.c5':    { en: 'Established Elasticsearch-based centralized logging across all architecture tiers, enabling <strong>full observability</strong> into pipeline health, data lineage, and anomaly detection.', id: 'Membangun logging terpusat berbasis Elasticsearch di seluruh tingkat arsitektur, memungkinkan <strong>observabilitas penuh</strong> terhadap kesehatan pipeline, data lineage, dan deteksi anomali.' },
/* --- Massive Profiling contributions --- */
'projects.massive.c1':    { en: 'Architected <strong>graph-based network data models</strong> in Elasticsearch to represent intricate social relationships — follower graphs, interaction clusters, and influence pathways — enabling high-performance traversal and pattern discovery across millions of connected nodes.', id: 'Merancang <strong>model data jaringan berbasis graf</strong> di Elasticsearch untuk merepresentasikan hubungan sosial yang rumit — graf pengikut, klaster interaksi, dan jalur pengaruh — memungkinkan traversal berkinerja tinggi dan penemuan pola di jutaan node yang terhubung.' },
'projects.massive.c2':    { en: 'Engineered <strong>real-time social media streaming pipelines</strong> that consume platform APIs via Kafka, processing continuous event streams to incrementally enrich profiles with fresh behavioral signals without batch recomputation.', id: 'Merekayasa <strong>pipeline streaming media sosial real-time</strong> yang mengonsumsi API platform melalui Kafka, memproses stream event berkelanjutan untuk memperkaya profil secara inkremental dengan sinyal perilaku baru tanpa komputasi ulang batch.' },
'projects.massive.c3':    { en: 'Designed the <strong>multi-variable algorithmic scoring engine</strong> that synthesizes social activity, network centrality, sentiment analysis, and demographic variables into a unified holistic score, weighted and calibrated against ground-truth validation sets.', id: 'Merancang <strong>mesin penilaian algoritmik multi-variabel</strong> yang menyintesis aktivitas sosial, sentralitas jaringan, analisis sentimen, dan variabel demografis menjadi skor holistik terpadu, dibobot dan dikalibrasi terhadap set validasi ground-truth.' },
'projects.massive.c4':    { en: 'Deployed RabbitMQ as the <strong>asynchronous message backbone</strong>, decoupling high-velocity social media ingestion from downstream processing to ensure resilient, backpressure-aware streaming with guaranteed delivery semantics.', id: 'Menerapkan RabbitMQ sebagai <strong>tulang punggung pesan asinkron</strong>, memisahkan ingest media sosial berkecepatan tinggi dari pemrosesan hilir untuk memastikan streaming yang tangguh, sadar backpressure, dengan semantik pengiriman terjamin.' },
'projects.massive.c5':    { en: 'Utilized MongoDB for <strong>dynamic configuration management</strong>, allowing scoring rule weights, model parameters, and profile schemas to be adjusted in real time without service redeployment.', id: 'Memanfaatkan MongoDB untuk <strong>manajemen konfigurasi dinamis</strong>, memungkinkan bobot aturan penilaian, parameter model, dan skema profil disesuaikan secara real time tanpa deployment ulang layanan.' },
/* --- Politic2024 contributions --- */
'projects.politic.c1':    { en: 'Developed the <strong>high-performance geospatial rendering layer</strong> using Mapbox Vector Tiles (MVT), enabling fluid, zoom-aware map interactions that serve complex electoral boundary data at interactive speeds across all zoom levels — from nationwide overview down to precinct-level detail.', id: 'Mengembangkan <strong>lapisan rendering geospasial berkinerja tinggi</strong> menggunakan Mapbox Vector Tiles (MVT), memungkinkan interaksi peta yang mulus dan sadar zoom yang menyajikan data batas elektoral yang kompleks pada kecepatan interaktif di semua level zoom — dari gambaran nasional hingga detail tingkat TPS.' },
'projects.politic.c2':    { en: 'Implemented <strong>PostGIS spatial queries and geometry processing pipelines</strong> to ingest, validate, and serve regional boundary polygons, transforming raw shapefiles into query-optimized spatial tables with spatial indexing for sub-second tile generation.', id: 'Mengimplementasikan <strong>kueri spasial PostGIS dan pipeline pemrosesan geometri</strong> untuk menyerap, memvalidasi, dan menyajikan poligon batas wilayah, mengubah shapefile mentah menjadi tabel spasial yang dioptimalkan kueri dengan pengindeksan spasial untuk pembuatan tile sub-detik.' },
'projects.politic.c3':    { en: 'Designed <strong>star and snowflake schema data models</strong> to efficiently organize demographic dimensions — population, gender, age cohorts, and political party affiliations — enabling fast OLAP-style aggregation queries across arbitrary regional filter combinations.', id: 'Merancang <strong>model data skema star dan snowflake</strong> untuk mengorganisir dimensi demografis secara efisien — populasi, gender, kelompok usia, dan afiliasi partai politik — memungkinkan kueri agregasi bergaya OLAP yang cepat di berbagai kombinasi filter regional.' },
'projects.politic.c4':    { en: 'Built <strong>multi-layer filtering REST APIs</strong> that dynamically composite geometry-tagged demographic data into MVT-encoded map layers, allowing the frontend to toggle and blend electoral variables in real time without reloading the map.', id: 'Membangun <strong>REST API pemfilteran multi-layer</strong> yang secara dinamis menggabungkan data demografis bertag geometri ke dalam layer peta yang dikodekan MVT, memungkinkan frontend untuk mengaktifkan dan memadukan variabel elektoral secara real time tanpa memuat ulang peta.' },
'projects.politic.c5':    { en: 'Leveraged Redis as a <strong>spatial tile cache</strong> and query-result cache, dramatically reducing repeated PostGIS computation and delivering near-instant map layer toggling even under high-concurrency election-day traffic.', id: 'Memanfaatkan Redis sebagai <strong>cache tile spasial</strong> dan cache hasil kueri, secara dramatis mengurangi komputasi PostGIS berulang dan memberikan pergantian layer peta yang hampir instan bahkan di bawah lalu lintas hari pemilihan dengan konkurensi tinggi.' },

'contact.label':       { en: 'Get In Touch',    id: 'Hubungi Saya' },
'contact.heading':     { en: "Let's Connect",   id: 'Mari Terhubung' },
'contact.text':        { en: "I'm always open to discussing data engineering opportunities, collaborations, or just geeking out about pipelines and distributed systems.", id: 'Saya selalu terbuka untuk mendiskusikan peluang data engineering, kolaborasi, atau sekadar berbagi tentang pipeline dan sistem terdistribusi.' },
'contact.copyright':   { en: '&copy; 2026 Muammar Ibrahim Alfarizi. Built with precision.', id: '&copy; 2026 Muammar Ibrahim Alfarizi. Dibangun dengan presisi.' }
};

const langToggle = document.getElementById('lang-toggle');
const langCode = langToggle.querySelector('.lang-code');

function getLang() {
return html.getAttribute('data-lang') || 'en';
}

function setLang(lang) {
html.setAttribute('data-lang', lang);
localStorage.setItem('lang', lang);

/* Show the OTHER language's code */
langCode.textContent = lang === 'en' ? 'ID' : 'GB';
langToggle.title = lang === 'en' ? 'Bahasa Indonesia' : 'English';

/* Update all i18n elements on the page */
translateContainer(document);
/* Also update modal content if open */
const modal = document.getElementById('project-modal');
if (modal.classList.contains('active')) {
translateContainer(modal);
}
}

/* Init language from storage, default to English */
const savedLang = localStorage.getItem('lang') || 'en';
setLang(savedLang);

langToggle.addEventListener('click', () => {
const next = getLang() === 'en' ? 'id' : 'en';
setLang(next);
});

/* --- Scroll reveal --- */
const observer = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.classList.add('reveal--visible');
observer.unobserve(entry.target);
}
});
},
{
threshold: 0.12,
rootMargin: '0px 0px -40px 0px',
}
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

/* --- Project card → modal --- */
const modal = document.getElementById('project-modal');
const modalBody = modal.querySelector('.modal-body');
const closeBtn = modal.querySelector('.modal-close');

function translateContainer(el) {
const lang = getLang();
el.querySelectorAll('[data-i18n]').forEach((node) => {
const key = node.getAttribute('data-i18n');
const entry = TRANSLATIONS[key];
if (!entry) return;
const text = entry[lang] || entry.en;
if (node.hasAttribute('data-i18n-html')) {
node.innerHTML = text;
} else {
node.textContent = text;
}
});
}

function openModal(contentHTML) {
modalBody.innerHTML = contentHTML;
translateContainer(modalBody);
modal.classList.add('active');
modal.setAttribute('aria-hidden', 'false');
document.body.classList.add('modal-open');
/* Focus the dialog so Esc works immediately */
modal.querySelector('.modal-dialog').focus();
}

function closeModal() {
modal.classList.remove('active');
modal.setAttribute('aria-hidden', 'true');
document.body.classList.remove('modal-open');
}

document.querySelectorAll('.project-card').forEach((card) => {
card.addEventListener('click', () => {
const template = card.querySelector('.project-card__modal-content');
if (template) {
openModal(template.innerHTML);
}
});

card.addEventListener('keydown', (e) => {
if (e.key === 'Enter' || e.key === ' ') {
e.preventDefault();
card.click();
}
});
});

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
/* Close when clicking the backdrop, not the dialog itself */
if (e.target === modal) {
closeModal();
}
});

document.addEventListener('keydown', (e) => {
if (e.key === 'Escape' && modal.classList.contains('active')) {
closeModal();
}
});
})();
