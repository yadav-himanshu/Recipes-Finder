import { useEffect } from "react";
import { ChefHat, Heart, Code, Zap, Smartphone, Search } from "lucide-react";

const AboutPage = () => {
    useEffect(() => {
        document.title = "About CookMom - Premium Recipe Finder";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", "Learn about CookMom, the ultimate modern recipe finder with dynamic filtering, shopping lists, and clean aesthetics.");
        }
    }, []);
    const features = [
        { icon: <Search className="text-orange-500" />, title: "Smart Discovery", desc: "Instantly find thousands of recipes with our optimized search engine." },
        { icon: <Heart className="text-red-500" />, title: "Personal Pantry", desc: "Save your favorite recipes and never lose a great meal idea again." },
        { icon: <Smartphone className="text-blue-500" />, title: "Mobile Ready", desc: "Cook on the go with our fully responsive and touch-friendly interface." },
        { icon: <Zap className="text-amber-500" />, title: "Snappy Performance", desc: "Experience a blazingly fast UI designed for modern web standards." }
    ];

    return (
        <div className="p-6 md:p-10 max-w-5xl mx-auto min-h-screen pb-24">
            <div className="space-y-16 animate-in fade-in duration-700">
                {/* Hero Section */}
                <section className="text-center space-y-6 pt-10">
                    <div className="inline-flex items-center gap-3 bg-orange-50 px-6 py-3 rounded-full mb-4">
                        <ChefHat className="text-primary" size={24} />
                        <span className="text-primary font-black uppercase tracking-widest text-sm">About CookMom</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-800 leading-tight tracking-tighter">
                        Your Kitchen&apos;s New <br />Best Friend.
                    </h1>
                    <p className="text-slate-500 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
                        CookMom is a premium recipe discovery platform designed to make finding and preparing meals a delightful experience.
                    </p>
                </section>

                {/* Feature Grid */}
                <section className="grid md:grid-cols-2 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="bg-white p-8 rounded-[32px] shadow-card border border-slate-50 flex flex-col gap-4 group hover:border-orange-100 transition-colors">
                            <div className="p-4 bg-slate-50 rounded-2xl w-fit group-hover:bg-orange-50 transition-colors">
                                {f.icon}
                            </div>
                            <h3 className="text-2xl font-black text-slate-800">{f.title}</h3>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </section>

                {/* Tech Stack */}
                <section className="bg-slate-900 text-white rounded-[48px] p-12 md:p-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 space-y-8">
                        <div className="flex items-center gap-4 text-primary">
                            <Code size={32} />
                            <h2 className="text-3xl font-black tracking-tight">Built with Modern Tech</h2>
                        </div>
                        <p className="text-slate-400 text-xl font-medium max-w-xl leading-relaxed">
                            CookMom is engineered using React, Tailwind CSS, and the Edamam API to provide a high-performance, developer-grade frontend demonstration.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            {['React.js', 'Vite', 'Tailwind CSS', 'Lucide', 'React Router', 'Edamam API'].map(t => (
                                <span key={t} className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl font-bold border border-white/5 hover:bg-white/20 transition-colors">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                <footer className="text-center pt-8">
                    <p className="text-slate-400 font-bold text-lg">Designed & Developed with ❤️ for Food Lovers.</p>
                </footer>
            </div>
        </div>
    );
};

export default AboutPage;
