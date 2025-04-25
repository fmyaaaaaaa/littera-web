import { Separator } from "@/components/ui/separator";

export default function LegalPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Littera Privacy Policy</h1>
      <p className="text-muted-foreground mb-4">Last updated: March 1, 2025</p>

      <div className="mb-6">
        <p>
          Welcome to Littera. Your privacy is important to us. This Privacy Policy explains how we collect, use, and
          protect your information when you use our services. By using Littera, you agree to the practices described in
          this policy.
        </p>
      </div>

      <Separator className="my-6" />

      <section className="mb-8 space-y-4">
        <h2 className="text-2xl font-semibold">1. About Littera</h2>
        <p>
          Littera is a task management platform focused on environmental sustainability. Our app allows users to report
          littering incidents by submitting photos and location data. These reports help analyze litter distribution
          patterns and contribute to a cleaner environment.
        </p>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
        <p>When you use Littera, we collect the following types of data:</p>

        <div className="ml-4 mt-4">
          <h3 className="text-lg font-medium">(a) Location Data</h3>
          <ul className="list-disc ml-6 space-y-1 mt-2">
            <li>We collect your location to associate it with litter reports you submit.</li>
            <li>Your location data is used only for mapping reported litter and analyzing distribution patterns.</li>
            <li>We do not use location data to track users or link it to personal identities.</li>
          </ul>
        </div>

        <div className="ml-4 mt-4">
          <h3 className="text-lg font-medium">(b) Photos and Report Data</h3>
          <ul className="list-disc ml-6 space-y-1 mt-2">
            <li>
              When you submit a litter report, we store the uploaded photos and associated metadata (e.g., timestamp,
              location).
            </li>
            <li>
              Photos are used exclusively to document litter and do not contain personal identifiers unless voluntarily
              included by the user.
            </li>
          </ul>
        </div>

        <div className="ml-4 mt-4">
          <h3 className="text-lg font-medium">(c) Account and Contact Information (if applicable)</h3>
          <ul className="list-disc ml-6 space-y-1 mt-2">
            <li>
              If user accounts are implemented, we may collect your name, email address, and authentication details.
            </li>
            <li>We do not share this information with third parties for marketing purposes.</li>
          </ul>
        </div>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
        <p>We use the collected data for the following purposes:</p>
        <ul className="list-disc ml-6 space-y-1 mt-2">
          <li>Displaying litter reports on maps for public awareness and research.</li>
          <li>Analyzing litter distribution trends for environmental impact studies.</li>
          <li>Improving Littera&apos;s functionality and user experience.</li>
        </ul>
        <p className="mt-2">We do not sell, rent, or trade your data to third parties.</p>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-2xl font-semibold">4. Data Storage and Security</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>All data is securely stored in Canada-based data centers.</li>
          <li>We use encryption and access controls to protect user information.</li>
          <li>Users have the right to delete their reports, which will be permanently removed from our servers.</li>
        </ul>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-2xl font-semibold">5. User Rights and Data Control</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <span className="font-medium">Deleting Your Reports:</span> You can delete your submitted photos and reports
            at any time through the app.
          </li>
          <li>
            <span className="font-medium">Accessing and Updating Data:</span> If you create an account, you may request
            access to or updates to your personal information.
          </li>
          <li>
            <span className="font-medium">Opting Out:</span> You can disable location access at any time through your
            device settings. However, this may limit Littera&apos;s functionality.
          </li>
        </ul>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-2xl font-semibold">6. Third-Party Services</h2>
        <p>Littera does not share user data with third-party advertisers. However, we may use external services for:</p>
        <ul className="list-disc ml-6 space-y-1 mt-2">
          <li>Cloud storage and database management (hosted in Canada).</li>
          <li>App performance monitoring and debugging.</li>
        </ul>
        <p className="mt-2">These services comply with industry-standard privacy and security practices.</p>

        <div className="mt-6">
          <h3 className="text-lg font-medium">Additional Web Application Services</h3>
          <p className="mb-2">Our web application uses the following third-party services:</p>
          <div className="grid gap-4 sm:grid-cols-2 mt-4">
            {[
              { name: "Google Maps API", description: "For map displays and location services" },
              { name: "Vercel Analytics", description: "For anonymous usage statistics" },
              { name: "Vercel Speed Insights", description: "For performance monitoring" },
            ].map((service) => (
              <div key={service.name} className="p-4 rounded-lg border border-border">
                <h3 className="font-medium">{service.name}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-2xl font-semibold">7. Open Source Libraries</h2>
        <p>Our web application uses the following open source libraries:</p>
        <div className="h-64 overflow-y-auto rounded-lg border border-border p-4 bg-muted/30">
          <ul className="space-y-2">
            {[
              "@radix-ui/react-*",
              "class-variance-authority",
              "clsx",
              "framer-motion",
              "lucide-react",
              "next",
              "next-themes",
              "react",
              "react-dom",
              "sonner",
              "tailwind-merge",
              "tw-animate-css",
              "@vercel/analytics",
              "@vercel/speed-insights",
            ].map((lib) => (
              <li key={lib} className="flex items-center justify-between">
                <span className="font-mono text-sm">{lib}</span>
                <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded">
                  MIT
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-2xl font-semibold">8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy as needed. Users will be notified of significant changes through in-app
          notifications or updates to this document.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">9. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy or your data, please contact us at:</p>
        <div className="p-4 rounded-lg border border-border bg-muted/30">
          <p className="font-medium">contact@bluedoghub.com</p>
        </div>
      </section>

      <Separator className="my-6" />

      <p className="text-sm text-muted-foreground text-center">Effective Date: March 1, 2025</p>
    </div>
  );
}
