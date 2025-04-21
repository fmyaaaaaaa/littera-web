export default function DemoPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-display-lg text-primary-500 mb-8">Typography Demo</h1>

      {/* Display */}
      <section className="mb-12">
        <h2 className="text-heading-lg text-primary-900 mb-4">Display</h2>
        <div className="space-y-6">
          <p className="text-display-xl">Display XL - Main Headline</p>
          <p className="text-display-lg">Display LG - Large Title</p>
          <p className="text-display-md">Display MD - Medium Title</p>
          <p className="text-display-sm">Display SM - Small Title</p>
          <p className="text-display-xs">Display XS - Extra Small Title</p>
        </div>
      </section>

      {/* Heading */}
      <section className="mb-12">
        <h2 className="text-heading-lg text-primary-900 mb-4">Heading</h2>
        <div className="space-y-4">
          <p className="text-heading-xl">Heading XL - Section Title</p>
          <p className="text-heading-lg">Heading LG - Subsection Title</p>
          <p className="text-heading-md">Heading MD - Group Title</p>
          <p className="text-heading-sm">Heading SM - Small Section</p>
          <p className="text-heading-xs">Heading XS - Minor Section</p>
        </div>
      </section>

      {/* Body */}
      <section className="mb-12">
        <h2 className="text-heading-lg text-primary-900 mb-4">Body</h2>
        <div className="space-y-4">
          <p className="text-body-xl">
            Body XL - This text is designed for longer paragraphs and main content sections.
          </p>
          <p className="text-body-lg">Body LG - Perfect for important paragraphs that need slightly more emphasis.</p>
          <p className="text-body-md">Body MD - Standard text size for most content and paragraphs.</p>
          <p className="text-body-sm">Body SM - Ideal for secondary information and supporting text.</p>
          <p className="text-body-xs">Body XS - Used for fine print and supplementary details.</p>
        </div>
      </section>

      {/* Label */}
      <section className="mb-12">
        <h2 className="text-heading-lg text-primary-900 mb-4">Label</h2>
        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            <label className="text-label-xl">Label XL</label>
            <input type="text" className="border rounded px-2 py-1" placeholder="Input example" />
          </div>
          <div className="flex gap-4 items-center">
            <label className="text-label-lg">Label LG</label>
            <input type="text" className="border rounded px-2 py-1" placeholder="Input example" />
          </div>
          <div className="flex gap-4 items-center">
            <label className="text-label-md">Label MD</label>
            <input type="text" className="border rounded px-2 py-1" placeholder="Input example" />
          </div>
          <div className="flex gap-4 items-center">
            <label className="text-label-sm">Label SM</label>
            <input type="text" className="border rounded px-2 py-1" placeholder="Input example" />
          </div>
          <div className="flex gap-4 items-center">
            <label className="text-label-xs">Label XS</label>
            <input type="text" className="border rounded px-2 py-1" placeholder="Input example" />
          </div>
        </div>
      </section>

      {/* Caption */}
      <section className="mb-12">
        <h2 className="text-heading-lg text-primary-900 mb-4">Caption</h2>
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <input type="text" className="border rounded px-2 py-1" placeholder="Input field" />
            <span className="text-caption-xl text-primary-600">Caption XL - Additional information text</span>
          </div>
          <div className="flex flex-col gap-1">
            <input type="text" className="border rounded px-2 py-1" placeholder="Input field" />
            <span className="text-caption-lg text-primary-600">Caption LG - Helper text for form fields</span>
          </div>
          <div className="flex flex-col gap-1">
            <input type="text" className="border rounded px-2 py-1" placeholder="Input field" />
            <span className="text-caption-md text-primary-600">Caption MD - Supplementary information</span>
          </div>
          <div className="flex flex-col gap-1">
            <input type="text" className="border rounded px-2 py-1" placeholder="Input field" />
            <span className="text-caption-sm text-primary-600">Caption SM - Small helper text</span>
          </div>
          <div className="flex flex-col gap-1">
            <input type="text" className="border rounded px-2 py-1" placeholder="Input field" />
            <span className="text-caption-xs text-primary-600">Caption XS - Minimal supporting text</span>
          </div>
        </div>
      </section>

      {/* Real-world Example */}
      <section className="mb-12">
        <h2 className="text-heading-lg text-primary-900 mb-4">Real-world Example</h2>
        <div className="max-w-2xl bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-display-md text-primary-500 mb-4">Product Features</h1>
          <h2 className="text-heading-lg text-primary-900 mb-2">Intuitive Design</h2>
          <p className="text-body-md mb-4">
            With an intuitive user interface and detailed customization options, anyone can master this tool with ease.
          </p>
          <div className="mb-4">
            <label className="text-label-md block mb-1">Customization Settings</label>
            <input type="text" className="border rounded px-3 py-2 w-full" />
            <span className="text-caption-sm text-primary-600">Settings are saved automatically</span>
          </div>
        </div>
      </section>
    </div>
  );
}
