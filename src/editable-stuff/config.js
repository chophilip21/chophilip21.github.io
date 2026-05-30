// Navigation Bar SECTION
const navBar = {
  show: true,
};

// Main Body SECTION
const mainBody = {
  gradientColors: "#4484ce, #1ad7c0, #ff9b11, #9b59b6, #ff7f7f, #ecf0f1",
  firstName: "Philip",
  middleName: "Yunsoo",
  lastName: "Cho",
  message: " ML Engineer, Software Developer, and a Creator of SotaVault ",
  icons: [
    {
      image: "fa-github",
      url: "https://github.com/chophilip21",
    },
    {
      image: "fa-linkedin",
      url: "https://www.linkedin.com/in/pycho/",
    },
  ],
};

const sotaVault = {
  show: true,
  heading: "Founder of SotaVault",
  logoSrc: process.env.PUBLIC_URL + "/sotavault.svg",
  websiteUrl: "https://sotavault.ai/",
  description:
    "SotaVault helps the ML community discover conferences, research papers, dataset series, and benchmark leaderboards in one place. The platform curates and structures benchmark metadata extracted through custom ingestion and language-model pipelines — while respecting that underlying papers and public datasets remain the property of their original authors.",
  highlights: [
    "Built and launched a full-scale automated machine learning benchmark and leaderboard platform from scratch, owning the product architecture and lifecycle from data ingestion to production cloud deployment.",
    "Designed cloud-native infrastructure on Google Kubernetes Engine (GKE) with Terraform, including horizontal pod autoscaling for fluctuating user traffic, Redis for API caching, and a GitHub Actions CI/CD pipeline that tests, packages images to Artifact Registry, and finally deploys through Cloud Deploy.",
    "Developed an automated arXiv ingestion pipeline, first using OCR models to collect metadata and processing key metrics using AWQ/GGUF quantized vLLM models, finally cross checking the quality of the data using web-grounded LLM agents and internal vector DB.",
    "Architected low-latency semantic search and discovery APIs backed by the internal vector database for benchmark and paper exploration.",
  ],
};

const about = {
  show: true,
  heading: "About Me",
  imageLink: require("../editable-stuff/me.jpg"),
  imageSize: 176,
  message:
    "My name is Philip, and I am a Machine Learning and MLOps Engineer based in Vancouver, Canada. Since you are here, let me tell you a bit about the journey behind the code—the side of my story that doesn’t fit cleanly onto a resume.<br><br>" +
    "<strong>The Pivot: From Business to AI</strong><br>" +
    "My path into technology wasn't linear. After graduating from the Sauder School of Business at UBC, I started out on the commercial side of tech. It didn't take long to realize that I was far more energized by building solutions to technical problems than managing marketing campaigns. I became fascinated by a futuristic edge that was just beginning to bloom: the idea that machines could perceive, reason, and learn from data.<br><br>" +
    "Driven by that spark, I left my business career behind to rebuild my foundation from scratch. It was a rigorous transition, but it led me to complete my Master’s degree in Computer Science (Visual Computing) at Simon Fraser University.<br><br>" +
    "<strong>The Evolution: Vision, Infrastructure, and Going Solo</strong><br>" +
    "For years, my industry experience centered on computer vision and generative imagery—building end-to-end video pipelines, optimizing inference servers, and training custom GANs. But as the AI landscape evolved, I realized that true ML impact requires more than just training models; it requires robust, production-grade infrastructure to serve them. To bridge that gap, I focused heavily on advanced cloud architecture, culminating in becoming a certified Google Cloud Professional Cloud Architect.<br><br>" +
    "<strong>What I'm Building Now: SotaVault 🚀</strong><br>" +
    "Most recently, I spent six months taking everything I know about MLOps, LLMs, and cloud-native systems to build and launch my own product from scratch: <a href=\"https://sotavault.ai/\" target=\"_blank\" rel=\"noopener noreferrer\">SotaVault</a> (sotavault.ai).<br><br>" +
    "SotaVault is a live, fully functional platform that brings structured transparency to the chaotic world of open-source machine learning benchmarks. Building it solo meant owning the entire stack:<br>" +
    "<ul>" +
    "<li>Designing an automated ingestion pipeline to parse academic metadata directly from arXiv PDFs.</li>" +
    "<li>Architecting a low-latency semantic search layer using vector search in managed Firestore.</li>" +
    "<li>Deploying a highly scalable backend on Google Kubernetes Engine (GKE) orchestrated entirely via Terraform.</li>" +
    "<li>Optimizing high-throughput serving infrastructure for open-source LLM families like Qwen 3 and DeepSeek on local hardware.</li>" +
    "</ul>" +
    "I don't just write model code; I build the pipelines, scale the infrastructure, and deploy the final product to the world.",
  resume: "https://docs.google.com/document/d/13_PWdhThMr6roxb-UFiJj4YAFOj8e_bv3Vx9UHQdyBQ/edit?usp=sharing",
};

// PROJECTS SECTION
// Setting up project lenght will automatically fetch your that number of recently updated projects, or you can set this field 0 to show none.
//      i.e: reposLength: 0,
// If you want to display specfic projects, add the repository names,
//      i.e ["repository-1", "repo-2"]
const repos = {
  show: true,
  heading: "Recent Projects",
  gitHubUsername: "chophilip21", //i.e."johnDoe12Gh"
  reposLength: 4,
  specificRepos: [],
};

// Leadership SECTION
const leadership = {
  show: false,
  heading: "Leadership",
  message:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae auctor eu augue ut lectus arcu bibendum at varius. Libero justo laoreet sit amet cursus sit amet. Imperdiet dui accumsan sit amet nulla facilisi morbi. At auctor urna nunc id. Iaculis urna id volutpat lacus laoreet non curabitur gravida. Et magnis dis parturient montes nascetur ridiculus mus mauris. In nisl nisi scelerisque eu ultrices vitae auctor. Mattis nunc sed blandit libero volutpat sed cras ornare. Pulvinar neque laoreet suspendisse interdum consectetur libero.",
  images: [
    { 
      img: require("../editable-stuff/me.jpg"), 
      label: "First slide label", 
      paragraph: "Nulla vitae elit libero, a pharetra augue mollis interdum." 
    },
    { 
      img: require("../editable-stuff/me.jpg"), 
      label: "Second slide label", 
      paragraph: "Nulla vitae elit libero, a pharetra augue mollis interdum." 
    },
  ],
  imageSize: {
    width:"615",
    height:"450"
  }
};

// SKILLS SECTION
const skills = {
  show: false,
  heading: "Skills",
  hardSkills: [
    { name: "Python", value: 90 },
    { name: "SQL", value: 75 },
    { name: "Data Structures", value: 85 },
    { name: "C/C++", value: 65 },
    { name: "JavaScript", value: 90 },
    { name: "React", value: 65 },
    { name: "HTML/CSS", value: 55 },
    { name: "C#", value: 80 },
  ],
  softSkills: [
    { name: "Goal-Oriented", value: 80 },
    { name: "Collaboration", value: 90 },
    { name: "Positivity", value: 75 },
    { name: "Adaptability", value: 85 },
    { name: "Problem Solving", value: 75 },
    { name: "Empathy", value: 90 },
    { name: "Organization", value: 70 },
    { name: "Creativity", value: 90 },
  ],
};

// GET IN TOUCH SECTION
const getInTouch = {
  show: true,
  heading: "Get In Touch",
  message:
    "If you have any questions, or if you just want to say hi, please feel free to email me at",
  email: "chophilip21@gmail.com",
};

const experiences = {
  show: true,
  heading: "Experiences",
  imageSize: 375,
  data: [
    {
      role: 'Machine Learning Developer',
      companylogo: require('../assets/img/mark.jpeg'),
      date: 'Sep 2022 – Jan 2026',
    },
    
    {
      role: 'Machine Learning Engineer',
      companylogo: require('../assets/img/onecup.png'),
      date: 'May 2021 – Aug 2022',
    },
  ]
}

// Blog SECTION
// const blog = {
//   show: false,
// };

export { navBar, mainBody, sotaVault, about, repos, skills, leadership, getInTouch, experiences };
