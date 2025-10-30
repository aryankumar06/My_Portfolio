import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Github,
  Linkedin,
  Download,
  Palette,
} from "lucide-react";
import profile1 from "./saman/profile22.jpeg"


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const sections = ["about", "experience", "projects", "skills", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }

      // Intersection Observer for animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      }, observerOptions);

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) observer.observe(element);
      });

      return () => observer.disconnect();
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const themeClasses = {
    bg: isDarkTheme
      ? "bg-white"
      : "bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100",
    text: isDarkTheme ? "text-black" : "text-gray-800",
    navBg: isDarkTheme ? "bg-white/95" : "bg-white/90",
    navBorder: isDarkTheme ? "border-gray-200" : "border-purple-200",
    sectionBg: isDarkTheme
      ? "bg-gray-50"
      : "bg-gradient-to-r from-purple-100/50 to-blue-100/50",
    cardBg: isDarkTheme ? "bg-white" : "bg-white/80",
    cardBorder: isDarkTheme ? "border-gray-200" : "border-purple-200/50",
    accent: isDarkTheme ? "text-black" : "text-purple-600",
    button: isDarkTheme
      ? "bg-black text-white hover:bg-gray-800"
      : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700",
    buttonOutline: isDarkTheme
      ? "border-black text-black hover:bg-black hover:text-white"
      : "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white",
    contactBg: isDarkTheme
      ? "bg-black text-white"
      : "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white",
    footerBg: isDarkTheme ? "bg-gray-900" : "bg-gray-800",
  };

  return (
    <div
      className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} relative overflow-hidden transition-all duration-500`}
    >
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50
            ? `${themeClasses.navBg} backdrop-blur-md border-b ${themeClasses.navBorder} shadow-sm`
            : `${themeClasses.navBg} border-b ${themeClasses.navBorder}`
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className={`text-xl font-bold animate-pulse ${themeClasses.accent}`}
            >
              Aryan Kumar
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              {["About", "Experience", "Projects", "Skills", "Contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`text-sm font-medium transition-all duration-300 hover:scale-105 transform-gpu ${
                      activeSection === item.toLowerCase()
                        ? `${themeClasses.accent} border-b-2 ${
                            isDarkTheme ? "border-black" : "border-purple-600"
                          } pb-1 transform scale-105`
                        : `${
                            isDarkTheme
                              ? "text-gray-500 hover:text-gray-600"
                              : "text-gray-600 hover:text-purple-600"
                          }`
                    }`}
                  >
                    {item}
                  </button>
                )
              )}

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 transform-gpu ${
                  isDarkTheme
                    ? "bg-gray-100 text-black hover:bg-gray-200"
                    : "bg-purple-100 text-purple-600 hover:bg-purple-200"
                }`}
                title="Toggle Theme"
              >
                <Palette size={18} className="hover:animate-spin" />
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative">
                {isMenuOpen ? (
                  <X size={24} className="animate-spin" />
                ) : (
                  <Menu
                    size={24}
                    className="hover:scale-110 transition-transform duration-200"
                  />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden ${themeClasses.navBg} border-t ${
            themeClasses.navBorder
          } transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {isMenuOpen && (
            <div className="px-4 py-4 space-y-4 flex flex-col">
              {["About", "Experience", "Projects", "Skills", "Contact"].map(
                (item, index) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`block w-full text-left text-sm font-medium transition-all duration-200 hover:translate-x-2 transform-gpu ${
                      isDarkTheme
                        ? "text-gray-700 hover:text-black"
                        : "text-gray-600 hover:text-purple-600"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item}
                  </button>
                )
              )}

              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:translate-x-2 transform-gpu ${
                  isDarkTheme
                    ? "text-gray-700 hover:text-black"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                <Palette size={16} />
                Toggle Theme
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 border border-gray-100 rounded-full animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 border border-gray-100 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
                Software Developer
              </h1>
              <p
                className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                Crafting elegant solutions through clean code and thoughtful
                design
              </p>
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <button
                  onClick={() => scrollToSection("contact")}
                  className={`px-8 py-3 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg transform-gpu hover:rotate-1 ${themeClasses.button}`}
                >
                  Get In Touch
                </button>
                <a
                  href="https://drive.google.com/file/d/1zilB645J6o5cLSVqwkp4itz32FjTPPqJ/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    className={`px-8 py-3 border-2 font-medium transition-all duration-300 hover:scale-105 transform-gpu flex items-center gap-2 group hover:-rotate-1 ${themeClasses.buttonOutline}`}
                  >
                    <Download
                      size={18}
                      className="group-hover:animate-bounce"
                    />
                    Download Resume
                  </button>
                </a>
              </div>
            </div>

            {/* Right Column - Profile Photo */}
            <div
              className="flex justify-center lg:justify-end animate-fade-in-right"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="relative group">
                <div
                  className={`absolute inset-0 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 ${
                    isDarkTheme
                      ? "bg-black"
                      : "bg-gradient-to-r from-purple-400 to-blue-400"
                  }`}
                ></div>
                <img
                
                  src= {profile1}
                  alt="Aryan Kumar"
                  className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-white shadow-2xl group-hover:scale-105 transition-all duration-300 transform-gpu hover:rotate-3"
                />
                <div
                  className={`absolute inset-0 rounded-full border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse ${
                    isDarkTheme ? "border-black" : "border-purple-400"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 transition-all duration-1000 ${
          isVisible.about
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        } ${themeClasses.sectionBg} transition-all duration-1000 transform-gpu`}
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-12 text-center hover:scale-105 transition-transform duration-300 transform-gpu ${themeClasses.accent}`}
          >
            About
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p
                className={`text-lg mb-6 leading-relaxed animate-fade-in-left transform-gpu ${
                  isDarkTheme ? "text-gray-700" : "text-gray-600"
                }`}
              >
                I'm a passionate software developer and Computer Science graduate skilled in making real-time web apps, app testing, and Flutter development.
 Experienced in React.js, Node.js, and Docker. Developed projects like a 2D Naruto pixel game, Centavizer
 (fitness app), ASAP (social app), and a fraud detection system. Solved 150+ DSA problems and published a
 research paper.
              </p>
              <p
                className={`text-lg mb-6 leading-relaxed animate-fade-in-left transform-gpu ${
                  isDarkTheme ? "text-gray-700" : "text-gray-600"
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                Currently building Elitexsoutions- software development company.I'm founder on this company here we provide ACE quaity websites, cross-platform Applications and many more.
              </p>
              <div
                className="flex space-x-4 animate-fade-in-left"
                style={{ animationDelay: "0.4s" }}
              >
                <a
                  href="#"
                  className={`transition-all duration-300 hover:scale-125 hover:-translate-y-1 transform-gpu ${
                    isDarkTheme
                      ? "text-black hover:text-gray-600"
                      : "text-purple-600 hover:text-purple-800"
                  }`}
                >
                  <Github size={24} className="hover:animate-pulse" />
                </a>
                <a
                  href="#"
                  className={`transition-all duration-300 hover:scale-125 hover:-translate-y-1 transform-gpu ${
                    isDarkTheme
                      ? "text-black hover:text-gray-600"
                      : "text-purple-600 hover:text-purple-800"
                  }`}
                >
                  <Linkedin size={24} className="hover:animate-pulse" />
                </a>
                <a
                  href="#"
                  className={`transition-all duration-300 hover:scale-125 hover:-translate-y-1 transform-gpu ${
                    isDarkTheme
                      ? "text-black hover:text-gray-600"
                      : "text-purple-600 hover:text-purple-800"
                  }`}
                >
                  <Mail size={24} className="hover:animate-pulse" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
              <ul
                className={`space-y-3 ${
                  isDarkTheme ? "text-gray-700" : "text-gray-600"
                }`}
              >
                <li
                  className="flex items-center gap-3 animate-slide-in-right"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div
                    className={`w-2 h-2 animate-pulse ${
                      isDarkTheme ? "bg-black" : "bg-purple-600"
                    }`}
                  ></div>
                  <span>6+ months of development experience</span>
                </li>
                <li
                  className="flex items-center gap-3 animate-slide-in-right"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div
                    className={`w-2 h-2 animate-pulse ${
                      isDarkTheme ? "bg-black" : "bg-purple-600"
                    }`}
                  ></div>
                  <span>Full-stack development expertise</span>
                </li>
                <li
                  className="flex items-center gap-3 animate-slide-in-right"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="w-2 h-2 bg-black animate-pulse"></div>
                  <span>
                    Founder at Elitexsolutions.xyz - software development company
                  </span>
                </li>
                <li
                  className="flex items-center gap-3 animate-slide-in-right"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div
                    className={`w-2 h-2 animate-pulse ${
                      isDarkTheme ? "bg-black" : "bg-purple-600"
                    }`}
                  ></div>
                  <span>Open source contributor</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className={`py-20 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          isVisible.experience
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-12 text-center hover:scale-105 transition-transform duration-300 transform-gpu ${themeClasses.accent}`}
          >
            Experience
          </h2>
          <div className="space-y-12">
            {[
               {
                title: "Founder / Software Developer",
                company: "Elitexsolutions.xyz- growth startup",
                period: "Aug 2025 - Present",
                description: "Lead development of scalable web applications using modern technologies. Collaborated with cross-functional teams to deliver high-quality software solutions.",
                achievements: [
                  "Built and maintained 15+ production applications for our clients",
                  "Improved code coverage from 60% to 95%",
                  "Mentored junior developers and conducted code reviews ",
                  "Managed app testing, CI/CD, and cloud deployment using Docker and GitHub Actions.",
                ],
              },
              
              {
                title: "Full Stack Developer",
                company: "YRIT Solutions, Gurugram, India",
                period: "July 2025 - Present",
                description:
                  "Lead development of scalable web applications using modern technologies. Collaborated with cross-functional teams to deliver high-quality software solutions.",
                achievements: [
                  "Built REST APIs, implemented role-based authentication, integrated payments, and added real-time notifications",
                  "Implemented multi-branch architecture using Node.js, MongoDB, AWS S3 for file storage, and Selenium for testing.",
                  "Implemented CI/CD pipelines improving deployment efficiency",
                ],
              },
             
              
            ].map((job, index) => (
              <div
                key={index}
                className={`border-l-4 pl-8 relative group ${
                  isDarkTheme ? "border-black" : "border-purple-600"
                }`}
              >
                <div
                  className={`absolute left-[-8px] top-0 w-4 h-4 rounded-full group-hover:scale-150 transition-transform duration-300 transform-gpu ${
                    isDarkTheme ? "bg-black" : "bg-purple-600"
                  }`}
                ></div>
                <div
                  className={`${themeClasses.cardBg} p-6 border ${themeClasses.cardBorder} hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up transform-gpu hover:rotateX-2`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <p
                        className={`font-medium ${
                          isDarkTheme ? "text-gray-600" : "text-purple-600"
                        }`}
                      >
                        {job.company}
                      </p>
                    </div>
                    <span
                      className={`text-sm mt-1 md:mt-0 ${
                        isDarkTheme ? "text-gray-500" : "text-gray-600"
                      }`}
                    >
                      {job.period}
                    </span>
                  </div>
                  <p
                    className={`mb-4 ${
                      isDarkTheme ? "text-gray-700" : "text-gray-600"
                    }`}
                  >
                    {job.description}
                  </p>
                  <ul className="space-y-2">
                    {job.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-3 text-sm transition-colors duration-200 ${
                          isDarkTheme
                            ? "text-gray-600 hover:text-gray-800"
                            : "text-gray-500 hover:text-purple-600"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 transition-colors duration-200 ${
                            isDarkTheme
                              ? "bg-gray-400 hover:bg-black"
                              : "bg-purple-300 hover:bg-purple-600"
                          }`}
                        ></div>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 transition-all duration-1000 ${
          isVisible.projects
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        } ${themeClasses.sectionBg}`}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-12 text-center hover:scale-105 transition-transform duration-300 transform-gpu ${themeClasses.accent}`}
          >
            Technical Projects 
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Idaho Clothing- E Commerce",
                description:
                  "Idaho Clothing is a Jaipur-based premium ethnic and western wear fashion brand specializing in contemporary womens clothing. Operating as an online D2C (Direct-to-Consumer) e-commerce store, Idaho-O has established itself as a trendsetting fashion destination for women seeking elegance, comfort, and quality craftsmanship.",
                tech: ["Php", "React,js", "Api ", "Shopify"],
                link: "https://idaho-o.com/",
              },
              {
                title: "ASAP- Social Media Influencer app",
                description:
                  "ASAP – Connect with Top Brands Instantly ASAP makes influencer collaborations effortless. Whether you’re a creator, influencer, or brand ambassador — you can discover and connect with 1,000+ top brands in just a few taps.",
                tech: ["IOS Development ", "Xcode", "Swift", "Supabase"],
                link: "https://apps.apple.com/in/app/asap-request-pr-boxes-more/id6738424129",
              },
              {
                title: " Elitex Devs- Sub part of Elitexsolutions",
                description:
                  "Built a community based Saas platform for Tier-3 college students offering coding sheets, contests, and mentorship features.",
                tech: ["React", "Node.js", "MongoDb", ],
                link: "https://elitexdevs.vercel.app/",
              },
              {
                title: "Mobile Banking App",
                description:
                  "Secure mobile banking application with biometric authentication and transaction history.",
                tech: ["React Native", "Node.js", "JWT", "MongoDB"],
                link: "#",
              },
            ].map((project, index) => (
              <div
                key={index}
                className={`${themeClasses.cardBg} border ${themeClasses.cardBorder} p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-fade-in-up group transform-gpu hover:rotateY-5`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p
                  className={`mb-4 text-sm leading-relaxed ${
                    isDarkTheme ? "text-gray-600" : "text-gray-500"
                  }`}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className={`text-xs px-2 py-1 rounded transition-all duration-200 cursor-default ${
                        isDarkTheme
                          ? "bg-gray-100 text-gray-700 hover:bg-black hover:text-white"
                          : "bg-purple-100 text-purple-700 hover:bg-purple-600 hover:text-white"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className={`inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 group-hover:translate-x-2 transform-gpu ${
                    isDarkTheme
                      ? "text-black hover:text-gray-600"
                      : "text-purple-600 hover:text-purple-800"
                  }`}
                >
                  View Project{" "}
                  <ExternalLink
                    size={14}
                    className="group-hover:animate-bounce"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className={`py-20 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          isVisible.skills
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-12 text-center hover:scale-105 transition-transform duration-300 transform-gpu ${themeClasses.accent}`}
          >
            Skills
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                category: "Frontend",
                skills: [
                  "React",
                  "Vue.js",
                  "JavaScript",
                  "TypeScript",
                  "Tailwind CSS",
                  "Flutter",
                ],
              },
              {
                category: "Backend",
                skills: [
                  "Node.js",
                  "Supabase",
                  "Express",
                ],
              },
              {
                category: "Database",
                skills: [
                  "PostgreSQL",
                  "MongoDB",
                  "MySQL",
                  "Firebase",
                ],
              },
              {
                category: "Tools & Others",
                skills: ["Git/Github", "Docker", "AWS", "CI/CD", "Android Studio", "GCP"],
              },
            ].map((skillGroup, index) => (
              <div
                key={index}
                className={`${themeClasses.sectionBg} p-6 border ${themeClasses.cardBorder} hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up group transform-gpu hover:rotateX-3`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-lg font-semibold mb-4">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.skills.map((skill, i) => (
                    <li
                      key={i}
                      className={`text-sm flex items-center gap-3 transition-colors duration-200 animate-slide-in-right transform-gpu ${
                        isDarkTheme
                          ? "text-gray-600 hover:text-black"
                          : "text-gray-500 hover:text-purple-600"
                      }`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full group-hover:animate-ping ${
                          isDarkTheme ? "bg-black" : "bg-purple-600"
                        }`}
                      ></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-black text-white transition-all duration-1000 ${
          isVisible.contact
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        } ${themeClasses.contactBg}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 hover:scale-105 transition-transform duration-300">
            Let's Work Together
          </h2>
          <p
            className={`text-xl mb-12 max-w-2xl mx-auto animate-fade-in-up transform-gpu ${
              isDarkTheme ? "text-gray-300" : "text-gray-200"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            I'm always interested in new opportunities and exciting projects.
            Let's discuss how we can bring your ideas to life.
          </p>

          <div
            className="grid md:grid-cols-3 gap-8 mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex flex-col items-center group hover:scale-110 transition-transform duration-300">
              <Mail className="mb-4 group-hover:animate-bounce" size={24} />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className={isDarkTheme ? "text-gray-300" : "text-gray-200"}>
                aryankumarr127@gmail.com
              </p>
            </div>
            <div className="flex flex-col items-center group hover:scale-110 transition-transform duration-300">
              <Phone className="mb-4 group-hover:animate-bounce" size={24} />
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className={isDarkTheme ? "text-gray-300" : "text-gray-200"}>
                +91 9310479532
              </p>
            </div>
            <div className="flex flex-col items-center group hover:scale-110 transition-transform duration-300">
              <MapPin className="mb-4 group-hover:animate-bounce" size={24} />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className={isDarkTheme ? "text-gray-300" : "text-gray-200"}>
                Ghaziabad, UP, India
              </p>
            </div>
          </div>

          <div
            className="flex justify-center space-x-6 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <a
              href="https://github.com/aryankumar06"
              className="text-white hover:text-gray-300 transition-all duration-300 hover:scale-125 hover:-translate-y-2 transform-gpu"
            >
              <Github size={24} className="hover:animate-pulse" />
            </a>
            <a
              href="https://www.linkedin.com/in/aryan-kumarr-5450491ba/"
              className="text-white hover:text-gray-300 transition-all duration-300 hover:scale-125 hover:-translate-y-2 transform-gpu"
            >
              <Linkedin size={24} className="hover:animate-pulse" />
            </a>
            <a
              href="mailto:aryankumarr127@gmail.com"
              className="text-white hover:text-gray-300 transition-all duration-300 hover:scale-125 hover:-translate-y-2 transform-gpu"
            >
              <Mail size={24} className="hover:animate-pulse" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`${themeClasses.footerBg} text-gray-400 py-8 px-4 sm:px-6 lg:px-8`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p>&copy; 2025 Aryan Kumar's Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
