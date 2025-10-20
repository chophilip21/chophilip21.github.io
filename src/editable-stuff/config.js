// Navigation Bar SECTION
const navBar = {
  show: true,
};

// Main Body SECTION
const mainBody = {
  gradientColors: "#4484ce, #1ad7c0, #ff9b11, #9b59b6, #ff7f7f, #ecf0f1",
  firstName: "Philip",
  middleName: "yunsoo",
  lastName: "Cho",
  message: " ML Engineer, Software Developer, and a Soccer Player ",
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

const about = {
  show: true,
  heading: "About Me",
  imageLink: require("../editable-stuff/me.jpg"),
  imageSize: 375,
  message:
    "Thanks a lot for visiting my website 👍 My name is Philip and I am a machine learning (ML) engineer and a software developer living in Vancouver, Canada.<br><br>" + 
    "Let me tell you a bit about myself. My journey into tech wasn’t a straight path. After graduating from the Sauder School of Business at UBC in 2016, I began my career as a marketing specialist at a SaaS company. " + 
    "It was a great start — but over time, I discovered myself drawn to something more technical, finding solving technical problems extremely rewarding."+ 
    " Back then, AI and machine learning weren’t nearly as mainstream as they are today, just starting to bloom. But that futuristic edge — the idea that machines could perceive, reason, and improve — completely fascinated me."+ 
    " Eventually, I decided to follow that spark, leaving my marketing role to pursue a new direction in computer science and machine learning. It was a bumpy road, but in 2021, I successfully completed my Master’s degree in Computer Science at Simon Fraser University (SFU), specializing in Visual Computing. <br><br>" +
    "Since then, I’ve been working in the machine learning industry, focusing on computer vision. I’m passionate about researching ML algorithms, and building ML-powered applications that bridge research and reality — solving real-world problems with data, algorithms, and a bit of creativity. <br><br>" +
    "If you are interested in learning more about me or my past work, checkout my resume from above and feel free to get in touch with me.",
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
      date: 'Sep 2022 – Present',
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

export { navBar, mainBody, about, repos, skills, leadership, getInTouch, experiences };
