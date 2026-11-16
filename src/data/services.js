export const services = [
  {
    slug: 'custom-software-development',
    icon: 'Code2',
    title: 'Custom Software Development',
    summary:
      'Internal systems built around how your team already works — employee records, stock, customers, approvals — instead of forcing the business into someone else’s template.',
    problems: [
      'The same customer or employee details live in three spreadsheets and a group chat.',
      'An off-the-shelf tool almost fits, so everyone keeps a workaround beside it.',
      'Every month-end report has to be rebuilt by hand.',
    ],
    benefits: [
      'One place for the information your team uses every day',
      'Less duplicate encoding and fewer conflicting versions',
      'Room to add branches, users, and reports as you grow',
    ],
    examples: [
      {
        title: 'Employee records and attendance',
        body: 'A staff portal where HR updates a record once, and attendance, leave balances, and payroll summaries read from the same source.',
      },
      {
        title: 'Branch stock and purchasing',
        body: 'A stock system that shows what each branch holds, what is already on order, and what needs replenishing before a customer asks.',
      },
    ],
    image: 'service-software',
  },
  {
    slug: 'business-process-automation',
    icon: 'Workflow',
    title: 'Business Process Automation',
    summary:
      'Approvals, onboarding, documents, and reports that move on their own, so work stops waiting on a message nobody sent.',
    problems: [
      'Leave and purchase approvals sit in chat threads until someone follows up.',
      'New employees fill out the same details on four different forms.',
      'Reports are assembled manually at the end of every month.',
    ],
    benefits: [
      'Requests reach the right person the first time',
      'Fewer reminders, follow-ups, and missed steps',
      'A record of who approved what, and when',
    ],
    examples: [
      {
        title: 'Leave and overtime approvals',
        body: 'A request routes to the approver, updates the leave balance, and notifies payroll without a single forwarded message.',
      },
      {
        title: 'Supplier onboarding',
        body: 'Once a supplier is approved, the system drafts the documents, files them, and alerts accounting to set up payment terms.',
      },
    ],
    image: 'service-automation',
  },
  {
    slug: 'api-system-integrations',
    icon: 'Plug',
    title: 'API & System Integrations',
    summary:
      'Connect the tools you already pay for, so a record entered once reaches payroll, accounting, and reporting without being retyped.',
    problems: [
      'Payroll, accounting, and HR each hold a different version of the same facts.',
      'Someone exports a spreadsheet every week just to move data between tools.',
      'Customer details are copied by hand from the shop system into the CRM.',
    ],
    benefits: [
      'One entry, several systems updated',
      'Fewer encoding errors and reconciliation sessions',
      'Existing tools keep working; they simply start talking',
    ],
    examples: [
      {
        title: 'Attendance to payroll',
        body: 'Approved time records flow into payroll automatically, with exceptions flagged for review instead of retyped.',
      },
      {
        title: 'CRM to accounting',
        body: 'A closed sale creates the invoice and updates the customer record, so both teams see the same status.',
      },
    ],
    image: 'service-integration',
  },
  {
    slug: 'business-intelligence-analytics',
    icon: 'BarChart3',
    title: 'Business Intelligence & Analytics',
    summary:
      'One dashboard for the numbers you actually check — sales, stock, attendance, and cash — instead of a folder of exports.',
    problems: [
      'Every new question means another spreadsheet.',
      'Reports arrive after the decision has already been made.',
      'Two teams quote different numbers for the same week.',
    ],
    benefits: [
      'A shared view of the numbers that matter',
      'Daily visibility instead of month-end surprises',
      'Reports that can be opened, not rebuilt',
    ],
    examples: [
      {
        title: 'Daily sales by branch',
        body: 'A morning view of sales, average basket, and stock cover per branch, with yesterday compared to the same day last week.',
      },
      {
        title: 'Attendance and overtime',
        body: 'Overtime trends and absence patterns by team, so staffing decisions rest on recorded hours rather than recollection.',
      },
    ],
    image: 'service-analytics',
  },
  {
    slug: 'cloud-solutions-technical-support',
    icon: 'Cloud',
    title: 'Cloud Solutions & Technical Support',
    summary:
      'Keep your systems online, backed up, and watched, so a power cut or a full disk does not become a lost week.',
    problems: [
      'The system lives on one office computer that everyone shares.',
      'Backups happen when someone remembers.',
      'A failure is usually discovered by a customer.',
    ],
    benefits: [
      'Access from the office, home, or a branch',
      'Backups you can actually restore from',
      'Problems caught before they reach customers',
    ],
    examples: [
      {
        title: 'Hosted business system',
        body: 'A deployed application with monitoring, scheduled backups, and a documented restore procedure your team can follow.',
      },
      {
        title: 'Branch connectivity',
        body: 'A setup that keeps head office and provincial branches working from the same records, even when the connection drops.',
      },
    ],
    image: 'service-cloud',
  },
  {
    slug: 'technology-consulting',
    icon: 'Compass',
    title: 'Technology Consulting',
    summary:
      'An honest read on what to fix first, what to buy, and what to leave alone, before you spend on software you do not need.',
    problems: [
      'Every vendor claims their tool solves everything.',
      'It is unclear whether to buy, extend, or build.',
      'A previous system was abandoned shortly after launch.',
    ],
    benefits: [
      'A prioritised list instead of a wish list',
      'Decisions you can explain to owners and managers',
      'Less spend on tools nobody uses',
    ],
    examples: [
      {
        title: 'Process assessment',
        body: 'A walkthrough of how work actually moves through the business, with the delays and duplicate steps written down plainly.',
      },
      {
        title: 'Build versus buy',
        body: 'A comparison of cost, fit, and maintenance for the realistic options, including the option of changing the process instead.',
      },
    ],
    image: 'service-consulting',
  },
  {
    slug: 'ready-made-systems',
    icon: 'Boxes',
    title: 'Ready-Made Systems',
    summary:
      'Working system foundations you can start using quickly, then adjust to fit the way your business actually runs.',
    problems: [
      'The process is common enough that a full custom build would take longer than the business can wait.',
      'Spreadsheets and chat threads already cover the work, but nobody can see the current status.',
      'A growing team needs shared records now, not after a long design phase.',
    ],
    benefits: [
      'A usable starting point in days rather than months',
      'Core records, workflows, and reports already connected',
      'Room to tailor the system once the team is using it',
    ],
    examples: [
      {
        title: 'Starter operations system',
        body: 'A preconfigured set of employee, customer, and stock records with basic approvals and reports, ready for your data and your team.',
      },
      {
        title: 'Branch-ready foundation',
        body: 'A shared system for branches that need common records and simple reporting before a larger custom build makes sense.',
      },
    ],
    image: 'service-software',
  },
]
