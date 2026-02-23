import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getPublishedPosts } from "@/lib/posts";

export const revalidate = 60;

export default async function HomePage() {
  let recentPosts: Awaited<ReturnType<typeof getPublishedPosts>> = [];
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const supabase = await createClient();
      recentPosts = await getPublishedPosts(supabase);
    } catch {
      // RLS or network; show no strip
    }
  }
  const fromTheEdit = recentPosts.slice(0, 3);

  return (
    <main>
      <section className="relative min-h-screen flex items-center justify-center px-8 py-24 text-white">
        <div className="absolute inset-0 z-[-1]">
          <img
            src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1080,fit=crop/AVLDZN1zpzflK4ML/img_7825-A1a1e39v3Ns4PpM2.JPG"
            alt=""
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/35 to-black/60"
            aria-hidden
          />
        </div>
        <div className="text-center max-w-[36rem]">
          <p className="text-xs font-medium tracking-[0.2em] uppercase opacity-90 mb-4 animate-[fadeUp_0.8s_ease-out_0.2s_both]">
            Content Creator & Beauty Influencer
          </p>
          <h1 className="text-[clamp(3rem,10vw,5.5rem)] font-display font-medium leading-tight tracking-tight mb-4 animate-[fadeUp_0.8s_ease-out_0.35s_both]">
            Redefining
            <br />
            Luxury
          </h1>
          <p className="text-lg font-light opacity-92 mb-8 animate-[fadeUp_0.8s_ease-out_0.5s_both]">
            Uniting high-end brands and quality content creation in beauty,
            fashion, and travel.
          </p>
          <Link
            href="#portfolio"
            className="inline-block py-3 px-7 text-sm font-medium tracking-widest uppercase border border-white/60 bg-transparent text-white transition-colors duration-300 hover:bg-white hover:text-[var(--color-text)] animate-[fadeUp_0.8s_ease-out_0.65s_both]"
          >
            View Portfolio
          </Link>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[0.7rem] tracking-[0.15em] uppercase opacity-70">
          <span>Scroll</span>
          <span className="w-px h-10 bg-gradient-to-b from-white/80 to-transparent animate-[scrollPulse_2s_ease-in-out_infinite]" />
        </div>
      </section>

      {fromTheEdit.length > 0 && (
        <section className="py-16 px-6 bg-[var(--color-bg-alt)]">
          <div className="max-w-[72rem] mx-auto">
            <h2 className="font-display text-2xl md:text-3xl text-center mb-2">
              From The Edit
            </h2>
            <p className="text-center text-[var(--color-text-muted)] mb-10">
              Latest from the journal
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fromTheEdit.map((post) => (
                <Link
                  key={post.id}
                  href={`/the-edit/${post.slug}`}
                  className="group block bg-[var(--color-bg)] rounded overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
                >
                  {post.hero_image_url && (
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={post.hero_image_url}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <span className="text-xs font-medium tracking-widest uppercase text-[var(--color-accent)]">
                      {post.category.replace("-", " ")}
                    </span>
                    <h3 className="font-display text-xl font-medium mt-1 group-hover:text-[var(--color-accent)] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="inline-block mt-2 text-sm font-medium text-[var(--color-accent)]">
                      Read more →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/the-edit"
                className="text-sm font-medium tracking-widest uppercase text-[var(--color-accent)] hover:opacity-85"
              >
                View all in The Edit
              </Link>
            </div>
          </div>
        </section>
      )}

      <section id="portfolio" className="py-24 px-6 max-w-[72rem] mx-auto">
        <div className="text-center max-w-[28rem] mx-auto mb-16">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] mb-2">
            Portfolio
          </h2>
          <p className="text-[var(--color-text-muted)]">
            Selected collaborations with luxury brands
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {[
            {
              img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800,h=640,fit=crop,trim=456.37;0;678.86;0/AVLDZN1zpzflK4ML/img_6031-meP5y2wEjlH5kg7O.JPG",
              title: "Luxury Beauty Campaign",
              desc: "Collaborated with high-end beauty brands to create captivating social media content showcasing their luxury products and unique features.",
              theme: "light",
            },
            {
              img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800,h=640,fit=crop,trim=848.31;0;171.08;0/AVLDZN1zpzflK4ML/img_7813-dOqlM1v4OGH44wEm.JPG",
              title: "Fashion Collaboration",
              desc: "Partnered with renowned fashion brands to curate stylish outfits and create visually stunning content that highlights key trends.",
              theme: "dark",
            },
            {
              img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800,h=640,fit=crop,trim=530.02;0;262.16;0/AVLDZN1zpzflK4ML/img_9589-Yan67wvjy6C3o84Z.JPG",
              title: "Beauty Product Review",
              desc: "In-depth reviews of high-end beauty products—formulation, effectiveness, and luxurious packaging—for beauty enthusiasts.",
              theme: "light",
            },
            {
              img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800,h=640,fit=crop,trim=670.09;0;351.68;0/AVLDZN1zpzflK4ML/img_9559-AzGjOWJLBXho2Zjw.JPG",
              title: "Luxury Hotel & Travel",
              desc: "Worked with prestigious hotels and travel brands to capture exquisite accommodations, destinations, and exclusive experiences.",
              theme: "dark",
            },
            {
              img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800,h=640,fit=crop,trim=624.95;0;396.83;0/AVLDZN1zpzflK4ML/1l9a0675-mv05Lz615wcRxZG1.JPG",
              title: "Fashion Lookbook",
              desc: "Visually captivating lookbooks featuring luxury fashion brands, versatile outfits, and styling inspiration.",
              theme: "light",
            },
          ].map((item, i) => (
            <article
              key={i}
              className={`grid grid-cols-1 md:grid-cols-2 min-h-[320px] bg-[var(--color-bg-alt)] rounded overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${
                i % 2 === 1 ? "md:grid-flow-dense" : ""
              }`}
            >
              <div className={i % 2 === 1 ? "md:col-start-2" : ""}>
                <img
                  src={item.img}
                  alt=""
                  className="w-full h-full min-h-[280px] object-cover"
                  loading="lazy"
                />
              </div>
              <div
                className={`p-8 flex flex-col justify-center ${
                  item.theme === "dark"
                    ? "bg-[var(--color-text)] text-[var(--color-bg)]"
                    : ""
                }`}
              >
                <h3 className="font-display text-2xl mb-4">{item.title}</h3>
                <p className="opacity-88 text-[0.95rem] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="py-24 px-6 bg-[var(--color-bg-alt)]">
        <div className="max-w-[72rem] mx-auto grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-16 items-center">
          <div className="rounded overflow-hidden shadow-xl max-w-[400px] mx-auto md:mx-0">
            <img
              src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=600,h=800,fit=crop/AVLDZN1zpzflK4ML/img_0923-m7V82xrQ58FxvoR2.JPG"
              alt="Mia Randria"
              className="w-full aspect-[3/4] object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] mb-4">
              About Mia Randria
            </h2>
            <p className="font-display text-xl font-medium text-[var(--color-accent)] mb-4">
              Social media content creator and beauty & lifestyle influencer with
              a passion for luxury.
            </p>
            <p className="text-[var(--color-text-muted)] mb-4">
              I've worked with high-end brands across beauty, fashion, and
              luxury hospitality. I create content that connects brands with
              audiences in an authentic, visually striking way.
            </p>
            <p className="text-[var(--color-text-muted)]">
              Follow along for inspiration and collaborations.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6 text-center">
        <div className="max-w-[28rem] mx-auto">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] mb-4">
            Let's Create Together
          </h2>
          <p className="text-[var(--color-text-muted)] mb-4">
            Interested in collaborating? Get in touch.
          </p>
          <a
            href="mailto:contact@miarandria.com"
            className="inline-block font-display text-2xl font-medium text-[var(--color-accent)] mb-8 hover:opacity-80"
          >
            contact@miarandria.com
          </a>
          <div className="flex flex-wrap justify-center gap-8">
            <a
              href="https://www.instagram.com/miarandria/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium tracking-widest uppercase text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@MiaRandria"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium tracking-widest uppercase text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
            >
              YouTube
            </a>
            <a
              href="https://www.facebook.com/miarandriamakeup/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium tracking-widest uppercase text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
            >
              Facebook
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center border-t border-[var(--color-border)] text-sm text-[var(--color-text-muted)]">
        <p>© {new Date().getFullYear()} Mia Randria. All rights reserved.</p>
      </footer>
    </main>
  );
}
