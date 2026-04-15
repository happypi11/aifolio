import Link from "next/link";

export default function SubmitPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">Submit Your AI Tool</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Add your tool to our directory and reach {">"} 24K monthly visitors
          </p>
        </div>

        <form className="space-y-6 rounded-2xl border border-border/50 bg-card p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tool Name *</label>
              <input type="text" placeholder="e.g. Notion AI" className="w-full h-11 px-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Website URL *</label>
              <input type="url" placeholder="https://yourtool.com" className="w-full h-11 px-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select className="w-full h-11 px-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all">
                <option>Select category</option>
                <option>AI Tools</option>
                <option>Image Generation</option>
                <option>Video</option>
                <option>Writing</option>
                <option>Development</option>
                <option>Marketing</option>
                <option>Productivity</option>
                <option>Design</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Pricing Model *</label>
              <select className="w-full h-11 px-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all">
                <option>Select pricing</option>
                <option>Free</option>
                <option>Paid</option>
                <option>Freemium</option>
                <option>Trial</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Short Description * <span className="text-muted-foreground font-normal">(max 160 chars)</span></label>
            <textarea rows={3} maxLength={160} placeholder="Describe your tool in one compelling sentence..." className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all resize-none" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Detailed Description</label>
            <textarea rows={5} placeholder="Tell users more about what your tool does, its key features, and why they should try it..." className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all resize-none" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Your Email *</label>
            <input type="email" placeholder="you@example.com" className="w-full h-11 px-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all" />
            <p className="text-xs text-muted-foreground mt-1.5">We&apos;ll email you when your tool is approved. Never published.</p>
          </div>

          <div className="pt-2">
            <button type="submit" className="w-full h-12 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm transition-colors">
              Submit Tool →
            </button>
            <p className="text-xs text-muted-foreground text-center mt-3">
              By submitting, you agree to our{" "}
              <Link href="/terms" className="text-violet-500 hover:underline">Terms of Service</Link>
            </p>
          </div>
        </form>

        {/* Pricing info */}
        <div className="mt-8 rounded-2xl border border-violet-500/20 bg-gradient-to-b from-violet-600/5 to-fuchsia-600/5 p-6">
          <h3 className="font-semibold mb-2">Want to get featured?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Featured listings appear at the top of every page and get 5x more clicks. DM us on Twitter or email hello@aifolio.com to learn more.
          </p>
          <div className="flex gap-3">
            <span className="bg-emerald-500/10 text-emerald-500 text-xs font-medium px-3 py-1 rounded-full">Free listing included</span>
            <span className="bg-violet-500/10 text-violet-500 text-xs font-medium px-3 py-1 rounded-full">Featured from $29/mo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
