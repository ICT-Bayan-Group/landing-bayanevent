import { Instagram, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const smoothScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="relative px-6 md:px-10 py-12 bg-blue-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <img
              src="https://res.cloudinary.com/djs5pi7ev/image/upload/v1769476664/bayan-thenext-white-nobg_qis407.png"
              alt="BAYAN tes"
              className="h-16 md:h-10 object-contain mb-4"
              loading="lazy"
            />
            <p className="text-white/60 text-sm leading-relaxed">
              Menghadirkan event yang dikelola Bayan Group sejak 2022.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase mb-4 text-white">Quick Links</h4>
            <div className="space-y-2 text-sm text-white/60">
              <a href="/" className="block hover:text-white transition-colors">Home</a>
              <a href="/bayanrun" className="block hover:text-white transition-colors">Bayan Run</a>
              <a href="/bayanopen" className="block hover:text-white transition-colors">Bayan Open</a>
              <a href="/bayancraft" className="block hover:text-white transition-colors">Bayan Craft</a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase mb-4 text-white">Contact</h4>
            <div className="space-y-2 text-sm text-white/60">
              <div>Email: bayanopen@gmail.com</div>
              <div>Phone: +62 8215 4815 113</div>
              <div>Balikpapan, Kalimantan Timur</div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase mb-4 text-white">Follow Us</h4>
            <div className="flex gap-4 mb-4">
              <a href="https://www.instagram.com/bayanevent" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5 hover:text-orange-600 transition-colors cursor-pointer" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5 hover:text-orange-600 transition-colors cursor-pointer" />
              </a>
              <a href="mailto:bayanopen@gmail.com">
                <Mail className="w-5 h-5 hover:text-orange-600 transition-colors cursor-pointer" />
              </a>
            </div>
            <p className="text-white/60 text-xs">
              Stay updated with our latest events and news
            </p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row font-semibold justify-between items-center gap-4 text-sm text-white/60">
          <div>© 2025 PT BAYAN RESOURCES TBK. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}