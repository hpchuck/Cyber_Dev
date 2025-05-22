import{u as p,b as u,j as e,m as a}from"./main-Ccalwsk9.js";import{C as g}from"./check-uh-Hgtmt.js";const h={Basic:`Hi, I'm interested in the Basic Web Development package. I'd like to discuss creating a single-page website with the following requirements:

- Responsive design implementation
- Basic SEO optimization
- Contact form integration
- 5 content sections

Please let me know the next steps and timeline for this project.`,Professional:`Hi, I'm interested in the Professional Web Development package. I'd like to discuss creating a multi-page website with:

- Advanced SEO implementation
- CMS integration
- E-commerce features
- Custom animations
- Performance optimization

Could you provide more details about the development process and timeline?`,Enterprise:`Hi, I'm interested in the Enterprise Web Development solution. I'd like to discuss:

- Custom web application development
- AI integration possibilities
- Load balancing implementation
- Security requirements
- API development needs

Please provide information about your enterprise development process and available consultation times.`,Starter:`Hi, I'm interested in the Starter Mobile Development package. I'd like to discuss:

- Native mobile app development
- Basic feature implementation
- Push notification system
- User authentication
- Analytics integration

Could you share more details about your mobile development process?`,Advanced:`Hi, I'm interested in the Advanced Mobile Development package. I'd like to discuss:

- Cross-platform app development
- Advanced feature implementation
- Offline support
- Custom API integration
- Social media integration

Please provide information about your development timeline and process.`},v=()=>{const{pricingPlans:r,setContactMessage:l}=p();u();const c=t=>{const i=h[t]||"",s=document.getElementById("contact");s&&s.scrollIntoView({behavior:"smooth"}),setTimeout(()=>{l(i)},800)},m=r.reduce((t,i)=>(t[i.category]||(t[i.category]=[]),t[i.category].push(i),t),{});return e.jsx("section",{id:"pricing",className:"min-h-screen py-20 px-4 md:px-8 relative",children:e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"absolute inset-0 bg-grid-pattern opacity-10"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent"}),e.jsxs(a.div,{initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},className:"max-w-7xl mx-auto relative z-10",children:[e.jsx("h2",{className:"section-heading text-[#00FF41] mb-16",children:"PRICING_MATRIX"}),Object.entries(m).map(([t,i],s)=>e.jsxs("div",{className:"mb-20",children:[e.jsx(a.h3,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},className:"text-2xl md:text-3xl font-bold font-mono text-[#00FF41] mb-8 text-center",children:t}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-8",children:i.map((o,d)=>e.jsxs(a.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{delay:d*.2},whileHover:{y:-10},className:"relative group h-[600px]",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-[#00FF41]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"}),e.jsxs("div",{className:"backdrop-blur-md bg-black/30 border border-[#00FF41]/20 rounded-lg p-6 relative h-full flex flex-col",children:[e.jsxs("div",{className:"mb-6",children:[e.jsx("h4",{className:"text-xl font-bold font-mono text-[#00FF41] mb-2 glitch","data-text":o.name,children:o.name}),e.jsx("p",{className:"text-3xl font-bold font-mono gradient-text mb-4",children:o.price})]}),e.jsx("div",{className:"flex-grow overflow-y-auto scrollable-content pr-2",children:e.jsx("ul",{className:"space-y-4",children:o.features.map(n=>e.jsxs("li",{className:"flex items-start gap-2 text-[#00FF41]/80 font-mono group/feature",children:[e.jsx(g,{className:"w-5 h-5 flex-shrink-0 mt-1 group-hover/feature:scale-110 transition-transform duration-300"}),e.jsx("span",{className:"group-hover/feature:text-[#00FF41] transition-colors duration-300",children:n})]},n))})}),e.jsxs(a.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>c(o.name),className:"relative group/btn w-full px-6 py-3 bg-[#00FF41]/10 border border-[#00FF41]/30 rounded-lg font-mono text-[#00FF41] hover:bg-[#00FF41]/20 transition-all duration-300 mt-6 overflow-hidden",children:[e.jsx("span",{className:"relative z-10",children:"Get Started"}),e.jsx("div",{className:"absolute inset-0 bg-grid-pattern opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-[#00FF41]/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"}),e.jsx("div",{className:"absolute top-0 left-0 w-2 h-full bg-[#00FF41]/40 transform -skew-x-20 translate-x-[-200%] group-hover/btn:translate-x-[1000%] transition-transform duration-1000"})]})]})]},o.id))})]},t))]})]})})};export{v as PricingSection};
