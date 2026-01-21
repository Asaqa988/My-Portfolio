import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Linkedin, Mail, Phone, ExternalLink, 
  Database, Server, Code, Shield, Cpu, Workflow, 
  Award, Terminal, ChevronRight, MapPin, 
  Sparkles, Bot, Loader2
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  
  // AI Feature State
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const generateAIStrategy = async () => {
    if (!aiInput.trim()) return;
    
    setIsGenerating(true);
    setAiResponse('');
    
    try {
      // NOTE: For production, use import.meta.env.VITE_GEMINI_API_KEY
      // You will need to create an .env file locally.
      const apiKey = ""; 
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are Abdulraheem's AI Assistant, an expert in Digital Transformation and Automation Engineering. 
                
                The user has the following business problem or process they want to improve: 
                "${aiInput}"
                
                Please act as a Senior Automation Consultant and provide a concise, technical strategic recommendation (max 150 words). 
                Suggest specific tools from Abdulraheem's stack (n8n, Python, MERN, OpenAI API, AWS, SQL) to solve this.
                Format the response with Markdown, using bolding for key tools.`
              }]
            }]
          })
        }
      );

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      setAiResponse(text || "I apologize, but I couldn't generate a strategy at this moment. Please try again.");
    } catch (error) {
      console.error("Error generating strategy:", error);
      setAiResponse("An error occurred while connecting to the AI service. Please check your connection.");
    } finally {
      setIsGenerating(false);
    }
  };

  const NavLink = ({ to, label }) => (
    <button
      onClick={() => scrollTo(to)}
      className={`text-sm font-medium transition-colors hover:text-emerald-400 ${
        activeSection === to ? 'text-emerald-400' : 'text-slate-400'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter text-white">
            <span className="text-emerald-500">Abdulraheem</span> Alsaka
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            <NavLink to="home" label="Home" />
            <NavLink to="about" label="About" />
            <NavLink to="experience" label="Experience" />
            <NavLink to="projects" label="Projects" />
            <NavLink to="skills" label="Skills" />
            <NavLink to="contact" label="Contact" />
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-6 flex flex-col gap-4">
            {['home', 'about', 'experience', 'projects', 'skills', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="text-left text-slate-300 hover:text-emerald-400 capitalize py-2"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-6 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Open to New Opportunities
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              AI & Digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Transformation
              </span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
              I transform workflows into enterprise-ready digital services. 
              Specializing in MERN stack, n8n orchestration, and integrating AI agents into real-world applications.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setIsAIModalOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/25"
              >
                <Sparkles size={18} /> Get AI Strategy
              </button>
              <button 
                onClick={() => scrollTo('projects')}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-all border border-slate-700 flex items-center gap-2"
              >
                View Projects <ChevronRight size={18} />
              </button>
            </div>
          </div>
          
          {/* Hero Visual/Stats */}
          <div className="hidden md:block relative">
            <div className="relative z-10 bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white">Abdulraheem Alsaka</h3>
                  <p className="text-emerald-400">Automation Engineer</p>
                </div>
                <div className="bg-slate-800 p-2 rounded-lg">
                  <Cpu size={24} className="text-emerald-400" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                  <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400"><Workflow size={20} /></div>
                  <div>
                    <div className="text-xs text-slate-500">Specialization</div>
                    <div className="font-medium text-slate-200">Process Automation</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                  <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400"><Terminal size={20} /></div>
                  <div>
                    <div className="text-xs text-slate-500">Stack</div>
                    <div className="font-medium text-slate-200">MERN & Python</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                  <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400"><Database size={20} /></div>
                  <div>
                    <div className="text-xs text-slate-500">Focus</div>
                    <div className="font-medium text-slate-200">AI Integration</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent transform -rotate-6 rounded-2xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* AI Strategy Modal */}
      {isAIModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">AI Automation Architect</h3>
                  <p className="text-xs text-slate-400">Powered by Gemini 2.5 Flash</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAIModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-grow">
              {!aiResponse ? (
                <>
                  <p className="text-slate-300 mb-4">
                    Describe a repetitive task or business process you want to automate. I will generate a technical strategy using my preferred stack (n8n, Python, AI).
                  </p>
                  <div className="space-y-4">
                    <textarea
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      placeholder="Example: I run a real estate agency and spend 2 hours a day manually replying to lead emails and scheduling viewings..."
                      className="w-full h-32 bg-slate-950 border border-slate-700 rounded-xl p-4 text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors resize-none placeholder:text-slate-600"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={generateAIStrategy}
                        disabled={!aiInput.trim() || isGenerating}
                        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="animate-spin" size={18} /> Analyzing...
                          </>
                        ) : (
                          <>
                            <Sparkles size={18} /> Generate Strategy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="min-w-[40px] h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <Bot size={20} />
                    </div>
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-slate-300 leading-relaxed prose prose-invert prose-emerald max-w-none">
                       <ReactMarkdown>{aiResponse}</ReactMarkdown>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      onClick={() => setAiResponse('')}
                      className="text-sm text-slate-400 hover:text-white underline"
                    >
                      Ask another question
                    </button>
                    <button
                      onClick={() => setIsAIModalOpen(false)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">About Me</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-12">
            I am an AI-focused Developer & Automation Engineer based in <span className="text-white font-medium">Amman, Jordan</span>. 
            With a background in MIS from the University of Jordan, I bridge the gap between technical complexity and business efficiency. 
            I have extensive experience designing intelligent systems, orchestrating n8n workflows, and teaching the next generation of 
            QA engineers. My goal is to align AI initiatives with organizational objectives to drive true digital transformation.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-3xl font-bold text-emerald-400 mb-2">10+</div>
              <div className="text-sm text-slate-500">Years Exp</div>
            </div>
            <div className="p-6 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-3xl font-bold text-blue-400 mb-2">15+</div>
              <div className="text-sm text-slate-500">Projects</div>
            </div>
            <div className="p-6 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-3xl font-bold text-purple-400 mb-2">8+</div>
              <div className="text-sm text-slate-500">Certifications</div>
            </div>
            <div className="p-6 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-3xl font-bold text-amber-400 mb-2">2k+</div>
              <div className="text-sm text-slate-500">Students Mentored</div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-16 flex items-center gap-3">
            <Workflow className="text-emerald-500" /> Professional Experience
          </h2>

          <div className="relative border-l border-slate-800 ml-3 md:ml-6 space-y-12">
            {[
              {
                role: "Artificial Intelligence Consultant",
                company: "Dogan Voyages",
                period: "Jan 2023 - Present",
                current: true,
                desc: "Provide strategic advisory on AI adoption and automation frameworks to enhance operational efficiency. Oversee the design and deployment of intelligent systems supporting data-driven decision-making. Ensure alignment of AI initiatives with organizational objectives and compliance standards."
              },
              {
                role: "Senior Automation Engineer",
                company: "Islamic International Arab Bank",
                period: "Dec 2023 - Aug 2025",
                current: false,
                desc: "Led the design and maintenance of enterprise-level automation frameworks within CI/CD environments. Developed automated testing solutions to improve accuracy and reduce time-to-release. Collaborated with cross-functional teams to integrate AI-enabled quality controls."
              },
              {
                role: "Senior Quality Manager",
                company: "Property Shop Investment (PSI)",
                period: "Sep 2022 – Sep 2023",
                current: false,
                desc: "Directed the Quality Assurance function, ensuring software delivery met performance and compliance requirements. Established structured test strategies and RCA methodologies. Supervised QA teams and streamlined reporting processes across business units."
              },
              {
                role: "Senior Instructor",
                company: "Al-Hussein Technical University (HTU)",
                period: "Dec 2022 – Jul 2025",
                current: false,
                desc: "Delivered structured training programs in Quality Assurance and automation testing. Mentored students on industry practices, tool utilization, and professional readiness. Fostered partnerships with industry stakeholders to ensure curriculum relevance and excellence."
              },
              {
                role: "Senior QA Instructor",
                company: "Luminus Technical University College",
                period: "Aug 2022 – Jan 2024",
                current: false,
                desc: "Delivered advanced training programs in software testing and automation. Developed structured course materials aligned with industry best practices. Guided students toward certification and employment readiness in QA roles."
              },
              {
                role: "Quality Assurance & Trainer",
                company: "Princess Sumaya University for Technology",
                period: "Aug 2012 – Present",
                current: true,
                desc: "Conduct workshops and mentor students on modern QA methodologies and tools. Design and evaluate hands-on projects reflecting real-world testing scenarios. Promote excellence and innovation in software quality education."
              },
              {
                role: "Senior QA Instructor",
                company: "Tuned Applications Training Center",
                period: "Jan 2021 - Jan 2023",
                current: false,
                desc: "Led specialized training sessions in manual and automated testing. Created comprehensive QA training materials and assessment frameworks. Supported trainees in applying QA techniques within professional environments."
              },
              {
                role: "Cyber Security Consultant",
                company: "Al Mozon IT",
                period: "Apr 2019 - Oct 2022",
                current: false,
                desc: "Provided consultation on system security assessments and risk mitigation. Conducted audits and ensured adherence to cybersecurity standards. Collaborated with technical teams to improve overall system resilience."
              },
              {
                role: "Quality Assurance & Trainer",
                company: "Crystel Contact Center",
                period: "Feb 2014 - July 2019",
                current: false,
                desc: "Supervised quality assurance operations and team performance. Designed and executed testing procedures to maintain service excellence. Delivered coaching programs to enhance staff capabilities and compliance outcomes."
              }
            ].map((exp, index) => (
              <div key={index} className="relative pl-8 md:pl-12">
                <div className={`absolute -left-[5px] top-2 w-3 h-3 rounded-full ring-4 ring-slate-950 ${exp.current ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full w-fit border ${exp.current ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-slate-500 border-slate-800'}`}>
                    {exp.period}
                  </span>
                </div>
                <div className="text-slate-400 mb-4 font-medium">{exp.company}</div>
                <p className="text-slate-500 max-w-2xl leading-relaxed">
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-slate-400 mb-12">Highlighting my work in AI, Automation, and SaaS.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="group bg-slate-950 rounded-xl overflow-hidden border border-slate-800 hover:border-emerald-500/50 transition-all hover:shadow-2xl hover:shadow-emerald-500/10">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-emerald-500/10 p-3 rounded-lg text-emerald-400">
                    <Cpu size={24} />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">AI Platform</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">Careerak</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  An AI-powered platform matching job seekers with opportunities using natural language profiling and skill analysis. Implemented automation workflows for application tracking.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-slate-900 text-slate-300 px-2 py-1 rounded">NLP</span>
                  <span className="text-xs bg-slate-900 text-slate-300 px-2 py-1 rounded">Automation</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group bg-slate-950 rounded-xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-blue-500/10 p-3 rounded-lg text-blue-400">
                    <Server size={24} />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">SaaS</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">Workflow Automation SaaS</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  Transformed multiple n8n workflows into a SaaS automation service integrated with WhatsApp, Stripe, and Google Sheets.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-slate-900 text-slate-300 px-2 py-1 rounded">n8n</span>
                  <span className="text-xs bg-slate-900 text-slate-300 px-2 py-1 rounded">Stripe</span>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group bg-slate-950 rounded-xl overflow-hidden border border-slate-800 hover:border-purple-500/50 transition-all hover:shadow-2xl hover:shadow-purple-500/10">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-purple-500/10 p-3 rounded-lg text-purple-400">
                    <Code size={24} />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Bot</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">Jawabto</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  Designed a multilingual AI communication platform automating customer support. Integrated custom response pipelines for real-time interaction.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-slate-900 text-slate-300 px-2 py-1 rounded">Multilingual AI</span>
                  <span className="text-xs bg-slate-900 text-slate-300 px-2 py-1 rounded">Chatbot</span>
                </div>
              </div>
            </div>

             {/* Project 4 */}
             <div className="group bg-slate-950 rounded-xl overflow-hidden border border-slate-800 hover:border-amber-500/50 transition-all hover:shadow-2xl hover:shadow-amber-500/10">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-amber-500/10 p-3 rounded-lg text-amber-400">
                    <Shield size={24} />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">QA/Test</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">AI-Driven QA Framework</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  Implemented automated testing solutions using Appium and Selenium with CI/CD. Reduced manual testing time by 40%.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-slate-900 text-slate-300 px-2 py-1 rounded">Selenium</span>
                  <span className="text-xs bg-slate-900 text-slate-300 px-2 py-1 rounded">CI/CD</span>
                </div>
              </div>
            </div>

             {/* Project 5 */}
             <div className="group bg-slate-950 rounded-xl overflow-hidden border border-slate-800 hover:border-pink-500/50 transition-all hover:shadow-2xl hover:shadow-pink-500/10">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-pink-500/10 p-3 rounded-lg text-pink-400">
                    <Database size={24} />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">ERP</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors">AI ERP for Facebook</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  Built an AI-enabled ERP solution to manage business page operations, automate content, and analyze engagement via OpenAI APIs.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-slate-900 text-slate-300 px-2 py-1 rounded">OpenAI API</span>
                  <span className="text-xs bg-slate-900 text-slate-300 px-2 py-1 rounded">Analytics</span>
                </div>
              </div>
            </div>

            {/* Project 6 */}
            <div className="group bg-slate-950 rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all hover:shadow-2xl hover:shadow-cyan-500/10">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-cyan-500/10 p-3 rounded-lg text-cyan-400">
                    <ExternalLink size={24} />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Healthcare</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">EHR-Lite System</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  Lightweight electronic health record subsystem supporting patient management. Applied automation and data analytics for decision-making.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-slate-900 text-slate-300 px-2 py-1 rounded">Medical</span>
                  <span className="text-xs bg-slate-900 text-slate-300 px-2 py-1 rounded">Analytics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Tech */}
      <section id="skills" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
           <div className="flex flex-col md:flex-row gap-16">
             <div className="md:w-1/3">
                <h2 className="text-3xl font-bold text-white mb-6">Technical Arsenal</h2>
                <p className="text-slate-400 mb-8">
                  A comprehensive toolkit focused on data integrity, cloud scalability, and process automation.
                </p>
                <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Award className="text-emerald-500" size={20} /> Certifications
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'PMP® – Project Management Professional (PMI)',
                      'ISTQB® – Certified Tester',
                      'ISTQB® – Certified Agile Tester',
                      'Scrum.org – Certified Scrum Master (CSM)',
                      'ISACA – Certified COBIT 5',
                      'Microsoft Azure – AZ-900 (Cloud Fundamentals)',
                      'AI in Cybersecurity – Dinarak Training Program (2025)',
                      'Train the Trainer (TOT) – 30 Hours Professional Program (2025)'
                    ].map((cert, i) => (
                      <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
             </div>

             <div className="md:w-2/3 grid sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-800 pb-2">Database & Cloud</h3>
                  <div className="flex flex-wrap gap-2">
                    {['PostgreSQL', 'AWS RDS', 'Azure DB', 'GCP Cloud SQL', 'Docker', 'Kubernetes', 'Redis'].map(skill => (
                       <span key={skill} className="px-3 py-1.5 bg-slate-900 text-slate-300 text-sm rounded-lg border border-slate-800">
                         {skill}
                       </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-800 pb-2">Automation & Dev</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'Bash', 'Ansible', 'CI/CD', 'Git', 'n8n', 'MERN Stack'].map(skill => (
                       <span key={skill} className="px-3 py-1.5 bg-slate-900 text-slate-300 text-sm rounded-lg border border-slate-800">
                         {skill}
                       </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-800 pb-2">Observability</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Grafana', 'Prometheus', 'pgAdmin', 'Log Management'].map(skill => (
                       <span key={skill} className="px-3 py-1.5 bg-slate-900 text-slate-300 text-sm rounded-lg border border-slate-800">
                         {skill}
                       </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-800 pb-2">Languages</h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm text-slate-400">
                      <span>Arabic (Native)</span>
                      <span className="text-emerald-500">●●●●●</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-400">
                      <span>English (Professional)</span>
                      <span className="text-emerald-500">●●●●●</span>
                    </div>
                  </div>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Let's Automate the Future</h2>
          <p className="text-slate-400 mb-12">
            Ready to discuss how we can streamline your operations with AI?
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <a href="mailto:asaqa001@gmail.com" className="p-6 bg-slate-950 rounded-xl border border-slate-800 hover:border-emerald-500 transition-colors group">
              <Mail className="mx-auto mb-4 text-slate-500 group-hover:text-emerald-500 transition-colors" size={32} />
              <div className="text-sm text-slate-500">Email Me</div>
              <div className="text-white font-medium">asaqa001@gmail.com</div>
            </a>
            <a href="tel:962797700235" className="p-6 bg-slate-950 rounded-xl border border-slate-800 hover:border-emerald-500 transition-colors group">
              <Phone className="mx-auto mb-4 text-slate-500 group-hover:text-emerald-500 transition-colors" size={32} />
              <div className="text-sm text-slate-500">Call Me</div>
              <div className="text-white font-medium">+962 79 770 0235</div>
            </a>
            <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 hover:border-emerald-500 transition-colors group">
              <MapPin className="mx-auto mb-4 text-slate-500 group-hover:text-emerald-500 transition-colors" size={32} />
              <div className="text-sm text-slate-500">Location</div>
              <div className="text-white font-medium">Amman, Jordan</div>
            </div>
            <a href="https://www.linkedin.com/in/abedalraheem-alsaqqa/" target="_blank" rel="noopener noreferrer" className="p-6 bg-slate-950 rounded-xl border border-slate-800 hover:border-emerald-500 transition-colors group">
              <Linkedin className="mx-auto mb-4 text-slate-500 group-hover:text-emerald-500 transition-colors" size={32} />
              <div className="text-sm text-slate-500">Connect</div>
              <div className="text-white font-medium">LinkedIn Profile</div>
            </a>
          </div>

          <footer className="border-t border-slate-800 pt-8 text-slate-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} Abdulraheem Alsaka. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="https://www.linkedin.com/in/abedalraheem-alsaqqa/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="mailto:asaqa001@gmail.com" className="hover:text-white transition-colors"><Mail size={20} /></a>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
};

export default App;
