import { config, fields, collection } from '@keystatic/core';

export default config({
  storage:
    import.meta.env.DEV && import.meta.env.PUBLIC_KEYSTATIC_STORAGE_MODE !== 'github'
      ? { kind: 'local' as const }
      : {
          kind: 'github' as const,
          repo: 'madeotoube/sem-astro',
        },
  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*/',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        author: fields.text({ label: 'Author', defaultValue: 'Chris Ricard' }),
        publishedAt: fields.date({ label: 'Published Date' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Digital Marketing', value: 'digital-marketing' },
            { label: 'SEO', value: 'seo' },
            { label: 'Social Media', value: 'social-media' },
            { label: 'Workflow Optimization', value: 'workflow-optimization' },
            { label: 'Data Analytics', value: 'data-analytics' },
            { label: 'Brand Strategy', value: 'brand-strategy' },
            { label: 'Paid Advertising', value: 'paid-advertising' },
            { label: 'Creative Design', value: 'creative-design' },
            { label: 'AI', value: 'ai' },
            { label: 'Marketing Strategy', value: 'marketing-strategy' },
          ],
          defaultValue: 'digital-marketing',
        }),
        image: fields.image({
          label: 'Featured Image',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
    caseStudies: collection({
      label: 'Case Studies',
      slugField: 'title',
      path: 'src/content/case-studies/*/',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        client: fields.text({ label: 'Client' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Brand Strategy', value: 'Brand Strategy' },
            { label: 'Digital Marketing', value: 'Digital Marketing' },
            { label: 'Creative Design', value: 'Creative Design' },
            { label: 'Creative Services', value: 'Creative Services' },
          ],
          defaultValue: 'Brand Strategy',
        }),
        description: fields.text({ label: 'Description', multiline: true }),
        date: fields.text({ label: 'Date (e.g. May 2021)' }),
        duration: fields.text({ label: 'Duration (e.g. 2 Years)' }),
        heroImage: fields.image({
          label: 'Hero Image',
          directory: 'public/images/case-studies',
          publicPath: '/images/case-studies/',
        }),
        logo: fields.image({
          label: 'Logo',
          directory: 'public/images/case-studies',
          publicPath: '/images/case-studies/',
        }),
        gallery: fields.array(
          fields.object({
            src: fields.image({
              label: 'Image',
              directory: 'public/images/case-studies',
              publicPath: '/images/case-studies/',
            }),
            alt: fields.text({ label: 'Alt Text' }),
          }),
          {
            label: 'Gallery',
            itemLabel: (props) => props.fields.alt.value || 'Image',
          }
        ),
        relatedStudies: fields.array(
          fields.relationship({ label: 'Related Study', collection: 'caseStudies' }),
          { label: 'Related Studies' }
        ),
        order: fields.integer({ label: 'Display Order', defaultValue: 0 }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
});
